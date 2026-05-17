'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Radio } from 'lucide-react'
import { RealtimeBars } from './charts'

/* Polls /api/admin/analytics/realtime every 15 s, renders:
 *  – an active-visitor counter with a "live" pulse
 *  – a 30-minute view histogram
 *  – the top currently-viewed paths
 *
 * Mounted from the admin dashboard. Pause polling when the tab is
 * hidden — Mongo doesn't need the load and the dashboard isn't visible. */

type RealtimeData = {
  activeVisitors: number
  activeSessions: number
  viewsLast30Min: number
  byMinute: Array<{ minute: number; views: number }>
  topPaths: Array<{ path: string; views: number; title?: string }>
}

export function RealtimeWidget() {
  const [data, setData] = useState<RealtimeData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [refreshedAt, setRefreshedAt] = useState<Date | null>(null)

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | null = null

    async function fetchOnce() {
      try {
        const res = await fetch('/api/admin/analytics/realtime', { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as RealtimeData
        if (cancelled) return
        setData(json)
        setRefreshedAt(new Date())
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load realtime')
      }
    }

    function scheduleNext() {
      if (cancelled) return
      // Only poll while the tab is foregrounded.
      const delay = document.visibilityState === 'visible' ? 15000 : 60000
      timer = setTimeout(async () => {
        await fetchOnce()
        scheduleNext()
      }, delay)
    }

    void fetchOnce().then(scheduleNext)

    const onVis = () => {
      if (document.visibilityState === 'visible') {
        // Refresh immediately when the user comes back.
        void fetchOnce()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const active = data?.activeVisitors ?? 0
  const isLive = active > 0

  return (
    <section className="bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`relative inline-flex w-2 h-2 rounded-full ${
              isLive ? 'bg-primary' : 'bg-foreground/30'
            }`}
            aria-hidden
          >
            {isLive && (
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            )}
          </span>
          <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
            Live · last 30 min
          </p>
        </div>
        <span className="text-[10px] font-mono text-foreground/45 tracking-[0.18em]">
          {refreshedAt
            ? `Updated ${refreshedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
            : 'Loading…'}
        </span>
      </header>

      {error && (
        <p className="text-xs text-destructive font-mono">{error}</p>
      )}

      <div className="grid grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
        <BigMetric label="Active visitors" value={active} accent />
        <BigMetric label="Sessions" value={data?.activeSessions ?? 0} />
        <BigMetric label="Views · 30m" value={data?.viewsLast30Min ?? 0} />
      </div>

      <div>
        <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-2">
          Views per minute
        </p>
        {data ? (
          <RealtimeBars data={data.byMinute} />
        ) : (
          <div className="h-[100px] bg-background-alt/40 animate-pulse border border-foreground/10" />
        )}
      </div>

      <div>
        <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-2">
          Top live pages
        </p>
        {data && data.topPaths.length > 0 ? (
          <ul className="space-y-1.5">
            {data.topPaths.map((p) => (
              <li
                key={p.path}
                className="flex items-center gap-3 text-sm font-heading py-1.5 border-b border-foreground/10 last:border-b-0"
              >
                <Radio className="w-3 h-3 text-primary shrink-0" />
                <Link
                  href={p.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 truncate hover:text-primary transition-colors"
                  title={p.path}
                >
                  {p.title ?? p.path}
                </Link>
                <span className="text-[10px] font-mono tracking-[0.18em] tabular-fig text-foreground/60 shrink-0">
                  {p.views}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-foreground/55 font-heading py-3">
            No one is reading right now.
          </p>
        )}
      </div>
    </section>
  )
}

function BigMetric({
  label,
  value,
  accent = false,
}: {
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div className="bg-background p-4 flex flex-col gap-1">
      <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
        {label}
      </p>
      <p
        className={`font-display text-3xl tracking-[-0.025em] tabular-fig ${
          accent ? 'text-primary' : 'text-foreground'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
