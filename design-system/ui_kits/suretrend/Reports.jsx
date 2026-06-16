function Reports() {
  const reports = [
    ["Pass/Fail by site", "Weekly rollup · all facilities", "#29ABE2"],
    ["Top failing locations", "Sorted by fail count · 30d", "#F44336"],
    ["Operator performance", "Tests completed by user", "#5B4FA8"],
    ["Corrective actions", "Retest outcomes", "#2196A8"],
    ["HACCP audit pack", "Export-ready PDF for auditors", "#E8662A"],
    ["Trend vs baseline", "Compare to 90-day baseline", "#0D6A99"],
  ];
  return (
    <div className="content">
      <h1 className="page-h1">Reports</h1>
      <p className="page-sub">Over 30 preset reports. Customize and save to favorites.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {reports.map(([name, desc, color]) => (
          <div key={name} className="card" style={{cursor:"pointer"}}>
            <div style={{width:40,height:40,borderRadius:8,background:color+"22",color,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
              <IReports size={20}/>
            </div>
            <div style={{fontWeight:600,fontSize:15}}>{name}</div>
            <div style={{fontSize:13,color:"#757575",marginTop:4}}>{desc}</div>
            <div className="row" style={{marginTop:14}}>
              <button className="btn btn-secondary btn-sm">Run</button>
              <button className="btn btn-ghost btn-sm">Customize</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.Reports = Reports;
