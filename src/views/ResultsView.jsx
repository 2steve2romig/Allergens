import { useState, useMemo } from 'react'
import { formatDate } from '../utils.js'

const PAGE_SIZES = [5, 10, 25, 50]

function StatusPill({ status }) {
  const cls = status === 'Completed' ? 'good' : status === 'Draft' ? 'warn' : 'soft'
  return <span className={`pill ${cls}`}>{status}</span>
}

export default function ResultsView({ results, highlightedResultId, coaFields, setSelectedResultId, setView }) {
  const lotValue = coaFields.find(f => f.key === 'lot')?.value || ''

  const [search,     setSearch]     = useState('')
  const [colFilters, setColFilters] = useState({ assay: '', operator: '', status: '' })
  const [page,       setPage]       = useState(1)
  const [pageSize,   setPageSize]   = useState(10)

  const updateFilter = (col, val) => {
    setColFilters(prev => ({ ...prev, [col]: val }))
    setPage(1)
  }
  const updateSearch = val => { setSearch(val); setPage(1) }
  const clearAll     = () => { setSearch(''); setColFilters({ assay: '', operator: '', status: '' }); setPage(1) }

  const hasFilter = search || colFilters.assay || colFilters.operator || colFilters.status

  const uniqueAssays    = useMemo(() => [...new Set(results.map(r => r.assay).filter(Boolean))],    [results])
  const uniqueOperators = useMemo(() => [...new Set(results.map(r => r.operator).filter(Boolean))], [results])
  const uniqueStatuses  = useMemo(() => [...new Set(results.map(r => r.status).filter(Boolean))],   [results])

  const filtered = useMemo(() => {
    let rows = results
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(r =>
        [r.id, r.assay, r.lot, r.operator, r.quantifiable, r.flags, r.status, r.product]
          .some(v => String(v || '').toLowerCase().includes(q))
      )
    }
    if (colFilters.assay)    rows = rows.filter(r => r.assay    === colFilters.assay)
    if (colFilters.operator) rows = rows.filter(r => r.operator === colFilters.operator)
    if (colFilters.status)   rows = rows.filter(r => r.status   === colFilters.status)
    return rows
  }, [results, search, colFilters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage   = Math.min(page, totalPages)
  const paged      = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
  const start      = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const end        = Math.min(safePage * pageSize, filtered.length)

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
            <div className="small muted">Select an existing result or add a new quantification run.</div>
          </div>
        </div>
        <div className="card-body stack">

          {/* Search + column filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search all columns…"
              value={search}
              onChange={e => updateSearch(e.target.value)}
              style={{ flex: '1 1 200px', minWidth: 180 }}
            />
            <select value={colFilters.assay} onChange={e => updateFilter('assay', e.target.value)}
              style={{ flex: '0 1 160px' }}>
              <option value="">All Assays</option>
              {uniqueAssays.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={colFilters.operator} onChange={e => updateFilter('operator', e.target.value)}
              style={{ flex: '0 1 150px' }}>
              <option value="">All Operators</option>
              {uniqueOperators.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <select value={colFilters.status} onChange={e => updateFilter('status', e.target.value)}
              style={{ flex: '0 1 140px' }}>
              <option value="">All Statuses</option>
              {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {hasFilter && (
              <button className="btn ghost" onClick={clearAll}>Clear</button>
            )}
          </div>

          {/* Scrollable table */}
          <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 440, border: '1px solid #dde6f0', borderRadius: 8 }}>
            <table className="results-table" style={{ minWidth: 860 }}>
              <thead>
                <tr>
                  <th>Result ID</th>
                  <th>Date</th>
                  <th>Assay</th>
                  <th>Lot</th>
                  <th>Operator</th>
                  <th>Samples</th>
                  <th>Quantifiable</th>
                  <th>Flags</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px 0' }}>
                      No results match the current filters.
                    </td>
                  </tr>
                ) : paged.map(r => (
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

          {/* Pagination bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <span className="small muted">
              {filtered.length === 0 ? 'No results' : `Showing ${start}–${end} of ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="small muted">Per page</span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
                style={{ width: 70 }}
              >
                {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button className="btn" disabled={safePage <= 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
              <span className="small" style={{ minWidth: 90, textAlign: 'center', fontWeight: 600 }}>
                Page {safePage} of {totalPages}
              </span>
              <button className="btn" disabled={safePage >= totalPages} onClick={() => setPage(p => p + 1)}>Next ›</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
