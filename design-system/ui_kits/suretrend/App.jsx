function App() {
  const [authed, setAuthed] = React.useState(true);
  const [route, setRoute] = React.useState("dashboard");

  if (!authed) return <Login onLogin={() => setAuthed(true)}/>;

  const crumb = route.charAt(0).toUpperCase() + route.slice(1);
  const page = route === "dashboard" ? <Dashboard/>
             : route === "results" ? <Results/>
             : route === "reports" ? <Reports/>
             : route === "home" ? <Dashboard/>
             : <div className="content"><h1 className="page-h1">{crumb}</h1><p className="page-sub">This surface isn't mocked yet. Swap the sidebar tab to see wired-up screens.</p></div>;

  return (
    <div className="app">
      <Sidebar route={route} onNav={setRoute}/>
      <div className="main">
        <Topbar crumb={crumb}/>
        {page}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
