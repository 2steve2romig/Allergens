/* @ds-bundle: {"format":3,"namespace":"SureTrendHygienaDesignSystem_2bcfd4","components":[],"sourceHashes":{"ui_kits/suretrend/App.jsx":"97b89ac06f61","ui_kits/suretrend/Dashboard.jsx":"899bffa460d8","ui_kits/suretrend/Icons.jsx":"6d3eb7a3b8b9","ui_kits/suretrend/Login.jsx":"899fe51b4560","ui_kits/suretrend/Reports.jsx":"f5c0c85ddbc6","ui_kits/suretrend/Results.jsx":"9873744cb032","ui_kits/suretrend/Sidebar.jsx":"3d4c8915bdd8","ui_kits/suretrend/Topbar.jsx":"ca3d35b43c71"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SureTrendHygienaDesignSystem_2bcfd4 = window.SureTrendHygienaDesignSystem_2bcfd4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/suretrend/App.jsx
try { (() => {
function App() {
  const [authed, setAuthed] = React.useState(true);
  const [route, setRoute] = React.useState("dashboard");
  if (!authed) return /*#__PURE__*/React.createElement(Login, {
    onLogin: () => setAuthed(true)
  });
  const crumb = route.charAt(0).toUpperCase() + route.slice(1);
  const page = route === "dashboard" ? /*#__PURE__*/React.createElement(Dashboard, null) : route === "results" ? /*#__PURE__*/React.createElement(Results, null) : route === "reports" ? /*#__PURE__*/React.createElement(Reports, null) : route === "home" ? /*#__PURE__*/React.createElement(Dashboard, null) : /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-h1"
  }, crumb), /*#__PURE__*/React.createElement("p", {
    className: "page-sub"
  }, "This surface isn't mocked yet. Swap the sidebar tab to see wired-up screens."));
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    route: route,
    onNav: setRoute
  }), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement(Topbar, {
    crumb: crumb
  }), page));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/suretrend/Dashboard.jsx
