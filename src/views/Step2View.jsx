import { ALLERGENS, getAllergen } from '../allergens.js'
import { calcStdRows, calcSampleRows, fitCurve, runQC, evaluateCriteria } from '../utils.js'
import ChartSvg from '../components/ChartSvg.jsx'

function fmt(n, d = 3) {
  return (n == null || isNaN(n)) ? '—' : Number(n).toFixed(d)
}

function QCPill({ check }) {
  const cls = check.pass === null ? 'soft' : check.pass ? 'good' : 'bad'
  return (
    <div className="meta" style={{ padding: '10px 14px' }}>
      <div className="k">{check.label}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>{check.value}</span>
        <span className={`pill ${cls}`} style={{ fontSize: 11 }}>
          {check.pass === null ? '—' : check.pass ? '✓ Pass' : '✗ Fail'}
        </span>
      </div>
    </div>
  )
}

function CriteriaRow({ cr }) {
  const cls = cr.pass === null ? 'soft' : cr.pass ? 'good' : 'bad'
  return (
    <div className="meta" style={{ padding: '10px 14px' }}>
      <div className="k" style={{ textTransform: 'none', fontSize: 13, letterSpacing: 0 }}>{cr.text}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{cr.computed}</span>
        <span className={`pill ${cls}`} style={{ fontSize: 11 }}>
          {cr.pass === null ? 'No data' : cr.pass ? '✓ Pass' : '✗ Fail'}
        </span>
      </div>
    </div>
  )
}

