function Topbar({ crumb }) {
  return (
    <div className="topbar">
      <div className="crumb"><span>SureTrend</span> / <b>{crumb}</b></div>
      <div className="spacer"/>
      <button className="btn btn-ghost btn-sm" style={{display:"inline-flex",alignItems:"center",gap:6}}>
        <ISearch/> Search sites, tests, users
      </button>
      <button className="btn btn-ghost btn-sm" style={{padding:"6px 10px"}}><IBell/></button>
      <div className="user">
        <div className="avatar">RS</div>
        <span>Riley S.</span>
      </div>
    </div>
  );
}
window.Topbar = Topbar;