try { (() => {
function Dashboard() {
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-h1"
  }, "Dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "page-sub"
  }, "Pass/Fail overview across all sites \xB7 last 7 days"), /*#__PURE__*/React.createElement("div", {
    className: "grid-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Tests run"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "1,284"), /*#__PURE__*/React.createElement("div", {
    className: "delta up"
  }, "\u2191 12% vs last week")), /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Pass rate"), /*#__PURE__*/React.createElement("div", {
    className: "value",
    style: {
      color: "#2E7D32"
    }
  }, "94.2%"), /*#__PURE__*/React.createElement("div", {
    className: "delta up"
  }, "\u2191 1.1 pts")), /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Failures"), /*#__PURE__*/React.createElement("div", {
    className: "value",
    style: {
      color: "#C62828"
    }
  }, "32"), /*#__PURE__*/React.createElement("div", {
    className: "delta down"
  }, "\u2191 4 vs last week")), /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Cautions"), /*#__PURE__*/React.createElement("div", {
    className: "value",
    style: {
      color: "#8a5a00"
    }
  }, "42"), /*#__PURE__*/React.createElement("div", {
    className: "delta"
  }, "\u2192 stable"))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "RLU trend \xB7 all sites"), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "7d"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm"
  }, "30d"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "90d")), /*#__PURE__*/React.createElement("div", {
    className: "chart"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 600 220",
    preserveAspectRatio: "none"
  }, [0, 55, 110, 165, 220].map(y => /*#__PURE__*/React.createElement("line", {
    key: y,
    x1: "0",
    x2: "600",
    y1: y,
    y2: y,
    stroke: "#F0F0F0"
  })), /*#__PURE__*/React.createElement("polyline", {
    points: "0,140 50,120 100,135 150,95 200,110 250,70 300,85 350,60 400,75 450,50 500,65 550,40 600,55",
    fill: "none",
    stroke: "#29ABE2",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "0,140 50,120 100,135 150,95 200,110 250,70 300,85 350,60 400,75 450,50 500,65 550,40 600,55 600,220 0,220",
    fill: "url(#g)"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "g",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#29ABE2",
    stopOpacity: ".25"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#29ABE2",
    stopOpacity: "0"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("h2", null, "Quick access"), /*#__PURE__*/React.createElement("div", {
    className: "qa-grid"
  }, /*#__PURE__*/React.createElement("a", {
    className: "qa-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic",
    style: {
      borderColor: "#E8662A",
      color: "#E8662A"
    }
  }, /*#__PURE__*/React.createElement(IGrid, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Register"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "New device")), /*#__PURE__*/React.createElement("a", {
    className: "qa-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic",
    style: {
      borderColor: "#29ABE2",
      color: "#29ABE2"
    }
  }, /*#__PURE__*/React.createElement(IUsers, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Users"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Manage access")), /*#__PURE__*/React.createElement("a", {
    className: "qa-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic",
    style: {
      borderColor: "#5B4FA8",
      color: "#5B4FA8"
    }
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Import"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Upload CSV")), /*#__PURE__*/React.createElement("a", {
    className: "qa-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic",
    style: {
      borderColor: "#5B4FA8",
      color: "#5B4FA8"
    }
  }, /*#__PURE__*/React.createElement(IArrow, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Migrate"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "From v4")), /*#__PURE__*/React.createElement("a", {
    className: "qa-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic",
    style: {
      borderColor: "#2196A8",
      color: "#2196A8"
    }
  }, /*#__PURE__*/React.createElement(IPlay, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Tutorials"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Getting started")))));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/suretrend/Icons.jsx
try { (() => {
// Minimal Lucide-style SVG icons (1.5–2px, currentColor).
const svg = (d, opts = {}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: opts.fill || "none",
  stroke: "currentColor",
  strokeWidth: opts.sw || 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: opts.size || 16,
  height: opts.size || 16
}, d);
const IHome = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 22V12h6v10"
})), p);
const IDashboard = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "9",
  rx: "1"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "5",
  rx: "1"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "12",
  width: "7",
  height: "9",
  rx: "1"
}), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "16",
  width: "7",
  height: "5",
  rx: "1"
})), p);
const IResults = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M9 11l3 3 8-8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
})), p);
const IReports = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 3v18h18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 14l4-4 3 3 5-6"
})), p);
const ISites = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"
})), p);
const IMap = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M9 4l-6 3v13l6-3 6 3 6-3V4l-6 3z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 4v13M15 7v13"
})), p);
const ISearch = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 21l-4.3-4.3"
})), p);
const IBell = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13.7 21a2 2 0 0 1-3.4 0"
})), p);
const IPlus = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M12 5v14M5 12h14"
})), p);
const IDownload = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 10l5 5 5-5M12 15V3"
})), p);
const IArrow = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14M13 5l7 7-7 7"
})), p);
const IPlay = p => svg(/*#__PURE__*/React.createElement("path", {
  d: "M6 4l14 8-14 8z"
}), {
  ...p,
  fill: "currentColor"
});
const IUsers = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "8",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 21c1.5-4 5-6 8-6s6.5 2 8 6"
})), p);
const IGrid = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "7",
  rx: "1.5"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "7",
  rx: "1.5",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1.5",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7",
  rx: "1.5"
})), p);
const ICheck = p => svg(/*#__PURE__*/React.createElement("path", {
  d: "M5 12l4 4L19 6"
}), p);
const IX = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M6 6l12 12M6 18L18 6"
})), p);
const IWarn = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M12 9v4M12 17h.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10.3 3.9L2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
})), p);
const IFilter = p => svg(/*#__PURE__*/React.createElement("path", {
  d: "M22 3H2l8 9.5V21l4-2v-6.5z"
}), p);
const ISettings = p => svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"
})), p);
const ILogo = p =>
/*#__PURE__*/
// Placeholder — real SureTrend logo not supplied. Drop final SVG here when available.
React.createElement("svg", {
  viewBox: "0 0 56 56",
  width: p?.size || 28,
  height: p?.size || 28
}, /*#__PURE__*/React.createElement("rect", {
  x: "4",
  y: "4",
  width: "48",
  height: "48",
  rx: "8",
  fill: "none",
  stroke: p?.color || "#29ABE2",
  strokeWidth: "1.5",
  strokeDasharray: "3 3"
}), /*#__PURE__*/React.createElement("text", {
  x: "28",
  y: "33",
  textAnchor: "middle",
  fontFamily: "Open Sans, sans-serif",
  fontSize: "12",
  fontWeight: "700",
  fill: p?.color || "#0D6A99"
}, "ST"));
Object.assign(window, {
  IHome,
  IDashboard,
  IResults,
  IReports,
  ISites,
  IMap,
  ISearch,
  IBell,
  IPlus,
  IDownload,
  IArrow,
  IPlay,
  IUsers,
  IGrid,
  ICheck,
  IX,
  IWarn,
  IFilter,
  ISettings,
  ILogo
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/suretrend/Login.jsx
try { (() => {
function Login({
  onLogin
}) {
  const [u, setU] = React.useState("rsilverbergdev");
  return /*#__PURE__*/React.createElement("div", {
    className: "auth"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-brand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/suretrend-cloud-logo.png",
    alt: "SureTrend Cloud",
    style: {
      height: 52,
      width: "auto",
      display: "block",
      background: "#fff",
      borderRadius: 8,
      padding: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 36,
      background: "rgba(255,255,255,.35)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hygiena-logo-white.png",
    alt: "Hygiena",
    style: {
      height: 22,
      width: "auto",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Easily transform data."), /*#__PURE__*/React.createElement("p", null, "Sign up for free and unlock the power of unified sanitation data management.")), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, "\xA92026 Hygiena, LLC \xB7 One Health Diagnostics\u2122")), /*#__PURE__*/React.createElement("div", {
    className: "auth-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("h2", null, "Welcome back"), /*#__PURE__*/React.createElement("div", {
    className: "hint"
  }, "Sign in to your SureTrend account."), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Username"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: u,
    onChange: e => setU(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Password"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "password",
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onLogin
  }, "Log in"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary"
  }, "Sign in with SSO"), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }, "or"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 13
    }
  }, "New to SureTrend? ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: "#29ABE2",
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Create an account")))));
}
window.Login = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/suretrend/Reports.jsx
try { (() => {
function Reports() {
  const reports = [["Pass/Fail by site", "Weekly rollup · all facilities", "#29ABE2"], ["Top failing locations", "Sorted by fail count · 30d", "#F44336"], ["Operator performance", "Tests completed by user", "#5B4FA8"], ["Corrective actions", "Retest outcomes", "#2196A8"], ["HACCP audit pack", "Export-ready PDF for auditors", "#E8662A"], ["Trend vs baseline", "Compare to 90-day baseline", "#0D6A99"]];
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-h1"
  }, "Reports"), /*#__PURE__*/React.createElement("p", {
    className: "page-sub"
  }, "Over 30 preset reports. Customize and save to favorites."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16
    }
  }, reports.map(([name, desc, color]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    className: "card",
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 8,
      background: color + "22",
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(IReports, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#757575",
      marginTop: 4
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm"
  }, "Run"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Customize"))))));
}
window.Reports = Reports;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/Reports.jsx", error: String((e && e.message) || e) }); }

// ui_kits/suretrend/Results.jsx
try { (() => {
function Results() {
  const [filter, setFilter] = React.useState("all");
  const rows = [["4/21/2026, 8:38 PM", "Mark's Moo Milk", "Line 2 · Tank 4", "ATP", 12, "pass"], ["4/21/2026, 8:14 PM", "Mark's Moo Milk", "Line 3 · Drain", "ATP", 182, "fail"], ["4/21/2026, 7:02 PM", "Packer", "Belt A", "ATP", 54, "caution"], ["4/21/2026, 6:40 PM", "Cold Storage", "Entry door", "ATP", 18, "pass"], ["4/21/2026, 5:55 PM", "Mark's Moo Milk", "CIP return", "Coliform", 0, "pass"], ["4/21/2026, 5:30 PM", "Packer", "Filler nozzle 3", "Allergen", 1, "fail"], ["4/21/2026, 4:12 PM", "Receiving", "Dock 1", "ATP", 28, "pass"], ["4/21/2026, 3:48 PM", "Cold Storage", "Wall panel N", "ATP", 71, "caution"]];
  const filtered = filter === "all" ? rows : rows.filter(r => r[5] === filter);
  const Badge = ({
    s
  }) => {
    const Ico = s === "pass" ? ICheck : s === "fail" ? IX : IWarn;
    const bg = s === "pass" ? "#4CAF50" : s === "fail" ? "#F44336" : "#FFC107";
    const fg = s === "caution" ? "#4a3500" : "#fff";
    return /*#__PURE__*/React.createElement("span", {
      className: "badge " + s
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot",
      style: {
        background: bg,
        color: fg
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 9,
      sw: 3
    })), s[0].toUpperCase() + s.slice(1));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-h1"
  }, "Results"), /*#__PURE__*/React.createElement("p", {
    className: "page-sub"
  }, "Every test result across every site."), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      padding: "14px 18px",
      borderBottom: "1px solid #E0E0E0",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tabs",
    style: {
      margin: 0,
      border: "none"
    }
  }, ["all", "pass", "caution", "fail"].map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "tab " + (filter === k ? "active" : ""),
    onClick: () => setFilter(k),
    style: {
      borderBottom: "2px solid " + (filter === k ? "#29ABE2" : "transparent")
    }
  }, k[0].toUpperCase() + k.slice(1), " ", k !== "all" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#999",
      marginLeft: 4
    }
  }, rows.filter(r => r[5] === k).length)))), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IFilter, null), " Filter"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IDownload, null), " Export")), /*#__PURE__*/React.createElement("table", {
    className: "st-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Timestamp"), /*#__PURE__*/React.createElement("th", null, "Site"), /*#__PURE__*/React.createElement("th", null, "Location"), /*#__PURE__*/React.createElement("th", null, "Test"), /*#__PURE__*/React.createElement("th", null, "RLU"), /*#__PURE__*/React.createElement("th", null, "Result"))), /*#__PURE__*/React.createElement("tbody", null, filtered.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, r[0]), /*#__PURE__*/React.createElement("td", null, r[1]), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "#757575"
    }
  }, r[2]), /*#__PURE__*/React.createElement("td", null, r[3]), /*#__PURE__*/React.createElement("td", {
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, r[4]), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    s: r[5]
  }))))))));
}
window.Results = Results;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/Results.jsx", error: String((e && e.message) || e) }); }

