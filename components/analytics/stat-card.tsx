'use client'

import { Sparkline } from './charts'

/* ── StatCard ─────────────────────────────────
   The dashboard's primary numerical surface. A label, a number, and
   (optionally) a small sparkline so the eye can read the trend in
   <100ms. */

export function StatCard({
  label,
  value,
  hint,
  trend,
  tone = 'default',
}: {
  label: string
  value: string
  hint?: string
  /** Numeric series for an inline sparkline. */
  trend?: number[]
  tone?: 'default' | 'primary'
}) {
  const trendColor = tone === 'primary' ? 'var(--primary)' : 'var(--chart-3)'
  return (
    <div className="bg-background p-5 flex flex-col gap-2 h-full">
      <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
        {label}
      </p>
      <p className="font-display text-3xl md:text-4xl tracking-[-0.025em] tabular-fig">
        {value}
      </p>
      {hint && (
        <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/50">
          {hint}
        </p>
      )}
      {trend && trend.length > 0 && (
        <div className="mt-auto -mx-2 opacity-80">
          <Sparkline data={trend} color={trendColor} height={32} />
        </div>
      )}
    </div>
  )
}
