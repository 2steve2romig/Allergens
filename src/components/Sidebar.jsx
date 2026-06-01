const navItems = [
  { id: 'results-list', label: 'Results' },
  { id: 'add',          label: 'Add New' },
  { id: 'help',         label: 'Help'    },
]

export default function Sidebar({ view, setView, startNewWorkflow }) {
  const isActive = (id) => {
    if (id === 'results-list') return view === 'results' || view === 'detail'
    if (id === 'add') return view === 'step1' || view === 'step2'
    return view === id
  }

  const handleNav = (id) => {
    if (id === 'add') startNewWorkflow()
    else if (id === 'results' || id === 'results-list') setView('results')
    else setView(id)
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">AllergenIQ</div>
        <div className="brand-sub">AI-driven COA ingestion and allergen quantification</div>
      </div>
      <div className="brand-name">AllergenIQ®</div>
      <nav className="nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={isActive(item.id) ? 'active' : ''}
            onClick={() => handleNav(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="nav-spacer" />
      <div className="subnav">
        <button type="button">❔ Help</button>
      </div>
    </aside>
  )
}
