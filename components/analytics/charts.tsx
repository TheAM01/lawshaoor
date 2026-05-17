'use client'

/* Charts for the admin analytics dashboard.
 *
 * Wraps Recharts so the dashboard pages stay readable. All wrappers
 * accept JSON-serializable props so they're safe to render either from
 * a server component (parent passes already-fetched data) or from a
 * client component (parent polls and re-renders).
 *
 * Theme is wired via CSS custom properties (`var(--primary)` etc.) so
 * the same component renders correctly in light + dark mode without
 * any extra plumbing. */

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { compactNumber, shortDay } from './format'

/* ──────────────────────────────────────────────
   Shared tokens
   ────────────────────────────────────────────── */

const COLORS = [
  'var(--chart-1)',
  'var(--chart-3)',
  'var(--chart-2)',
  'var(--chart-5)',
  'var(--chart-4)',
]

const AXIS_STYLE = {
  fontSize: 10,
  fontFamily: 'var(--font-mono)',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  fill: 'var(--muted-foreground)',
}

const tooltipStyle = {
  backgroundColor: 'var(--background)',
  border: '1px solid var(--border-strong)',
  borderRadius: 0,
  padding: '8px 10px',
  fontSize: 12,
  fontFamily: 'var(--font-sans)',
  color: 'var(--foreground)',
}

const labelStyle = {
  fontSize: 10,
  fontFamily: 'var(--font-mono)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted-foreground)',
  marginBottom: 4,
}

/* ──────────────────────────────────────────────
   TrendChart — area chart for time series
   ────────────────────────────────────────────── */

export type TrendDatum = { day: string; views: number; uniques: number; reads: number }

export function TrendChart({
  data,
  height = 280,
}: {
  data: TrendDatum[]
  height?: number
}) {
  const formatted = data.map((d) => ({ ...d, label: shortDay(d.day) }))
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formatted} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.32} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="uGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="0"
            vertical={false}
            horizontal
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={AXIS_STYLE}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={AXIS_STYLE}
            width={40}
            tickFormatter={compactNumber}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            cursor={{ stroke: 'var(--border-strong)', strokeDasharray: '2 2' }}
          />
          <Area
            type="monotone"
            dataKey="views"
            name="Views"
            stroke="var(--primary)"
            strokeWidth={1.5}
            fill="url(#vGrad)"
          />
          <Area
            type="monotone"
            dataKey="uniques"
            name="Visitors"
            stroke="var(--chart-3)"
            strokeWidth={1.5}
            fill="url(#uGrad)"
          />
          <Area
            type="monotone"
            dataKey="reads"
            name="Reads"
            stroke="var(--chart-4)"
            strokeWidth={1.2}
            strokeDasharray="3 3"
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Sparkline — tiny trend
   ────────────────────────────────────────────── */

