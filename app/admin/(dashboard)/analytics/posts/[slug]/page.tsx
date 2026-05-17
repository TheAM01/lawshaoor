import Link from 'next/link'
import { ArrowLeft, ExternalLink, Pencil } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getPostAnalytics, parseRange } from '@/lib/server/analytics-queries'
import {
  TrendChart,
  BarList,
  DonutBreakdown,
  ScrollFunnel,
} from '@/components/analytics/charts'
import { statFormat } from '@/components/analytics/format'
import { StatCard } from '@/components/analytics/stat-card'
import { RangeSelector } from '@/components/analytics/range-selector'
import { postsCollection } from '@/lib/mongo'
import type { PostDoc } from '@/lib/models/post'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return {
    title: `Analytics · ${slug} · LawShaoor admin`,
  }
}

export default async function PostAnalyticsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ range?: string }>
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams])
  const days = parseRange(sp.range)

  let data: Awaited<ReturnType<typeof getPostAnalytics>> = null
  let error: string | null = null
  let postId: string | null = null
  try {
    data = await getPostAnalytics(slug, days)
    // Resolve the post _id so we can link to the editor.
    const col = await postsCollection()
    const p = (await col.findOne({ slug }, { projection: { _id: 1 } })) as
      | { _id: { toString(): string } }
      | null
    if (p) postId = String(p._id)
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load post analytics'
  }

  if (!data && !error) notFound()

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.22em] uppercase mb-4 flex-wrap">
          <Link href="/admin/analytics" className="text-foreground/55 hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Overview
          </Link>
          <span className="block w-4 h-px bg-foreground/25" />
          <Link href={`/admin/analytics/posts?range=${days}`} className="text-foreground/55 hover:text-primary">
            All posts
          </Link>
          <span className="block w-4 h-px bg-foreground/25" />
          <span className="text-foreground/80">/{slug}</span>
        </div>

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="min-w-0 max-w-3xl">
            <span className="index-chip">Analytics · post</span>
            <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3 truncate">
              {data?.title ?? slug}
            </h1>
            <div className="mt-3 flex gap-3 flex-wrap">
              <Link
                href={`/lawshaoor-academy/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/70 hover:text-primary inline-flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                View live
              </Link>
              {postId && (
                <Link
                  href={`/admin/posts/${postId}/edit`}
                  className="link-line text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/70 hover:text-primary inline-flex items-center gap-1"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </Link>
              )}
            </div>
          </div>
          <RangeSelector current={days} />
        </div>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10 space-y-10">
        {error && (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Failed to load
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{error}</p>
          </div>
        )}

        {data && (
          <>
            {/* ── Metric strip ─────────────────── */}
            <section>
              <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                Headline
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/15 border border-foreground/15">
                <StatCard
                  label="Views"
                  value={statFormat('number', data.totals.views)}
                  trend={data.series.map((s) => s.views)}
                  tone="primary"
                />
                <StatCard
                  label="Visitors"
                  value={statFormat('number', data.totals.uniques)}
                  trend={data.series.map((s) => s.uniques)}
                />
                <StatCard
                  label="Reads"
                  value={statFormat('number', data.totals.reads)}
                  hint={
                    data.totals.views > 0
                      ? `${((data.totals.reads / data.totals.views) * 100).toFixed(1)}% read rate`
                      : ''
                  }
                  trend={data.series.map((s) => s.reads)}
                />
                <StatCard
                  label="Shares"
                  value={statFormat('number', data.totals.shares)}
                  hint={`${data.totals.outbound} outbound clicks`}
                />
                <StatCard
                  label="Avg engagement"
                  value={statFormat('seconds', data.totals.avgEngagementSeconds)}
                  hint={`${statFormat('seconds', data.totals.engagedSeconds)} total`}
                />
                <StatCard
                  label="Bounce rate"
                  value={statFormat('percent', data.totals.bounceRate)}
                  hint={`${statFormat('number', data.totals.pagesPerSession)} pages/session`}
                />
              </div>
            </section>

            {/* ── Trend + scroll funnel ────────── */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-background border border-foreground/15 p-5 md:p-6">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                  Traffic over time
                </p>
                <TrendChart data={data.series} height={300} />
              </div>
              <div className="bg-background border border-foreground/15 p-5 md:p-6">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                  Scroll-depth funnel
                </p>
                <ScrollFunnel
                  views={data.totals.views}
                  reached25={data.scrollFunnel.reached25}
                  reached50={data.scrollFunnel.reached50}
                  reached75={data.scrollFunnel.reached75}
                  reached100={data.scrollFunnel.reached100}
                  reads={data.scrollFunnel.reads}
                />
              </div>
            </section>

            {/* ── Acquisition ─────────────────── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-background border border-foreground/15 p-5 md:p-6">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                  Top referrers
                </p>
                <BarList rows={data.topReferrers} emptyLabel="All traffic to this post is direct or internal." />
              </div>
              <div className="lg:col-span-5 bg-background border border-foreground/15 p-5 md:p-6">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                  Channel mix
                </p>
                <DonutBreakdown rows={data.byRefSource} />
              </div>
            </section>

            {/* ── Audience ────────────────────── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 bg-background border border-foreground/15 p-5 md:p-6">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                  Countries
                </p>
                <BarList rows={data.byCountry} emptyLabel="No geo data — set X-Vercel-IP-Country in production." />
              </div>
              <div className="lg:col-span-6 bg-background border border-foreground/15 p-5 md:p-6">
                <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
                  Devices
                </p>
                <DonutBreakdown rows={data.byDevice} />
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
