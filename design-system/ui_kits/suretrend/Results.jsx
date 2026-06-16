function Results() {
  const [filter, setFilter] = React.useState("all");
  const rows = [
    ["4/21/2026, 8:38 PM", "Mark's Moo Milk", "Line 2 · Tank 4", "ATP", 12, "pass"],
    ["4/21/2026, 8:14 PM", "Mark's Moo Milk", "Line 3 · Drain", "ATP", 182, "fail"],
    ["4/21/2026, 7:02 PM", "Packer", "Belt A", "ATP", 54, "caution"],
    ["4/21/2026, 6:40 PM", "Cold Storage", "Entry door", "ATP", 18, "pass"],
    ["4/21/2026, 5:55 PM", "Mark's Moo Milk", "CIP return", "Coliform", 0, "pass"],
    ["4/21/2026, 5:30 PM", "Packer", "Filler nozzle 3", "Allergen", 1, "fail"],
    ["4/21/2026, 4:12 PM", "Receiving", "Dock 1", "ATP", 28, "pass"],
    ["4/21/2026, 3:48 PM", "Cold Storage", "Wall panel N", "ATP", 71, "caution"],
  ];
  const filtered = filter === "all" ? rows : rows.filter(r => r[5] === filter);
  const Badge = ({ s }) => {
    const Ico = s === "pass" ? ICheck : s === "fail" ? IX : IWarn;
    const bg = s === "pass" ? "#4CAF50" : s === "fail" ? "#F44336" : "#FFC107";
    const fg = s === "caution" ? "#4a3500" : "#fff";
    return (
      <span className={"badge " + s}>
        <span className="dot" style={{background:bg,color:fg}}><Ico size={9} sw={3}/></span>
        {s[0].toUpperCase()+s.slice(1)}
      </span>
    );
  };
  return (
    <div className="content">
      <h1 className="page-h1">Results</h1>
      <p className="page-sub">Every test result across every site.</p>

      <div className="card" style={{padding:0}}>
        <div className="row" style={{padding:"14px 18px",borderBottom:"1px solid #E0E0E0",gap:8}}>
          <div className="tabs" style={{margin:0,border:"none"}}>
            {["all","pass","caution","fail"].map(k => (
              <div key={k} className={"tab "+(filter===k?"active":"")} onClick={()=>setFilter(k)} style={{borderBottom:"2px solid "+(filter===k?"#29ABE2":"transparent")}}>
                {k[0].toUpperCase()+k.slice(1)} {k!=="all" && <span style={{color:"#999",marginLeft:4}}>{rows.filter(r=>r[5]===k).length}</span>}
              </div>
            ))}
          </div>
          <div className="spacer"/>
          <button className="btn btn-ghost btn-sm" style={{display:"inline-flex",alignItems:"center",gap:6}}><IFilter/> Filter</button>
          <button className="btn btn-ghost btn-sm" style={{display:"inline-flex",alignItems:"center",gap:6}}><IDownload/> Export</button>
        </div>
        <table className="st-table">
          <thead><tr><th>Timestamp</th><th>Site</th><th>Location</th><th>Test</th><th>RLU</th><th>Result</th></tr></thead>
          <tbody>
            {filtered.map((r,i) => (
              <tr key={i}>
                <td>{r[0]}</td><td>{r[1]}</td><td style={{color:"#757575"}}>{r[2]}</td><td>{r[3]}</td>
                <td style={{fontVariantNumeric:"tabular-nums"}}>{r[4]}</td><td><Badge s={r[5]}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
window.Results = Results;
