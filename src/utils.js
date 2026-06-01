export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function ruleCheck(field) {
  const v = String(field.value || '').trim()
  if (field.required && !v) return { ok: false, msg: 'Required value missing' }
  if (field.key === 'catalogNo' && !/^KIT\d{4}$/i.test(v)) return { ok: false, msg: 'Expected KIT#### format' }
  if (field.key === 'lot' && !/^\d{6}$/.test(v)) return { ok: false, msg: 'Expected 6-digit lot' }
  if ((field.key === 'expiryDate' || field.key === 'coaDate') && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return { ok: false, msg: 'Expected YYYY-MM-DD date' }
  return { ok: true, msg: 'Valid' }
}

export function validationSummary(coaFields) {
  const checks = coaFields.map(ruleCheck)
  return {
    valid:    checks.filter(c => c.ok).length,
    invalid:  checks.filter(c => !c.ok).length,
    total:    checks.length,
    complete: checks.every(c => c.ok),
  }
}

function solveLinear3(A, rhs) {
  const M = A.map((row, i) => [...row, rhs[i]])
  for (let col = 0; col < 3; col++) {
    let max = col
    for (let row = col + 1; row < 3; row++) {
      if (Math.abs(M[row][col]) > Math.abs(M[max][col])) max = row
    }
    ;[M[col], M[max]] = [M[max], M[col]]
    for (let row = col + 1; row < 3; row++) {
      const f = M[row][col] / M[col][col]
      for (let j = col; j <= 3; j++) M[row][j] -= f * M[col][j]
    }
  }
  const x = [0, 0, 0]
  for (let i = 2; i >= 0; i--) {
    x[i] = M[i][3]
    for (let j = i + 1; j < 3; j++) x[i] -= M[i][j] * x[j]
    x[i] /= M[i][i]
  }
  return x
}

export function quadraticRegression(xs, ys) {
  const n = xs.length
  let Sx=0, Sx2=0, Sx3=0, Sx4=0, Sy=0, Sxy=0, Sx2y=0
  for (let i = 0; i < n; i++) {
    const x = xs[i], y = ys[i], x2 = x * x
    Sx += x; Sx2 += x2; Sx3 += x2 * x; Sx4 += x2 * x2
    Sy += y; Sxy += x * y; Sx2y += x2 * y
  }
  const [a, b, c] = solveLinear3(
    [[Sx4, Sx3, Sx2], [Sx3, Sx2, Sx], [Sx2, Sx, n]],
    [Sx2y, Sxy, Sy]
  )
  const yMean = Sy / n
  let ssTot = 0, ssRes = 0
  for (let i = 0; i < n; i++) {
    const pred = a * xs[i] * xs[i] + b * xs[i] + c
    ssTot += (ys[i] - yMean) ** 2
    ssRes += (ys[i] - pred) ** 2
  }
  const r2 = ssTot > 0 ? 1 - ssRes / ssTot : 1
  return { a, b, c, r2 }
}

function blankAvg(quant) {
  const e = quant.standardCurve[0] || { od1: 0, od2: 0 }
  return (Number(e.od1) + Number(e.od2)) / 2
}

export function calcStdRows(quant, allergen) {
  const blank = blankAvg(quant)
  return allergen.standards.map((std, i) => {
    const entry = quant.standardCurve[i] || { od1: 0, od2: 0 }
    const od1   = Number(entry.od1 || 0)
    const od2   = Number(entry.od2 || 0)
    const avgOD = (od1 + od2) / 2
    const bb0   = i === 0 ? 100 : (blank > 0 ? (avgOD / blank) * 100 : 0)
    const coaBb0 = std.meanOD != null && allergen.standards[0].meanOD != null
      ? (std.meanOD / allergen.standards[0].meanOD) * 100
      : null
    return { std: std.std, concentration: std.concentration, meanOD: std.meanOD, cv: std.cv, coaBb0, od1, od2, avgOD, bb0 }
  })
}

export function fitCurve(stdRows) {
  return quadraticRegression(
    stdRows.map(r => r.bb0),
    stdRows.map(r => r.concentration)
  )
}

export function calcSampleRows(quant, allergen, curve, stdRows) {
  const blank   = blankAvg(quant)
  const loqBb0  = stdRows[1]?.bb0  ?? 90
  const uloqBb0 = stdRows[stdRows.length - 1]?.bb0 ?? 10
  const { unit } = allergen

  return quant.samples.map(s => {
    const od1   = Number(s.od1 || 0)
    const od2   = Number(s.od2 || 0)
    const avgOD = (od1 + od2) / 2
    const bb0   = blank > 0 ? (avgOD / blank) * 100 : 0

    let assayConc = null, assayText, rangeClass
    if (bb0 >= loqBb0) {
      rangeClass = 'orange'; assayText = '< LoQ'
    } else if (bb0 <= uloqBb0) {
      rangeClass = 'yellow'; assayText = '> ULoQ'
    } else {
      assayConc  = Math.max(0, curve.a * bb0 * bb0 + curve.b * bb0 + curve.c)
      assayText  = assayConc.toFixed(2)
      rangeClass = 'green'
    }

    const dilution   = Number(s.dilution || 1)
    const sampleConc = assayConc != null
      ? (assayConc * dilution).toFixed(2)
      : assayText

    return { ...s, avgOD, bb0, assayConc, assayText, sampleConc, rangeClass, unit }
  })
}

export function runQC(stdRows, curve) {
  const std0OD = stdRows[0]?.avgOD || 0
  const lastOD = stdRows[stdRows.length - 1]?.avgOD || 0
  const inhibitionRatio = lastOD > 0 ? std0OD / lastOD : 0

  let monotonic = true
  for (let i = 1; i < stdRows.length; i++) {
    if (stdRows[i].avgOD > stdRows[i - 1].avgOD) { monotonic = false; break }
  }

  return {
    blankOD:    { pass: std0OD > 0.5,           value: std0OD.toFixed(3),              label: 'Blank OD' },
    inhibition: { pass: inhibitionRatio > 2.0,   value: inhibitionRatio.toFixed(2) + '×', label: 'Signal Range (Std0/Stdn)' },
    monotonic:  { pass: monotonic,               value: monotonic ? 'Decreasing' : 'Not monotonic', label: 'OD Monotonicity' },
    curveFit:   { pass: curve.r2 >= 0.99,        value: curve.r2.toFixed(4),            label: 'Curve Fit R²' },
  }
}

export function evaluateCriteria(allergen, stdRows, curve) {
  if (allergen.assayFormat === 'competitive') {
    const qc = runQC(stdRows, curve)
    return allergen.criteria.map((text, i) => {
      const checks = [qc.blankOD, qc.inhibition, qc.monotonic, qc.curveFit]
      const check = checks[i]
      return { text, pass: check?.pass ?? null, computed: check?.value ?? '—' }
    })
  }

  const std0OD = stdRows[0]?.avgOD || 0
  const std1OD = stdRows[1]?.avgOD || 0
  const lastOD = stdRows[stdRows.length - 1]?.avgOD || 0
  const hasData = stdRows.some(r => r.avgOD > 0.001)

  if (!hasData) {
    return allergen.criteria.map(text => ({ text, pass: null, computed: 'Enter OD values in Table 3' }))
  }

  const match2 = allergen.criteria[1]?.match(/>\s*([\d.]+)/)
  const threshold2 = match2 ? parseFloat(match2[1]) : 1.9

  return [
    {
      text: allergen.criteria[0],
      pass: std0OD > 0 && std0OD < 0.250,
      computed: `OD Std.0 = ${std0OD.toFixed(3)}`,
    },
    {
      text: allergen.criteria[1],
      pass: std0OD > 0 ? (std1OD / std0OD) > threshold2 : false,
      computed: `Std.1/Std.0 = ${std0OD > 0 ? (std1OD / std0OD).toFixed(2) : '—'}`,
    },
    {
      text: allergen.criteria[2],
      pass: lastOD > 1.0,
      computed: `OD Std.4 = ${lastOD.toFixed(3)}`,
    },
    {
      text: allergen.criteria[3],
      pass: std1OD > 0 ? (lastOD / std1OD) > 3 : false,
      computed: `Std.4/Std.1 = ${std1OD > 0 ? (lastOD / std1OD).toFixed(2) : '—'}`,
    },
  ]
}

export function getNiceTicks(max, count = 4) {
  if (max <= 0) return []
  const rawStep = max / count
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const niceStep = [1, 2, 5, 10].map(m => m * magnitude).find(s => s >= rawStep) || magnitude * 10
  const ticks = []
  for (let v = niceStep; v <= max * 1.05; v += niceStep) {
    ticks.push(Math.round(v * 10000) / 10000)
  }
  return ticks
}
