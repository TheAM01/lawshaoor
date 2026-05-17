import Link from 'next/link'
import { ArrowRight, FileText, BarChart3 } from 'lucide-react'
import { getOverview, parseRange } from '@/lib/server/analytics-queries'
import {
  TrendChart,
  BarList,
  DonutBreakdown,
  RetentionChart,
} from '@/components/analytics/charts'
import { statFormat } from '@/components/analytics/format'
import { StatCard } from '@/components/analytics/stat-card'
import { RealtimeWidget } from '@/components/analytics/realtime-widget'
import { RangeSelector } from '@/components/analytics/range-selector'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Analytics · LawShaoor admin',
}

export default async function AnalyticsOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const sp = await searchParams
  const days = parseRange(sp.range)
  let overview: Awaited<ReturnType<typeof getOverview>> | null = null
  let error: string | null = null
  try {
    overview = await getOverview(days)
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load analytics'
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* ── Header ─────────────────────────── */}
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="index-chip">Analytics</span>
            <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
              Overview
            </h1>
            <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
              Cookieless, server-aggregated. Bots are filtered at ingest and you don&apos;t count yourself.
            </p>
          </div>
          <RangeSelector current={days} />
        </div>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10 space-y-10">
        {error && (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Failed to load analytics
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{error}</p>
          </div>
        )}

        {overview && (
          <>
            {/* ── Headline metrics ─────────────── */}
            <section>
              <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                Numbers
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/15 border border-foreground/15">
                <StatCard
                  label="Views"
                  value={statFormat('number', overview.totals.views)}
                  trend={overview.series.map((s) => s.views)}
                  tone="primary"
                />
                <StatCard
                  label="Visitors"
                  value={statFormat('number', overview.totals.uniques)}
                  trend={overview.series.map((s) => s.uniques)}
                />
                <StatCard
                  label="Sessions"
                  value={statFormat('number', overview.totals.sessions)}
                  hint={`${statFormat('number', overview.totals.pagesPerSession)} pages/session`}
                />
                <StatCard
                  label="Reads"
                  value={statFormat('number', overview.totals.reads)}
                  hint={
                    overview.totals.views > 0
                      ? `${((overview.totals.reads / overview.totals.views) * 100).toFixed(1)}% of views`
                      : ''
                  }
                  trend={overview.series.map((s) => s.reads)}
                />
                <StatCard
                  label="Engagement"
                  value={statFormat('seconds', overview.totals.avgEngagementSeconds)}
                  hint={`${statFormat('seconds', overview.totals.engagedSeconds)} total`}
                />
                <StatCard
                  label="Bounce rate"
                  value={statFormat('percent', overview.totals.bounceRate)}
                  hint={`${overview.totals.shares} shares · ${overview.totals.outbound} outbound`}
                />
              </div>
              {/* Sub-line: a second strip with site-wide retention + acquisition */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/15 border-x border-b border-foreground/15">
                <StatCard
                  label="Retention rate"
                  value={statFormat('percent', overview.retentionRate)}
                  hint={`Visitors returning across ≥ 2 days in window`}
                />
                <StatCard
                  label="Outbound clicks"
                  value={statFormat('number', overview.totals.outbound)}
                  hint={`${overview.totals.shares} shares total`}
                />
                <StatCard
                  label="Total engaged"
                  value={statFormat('seconds', overview.totals.engagedSeconds)}
                  hint={`${statFormat('seconds', overview.totals.avgEngagementSeconds)} per session`}
                />
                <StatCard
                  label="Pages / session"
                  value={statFormat('number', overview.totals.pagesPerSession)}
                  hint={`${overview.totals.sessions} sessions`}
                />
              </div>
            </section>

            {/* ── Trend + live ─────────────────── */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-background border border-foreground/15 p-5 md:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                    Traffic · last {days === 1 ? 'day' : `${days} days`}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55">
                    <Legend swatch="var(--primary)" label="Views" />
                    <Legend swatch="var(--chart-3)" label="Visitors" />
                    <Legend swatch="var(--chart-4)" label="Reads" dashed />
                  </div>
                </div>
                <TrendChart data={overview.series} />
              </div>
              <RealtimeWidget />
            </section>

            {/* ── Top pages — site-wide ────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Top pages · all routes
                </p>
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/45">
                  Home, marketing, academy — everything
                </span>
              </div>
              {overview.topPaths.length === 0 ? (
                <p className="text-sm text-foreground/55 font-heading">No page views yet in this range.</p>
              ) : (
                <div className="border border-foreground/15">
                  <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-foreground/15 bg-background-alt/40 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55">
                    <span className="col-span-6">Page</span>
                    <span className="col-span-3">Path</span>
                    <span className="col-span-2 text-right">Views</span>
                    <span className="col-span-1 text-right">Visitors</span>
                  </div>
                  {overview.topPaths.map((p) => (
                    <Link
                      key={p.path}
                      href={p.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-foreground/10 last:border-b-0 items-baseline hover:bg-background-alt/60 transition-colors"
                    >
                      <span className="col-span-12 md:col-span-6 font-heading text-foreground truncate">
                        {p.label}
                      </span>
                      <span className="col-span-12 md:col-span-3 font-mono text-[10px] tracking-[0.18em] text-foreground/55 truncate">
                        {p.path}
                      </span>
                      <span className="col-span-6 md:col-span-2 text-right tabular-fig font-mono text-xs">
                        {p.views}
                      </span>
                      <span className="col-span-6 md:col-span-1 text-right tabular-fig font-mono text-xs text-foreground/70">
                        {p.uniques}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* ── Retention — new vs returning ────── */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-background border border-foreground/15 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                    New vs returning visitors
                  </p>
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55 tabular-fig">
                    {statFormat('percent', overview.retentionRate)} retention
                  </span>
                </div>
                <RetentionChart data={overview.retentionSeries} />
              </div>
              <div className="bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  How to read this
                </p>
                <p className="font-heading text-sm text-foreground/80 leading-relaxed">
                  A visitor is <span className="text-primary">returning</span> when they show up on
                  more than one calendar day in the selected window. Identification is privacy-preserving
                  (UA + IP fingerprint, no cookies), so the retention rate is a coarse but consistent
                  signal — read trends, not absolute numbers.
                </p>
                <p className="font-heading text-xs text-foreground/60 leading-relaxed">
                  Bounce rate is the session-level mirror: of all sessions, how many ended after the
                  landing page. Lower is better.
                </p>
              </div>
            </section>

            {/* ── Top posts ────────────────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Top posts
                </p>
                <Link
                  href="/admin/analytics/posts"
                  className="link-line text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/70 hover:text-primary transition-colors"
                >
                  All posts →
                </Link>
              </div>
              {overview.topPosts.length === 0 ? (
                <p className="text-sm text-foreground/55 font-heading">
                  No post views yet in this range.
                </p>
              ) : (
                <div className="border border-foreground/15">
                  <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-foreground/15 bg-background-alt/40 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55">
                    <span className="col-span-7">Post</span>
                    <span className="col-span-2 text-right">Views</span>
                    <span className="col-span-1 text-right">Visitors</span>
                    <span className="col-span-1 text-right">Reads</span>
                    <span className="col-span-1 text-right">→</span>
                  </div>
                  {overview.topPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/admin/analytics/posts/${p.slug}`}
                      className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-foreground/10 last:border-b-0 items-baseline hover:bg-background-alt/60 transition-colors"
                    >
                      <span className="col-span-12 md:col-span-7 font-heading text-foreground truncate">
                        {p.title}
                      </span>
                      <span className="col-span-3 md:col-span-2 text-right tabular-fig font-mono text-xs">
                        {p.views}
                      </span>
                      <span className="col-span-3 md:col-span-1 text-right tabular-fig font-mono text-xs text-foreground/70">
                        {p.uniques}
                      </span>
                      <span className="col-span-3 md:col-span-1 text-right tabular-fig font-mono text-xs text-foreground/70">
                        {p.reads}
                      </span>
                      <span className="col-span-3 md:col-span-1 text-right">
                        <ArrowRight className="w-3 h-3 text-foreground/35 ml-auto" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* ── Acquisition + breakdowns ──── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Top referrers
                </p>
                <BarList rows={overview.topReferrers} emptyLabel="No referrers — all traffic is direct or internal." />
              </div>
              <div className="lg:col-span-5 bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Source · channel mix
                </p>
                <DonutBreakdown rows={overview.byRefSource} />
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3 bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Devices
                </p>
                <DonutBreakdown rows={overview.byDevice} />
              </div>
              <div className="lg:col-span-3 bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Operating systems
                </p>
                <DonutBreakdown rows={overview.byOS} />
              </div>
              <div className="lg:col-span-3 bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Browsers
                </p>
                <DonutBreakdown rows={overview.byBrowser} />
              </div>
              <div className="lg:col-span-3 bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Countries
                </p>
                <BarList rows={overview.byCountry} emptyLabel="No geo data — set X-Vercel-IP-Country in production." />
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Regions · cities
                </p>
                <BarList rows={overview.byRegion} emptyLabel="No region data — relies on edge headers in production." />
              </div>
              <div className="bg-background border border-foreground/15 p-5 md:p-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                  Top categories
                </p>
                <BarList rows={overview.topCategories} emptyLabel="No category page views in this range." />
              </div>
            </section>

            <section>
              <Link
                href="/admin/analytics/posts"
                className="bg-background border border-foreground/15 p-5 md:p-6 flex items-center gap-6 lift-card group"
              >
                <BarChart3 className="w-6 h-6 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-2xl tracking-[-0.02em] group-hover:text-primary transition-colors">
                    All posts — sortable
                  </p>
                  <p className="text-sm text-foreground/65 font-heading leading-relaxed mt-1">
                    Every post with views, visitors, reads and engagement. Click any row for a deep dive.
                  </p>
                  <span className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55 mt-2">
                    <FileText className="w-3.5 h-3.5" />
                    /admin/analytics/posts
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-foreground/35 group-hover:translate-x-1 group-hover:text-primary transition-all" />
              </Link>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

function Legend({
  swatch,
  label,
  dashed = false,
}: {
  swatch: string
  label: string
  dashed?: boolean
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="w-3 h-[2px] block"
        style={{
          backgroundColor: dashed ? 'transparent' : swatch,
          borderTop: dashed ? `2px dashed ${swatch}` : undefined,
        }}
        aria-hidden
      />
      <span>{label}</span>
    </span>
  )
}
