function Dashboard() {
  return (
    <div className="content">
      <h1 className="page-h1">Dashboard</h1>
      <p className="page-sub">Pass/Fail overview across all sites · last 7 days</p>

      <div className="grid-kpi">
        <div className="kpi"><div className="label">Tests run</div><div className="value">1,284</div><div className="delta up">↑ 12% vs last week</div></div>
        <div className="kpi"><div className="label">Pass rate</div><div className="value" style={{color:"#2E7D32"}}>94.2%</div><div className="delta up">↑ 1.1 pts</div></div>
        <div className="kpi"><div className="label">Failures</div><div className="value" style={{color:"#C62828"}}>32</div><div className="delta down">↑ 4 vs last week</div></div>
        <div className="kpi"><div className="label">Cautions</div><div className="value" style={{color:"#8a5a00"}}>42</div><div className="delta">→ stable</div></div>
      </div>

      <div className="card">
        <div className="row" style={{marginBottom:12}}>
          <h2 style={{margin:0}}>RLU trend · all sites</h2>
          <div className="spacer"/>
          <button className="btn btn-ghost btn-sm">7d</button>
          <button className="btn btn-secondary btn-sm">30d</button>
          <button className="btn btn-ghost btn-sm">90d</button>
        </div>
        <div className="chart">
          <svg viewBox="0 0 600 220" preserveAspectRatio="none">
            {[0,55,110,165,220].map(y => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#F0F0F0"/>)}
            <polyline points="0,140 50,120 100,135 150,95 200,110 250,70 300,85 350,60 400,75 450,50 500,65 550,40 600,55"
                      fill="none" stroke="#29ABE2" strokeWidth="2"/>
            <polygon points="0,140 50,120 100,135 150,95 200,110 250,70 300,85 350,60 400,75 450,50 500,65 550,40 600,55 600,220 0,220"
                     fill="url(#g)"/>
            <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#29ABE2" stopOpacity=".25"/><stop offset="1" stopColor="#29ABE2" stopOpacity="0"/></linearGradient></defs>
          </svg>
        </div>
      </div>

      <div className="card">
        <h2>Quick access</h2>
        <div className="qa-grid">
          <a className="qa-card"><div className="ic" style={{borderColor:"#E8662A",color:"#E8662A"}}><IGrid size={22}/></div><div className="lbl">Register</div><div className="sub">New device</div></a>
          <a className="qa-card"><div className="ic" style={{borderColor:"#29ABE2",color:"#29ABE2"}}><IUsers size={22}/></div><div className="lbl">Users</div><div className="sub">Manage access</div></a>
          <a className="qa-card"><div className="ic" style={{borderColor:"#5B4FA8",color:"#5B4FA8"}}><IPlus size={22}/></div><div className="lbl">Import</div><div className="sub">Upload CSV</div></a>
          <a className="qa-card"><div className="ic" style={{borderColor:"#5B4FA8",color:"#5B4FA8"}}><IArrow size={22}/></div><div className="lbl">Migrate</div><div className="sub">From v4</div></a>
          <a className="qa-card"><div className="ic" style={{borderColor:"#2196A8",color:"#2196A8"}}><IPlay size={22}/></div><div className="lbl">Tutorials</div><div className="sub">Getting started</div></a>
        </div>
      </div>
    </div>
  );
}
window.Dashboard = Dashboard;
