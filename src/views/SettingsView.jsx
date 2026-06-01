export default function SettingsView() {
  return (
    <div className="card">
      <div className="card-header"><div className="section-title">System Settings</div></div>
      <div className="card-body grid grid-3">
        <div className="meta"><div className="k">COA Validation</div><div className="v">Required fields, lot format, date checks</div></div>
        <div className="meta"><div className="k">RoQ Thresholds</div><div className="v">Green / Yellow / Orange status logic</div></div>
        <div className="meta"><div className="k">Result Retention</div><div className="v">Historical quantification archive</div></div>
      </div>
    </div>
  )
}
