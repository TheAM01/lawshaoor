'use client'

import type { CSSProperties, ReactNode } from 'react'
import { defs, type IProps } from './index'

/* ============================================================
   Abstract set — simple, symmetrical, quiet.
   Same contract as the core library: 200×200 viewBox, gradient
   strokes, no fills. Each piece is built from a handful of
   primitives and mirrors across at least one axis.
   ============================================================ */

function Frame({
  uid,
  className,
  style,
  children,
}: {
  uid: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} overflow="visible" aria-hidden>
      {defs(uid)}
      {children}
    </svg>
  )
}

/* ────────────────────────────────────────────
   Node lattice — diamond around a square, nodes at every vertex
   ──────────────────────────────────────────── */
export function NodeLattice({ className = '', style, uid = 'nlat', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  const diamond: [number, number][] = [[100, 22], [178, 100], [100, 178], [22, 100]]
  const square: [number, number][] = [[61, 61], [139, 61], [139, 139], [61, 139]]
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        <line x1="100" y1="22" x2="100" y2="178" opacity="0.3" />
        <line x1="22" y1="100" x2="178" y2="100" opacity="0.3" />
        <polygon points={diamond.map((p) => p.join(',')).join(' ')} opacity="0.55" />
        <rect x="61" y="61" width="78" height="78" opacity="0.8" />
        {diamond.map(([x, y]) => <circle key={`d${x}${y}`} cx={x} cy={y} r="5" />)}
        {square.map(([x, y]) => <circle key={`s${x}${y}`} cx={x} cy={y} r="3.5" />)}
        <circle cx="100" cy="100" r="10" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Vault arches — nested arches on a stepped plinth
   ──────────────────────────────────────────── */
export function VaultArches({ className = '', style, uid = 'vault', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  const base = 138
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        {[72, 54, 36].map((r, i) => (
          <path key={r} d={`M ${100 - r} ${base} A ${r} ${r} 0 0 1 ${100 + r} ${base}`} opacity={0.5 + i * 0.2} />
        ))}
        <line x1="22" y1={base} x2="178" y2={base} />
        <line x1="34" y1={base + 12} x2="166" y2={base + 12} opacity="0.6" />
        <line x1="46" y1={base + 24} x2="154" y2={base + 24} opacity="0.35" />
        <circle cx="100" cy={base - 14} r="5" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Octagram — two squares, one turned 45°, around a circle
   ──────────────────────────────────────────── */
export function Octagram({ className = '', style, uid = 'octa', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        <rect x="44" y="44" width="112" height="112" opacity="0.6" />
        <rect x="44" y="44" width="112" height="112" opacity="0.6" transform="rotate(45 100 100)" />
        <circle cx="100" cy="100" r="42" opacity="0.85" />
        <circle cx="100" cy="100" r="6" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Seal — double ring with a band of ticks
   ──────────────────────────────────────────── */
export function SealTicks({ className = '', style, uid = 'seal', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  const N = 36
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        <circle cx="100" cy="100" r="82" opacity="0.45" />
        <circle cx="100" cy="100" r="62" opacity="0.8" />
        {Array.from({ length: N }).map((_, i) => {
          const a = (i / N) * Math.PI * 2
          const r1 = 67
          const r2 = i % 3 === 0 ? 78 : 73
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
              opacity={i % 3 === 0 ? 0.9 : 0.5}
            />
          )
        })}
        <circle cx="100" cy="100" r="26" />
        <circle cx="100" cy="100" r="4" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Balance — an abstract pair of scales
   ──────────────────────────────────────────── */
export function Balance({ className = '', style, uid = 'bal', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  const pan = (x: number) => (
    <g key={x}>
      <line x1={x} y1="62" x2={x - 18} y2="112" opacity="0.5" />
      <line x1={x} y1="62" x2={x + 18} y2="112" opacity="0.5" />
      <path d={`M ${x - 22} 112 Q ${x} 136 ${x + 22} 112 Z`} />
    </g>
  )
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        <circle cx="100" cy="100" r="88" opacity="0.2" />
        <line x1="100" y1="44" x2="100" y2="160" />
        <line x1="40" y1="62" x2="160" y2="62" />
        <circle cx="100" cy="38" r="6" />
        {pan(40)}
        {pan(160)}
        <line x1="72" y1="160" x2="128" y2="160" />
        <line x1="84" y1="170" x2="116" y2="170" opacity="0.5" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Linked rings — three interlocking rings on a shared axis
   ──────────────────────────────────────────── */
export function LinkedRings({ className = '', style, uid = 'link', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        <line x1="14" y1="100" x2="186" y2="100" opacity="0.3" />
        {[56, 100, 144].map((x, i) => (
          <circle key={x} cx={x} cy="100" r="34" opacity={i === 1 ? 1 : 0.65} />
        ))}
        {[56, 100, 144].map((x) => <circle key={`c${x}`} cx={x} cy="100" r="3.5" />)}
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Colonnade — pediment, four columns, stepped base
   ──────────────────────────────────────────── */
export function Colonnade({ className = '', style, uid = 'colon', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        <polygon points="28,74 100,34 172,74" />
        <circle cx="100" cy="60" r="5" />
        <line x1="28" y1="84" x2="172" y2="84" opacity="0.7" />
        {[48, 79, 121, 152].map((x) => (
          <g key={x} opacity="0.8">
            <line x1={x - 5} y1="92" x2={x - 5} y2="146" />
            <line x1={x + 5} y1="92" x2={x + 5} y2="146" />
          </g>
        ))}
        <line x1="24" y1="154" x2="176" y2="154" />
        <line x1="16" y1="166" x2="184" y2="166" opacity="0.5" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Corridor — two nodes joined by mirrored arcs
   ──────────────────────────────────────────── */
export function Corridor({ className = '', style, uid = 'corr', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  const arc = (h: number) => `M 52 100 Q 100 ${100 + h} 148 100`
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        {[-76, -40, 40, 76].map((h) => (
          <path key={h} d={arc(h)} opacity={Math.abs(h) > 50 ? 0.4 : 0.7} />
        ))}
        <line x1="52" y1="100" x2="148" y2="100" />
        <circle cx="38" cy="100" r="14" />
        <circle cx="162" cy="100" r="14" />
        <circle cx="38" cy="100" r="4" />
        <circle cx="162" cy="100" r="4" />
        <circle cx="100" cy="100" r="5" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Plus modules — five squares in a cross, inside a ring
   ──────────────────────────────────────────── */
export function PlusModules({ className = '', style, uid = 'plus', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  const S = 34
  const cells: [number, number, number][] = [
    [100, 100, 1],
    [100, 100 - S, 0.65],
    [100 + S, 100, 0.65],
    [100, 100 + S, 0.65],
    [100 - S, 100, 0.65],
  ]
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        <circle cx="100" cy="100" r="86" opacity="0.3" />
        {cells.map(([x, y, o]) => (
          <rect key={`${x}-${y}`} x={x - S / 2} y={y - S / 2} width={S} height={S} opacity={o} />
        ))}
        <circle cx="100" cy="100" r="4" />
      </g>
    </Frame>
  )
}

/* ────────────────────────────────────────────
   Ascent — nested triangles rising from one base
   ──────────────────────────────────────────── */
export function Ascent({ className = '', style, uid = 'asc', strokeWidth = 1.25 }: IProps) {
  const s = `url(#grad-${uid})`
  const base = 160
  return (
    <Frame uid={uid} className={className} style={style}>
      <g fill="none" stroke={s} strokeWidth={strokeWidth}>
        {[[80, 120, 0.45], [58, 88, 0.7], [36, 56, 1]].map(([hw, h, o]) => (
          <polygon key={hw} points={`${100 - hw},${base} 100,${base - h} ${100 + hw},${base}`} opacity={o} />
        ))}
        <line x1="12" y1={base} x2="188" y2={base} opacity="0.5" />
        <circle cx="100" cy={base - 120 - 10} r="5" />
      </g>
    </Frame>
  )
}
