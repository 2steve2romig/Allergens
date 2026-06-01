export default function HelpView() {
  return (
    <div className="card">
      <div className="card-header"><div className="section-title">Workflow Help</div></div>
      <div className="card-body stack">
        <div className="meta"><div className="k">Step 1</div><div className="v">Upload a COA, let AI populate the master table, edit any values, validate, then import.</div></div>
        <div className="meta"><div className="k">Step 2</div><div className="v">Run the quantification worksheet using imported COA data, standard curve values, sample OD values, and dilution factors.</div></div>
        <div className="meta"><div className="k">Final</div><div className="v">Save the quantification and return to the updated historical results page.</div></div>
      </div>
    </div>
  )
}
