export default function SettingsView({ resetAll }) {
  const handleReset = () => {
    if (window.confirm('Reset all demo data to factory defaults? This clears results, quant state, and COA fields.')) {
      resetAll()
    }
  }

  return (
    <div className="stack">
      <div className="card">
        <div className="card-header"><div className="section-title">System Settings</div></div>
        <div className="card-body grid grid-3">
          <div className="meta"><div className="k">COA Validation</div><div className="v">Required fields, lot format, date checks</div></div>
          <div className="meta"><div className="k">RoQ Thresholds</div><div className="v">Green / Yellow / Orange status logic</div></div>
          <div className="meta"><div className="k">Result Retention</div><div className="v">Persisted in browser local storage</div></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Demo Controls</div>
            <div className="small muted" style={{ marginTop: 4 }}>Reset the application to its factory demo state.</div>
          </div>
        </div>
        <div className="card-body">
          <div className="footer-actions">
            <div className="small muted">
              Clears all saved results and resets COA fields and quantification data to the built-in Histamine demo values. Cannot be undone.
            </div>
            <button className="btn" onClick={handleReset}>Reset to Defaults</button>
          </div>
        </div>
      </div>
    </div>
  )
}
