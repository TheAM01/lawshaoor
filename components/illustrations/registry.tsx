import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  OrbitRings,
  GridDots,
  SquareCascade,
  VectorNode,
  WaveBars,
  PulseRings,
  BigCircles,
  SegmentedRing,
} from './index'

export type IllustrationComponent = React.ComponentType<{
  className?: string
  uid?: string
}>

export type IllustrationEntry = {
  key: string
  label: string
  Component: IllustrationComponent
}

/** Curated set of "atomic" primitives suitable for category icons. Order is
 *  intentional — most-frequently-useful first. Avoids the busier illustrations
 *  flagged in CLAUDE.md (GradientSphere, HoneycombCluster, etc.). */
export const ILLUSTRATIONS: IllustrationEntry[] = [
  { key: 'circles-in-circumference', label: 'Circles', Component: CirclesInCircumference },
  { key: 'hexagonal-cascade',         label: 'Hexagons', Component: HexagonalCascade },
  { key: 'tesseract-cube',            label: 'Tesseract', Component: TesseractCube },
  { key: 'stacked-cubes',             label: 'Stacked cubes', Component: StackedCubes },
  { key: 'orbit-rings',               label: 'Orbit rings', Component: OrbitRings },
  { key: 'grid-dots',                 label: 'Grid dots', Component: GridDots },
  { key: 'square-cascade',            label: 'Square cascade', Component: SquareCascade },
  { key: 'vector-node',               label: 'Vector node', Component: VectorNode },
  { key: 'wave-bars',                 label: 'Wave bars', Component: WaveBars },
  { key: 'pulse-rings',               label: 'Pulse rings', Component: PulseRings },
  { key: 'big-circles',               label: 'Big circles', Component: BigCircles },
  { key: 'segmented-ring',            label: 'Segmented ring', Component: SegmentedRing },
]

const BY_KEY = new Map<string, IllustrationComponent>(
  ILLUSTRATIONS.map((e) => [e.key, e.Component])
)

/** Fallback when a category has no illustration assigned or the key is unknown. */
export const DEFAULT_ILLUSTRATION: IllustrationComponent = CirclesInCircumference

export function getIllustration(key: string | null | undefined): IllustrationComponent {
  if (!key) return DEFAULT_ILLUSTRATION
  return BY_KEY.get(key) ?? DEFAULT_ILLUSTRATION
}

export function illustrationLabel(key: string | null | undefined): string {
  if (!key) return 'Default'
  return ILLUSTRATIONS.find((e) => e.key === key)?.label ?? 'Default'
}
