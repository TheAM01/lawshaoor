'use client'

import type { CSSProperties } from 'react'

/* ============================================================
   LawShaoor Illustration Library
   Pure SVG, gradient strokes (pink → light purple), no fills.
   Each illustration is square and scales via the className prop.
   ============================================================ */

type IProps = {
  className?: string
  style?: CSSProperties
  /** Unique id suffix to avoid clashing gradients on a single page */
  uid?: string
  strokeWidth?: number
  rotate?: boolean
}

const FROM = 'var(--grad-from)'
const TO = 'var(--grad-to)'

function defs(uid: string) {
  return (
    <defs>
      <linearGradient id={`grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={FROM} />
        <stop offset="100%" stopColor={TO} />
      </linearGradient>
      <linearGradient id={`grad-${uid}-h`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor={FROM} />
        <stop offset="100%" stopColor={TO} />
      </linearGradient>
      <linearGradient id={`grad-${uid}-v`} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={FROM} />
        <stop offset="100%" stopColor={TO} />
      </linearGradient>
      <radialGradient id={`grad-${uid}-r`} cx="50%" cy="50%" r="60%">
        <stop offset="0%"  stopColor={FROM} stopOpacity="0.45" />
        <stop offset="60%" stopColor={TO}   stopOpacity="0.18" />
        <stop offset="100%" stopColor={TO}  stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`grad-${uid}-soft`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor={FROM} stopOpacity="0.28" />
        <stop offset="100%" stopColor={TO}   stopOpacity="0.08" />
      </linearGradient>
    </defs>
  )
}

/* ────────────────────────────────────────────
   Circles arranged on a circumference
   ──────────────────────────────────────────── */
export function CirclesInCircumference({
  className = '',
  style,
  uid = 'cic',
  strokeWidth = 1.25,
  rotate = true,
}: IProps) {
  const N = 14
  const R_OUTER = 80
  const R_DOT = 5
  const cx = 100
  const cy = 100
  const id = `grad-${uid}`

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={cx} cy={cy} r={R_OUTER} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} opacity="0.55" />
      <g className={rotate ? 'spin-slower' : ''} style={{ transformOrigin: 'center' }}>
        {Array.from({ length: N }).map((_, i) => {
          const angle = (i / N) * Math.PI * 2
          const x = cx + Math.cos(angle) * R_OUTER
          const y = cy + Math.sin(angle) * R_OUTER
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={R_DOT}
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
          )
        })}
      </g>
      <circle cx={cx} cy={cy} r={R_DOT * 1.4} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Hexagonal cascade — concentric hexagons
   ──────────────────────────────────────────── */
export function HexagonalCascade({
  className = '',
  style,
  uid = 'hex',
  strokeWidth = 1.25,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100

  function hex(r: number) {
    const pts: string[] = []
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2
      pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`)
    }
    return pts.join(' ')
  }

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {[88, 70, 52, 34, 16].map((r, i) => (
        <polygon
          key={r}
          points={hex(r)}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={strokeWidth}
          opacity={0.4 + i * 0.12}
        />
      ))}
    </svg>
  )
}

/* ────────────────────────────────────────────
   4D / Tesseract cube — cube within a cube
   ──────────────────────────────────────────── */
export function TesseractCube({
  className = '',
  style,
  uid = 'tess',
  strokeWidth = 1.25,
}: IProps) {
  const id = `grad-${uid}`

  // Outer cube (200x200 box) corners
  const outer = [
    [40, 40], [160, 40], [160, 160], [40, 160],
  ]
  // Inner cube (smaller, offset)
  const inner = [
    [78, 78], [142, 78], [142, 142], [78, 142],
  ]

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {/* outer */}
      <polygon points={outer.map((p) => p.join(',')).join(' ')} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
      {/* inner */}
      <polygon points={inner.map((p) => p.join(',')).join(' ')} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} opacity="0.85" />
      {/* connectors */}
      {outer.map((o, i) => {
        const ix = inner[i]
        return (
          <line
            key={i}
            x1={o[0]}
            y1={o[1]}
            x2={ix[0]}
            y2={ix[1]}
            stroke={`url(#${id})`}
            strokeWidth={strokeWidth}
            opacity="0.7"
          />
        )
      })}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Stacked cubes — isometric stack of 3 cubes
   ──────────────────────────────────────────── */