export default function Step2View({ coaFields, quant, setQuant, fieldValue, saveQuantification }) {
  const allergen   = getAllergen(quant.allergenId || 'histamine')
  const stdRows    = calcStdRows(quant, allergen)
  const curve      = fitCurve(stdRows)
  const sampleRows = calcSampleRows(quant, allergen, curve, stdRows)
  const qc         = runQC(stdRows, curve)
  const criteria   = evaluateCriteria(allergen, stdRows, curve)
  const goodCount  = sampleRows.filter(s => s.rangeClass === 'green').length
  const hasCOA     = allergen.standards.some(s => s.meanOD != null)
  const isCompetitive = allergen.assayFormat === 'competitive'
  const { unit }   = allergen

  const r2Class = curve.r2 >= 0.999 ? 'good' : curve.r2 >= 0.99 ? 'warn' : 'bad'

  const changeAllergen = (newId) => {
    const newAllergen = getAllergen(newId)
    setQuant(q => ({
      ...q,
      allergenId: newId,
      standardCurve: newAllergen.standards.map(() => ({ od1: '', od2: '' })),
    }))
  }

  const setStdOD = (idx, field, value) => {
    setQuant(q => ({
      ...q,
      standardCurve: q.standardCurve.map((s, i) => i === idx ? { ...s, [field]: value } : s),
    }))
  }

  const setSampleField = (idx, field, value) => {
    setQuant(q => ({
      ...q,
      samples: q.samples.map((s, i) => i === idx ? { ...s, [field]: value } : s),
    }))
  }

  const addSample = () => {
    setQuant(q => ({
      ...q,
      samples: [...q.samples, { name: `Sample ${String.fromCharCode(65 + q.samples.length)}`, od1: '', od2: '', dilution: 1 }],
    }))
  }

  const removeSample = idx => {
    setQuant(q => ({ ...q, samples: q.samples.filter((_, i) => i !== idx) }))
  }

  return (
    <div className="stack">

      {/* Progress */}
      <div className="workflow">
        <div className="step done"><div className="dot">1</div><div>COA Imported</div></div>
        <div className="arrow">→</div>
        <div className="step active"><div className="dot">2</div><div>Quantification</div></div>
        <div className="arrow">→</div>
        <div className="step"><div className="dot">3</div><div>Save Result</div></div>
      </div>

      {/* TABLE 1 — Assay Data */}
      <div className="card">
        <div className="card-header">
          <div className="section-title">Table 1 — Assay Data</div>
          <span className={`pill ${isCompetitive ? 'soft' : 'soft'}`}>
            {isCompetitive ? 'Competitive inhibition ELISA' : 'Sandwich ELISA'}
          </span>
        </div>
        <div className="card-body">
          <div className="grid grid-3" style={{ gap: 14 }}>
            <div className="field">
              <label>Allergen</label>
              <select
                value={quant.allergenId || 'histamine'}
                onChange={e => changeAllergen(e.target.value)}
              >
                {ALLERGENS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Operator</label>
              <input type="text" value={quant.operator}
                onChange={e => setQuant(q => ({ ...q, operator: e.target.value }))} />
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" value={quant.assayDate}
                onChange={e => setQuant(q => ({ ...q, assayDate: e.target.value }))} />
            </div>
          </div>
          <div className="field" style={{ marginTop: 14 }}>
            <label>Assay Description</label>
            <input type="text" value={quant.assayDescription}
              onChange={e => setQuant(q => ({ ...q, assayDescription: e.target.value }))} />
          </div>
        </div>
      </div>

      {/* TABLE 2 — COA Reference */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Table 2 — COA Reference Data</div>
            <div className="small muted" style={{ marginTop: 4 }}>
              Standard concentrations and reference OD values from the imported Certificate of Analysis.
            </div>
          </div>
          {!hasCOA && (
            <span className="pill warn">Import this allergen's COA to see reference OD values</span>
          )}
        </div>
        <div className="card-body stack">
          <div className="grid grid-4">
            <div className="meta"><div className="k">Product</div><div className="v">{fieldValue('product')}</div></div>
            <div className="meta"><div className="k">Catalog No.</div><div className="v">{fieldValue('catalogNo')}</div></div>
            <div className="meta"><div className="k">Lot</div><div className="v">{fieldValue('lot')}</div></div>
            <div className="meta"><div className="k">Plate Lot</div><div className="v">{fieldValue('plateLot')}</div></div>
          </div>

          <div className="worksheet-shell">
            <table style={{ minWidth: 0 }}>
              <thead>
                <tr>
                  <th>Std.</th>
                  <th>Conc. ({unit})</th>
                  {hasCOA && <th>COA Mean OD<sub>450</sub></th>}
                  {hasCOA && <th>CV%</th>}
                  <th>B/Bmax (%)</th>
                </tr>
              </thead>
              <tbody>
                {allergen.standards.map((std, i) => {
                  const bb0 = std.meanOD != null && allergen.standards[0].meanOD != null
                    ? (std.meanOD / allergen.standards[0].meanOD * 100).toFixed(1)
                    : i === 0 ? '100.0' : '—'
                  return (
                    <tr key={i}>
                      <td><strong>{std.std}</strong></td>
                      <td>{std.concentration}</td>
                      {hasCOA && <td>{std.meanOD != null ? std.meanOD.toFixed(3) : '—'}</td>}
                      {hasCOA && <td>{std.cv != null ? std.cv.toFixed(1) : '—'}</td>}
                      <td className="blue-col">{bb0}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Criteria section — evaluated */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div className="small muted">
                {isCompetitive
                  ? 'Acceptance Criteria — Competitive inhibition ELISA (evaluated from Table 3 plate readings)'
                  : 'Acceptance Criteria — Sandwich ELISA (evaluated from Table 3 plate readings)'}
              </div>
              {criteria && (
                <span className={`pill ${criteria.every(c => c.pass) ? 'good' : criteria.some(c => c.pass === false) ? 'bad' : 'soft'}`}>
                  {criteria.filter(c => c.pass).length} / {criteria.length} pass
                </span>
              )}
            </div>
            <div className="grid grid-2" style={{ gap: 8 }}>
              {criteria?.map((cr, i) => <CriteriaRow key={i} cr={cr} />)}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE 3 — Standard Curve */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Table 3 — Standard Curve</div>
            <div className="small muted" style={{ marginTop: 4 }}>
              Enter OD readings from your plate reader.
              {isCompetitive ? ' OD should decrease with increasing concentration.' : ' OD should increase with increasing concentration.'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="pill soft">a = {fmt(curve.a, 6)}</span>
            <span className="pill soft">b = {fmt(curve.b, 4)}</span>
            <span className="pill soft">c = {fmt(curve.c, 3)}</span>
            <span className={`pill ${r2Class}`}>R² = {fmt(curve.r2, 4)}</span>
          </div>
        </div>
        <div className="card-body stack">
          <div className="worksheet-shell">
            <table style={{ minWidth: hasCOA ? 700 : 560 }}>
              <thead>
                <tr>
                  <th>Std.</th>
                  <th>Conc. ({unit})</th>
                  <th>OD<sub>1</sub></th>
                  <th>OD<sub>2</sub></th>
                  <th>Avg OD</th>
                  {hasCOA && <th>COA Ref OD</th>}
                  {hasCOA && <th>Δ OD</th>}
                  <th>B/Bmax (%)</th>
                  <th>Fitted ({unit})</th>
                </tr>
              </thead>
              <tbody>
                {stdRows.map((std, idx) => {
                  const fitted    = idx === 0 ? 0 : Math.max(0, curve.a * std.bb0 ** 2 + curve.b * std.bb0 + curve.c)
                  const deltaOD   = std.meanOD != null ? std.avgOD - std.meanOD : null
                  const deltaClass = deltaOD != null && Math.abs(deltaOD) > 0.05 ? 'orange' : ''
                  return (
                    <tr key={idx}>
                      <td><strong>{std.std}</strong></td>
                      <td>{std.concentration}</td>
                      <td>
                        <input type="number" step="0.001" value={std.od1}
                          onChange={e => setStdOD(idx, 'od1', e.target.value)} />
                      </td>
                      <td>
                        <input type="number" step="0.001" value={std.od2}
                          onChange={e => setStdOD(idx, 'od2', e.target.value)} />
                      </td>
                      <td>{fmt(std.avgOD)}</td>
                      {hasCOA && <td style={{ color: 'var(--muted)' }}>{std.meanOD != null ? std.meanOD.toFixed(3) : '—'}</td>}
                      {hasCOA && (
                        <td className={deltaClass}>
                          {deltaOD != null ? (deltaOD >= 0 ? '+' : '') + deltaOD.toFixed(3) : '—'}
                        </td>
                      )}
                      <td className="blue-col">{fmt(std.bb0, 1)}</td>
                      <td className="blue-col">{fitted.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* QC Panel */}
          <div>
            <div className="small muted" style={{ marginBottom: 8 }}>Assay Quality Check</div>
            <div className="grid grid-4">
              <QCPill check={qc.blankOD} />
              <QCPill check={qc.inhibition} />
              <QCPill check={qc.monotonic} />
              <QCPill check={qc.curveFit} />
            </div>
          </div>

          <div className="chart">
            <ChartSvg stdRows={stdRows} curve={curve} />
          </div>
        </div>
      </div>

      {/* TABLE 4 — Sample Absorbance */}
      <div className="card">
        <div className="card-header">
          <div className="section-title">Table 4 — Sample Absorbance Values</div>
          <button className="btn ghost" style={{ fontSize: 13 }} onClick={addSample}>+ Add Sample</button>
        </div>
        <div className="card-body">
          <div className="worksheet-shell">
            <table style={{ minWidth: 520 }}>
              <thead>
                <tr>
                  <th style={{ width: 36 }}>#</th>
                  <th>Sample Name</th>
                  <th>OD<sub>1</sub></th>
                  <th>OD<sub>2</sub></th>
                  <th>Avg OD</th>
                  <th>B/Bmax (%)</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {sampleRows.map((s, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>{idx + 1}</td>
                    <td>
                      <input type="text" value={s.name}
                        onChange={e => setSampleField(idx, 'name', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" step="0.001" value={s.od1}
                        onChange={e => setSampleField(idx, 'od1', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" step="0.001" value={s.od2}
                        onChange={e => setSampleField(idx, 'od2', e.target.value)} />
                    </td>
                    <td>{fmt(s.avgOD)}</td>
                    <td className="blue-col">{fmt(s.bb0, 1)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => removeSample(idx)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16 }}
                        title="Remove">×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* TABLE 5 — ELISA Results */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Table 5 — ELISA Results</div>
            <div className="small muted" style={{ marginTop: 4 }}>
              Concentrations calculated by quadratic polynomial regression (Y = aX² + bX + c).
            </div>
          </div>
          <span className="pill soft">{goodCount} / {sampleRows.length} quantifiable</span>
        </div>
        <div className="card-body stack">
          <div className="worksheet-shell">
            <table style={{ minWidth: 620 }}>
              <thead>
                <tr>
                  <th>Sample</th>
                  <th>B/Bmax (%)</th>
                  <th>Assay Conc. ({unit})</th>
                  <th>Dilution Factor</th>
                  <th>Sample Conc. ({unit})</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleRows.map((s, idx) => {
                  const statusLabel = s.rangeClass === 'green' ? 'Quantified' : s.rangeClass === 'orange' ? '< LoQ' : '> ULoQ'
                  const pillClass   = s.rangeClass === 'green' ? 'good' : s.rangeClass === 'orange' ? 'bad' : 'warn'
                  return (
                    <tr key={idx}>
                      <td><strong>{s.name}</strong></td>
                      <td>{fmt(s.bb0, 1)}</td>
                      <td className={s.rangeClass}>{s.assayText}</td>
                      <td>
                        <input type="number" step="1" min="1" value={s.dilution}
                          onChange={e => setSampleField(idx, 'dilution', e.target.value)} />
                      </td>
                      <td className={s.rangeClass}><strong>{s.sampleConc}</strong></td>
                      <td><span className={`pill ${pillClass}`}>{statusLabel}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="footer-actions">
            <div className="small muted">
              Green = within RoQ · Orange = below LoQ · Yellow = above ULoQ (dilute and re-run)
            </div>
            <button className="btn primary" onClick={saveQuantification}>Save Quantification</button>
          </div>
        </div>
      </div>

    </div>
  )
}
