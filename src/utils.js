import { coaDefaults } from './data.js'

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

function interpolatePpm(bb0) {
  if (bb0 >= 76.9) return 2
  if (bb0 >= 50.8) return 6
  if (bb0 >= 38.4) return 12
  if (bb0 >= 26.3) return 24
  if (bb0 >= 19.7) return 72
  return 90
}

export function calcStdRows(quant) {
  const blank = quant.standardCurve[0] || 0
  return coaDefaults.standards.slice(0, 5).map((std, i) => {
    const od   = Number(quant.standardCurve[i] || 0)
    const bb0  = blank ? (od / blank) * 100 : 0
    const pass = Math.abs(od - std.meanOD) <= 0.04
    return { ...std, enteredOD: od, enteredBB0: bb0, pass }
  })
}

export function calcSampleRows(quant) {
  const blank = quant.standardCurve[0] || 0
  return quant.samples.map(s => {
    const meanOD   = (Number(s.od1) + Number(s.od2)) / 2
    const bb0      = blank ? (meanOD / blank) * 100 : 0
    const assayConc = interpolatePpm(bb0)
    let rangeClass  = 'green'
    let assayText   = assayConc.toFixed(1)
    if (bb0 > 95)       { rangeClass = 'orange'; assayText = '< LoQ'  }
    else if (bb0 < 19.7){ rangeClass = 'yellow'; assayText = '> ULoQ' }
    const sampleConc = assayText.includes('LoQ')
      ? assayText
      : (assayConc * Number(s.dilution || 1)).toFixed(1)
    return { ...s, meanOD, bb0, assayText, sampleConc, rangeClass }
  })
}