export function StackedCubes({
  className = '',
  style,
  uid = 'stk',
  strokeWidth = 1.25,
}: IProps) {
  const id = `grad-${uid}`

  // Isometric cube — given an origin (top corner) and size
  function cube(ox: number, oy: number, size: number) {
    const w = size
    const h = size * 0.55
    // top diamond
    const top = [
      [ox, oy],
      [ox + w, oy + h * 0.5],
      [ox, oy + h],
      [ox - w, oy + h * 0.5],
    ]
    // bottom-left
    const bl = [
      [ox - w, oy + h * 0.5],
      [ox - w, oy + h * 0.5 + h * 0.9],
      [ox, oy + h + h * 0.9],
      [ox, oy + h],
    ]
    // bottom-right
    const br = [
      [ox + w, oy + h * 0.5],
      [ox + w, oy + h * 0.5 + h * 0.9],
      [ox, oy + h + h * 0.9],
      [ox, oy + h],
    ]
    return { top, bl, br }
  }

  function poly(pts: number[][]) {
    return pts.map((p) => p.join(',')).join(' ')
  }

  const cubes = [
    cube(100, 50, 38),
    cube(100, 95, 38),
    cube(100, 140, 38),
  ]

  return (
    <svg viewBox="0 0 200 240" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {cubes.map((c, i) => (
        <g key={i} opacity={1 - i * 0.18}>
          <polygon points={poly(c.top)} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
          <polygon points={poly(c.bl)} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
          <polygon points={poly(c.br)} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
        </g>
      ))}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Orbits — concentric circles + dots
   ──────────────────────────────────────────── */
export function OrbitRings({
  className = '',
  style,
  uid = 'orb',
  strokeWidth = 1.25,
  rotate = true,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {[90, 70, 50, 30].map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={strokeWidth}
          opacity={0.35 + i * 0.12}
        />
      ))}
      <g className={rotate ? 'spin-slow' : ''} style={{ transformOrigin: 'center' }}>
        <circle cx={cx + 90} cy={cy} r={4.5} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
      </g>
      <g
        className={rotate ? 'spin-slower' : ''}
        style={{ transformOrigin: 'center', animationDirection: 'reverse' }}
      >
        <circle cx={cx} cy={cy + 70} r={3.5} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
      </g>
      <circle cx={cx} cy={cy} r={6} fill={`url(#${id})`} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Grid of dots — 8x8 grid, fading
   ──────────────────────────────────────────── */
export function GridDots({
  className = '',
  style,
  uid = 'gd',
  strokeWidth = 1,
}: IProps) {
  const id = `grad-${uid}`
  const N = 9
  const step = 200 / (N - 1)

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {Array.from({ length: N }).map((_, r) =>
        Array.from({ length: N }).map((_, c) => {
          const dx = c - (N - 1) / 2
          const dy = r - (N - 1) / 2
          const dist = Math.sqrt(dx * dx + dy * dy)
          const opacity = Math.max(0.08, 1 - dist / ((N - 1) / 2 + 0.5))
          return (
            <circle
              key={`${r}-${c}`}
              cx={c * step}
              cy={r * step}
              r={1.5}
              fill={`url(#${id})`}
              opacity={opacity}
            />
          )
        })
      )}
      <circle cx={100} cy={100} r={42} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Square cascade — concentric squares (rotated 0°)
   ──────────────────────────────────────────── */
export function SquareCascade({
  className = '',
  style,
  uid = 'sq',
  strokeWidth = 1.25,
}: IProps) {
  const id = `grad-${uid}`

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {[180, 140, 100, 60, 24].map((s, i) => {
        const o = (200 - s) / 2
        return (
          <rect
            key={s}
            x={o}
            y={o}
            width={s}
            height={s}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={strokeWidth}
            opacity={0.35 + i * 0.13}
          />
        )
      })}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Vector node — circle + radial lines (network)
   ──────────────────────────────────────────── */
export function VectorNode({
  className = '',
  style,
  uid = 'vn',
  strokeWidth = 1.25,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100
  const N = 8
  const R = 88

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={cx} cy={cy} r={6} fill={`url(#${id})`} />
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={`url(#${id})`} strokeWidth={strokeWidth} opacity="0.55" />
            <circle cx={x} cy={y} r={4} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} opacity="0.3" />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Wave bars — equalizer
   ──────────────────────────────────────────── */
export function WaveBars({
  className = '',
  style,
  uid = 'wb',
}: IProps) {
  const id = `grad-${uid}`
  const heights = [40, 80, 60, 110, 140, 100, 60, 90, 50, 70]
  const step = (200 - 24) / (heights.length - 1) // fits inside viewBox

  return (
    <svg viewBox="0 0 200 160" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {heights.map((h, i) => (
        <line
          key={i}
          x1={12 + i * step}
          y1={150}
          x2={12 + i * step}
          y2={150 - h}
          stroke={`url(#${id})`}
          strokeWidth={3}
        />
      ))}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Cylinder stack — wide cylinders stacked
   ──────────────────────────────────────────── */
export function CylinderStack({
  className = '',
  style,
  uid = 'cyl',
  strokeWidth = 1.5,
}: IProps) {
  const id = `grad-${uid}`
  const W = 200
  const H = 240
  // Three cylinders stacked
  const cylW = 150        // ellipse width
  const cylH = 38         // cylinder body height
  const ellipseH = 14     // ellipse y-radius (half height of cap)
  const cx = W / 2
  const startY = 40

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {[0, 1, 2].map((i) => {
        const top = startY + i * (cylH + ellipseH * 0.6)
        const bot = top + cylH
        const alpha = 0.95 - i * 0.18
        return (
          <g key={i} opacity={alpha}>
            {/* body fill */}
            <rect
              x={cx - cylW / 2}
              y={top}
              width={cylW}
              height={cylH}
              fill={`url(#${id}-soft)`}
            />
            {/* left edge */}
            <line x1={cx - cylW / 2} y1={top} x2={cx - cylW / 2} y2={bot} stroke={`url(#${id})`} strokeWidth={strokeWidth} />
            {/* right edge */}
            <line x1={cx + cylW / 2} y1={top} x2={cx + cylW / 2} y2={bot} stroke={`url(#${id})`} strokeWidth={strokeWidth} />
            {/* top ellipse */}
            <ellipse
              cx={cx}
              cy={top}
              rx={cylW / 2}
              ry={ellipseH}
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
            {/* bottom front arc */}
            <path
              d={`M ${cx - cylW / 2} ${bot} A ${cylW / 2} ${ellipseH} 0 0 0 ${cx + cylW / 2} ${bot}`}
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
            {/* bottom back arc (dashed) */}
            <path
              d={`M ${cx - cylW / 2} ${bot} A ${cylW / 2} ${ellipseH} 0 0 1 ${cx + cylW / 2} ${bot}`}
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeDasharray="3 3"
              opacity="0.55"
            />
          </g>
        )
      })}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Concentric arcs — large sweeping arcs
   ──────────────────────────────────────────── */
export function ConcentricArcs({
  className = '',
  style,
  uid = 'arc',
  strokeWidth = 1.5,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 178
  const arcs = [30, 54, 78, 96, 100] // largest ≤ cx so semi-arc fits inside x range

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={cx} cy={cy} r={26} fill={`url(#${id}-r)`} />
      {arcs.map((r, i) => (
        <path
          key={r}
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={`url(#${id}-h)`}
          strokeWidth={strokeWidth}
          opacity={0.32 + i * 0.14}
        />
      ))}
      <circle cx={cx} cy={cy} r={8} fill={`url(#${id})`} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Gradient globe — sphere with meridian + parallels
   ──────────────────────────────────────────── */
export function GradientGlobe({
  className = '',
  style,
  uid = 'glb',
  strokeWidth = 1.4,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100
  const R = 88

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {/* filled sphere */}
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-soft)`} stroke={`url(#${id})`} strokeWidth={strokeWidth} />
      {/* parallels */}
      {[-60, -30, 0, 30, 60].map((deg) => {
        const ry = R * Math.sin((90 - Math.abs(deg)) * Math.PI / 180)
        const yc = cy + (R * deg) / 90
        return (
          <ellipse
            key={deg}
            cx={cx}
            cy={yc}
            rx={R}
            ry={Math.max(1, ry)}
            fill="none"
            stroke={`url(#${id}-h)`}
            strokeWidth={strokeWidth}
            opacity={0.55}
          />
        )
      })}
      {/* meridians */}
      {[20, 50, 80].map((rx, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={rx}
          ry={R}
          fill="none"
          stroke={`url(#${id}-v)`}
          strokeWidth={strokeWidth}
          opacity={0.55}
        />
      ))}
      {/* equator highlight */}
      <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke={`url(#${id}-h)`} strokeWidth={strokeWidth * 1.3} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Block tower — vertical stacked squares, gradient bg
   ──────────────────────────────────────────── */
export function BlockTower({
  className = '',
  style,
  uid = 'btw',
  strokeWidth = 1.5,
}: IProps) {
  const id = `grad-${uid}`
  const blocks = 6
  const blockH = 28
  const blockW = 94
  const startY = 22
  const cx = 100

  return (
    <svg viewBox="0 0 200 240" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {/* glow halo */}
      <circle cx={cx} cy={120} r={94} fill={`url(#${id}-r)`} />
      {Array.from({ length: blocks }).map((_, i) => {
        const y = startY + i * (blockH + 4)
        const w = blockW - i * 6
        return (
          <g key={i}>
            <rect
              x={cx - w / 2}
              y={y}
              width={w}
              height={blockH}
              fill={`url(#${id}-soft)`}
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
            <line x1={cx - w / 2 + 6} y1={y + blockH / 2} x2={cx + w / 2 - 6} y2={y + blockH / 2} stroke={`url(#${id})`} strokeWidth={1} opacity="0.45" strokeDasharray="2 4" />
          </g>
        )
      })}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Segmented ring — large ring divided into segments
   ──────────────────────────────────────────── */
export function SegmentedRing({
  className = '',
  style,
  uid = 'seg',
  strokeWidth = 2,
  rotate = true,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100
  const R = 86
  const segments = 12

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={cx} cy={cy} r={R - 24} fill={`url(#${id}-r)`} />
      <g className={rotate ? 'spin-slower' : ''} style={{ transformOrigin: 'center' }}>
        {Array.from({ length: segments }).map((_, i) => {
          const a1 = (i / segments) * Math.PI * 2 - Math.PI / 2
          const a2 = ((i + 0.78) / segments) * Math.PI * 2 - Math.PI / 2
          const x1 = cx + Math.cos(a1) * R
          const y1 = cy + Math.sin(a1) * R
          const x2 = cx + Math.cos(a2) * R
          const y2 = cy + Math.sin(a2) * R
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="square"
            />
          )
        })}
      </g>
      <circle cx={cx} cy={cy} r={R - 36} fill="none" stroke={`url(#${id})`} strokeWidth={1} opacity="0.4" />
      <circle cx={cx} cy={cy} r={8} fill={`url(#${id})`} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Dot matrix orb — massive dot grid forming a disc
   ──────────────────────────────────────────── */
export function DotMatrixOrb({
  className = '',
  style,
  uid = 'dmo',
}: IProps) {
  const id = `grad-${uid}`
  const N = 15
  const step = 200 / (N - 1)
  const cx = 100
  const cy = 100
  const R = 92

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-r)`} />
      {Array.from({ length: N }).map((_, r) =>
        Array.from({ length: N }).map((_, c) => {
          const x = c * step
          const y = r * step
          const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
          if (d > R) return null
          const intensity = 1 - d / R
          const rad = 1 + intensity * 2.6
          return (
            <circle
              key={`${r}-${c}`}
              cx={x}
              cy={y}
              r={rad}
              fill={`url(#${id})`}
              opacity={0.25 + intensity * 0.7}
            />
          )
        })
      )}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={`url(#${id})`} strokeWidth={1.4} opacity="0.55" />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Prism fan — triangular fan
   ──────────────────────────────────────────── */
export function PrismFan({
  className = '',
  style,
  uid = 'pfan',
  strokeWidth = 1.4,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 174
  const R = 96
  const blades = 9
  const spread = Math.PI * 0.95 // ~170deg

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {/* background sweep */}
      <path
        d={`M ${cx} ${cy} L ${cx - Math.cos((Math.PI - spread) / 2) * R} ${cy - Math.sin((Math.PI - spread) / 2) * R}
            A ${R} ${R} 0 0 1 ${cx + Math.cos((Math.PI - spread) / 2) * R} ${cy - Math.sin((Math.PI - spread) / 2) * R} Z`}
        fill={`url(#${id}-soft)`}
      />
      {Array.from({ length: blades }).map((_, i) => {
        const t = i / (blades - 1)
        const a = Math.PI + (Math.PI - spread) / 2 + t * spread
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke={`url(#${id})`}
            strokeWidth={strokeWidth}
            opacity={0.4 + t * 0.55}
          />
        )
      })}
      {/* arc top */}
      <path
        d={`M ${cx - Math.cos((Math.PI - spread) / 2) * R} ${cy - Math.sin((Math.PI - spread) / 2) * R}
            A ${R} ${R} 0 0 1 ${cx + Math.cos((Math.PI - spread) / 2) * R} ${cy - Math.sin((Math.PI - spread) / 2) * R}`}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={strokeWidth}
      />
      <circle cx={cx} cy={cy} r={6} fill={`url(#${id})`} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Parallel fan — fanned parallel lines, gradient
   ──────────────────────────────────────────── */
export function ParallelFan({
  className = '',
  style,
  uid = 'pf',
  strokeWidth = 2,
}: IProps) {
  const id = `grad-${uid}`
  const N = 24
  const W = 200
  const H = 200

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {Array.from({ length: N }).map((_, i) => {
        const t = i / (N - 1)
        const y = 14 + t * (H - 28)
        const offset = Math.sin(t * Math.PI) * 28
        return (
          <line
            key={i}
            x1={10 + offset}
            y1={y}
            x2={W - 10 - offset}
            y2={y}
            stroke={`url(#${id}-h)`}
            strokeWidth={strokeWidth}
            opacity={0.35 + Math.sin(t * Math.PI) * 0.55}
          />
        )
      })}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Honeycomb cluster — tessellated hex pattern
   ──────────────────────────────────────────── */
export function HoneycombCluster({
  className = '',
  style,
  uid = 'hc',
  strokeWidth = 1.4,
}: IProps) {
  const id = `grad-${uid}`
  const R = 15            // hex radius
  const W = R * Math.sqrt(3)
  const H = R * 2
  const CLIP = 78         // keep cell centers within this radius

  function hex(cx: number, cy: number, r: number) {
    const pts: string[] = []
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2
      pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`)
    }
    return pts.join(' ')
  }

  const positions: Array<[number, number]> = []
  for (let row = -5; row <= 5; row++) {
    for (let col = -5; col <= 5; col++) {
      const cx = 100 + col * W + (row & 1 ? W / 2 : 0)
      const cy = 100 + row * H * 0.75
      positions.push([cx, cy])
    }
  }

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={100} cy={100} r={92} fill={`url(#${id}-r)`} />
      {positions.map(([cx, cy], i) => {
        const dist = Math.sqrt((cx - 100) ** 2 + (cy - 100) ** 2)
        if (dist > CLIP) return null
        const alpha = 1 - dist / CLIP
        return (
          <polygon
            key={i}
            points={hex(cx, cy, R - 2)}
            fill={i % 5 === 0 ? `url(#${id}-soft)` : 'none'}
            stroke={`url(#${id})`}
            strokeWidth={strokeWidth}
            opacity={0.35 + alpha * 0.55}
          />
        )
      })}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Big pulse — concentric pulse rings, prominent
   ──────────────────────────────────────────── */
export function PulseRings({
  className = '',
  style,
  uid = 'pr',
  strokeWidth = 1.5,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={cx} cy={cy} r={95} fill={`url(#${id}-r)`} />
      {[95, 78, 60, 44, 28, 14].map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={strokeWidth + (i === 5 ? 2 : 0)}
          opacity={0.3 + i * 0.13}
        />
      ))}
      <circle cx={cx} cy={cy} r={6} fill={`url(#${id})`} />
      {/* cross-hair */}
      <line x1={cx} y1={0} x2={cx} y2={200} stroke={`url(#${id})`} strokeWidth="0.5" opacity="0.25" strokeDasharray="2 4" />
      <line x1={0} y1={cy} x2={200} y2={cy} stroke={`url(#${id})`} strokeWidth="0.5" opacity="0.25" strokeDasharray="2 4" />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Isometric Stack Wall — wider grid of cubes
   ──────────────────────────────────────────── */
export function IsoBlockWall({
  className = '',
  style,
  uid = 'ibw',
  strokeWidth = 1.4,
}: IProps) {
  const id = `grad-${uid}`
  const size = 22
  const cols = 4
  const rows = 4

  function isoCube(cx: number, cy: number, s: number) {
    const w = s
    const h = s * 0.55
    return {
      top: [[cx, cy], [cx + w, cy + h * 0.5], [cx, cy + h], [cx - w, cy + h * 0.5]],
      l:   [[cx - w, cy + h * 0.5], [cx - w, cy + h * 0.5 + h * 0.9], [cx, cy + h + h * 0.9], [cx, cy + h]],
      r:   [[cx + w, cy + h * 0.5], [cx + w, cy + h * 0.5 + h * 0.9], [cx, cy + h + h * 0.9], [cx, cy + h]],
    }
  }

  const cubes: Array<ReturnType<typeof isoCube>> = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = 100 + (c - r) * size
      const cy = 50 + (c + r) * size * 0.55
      cubes.push(isoCube(cx, cy, size))
    }
  }

  return (
    <svg viewBox="0 0 240 240" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <rect x="0" y="0" width="240" height="240" fill={`url(#${id}-r)`} />
      {cubes.map((cube, i) => (
        <g key={i} opacity={0.55 + (i % 4) * 0.1}>
          <polygon points={cube.top.map((p) => p.join(',')).join(' ')} fill={`url(#${id}-soft)`} stroke={`url(#${id})`} strokeWidth={strokeWidth} />
          <polygon points={cube.l.map((p) => p.join(',')).join(' ')}   fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
          <polygon points={cube.r.map((p) => p.join(',')).join(' ')}   fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
        </g>
      ))}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Layer cake — wide gradient panels stacked at perspective
   ──────────────────────────────────────────── */
export function LayerCake({
  className = '',
  style,
  uid = 'lc',
  strokeWidth = 1.4,
}: IProps) {
  const id = `grad-${uid}`
  const W = 200
  const H = 240
  const cx = W / 2
  const layers = 5
  const layerH = 28
  const startY = 40

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {Array.from({ length: layers }).map((_, i) => {
        const widthScale = 1 - i * 0.06
        const w = 170 * widthScale
        const y = startY + i * (layerH + 6)
        const skew = 14 * widthScale
        const pts = [
          [cx - w / 2 + skew, y],
          [cx + w / 2 - skew, y],
          [cx + w / 2, y + layerH],
          [cx - w / 2, y + layerH],
        ]
        return (
          <g key={i}>
            <polygon
              points={pts.map((p) => p.join(',')).join(' ')}
              fill={`url(#${id}-soft)`}
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
            {/* top accent line */}
            <line
              x1={cx - w / 2 + skew}
              y1={y}
              x2={cx + w / 2 - skew}
              y2={y}
              stroke={`url(#${id}-h)`}
              strokeWidth={strokeWidth + 0.6}
            />
          </g>
        )
      })}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Gradient sphere — large filled sphere with arc highlight
   ──────────────────────────────────────────── */
export function GradientSphere({
  className = '',
  style,
  uid = 'sph',
  strokeWidth = 1.4,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100
  const R = 92

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      <defs>
        <radialGradient id={`${id}-fill`} cx="35%" cy="32%" r="80%">
          <stop offset="0%"   stopColor={TO}   stopOpacity="0.85" />
          <stop offset="55%"  stopColor={FROM} stopOpacity="0.55" />
          <stop offset="100%" stopColor={FROM} stopOpacity="0.05" />
        </radialGradient>
        <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={FROM} />
          <stop offset="100%" stopColor={TO} />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-fill)`} stroke={`url(#${id}-stroke)`} strokeWidth={strokeWidth} />
      {/* arc highlight */}
      <path
        d={`M ${cx - R * 0.85} ${cy - R * 0.2} A ${R} ${R} 0 0 1 ${cx + R * 0.7} ${cy - R * 0.55}`}
        fill="none"
        stroke={`url(#${id}-stroke)`}
        strokeWidth={1}
        opacity="0.7"
      />
      <path
        d={`M ${cx - R * 0.4} ${cy + R * 0.65} A ${R} ${R} 0 0 0 ${cx + R * 0.85} ${cy + R * 0.18}`}
        fill="none"
        stroke={`url(#${id}-stroke)`}
        strokeWidth={1}
        opacity="0.5"
      />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Big concentric circles — bold, prominent, gradient sweep
   ──────────────────────────────────────────── */
export function BigCircles({
  className = '',
  style,
  uid = 'bc',
  strokeWidth = 2.5,
}: IProps) {
  const id = `grad-${uid}`
  const cx = 100
  const cy = 100
  const R = 88

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-r)`} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} />
      <circle cx={cx} cy={cy} r={66} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} opacity="0.8" />
      <circle cx={cx} cy={cy} r={44} fill={`url(#${id}-soft)`} stroke={`url(#${id})`} strokeWidth={strokeWidth} />
      <circle cx={cx} cy={cy} r={22} fill={`url(#${id})`} />
      <circle cx={cx + R} cy={cy} r={5} fill={`url(#${id})`} />
      <circle cx={cx - R} cy={cy} r={5} fill={`url(#${id})`} />
      <circle cx={cx} cy={cy + R} r={5} fill={`url(#${id})`} />
      <circle cx={cx} cy={cy - R} r={5} fill={`url(#${id})`} />
    </svg>
  )
}

/* ────────────────────────────────────────────
   Diagonal lines — crosshatch background pattern
   ──────────────────────────────────────────── */
export function CrosshatchPanel({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        ...style,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><line x1='0' y1='12' x2='12' y2='0' stroke='%23903B7B' stroke-opacity='0.18' stroke-width='1'/></svg>\")",
        backgroundSize: '12px 12px',
      }}
    />
  )
}
