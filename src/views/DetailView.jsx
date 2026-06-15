import PageInstructions from '../components/PageInstructions.jsx'
import { formatDate, calcStdRows, calcSampleRows, fitCurve, runQC, evaluateCriteria } from '../utils.js'
import { getAllergen } from '../allergens.js'
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

export default function DetailView({ result, fieldValue, setView }) {
  const savedQuant = result?.savedQuant
  const allergen   = savedQuant ? getAllergen(savedQuant.allergenId) : null
  const stdRows    = savedQuant && allergen ? calcStdRows(savedQuant, allergen) : []
  const curve      = stdRows.length > 0 ? fitCurve(stdRows, allergen) : null
  const qc         = curve ? runQC(stdRows, curve, allergen) : null
  const criteria   = curve ? evaluateCriteria(allergen, stdRows, curve) : null
  const storedSamples = result?.resultSamples || []
  const samples = storedSamples.length > 0
    ? storedSamples
    : (savedQuant && allergen && curve)
      ? calcSampleRows(savedQuant, allergen, curve, stdRows)
      : []
  const isCompetitive = allergen?.assayFormat === 'competitive'
  const hasCOA     = allergen?.standards.some(s => s.meanOD != null)
  const unit       = allergen?.unit || samples[0]?.unit || 'ppm'
  const r2Class    = curve ? (curve.r2 >= 0.999 ? 'good' : curve.r2 >= 0.99 ? 'warn' : 'bad') : 'soft'

  return (
    <div className="stack">

      <PageInstructions
        title="Quantification Result Report"
        steps={[
          'The Run Summary and Imported COA Snapshot show the metadata recorded at the time of save.',
          'The Standard Curve section displays the fitted quadratic regression and QC checks for this run.',
          'The Acceptance Criteria section shows whether this assay met all kit-specific pass/fail thresholds.',
          'Sample Results shows back-calculated concentrations for each unknown. Green = quantified within RoQ.',
          'Click Open Worksheet to return to the editable quantification view, or Results Table to go back to the list.',
        ]}
      />

      {/* Summary strip */}
      <div className="result-summary">
        <div className="meta"><div className="k">Result ID</div><div className="v">{result?.id}</div></div>
        <div className="meta"><div className="k">Date</div><div className="v">{formatDate(result?.date)}</div></div>
        <div className="meta"><div className="k">Operator</div><div className="v">{result?.operator}</div></div>
        <div className="meta"><div className="k">Status</div><div className="v">{result?.status}</div></div>
      </div>

      {/* Run Summary + COA Snapshot */}
      <div className="detail-grid">
        <div className="card">
          <div className="card-header"><div className="section-title">Run Summary</div></div>
          <div className="card-body stack">
            <div className="meta"><div className="k">Assay</div><div className="v">{result?.assay}</div></div>
            <div className="meta"><div className="k">Product</div><div className="v">{result?.product}</div></div>
            <div className="meta"><div className="k">Kit / Lot</div><div className="v">{result?.kit} · {result?.lot}</div></div>
            <div className="meta"><div className="k">Quantifiable Samples</div><div className="v">{result?.quantifiable}</div></div>
            <div className="meta"><div className="k">Flags</div><div className="v">{result?.flags}</div></div>
            {result?.notes && <div className="meta"><div className="k">Notes</div><div className="v">{result.notes}</div></div>}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="section-title">Imported COA Snapshot</div></div>
          <div className="card-body grid grid-3">
            <div className="meta"><div className="k">Catalog No.</div><div className="v">{fieldValue('catalogNo')}</div></div>
            <div className="meta"><div className="k">Lot</div><div className="v">{fieldValue('lot')}</div></div>
            <div className="meta"><div className="k">Expiry</div><div className="v">{formatDate(fieldValue('expiryDate'))}</div></div>
            <div className="meta"><div className="k">Plate Lot</div><div className="v">{fieldValue('plateLot')}</div></div>
            <div className="meta"><div className="k">COA Date</div><div className="v">{formatDate(fieldValue('coaDate'))}</div></div>
            <div className="meta"><div className="k">Curve Geometry</div><div className="v">{fieldValue('curveGeometry')}</div></div>
          </div>
        </div>
      </div>

      {/* Standard Curve — only if quant data was saved */}
      {savedQuant && curve && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="section-title">Standard Curve</div>
              <div className="small muted" style={{ marginTop: 4 }}>
                {isCompetitive ? 'Competitive inhibition ELISA' : 'Sandwich ELISA'}
                {' · '}
                {isCompetitive
                  ? 'OD decreases with increasing concentration'
                  : 'OD increases with increasing concentration'}
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

            {/* Standard curve table — read-only */}
            <div className="worksheet-shell">
              <table style={{ minWidth: hasCOA ? 640 : 460 }}>
                <thead>
                  <tr>
                    <th>Std.</th>
                    <th>Conc. ({unit})</th>
                    <th>OD<sub>1</sub></th>
                    <th>OD<sub>2</sub></th>
                    <th>Avg OD</th>
                    {hasCOA && <th>COA Ref OD</th>}
                    {isCompetitive && <th>B/Bmax (%)</th>}
                    <th>{isCompetitive ? `Fitted (${unit})` : 'Fitted OD'}</th>
                  </tr>
                </thead>
                <tbody>
                  {stdRows.map((std, idx) => {
                    const fitted = isCompetitive
                      ? (idx === 0 ? 0 : Math.max(0, curve.a * std.bb0 ** 2 + curve.b * std.bb0 + curve.c))
                      : Math.max(0, curve.a * std.concentration ** 2 + curve.b * std.concentration + curve.c)
                    return (
                      <tr key={idx}>
                        <td><strong>{std.std}</strong></td>
                        <td>{std.concentration}</td>
                        <td>{fmt(std.od1)}</td>
                        <td>{fmt(std.od2)}</td>
                        <td>{fmt(std.avgOD)}</td>
                        {hasCOA && <td style={{ color: 'var(--muted)' }}>{std.meanOD != null ? std.meanOD.toFixed(3) : '—'}</td>}
                        {isCompetitive && <td className="blue-col">{fmt(std.bb0, 1)}</td>}
                        <td className="blue-col">{fitted.toFixed(isCompetitive ? 2 : 3)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* QC panel */}
            <div>
              <div className="small muted" style={{ marginBottom: 8 }}>Assay Quality Check</div>
              <div className="grid grid-4">
                <QCPill check={qc.blankOD} />
                <QCPill check={qc.inhibition} />
                <QCPill check={qc.monotonic} />
                <QCPill check={qc.curveFit} />
              </div>
            </div>

            {/* Chart */}
            <div className="chart">
              <ChartSvg stdRows={stdRows} curve={curve} allergen={allergen} />
            </div>
          </div>
        </div>
      )}

      {/* Acceptance Criteria — only if quant data was saved */}
      {savedQuant && criteria && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="section-title">Acceptance Criteria</div>
              <div className="small muted" style={{ marginTop: 4 }}>
                {isCompetitive ? 'Competitive inhibition ELISA' : 'Sandwich ELISA'} acceptance criteria evaluated at time of save.
              </div>
            </div>
            <span className={`pill ${criteria.every(c => c.pass) ? 'good' : criteria.some(c => c.pass === false) ? 'bad' : 'soft'}`}>
              {criteria.filter(c => c.pass).length} / {criteria.length} pass
            </span>
          </div>
          <div className="card-body">
            <div className="grid grid-2" style={{ gap: 8 }}>
              {criteria.map((cr, i) => <CriteriaRow key={i} cr={cr} />)}
            </div>
          </div>
        </div>
      )}

      {/* Sample Results */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Sample Results</div>
            <div className="small muted">
              {samples.length > 0
                ? `${samples.length} samples saved in this run.`
                : 'Sample data not available for this historical result.'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn ghost" onClick={() => setView('step2')}>Open Worksheet</button>
            <button className="btn" onClick={() => setView('results')}>Results Table</button>
          </div>
        </div>
        <div className="card-body">
          {samples.length > 0 ? (
            <div className="worksheet-shell">
              <table style={{ minWidth: isCompetitive ? 620 : 540 }}>
                <thead>
                  <tr>
                    <th>Sample</th>
                    <th>OD<sub>1</sub></th>
                    <th>OD<sub>2</sub></th>
                    <th>Avg OD</th>
                    {isCompetitive && <th>B/Bmax (%)</th>}
                    <th>Assay Conc. ({unit})</th>
                    <th>Dilution</th>
                    <th>Sample Conc. ({unit})</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {samples.map((s, i) => {
                    const pillClass   = s.rangeClass === 'green' ? 'good' : s.rangeClass === 'orange' ? 'bad' : 'warn'
                    const statusLabel = s.rangeClass === 'green' ? 'Quantified' : s.rangeClass === 'orange' ? '< LoQ' : '> ULoQ'
                    const avgOD       = ((Number(s.od1) + Number(s.od2)) / 2)
                    return (
                      <tr key={i}>
                        <td><strong>{s.name}</strong></td>
                        <td>{fmt(s.od1)}</td>
                        <td>{fmt(s.od2)}</td>
                        <td>{fmt(avgOD)}</td>
                        {isCompetitive && <td className={s.rangeClass}>{s.bb0 != null ? fmt(s.bb0, 1) : '—'}</td>}
                        <td>{s.assayText}</td>
                        <td>{s.dilution}</td>
                        <td><strong>{s.sampleConc}</strong></td>
                        <td><span className={`pill ${pillClass}`}>{statusLabel}</span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="meta" style={{ textAlign: 'center', padding: '24px' }}>
              <div className="small muted">This historical result predates the quantification worksheet. Start a new workflow to generate a full result record.</div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
