/* Pure formatting helpers for analytics numbers.
 *
 * Lives in its own non-'use client' file so server components can import
 * it without dragging in the React/Recharts bundle from charts.tsx.
 * Client components use the same exports. */

export function compactNumber(n: number): string {
  if (!Number.isFinite(n)) return '0'
  const abs = Math.abs(n)
  if (abs < 1000) return String(Math.round(n))
  if (abs < 10_000) return (n / 1000).toFixed(1) + 'k'
  if (abs < 1_000_000) return Math.round(n / 1000) + 'k'
  return (n / 1_000_000).toFixed(1) + 'm'
}

export function formatSeconds(s: number): string {
  if (!Number.isFinite(s) || s <= 0) return '0s'
  if (s < 60) return `${Math.round(s)}s`
  const m = Math.floor(s / 60)
  const r = Math.round(s % 60)
  if (m < 60) return `${m}m ${r}s`
  const h = Math.floor(m / 60)
  return `${h}h ${m % 60}m`
}

export function shortDay(d: string): string {
  // 'yyyy-mm-dd' → 'MMM d'
  const [, m, day] = d.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[Number(m) - 1]} ${Number(day)}`
}

export function statFormat(kind: 'number' | 'seconds' | 'percent', n: number): string {
  if (kind === 'seconds') return formatSeconds(n)
  if (kind === 'percent') return `${(n * 100).toFixed(1)}%`
  return compactNumber(n)
}
