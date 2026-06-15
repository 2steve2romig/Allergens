import { useState } from 'react'

export default function PageInstructions({ title, steps }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div style={{
      background: '#edf4fc',
      border: '1px solid #c8daef',
      borderRadius: 14,
      padding: '14px 16px',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: '#5b97d0', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 16, flexShrink: 0, marginTop: 1,
      }}>i</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#23364d', marginBottom: 8 }}>{title}</div>
        <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {steps.map((s, i) => (
            <li key={i} style={{ fontSize: 13, color: '#3a5574', lineHeight: 1.5 }}>{s}</li>
          ))}
        </ol>
      </div>
      <button
        onClick={() => setDismissed(true)}
        style={{
          border: 'none', background: 'none', cursor: 'pointer',
          color: '#6f8094', fontSize: 18, lineHeight: 1, padding: '0 2px', flexShrink: 0,
        }}
        title="Dismiss"
      >×</button>
    </div>
  )
}
