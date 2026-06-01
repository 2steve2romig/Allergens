import { formatDate } from '../utils.js'

function StatusPill({ status }) {
  const cls = status === 'Completed' ? 'good' : status === 'Draft' ? 'warn' : 'soft'
  return <span className={`pill ${cls}`}>{status}</span>
}

export default function ResultsView({ results, highlightedResultId, coaFields, setSelectedResultId, setView }) {
  const lotValue = coaFields.find(f => f.key === 'lot')?.value || ''

  return (
    <div className="stack">
      <div className="grid grid-4">
        <div className="meta"><div className="k">Historical Results</div><div className="v">{results.length}</div></div>
        <div className="meta"><div className="k">Completed This Month</div><div className="v">{results.filter(r => r.status === 'Completed').length}</div></div>
        <div className="meta"><div className="k">Current Assay</div><div className="v">Histamine ELISA</div></div>
        <div className="meta"><div className="k">Latest Lot</div><div className="v">{lotValue}</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Historical Allergen Quantification Results</div>
            <div className="small muted">Main landing page for AllergenIQ. Select an existing result or add a new quantification run.</div>
          </div>
          <div className="workflow">
            <div className="step done"><div className="dot">1</div><div>Upload COA</div></div>
            <div className="arrow">→</div>
            <div className="step done"><div className="dot">2</div><div>Quantification</div></div>
            <div className="arrow">→</div>
            <div className="step active"><div className="dot">3</div><div>Result Saved</div></div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-shell">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Result ID</th>
                  <th>Date</th>
                  <th>Assay</th>
                  <th>Lot</th>
                  <th>Operator</th>
                  <th>Sample Count</th>
                  <th>Quantifiable</th>
                  <th>Flags</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.id} className={highlightedResultId === r.id ? 'highlight' : ''}>
                    <td>{r.id}</td>
                    <td>{formatDate(r.date)}</td>
                    <td>{r.assay}</td>
                    <td>{r.lot}</td>
                    <td>{r.operator}</td>
                    <td>{r.sampleCount}</td>
                    <td>{r.quantifiable}</td>
                    <td>{r.flags}</td>
                    <td><StatusPill status={r.status} /></td>
                    <td>
                      <button className="btn" onClick={() => { setSelectedResultId(r.id); setView('detail') }}>
                        View Result
                      </button>
                    </td>
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
