function Sidebar({ route, onNav }) {
  const items = [
    ["home", "Home", IHome],
    ["dashboard", "Dashboard", IDashboard],
    ["results", "Results", IResults],
    ["reports", "Reports", IReports],
    ["sites", "Sites", ISites],
    ["map", "Map", IMap],
  ];
  return (
    <aside className="sidebar">
      <div className="brand" style={{padding:"10px 14px"}}>
        <img src="../../assets/suretrend-cloud-logo.png" alt="SureTrend Cloud" style={{height:48,width:"auto",display:"block",margin:"0 auto"}}/>
      </div>
      <nav>
        {items.map(([id, label, Icon]) => (
          <a key={id} className={route === id ? "active" : ""} onClick={() => onNav(id)}>
            <Icon/> {label}
          </a>
        ))}
      </nav>
      <div className="foot">©2026 Hygiena, LLC<br/>One Health Diagnostics™</div>
    </aside>
  );
}
window.Sidebar = Sidebar;
