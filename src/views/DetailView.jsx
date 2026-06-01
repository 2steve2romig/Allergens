import { formatDate } from '../utils.js'

export default function DetailView({ result, fieldValue, setView }) {
  const samples = result?.resultSamples || []
  const unit    = samples[0]?.unit || 'ppm'

  return (
    <div className="stack">
      <div className="result-summary">
        <div className="meta"><div className="k">Result ID</div><div className="v">{result?.id}</div></div>
        <div className="meta"><div className="k">Date</div><div className="v">{formatDate(result?.date)}</div></div>
        <div className="meta"><div className="k">Operator</div><div className="v">{result?.operator}</div></div>
        <div className="meta"><div className="k">Status</div><div className="v">{result?.status}</div></div>
      </div>

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

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Saved Quantification Results</div>
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
            <div className="table-shell">
              <table>
                <thead>
                  <tr>
                    <th>Sample</th>
                    <th>OD 1</th>
                    <th>OD 2</th>
                    <th>B/Bmax (%)</th>
                    <th>Assay Conc. ({unit})</th>
                    <th>Dilution</th>
                    <th>Sample Conc. ({unit})</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {samples.map((s, i) => {
                    const pillClass = s.rangeClass === 'green' ? 'good' : s.rangeClass === 'orange' ? 'bad' : 'warn'
                    const statusLabel = s.rangeClass === 'green' ? 'Quantified' : s.rangeClass === 'orange' ? '< LoQ' : '> ULoQ'
                    return (
                      <tr key={i}>
                        <td><strong>{s.name}</strong></td>
                        <td>{Number(s.od1).toFixed(3)}</td>
                        <td>{Number(s.od2).toFixed(3)}</td>
                        <td className={s.rangeClass}>{s.bb0?.toFixed(1)}</td>
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
