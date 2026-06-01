import { calcStdRows, calcSampleRows } from '../utils.js'
import ChartSvg from '../components/ChartSvg.jsx'

export default function Step2View({ coaFields, quant, setQuant, fieldValue, saveQuantification }) {
  const standards = calcStdRows(quant)
  const samples   = calcSampleRows(quant)
  const goodCount = samples.filter(s => s.rangeClass === 'green').length
  const rowCount  = Math.max(standards.length, samples.length)

  return (
    <div className="stack">
      <div className="workflow">
        <div className="step done"><div className="dot">1</div><div>COA Imported</div></div>
        <div className="arrow">→</div>
        <div className="step active"><div className="dot">2</div><div>Quantification</div></div>
        <div className="arrow">→</div>
        <div className="step"><div className="dot">3</div><div>Save Result</div></div>
      </div>

      <div className="grid grid-4">
        <div className="meta"><div className="k">Product</div><div className="v">{fieldValue('product')}</div></div>
        <div className="meta"><div className="k">Lot</div><div className="v">{fieldValue('lot')}</div></div>
        <div className="meta"><div className="k">Operator</div><div className="v">{quant.operator}</div></div>
        <div className="meta"><div className="k">Quantifiable Samples</div><div className="v">{goodCount} / {samples.length}</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Allergen Quantification Workspace</div>
            <div className="small muted">Worksheet-style quantification screen populated from the imported COA.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="pill soft">B-B0 auto-calculated</span>
            <span className="pill soft">Range of Quantification highlighted</span>
          </div>
        </div>
        <div className="card-body stack">

          <div className="grid grid-2">
            <div className="card">
              <div className="card-header"><div className="section-title">Table 1 — Assay Data</div></div>
              <div className="card-body grid grid-3">
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
                <div className="field">
                  <label>Assay Description</label>
                  <input type="text" value={quant.assayDescription}
                    onChange={e => setQuant(q => ({ ...q, assayDescription: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><div className="section-title">Table 2 — COA Reference Data</div></div>
              <div className="card-body grid grid-3">
                <div className="meta"><div className="k">Catalog No</div><div className="v">{fieldValue('catalogNo')}</div></div>
                <div className="meta"><div className="k">Plate Lot</div><div className="v">{fieldValue('plateLot')}</div></div>
                <div className="meta"><div className="k">Curve Geometry</div><div className="v">{fieldValue('curveGeometry')}</div></div>
                <div className="meta"><div className="k">Std 0 Rule</div><div className="v">{fieldValue('acceptance0')}</div></div>
                <div className="meta"><div className="k">Std 6 Rule</div><div className="v">{fieldValue('acceptance6')}</div></div>
                <div className="meta"><div className="k">Std 24 Rule</div><div className="v">{fieldValue('acceptance24')}</div></div>
              </div>
            </div>
          </div>

          <div className="worksheet-shell">
            <table>
              <thead>
                <tr>
                  <th className="band-dark" colSpan={5}>Table 3 — Standard Curve</th>
                  <th className="band-dark" colSpan={7}>Table 4 &amp; 5 — Sample Absorbance Values and ELISA Results</th>
                </tr>
                <tr>
                  <th className="band-blue">Std.</th>
                  <th className="band-blue">COA Mean OD450</th>
                  <th className="band-blue">Entered OD</th>
                  <th className="band-blue">B-B<sub>0</sub> (%)</th>
                  <th className="band-blue">Quality</th>
                  <th className="band-blue">Sample name</th>
                  <th className="band-blue">OD 1</th>
                  <th className="band-blue">OD 2</th>
                  <th className="band-blue">B-B<sub>0</sub></th>
                  <th className="band-blue">Assay concentration (ppm)</th>
                  <th className="band-blue">Dilution Factor</th>
                  <th className="band-blue">Sample concentration (ppm)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowCount }).map((_, idx) => {
                  const std    = standards[idx]
                  const sample = samples[idx]
                  return (
                    <tr key={idx}>
                      <td>{std ? std.std : ''}</td>
                      <td>{std ? std.meanOD.toFixed(3) : ''}</td>
                      <td>{std ? std.enteredOD.toFixed(3) : ''}</td>
                      <td className="blue-col">{std ? std.enteredBB0.toFixed(1) : ''}</td>
                      <td>{std ? <span className={std.pass ? 'rule-pass' : 'rule-fail'}>{std.pass ? 'Pass' : 'Review'}</span> : ''}</td>
                      <td>{sample ? sample.name : ''}</td>
                      <td>{sample ? Number(sample.od1).toFixed(3) : ''}</td>
                      <td>{sample ? Number(sample.od2).toFixed(3) : ''}</td>
                      <td className={sample ? sample.rangeClass : ''}>{sample ? sample.bb0.toFixed(1) : ''}</td>
                      <td className="blue-col">{sample ? sample.assayText : ''}</td>
                      <td>{sample ? sample.dilution : ''}</td>
                      <td className="blue-col">{sample ? sample.sampleConc : ''}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="detail-grid">
            <div className="card">
              <div className="card-header"><div className="section-title">Assay Quality Check</div></div>
              <div className="card-body stack">
                <div className="small muted">The standard curve compares entered OD values to the COA values and checks assay quality before final interpretation.</div>
                <div className="chart"><ChartSvg standards={standards} /></div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><div className="section-title">Quantification Summary</div></div>
              <div className="card-body stack">
                <div className="meta"><div className="k">Quantifiable</div><div className="v">{goodCount} of {samples.length} samples are within the range of quantification.</div></div>
                <div className="meta"><div className="k">Flag Logic</div><div className="v">Green values are quantifiable. Yellow and orange values require dilution review or are outside LoQ.</div></div>
                <div className="meta"><div className="k">Interpretation</div><div className="v">&lt; LoQ means below assay limit. &gt; ULoQ means above upper limit and further dilution is needed.</div></div>
                <div className="footer-actions">
                  <div className="small muted">Saving this run will add a new result to the AllergenIQ results page.</div>
                  <button className="btn primary" onClick={saveQuantification}>Save Quantification</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
