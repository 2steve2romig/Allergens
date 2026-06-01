export default function ChartSvg({ stdRows, curve }) {
  const W=520, H=200, pL=50, pR=20, pT=15, pB=35
  const plotW = W - pL - pR
  const plotH = H - pT - pB

  const maxX   = 110
  const maxConc = Math.max(...stdRows.map(r => r.concentration), 1)
  const maxY   = maxConc * 1.12

  const sx = bb0 => pL + (bb0 / maxX) * plotW
  const sy = c   => pT + plotH - (c / maxY) * plotH

  const curvePts = curve
    ? Array.from({ length: 60 }, (_, i) => {
        const bb0  = (i / 59) * maxX
        const conc = Math.max(0, curve.a * bb0 * bb0 + curve.b * bb0 + curve.c)
        return `${sx(bb0)},${sy(Math.min(conc, maxY))}`
      }).join(' ')
    : ''

  const xTicks = [0, 25, 50, 75, 100]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }} aria-label="standard curve">
      {/* Grid lines */}
      <g stroke="#e2eaf3" strokeWidth="1">
        {xTicks.map(v => (
          <line key={v} x1={sx(v)} y1={pT} x2={sx(v)} y2={pT + plotH} />
        ))}
      </g>

      {/* Axes */}
      <line x1={pL} y1={pT} x2={pL} y2={pT + plotH} stroke="#c8d4e3" strokeWidth="1.5" />
      <line x1={pL} y1={pT + plotH} x2={pL + plotW} y2={pT + plotH} stroke="#c8d4e3" strokeWidth="1.5" />

      {/* Fitted curve */}
      {curve && (
        <polyline fill="none" stroke="#5b97d0" strokeWidth="2.5" strokeLinecap="round" points={curvePts} />
      )}

      {/* Data points */}
      {stdRows.map((r, i) => (
        <g key={i}>
          <circle cx={sx(r.bb0)} cy={sy(r.concentration)} r="5.5" fill="#223345" />
          <circle cx={sx(r.bb0)} cy={sy(r.concentration)} r="3" fill="#fff" />
        </g>
      ))}

      {/* X axis labels */}
      {xTicks.map(v => (
        <text key={v} x={sx(v)} y={H - 8} textAnchor="middle" fontSize="10" fill="#6f8094">
          {v}%
        </text>
      ))}

      {/* Axis titles */}
      <text x={pL + plotW / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#9aa9bb">
        B/Bmax (%)
      </text>
      <text
        x={11}
        y={pT + plotH / 2}
        textAnchor="middle"
        fontSize="10"
        fill="#9aa9bb"
        transform={`rotate(-90, 11, ${pT + plotH / 2})`}
      >
        Conc.
      </text>
    </svg>
  )
}
