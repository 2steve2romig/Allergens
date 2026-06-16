function Login({ onLogin }) {
  const [u, setU] = React.useState("rsilverbergdev");
  return (
    <div className="auth">
      <div className="auth-brand">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <img src="../../assets/suretrend-cloud-logo.png" alt="SureTrend Cloud" style={{height:52,width:"auto",display:"block",background:"#fff",borderRadius:8,padding:4}}/>
          <div style={{width:1,height:36,background:"rgba(255,255,255,.35)"}}></div>
          <img src="../../assets/hygiena-logo-white.png" alt="Hygiena" style={{height:22,width:"auto",display:"block"}}/>
        </div>
        <div>
          <h1>Easily transform data.</h1>
          <p>Sign up for free and unlock the power of unified sanitation data management.</p>
        </div>
        <div className="foot">©2026 Hygiena, LLC · One Health Diagnostics™</div>
      </div>
      <div className="auth-form">
        <div className="inner">
          <h2>Welcome back</h2>
          <div className="hint">Sign in to your SureTrend account.</div>
          <div className="field"><label>Username</label><input className="input" value={u} onChange={e=>setU(e.target.value)}/></div>
          <div className="field"><label>Password</label><input className="input" type="password" defaultValue="••••••••"/></div>
          <button className="btn btn-primary" onClick={onLogin}>Log in</button>
          <button className="btn btn-secondary">Sign in with SSO</button>
          <div className="divider">or</div>
          <div style={{textAlign:"center",fontSize:13}}>
            New to SureTrend? <a style={{color:"#29ABE2",fontWeight:600,cursor:"pointer"}}>Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
window.Login = Login;
