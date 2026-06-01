export default function ChartSvg({ standards }) {
  const W = 520, H = 180, P = 30
  const ys  = standards.map(s => s.enteredOD)
  const maxY = Math.max(...ys, 2.1)
  const cx = i => P + (i / 4) * (W - P * 2)
  const cy = v => H - P - (v / maxY) * (H - P * 2)
  const pts = standards.map((s, i) => `${cx(i)},${cy(s.enteredOD)}`).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }} aria-label="standard curve chart">
      <g fill="none" stroke="#c8d4e3" strokeWidth="1">
        <line x1={P} y1={P}   x2={P}   y2={H - P} />
        <line x1={P} y1={H-P} x2={W-P} y2={H - P} />
      </g>
      <polyline fill="none" stroke="#5b97d0" strokeWidth="3" points={pts} />
      <g fill="#223345">
        {standards.map((s, i) => <circle key={i} cx={cx(i)} cy={cy(s.enteredOD)} r="4" />)}
      </g>
      <g fill="#5f7187" fontSize="10">
        {standards.map((s, i) => (
          <text key={i} x={cx(i)} y={H - 10} textAnchor="middle">Std {s.std}</text>
        ))}
      </g>
    </svg>
  )
}
