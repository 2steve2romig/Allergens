import { createPortal } from 'react-dom'

export default function DemoGuide({ scenario, stepIndex, onNext, onPrev, onClose }) {
  const step     = scenario.steps[stepIndex]
  const total    = scenario.steps.length
  const progress = Math.round(((stepIndex + 1) / total) * 100)
  const isFirst  = stepIndex === 0
  const isLast   = stepIndex === total - 1

  return createPortal(
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      width: 340, zIndex: 300,
      borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
      border: '1px solid rgba(0,0,0,0.08)',
      fontFamily: 'inherit',
    }}>

      {/* Coloured header */}
      <div style={{
        background: scenario.color,
        padding: '11px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{scenario.icon}</span>
          <span style={{
            color: '#fff', fontWeight: 700, fontSize: 13,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{scenario.title}</span>
        </div>
        <button
          onClick={onClose}
          title="Exit demo"
          style={{
            background: 'rgba(255,255,255,0.15)', border: 'none',
            borderRadius: 6, color: '#fff', cursor: 'pointer',
            fontSize: 13, padding: '3px 8px', flexShrink: 0, lineHeight: 1.4,
          }}
        >✕</button>
      </div>

      {/* Step content */}
      <div style={{ background: '#fff', padding: '14px 16px 0' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '.07em', color: scenario.color, marginBottom: 5,
        }}>
          STEP {stepIndex + 1} OF {total}
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#1a2b3c' }}>
          {step.title}
        </div>
        <div style={{ fontSize: 13, color: '#4a6070', lineHeight: 1.55 }}>
          {step.description}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#fff', padding: '12px 16px 4px' }}>
        <div style={{
          height: 5, background: '#e8eef4', borderRadius: 3, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: scenario.color,
            transition: 'width .35s ease',
          }} />
        </div>
        <div style={{ fontSize: 11, color: '#8aa0b0', marginTop: 4 }}>
          {progress}% complete
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: '#fff', padding: '8px 16px 14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button
          className="btn"
          disabled={isFirst}
          onClick={onPrev}
          style={{ minWidth: 70 }}
        >
          ‹ Prev
        </button>

        {isLast ? (
          <button
            className="btn primary"
            onClick={onClose}
            style={{ background: scenario.color, borderColor: scenario.color, minWidth: 90 }}
          >
            Finish ✓
          </button>
        ) : (
          <button
            className="btn primary"
            onClick={onNext}
            style={{ background: scenario.color, borderColor: scenario.color, minWidth: 90 }}
          >
            Next ›
          </button>
        )}
      </div>

    </div>,
    document.body
  )
}
