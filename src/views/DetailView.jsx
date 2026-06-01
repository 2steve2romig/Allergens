import { formatDate, calcSampleRows } from '../utils.js'

export default function DetailView({ result, fieldValue, quant, setView }) {
  const samples = result.resultSamples?.length ? result.resultSamples : calcSampleRows(quant)

  return (
    <div className="stack">
      <div className="result-summary">
        <div className="meta"><div className="k">Result ID</div><div className="v">{result.id}</div></div>
        <div className="meta"><div className="k">Date</div><div className="v">{formatDate(result.date)}</div></div>
        <div className="meta"><div className="k">Operator</div><div className="v">{result.operator}</div></div>
        <div className="meta"><div className="k">Status</div><div className="v">{result.status}</div></div>
      </div>

      <div className="detail-grid">
        <div className="card">
          <div className="card-header"><div className="section-title">Run Summary</div></div>
          <div className="card-body stack">
            <div className="meta"><div className="k">Product</div><div className="v">{result.product}</div></div>
            <div className="meta"><div className="k">Kit / Lot</div><div className="v">{result.kit} · {result.lot}</div></div>
            <div className="meta"><div className="k">Notes</div><div className="v">{result.notes}</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="section-title">Imported COA Snapshot</div></div>
          <div className="card-body grid grid-3">
            <div className="meta"><div className="k">Catalog No</div><div className="v">{fieldValue('catalogNo')}</div></div>
            <div className="meta"><div className="k">Lot</div><div className="v">{fieldValue('lot')}</div></div>
            <div className="meta"><div className="k">Expiry</div><div className="v">{formatDate(fieldValue('expiryDate'))}</div></div>
            <div className="meta"><div className="k">Std 0 Rule</div><div className="v">{fieldValue('acceptance0')}</div></div>
            <div className="meta"><div className="k">Std 6 Rule</div><div className="v">{fieldValue('acceptance6')}</div></div>
            <div className="meta"><div className="k">Std 24 Rule</div><div className="v">{fieldValue('acceptance24')}</div></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Saved Quantification Results</div>
            <div className="small muted">The new quantification has been added to the historical results and is shown here as the saved result detail page.</div>
          </div>
          <button className="btn" onClick={() => setView('results')}>Open Results Table</button>
        </div>
        <div className="card-body">
          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>Sample</th>
                  <th>OD 1</th>
                  <th>OD 2</th>
                  <th>B-B<sub>0</sub></th>
                  <th>Assay concentration (ppm)</th>
                  <th>Dilution</th>
                  <th>Sample concentration (ppm)</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((s, i) => (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{Number(s.od1).toFixed(3)}</td>
                    <td>{Number(s.od2).toFixed(3)}</td>
                    <td className={s.rangeClass}>{s.bb0.toFixed(1)}</td>
                    <td>{s.assayText}</td>
                    <td>{s.dilution}</td>
                    <td>{s.sampleConc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