// ui_kits/suretrend/Sidebar.jsx
try { (() => {
function Sidebar({
  route,
  onNav
}) {
  const items = [["home", "Home", IHome], ["dashboard", "Dashboard", IDashboard], ["results", "Results", IResults], ["reports", "Reports", IReports], ["sites", "Sites", ISites], ["map", "Map", IMap]];
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand",
    style: {
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/suretrend-cloud-logo.png",
    alt: "SureTrend Cloud",
    style: {
      height: 48,
      width: "auto",
      display: "block",
      margin: "0 auto"
    }
  })), /*#__PURE__*/React.createElement("nav", null, items.map(([id, label, Icon]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    className: route === id ? "active" : "",
    onClick: () => onNav(id)
  }, /*#__PURE__*/React.createElement(Icon, null), " ", label))), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, "\xA92026 Hygiena, LLC", /*#__PURE__*/React.createElement("br", null), "One Health Diagnostics\u2122"));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/suretrend/Topbar.jsx
try { (() => {
function Topbar({
  crumb
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("span", null, "SureTrend"), " / ", /*#__PURE__*/React.createElement("b", null, crumb)), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(ISearch, null), " Search sites, tests, users"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      padding: "6px 10px"
    }
  }, /*#__PURE__*/React.createElement(IBell, null)), /*#__PURE__*/React.createElement("div", {
    className: "user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, "RS"), /*#__PURE__*/React.createElement("span", null, "Riley S.")));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/suretrend/Topbar.jsx", error: String((e && e.message) || e) }); }

})();
