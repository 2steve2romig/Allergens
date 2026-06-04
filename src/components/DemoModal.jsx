import { createPortal } from 'react-dom'
import { SCENARIOS } from '../data/scenarios.js'

export default function DemoModal({ onSelect, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--ink)' }}>
              AllergenIQ — Demo Scenarios
            </div>
            <div className="small muted" style={{ marginTop: 4 }}>
              Choose a scenario to explore a specific workflow. Each demo takes 3–5 minutes.
            </div>
          </div>
          <button className="btn ghost" onClick={onClose} style={{ flexShrink: 0 }}>
            ✕ Close
          </button>
        </div>

        <div className="scenarios-grid">
          {SCENARIOS.map(s => (
            <ScenarioCard key={s.id} scenario={s} onSelect={onSelect} />
          ))}
        </div>

      </div>
    </div>,
    document.body
  )
}

function ScenarioCard({ scenario, onSelect }) {
  const { color, icon, title, subtitle, description, tags, roles, time, steps } = scenario
  return (
    <div className="scenario-card">
      <div className="scenario-head" style={{ background: color }}>
        <span style={{ fontSize: 24, lineHeight: 1 }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', marginTop: 2 }}>{subtitle}</div>
        </div>
      </div>
      <div className="scenario-body">
        <div className="small muted" style={{ marginBottom: 10, lineHeight: 1.5 }}>{description}</div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
          {tags.map(t => (
            <span key={t} className="pill soft" style={{ fontSize: 11 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
          <span>👤 {roles}</span>
          <span>⏱ {time}</span>
          <span>📋 {steps}</span>
        </div>
        <button
          className="btn primary"
          style={{ width: '100%', background: color, borderColor: color }}
          onClick={() => onSelect(scenario)}
        >
          ▶ Start
        </button>
      </div>
    </div>
  )
}