export function Sparkline({
  data,
  color = 'var(--primary)',
  height = 36,
}: {
  data: number[]
  color?: string
  height?: number
}) {
  const formatted = data.map((v, i) => ({ i, v }))
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ──────────────────────────────────────────────
   BarList — ranked rows with proportional bars
   ────────────────────────────────────────────── */

export function BarList({
  rows,
  total: providedTotal,
  formatValue = compactNumber,
  emptyLabel = 'No data',
  renderLabel,
}: {
  rows: Array<{ key: string; label: string; value: number }>
  total?: number
  formatValue?: (v: number) => string
  emptyLabel?: string
  renderLabel?: (row: { key: string; label: string; value: number }) => React.ReactNode
}) {
  if (rows.length === 0) {
    return (
      <p className="text-xs text-foreground/55 font-heading py-6 text-center">
        {emptyLabel}
      </p>
    )
  }
  const total = providedTotal ?? rows.reduce((acc, r) => acc + r.value, 0)
  const max = Math.max(1, ...rows.map((r) => r.value))
  return (
    <ul className="space-y-2">
      {rows.map((r) => {
        const pct = (r.value / max) * 100
        const share = total > 0 ? (r.value / total) * 100 : 0
        return (
          <li key={r.key} className="relative">
            <div className="relative h-7 bg-background-alt/70 border border-foreground/10 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-primary/15"
                style={{ width: `${pct}%` }}
                aria-hidden
              />
              <div className="relative h-full flex items-center justify-between px-2.5 text-xs font-heading">
                <span className="truncate text-foreground/90 mr-3">
                  {renderLabel ? renderLabel(r) : r.label}
                </span>
                <span className="flex items-center gap-2 shrink-0 tabular-fig">
                  <span className="text-foreground/95">{formatValue(r.value)}</span>
                  <span className="text-foreground/45 text-[10px] font-mono tracking-[0.18em]">
                    {share.toFixed(1)}%
                  </span>
                </span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/* ──────────────────────────────────────────────
   DonutBreakdown — proportion chart with legend
   ────────────────────────────────────────────── */

export function DonutBreakdown({
  rows,
  height = 240,
  emptyLabel = 'No data',
}: {
  rows: Array<{ key: string; label: string; value: number }>
  height?: number
  emptyLabel?: string
}) {
  if (rows.length === 0) {
    return (
      <p className="text-xs text-foreground/55 font-heading py-6 text-center">
        {emptyLabel}
      </p>
    )
  }
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={rows}
            dataKey="value"
            nameKey="label"
            innerRadius="55%"
            outerRadius="85%"
            paddingAngle={1}
            stroke="var(--background)"
            strokeWidth={2}
          >
            {rows.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            formatter={(value: number) => [compactNumber(value), '']}
          />
          <Legend
            verticalAlign="bottom"
            iconType="square"
            iconSize={8}
            wrapperStyle={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--foreground)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ScrollFunnel — depth funnel as a vertical stack
   ────────────────────────────────────────────── */

export function ScrollFunnel({
  views,
  reached25,
  reached50,
  reached75,
  reached100,
  reads,
}: {
  views: number
  reached25: number
  reached50: number
  reached75: number
  reached100: number
  reads: number
}) {
  const rows = [
    { key: 'view', label: 'Loaded the page', value: views },
    { key: 'd25', label: 'Reached 25%', value: reached25 },
    { key: 'd50', label: 'Reached 50%', value: reached50 },
    { key: 'd75', label: 'Reached 75%', value: reached75 },
    { key: 'd100', label: 'Reached the end', value: reached100 },
    { key: 'read', label: 'Read to completion', value: reads },
  ]
  const top = Math.max(1, ...rows.map((r) => r.value))
  return (
    <ul className="space-y-1.5">
      {rows.map((r, i) => {
        const pct = (r.value / top) * 100
        const dropOff = i > 0 ? (rows[i - 1].value > 0 ? (r.value / rows[i - 1].value) * 100 : 0) : 100
        return (
          <li key={r.key}>
            <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55 mb-1">
              <span>{r.label}</span>
              <span className="tabular-fig">
                {compactNumber(r.value)}
                {i > 0 && (
                  <span className="text-foreground/35 ml-2">{dropOff.toFixed(0)}%</span>
                )}
              </span>
            </div>
            <div className="h-3 bg-background-alt border border-foreground/10 overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${pct}%` }}
                aria-hidden
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/* ──────────────────────────────────────────────
   RetentionChart — new vs returning visitors, stacked bars
   ────────────────────────────────────────────── */

export type RetentionDatum = {
  day: string
  newVisitors: number
  returningVisitors: number
}

export function RetentionChart({
  data,
  height = 220,
}: {
  data: RetentionDatum[]
  height?: number
}) {
  const formatted = data.map((d) => ({
    label: shortDay(d.day),
    new: d.newVisitors,
    returning: d.returningVisitors,
  }))
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formatted} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="0"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={AXIS_STYLE}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={AXIS_STYLE}
            width={36}
            tickFormatter={compactNumber}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            cursor={{ fill: 'var(--muted)' }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={20}
            iconType="square"
            iconSize={8}
            wrapperStyle={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--foreground)',
            }}
          />
          <Bar dataKey="new" stackId="a" name="New" fill="var(--chart-3)" />
          <Bar dataKey="returning" stackId="a" name="Returning" fill="var(--primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ──────────────────────────────────────────────
   RealtimeBars — minute-by-minute bar chart
   ────────────────────────────────────────────── */

export function RealtimeBars({
  data,
  height = 100,
}: {
  data: Array<{ minute: number; views: number }>
  height?: number
}) {
  const formatted = data.map((d) => ({
    label: new Date(d.minute).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    views: d.views,
  }))
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formatted} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            cursor={{ fill: 'var(--muted)' }}
            formatter={(v: number) => [v, 'Views']}
          />
          <Bar dataKey="views" fill="var(--primary)" radius={[1, 1, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

