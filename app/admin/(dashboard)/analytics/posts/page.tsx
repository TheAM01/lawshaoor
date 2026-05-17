import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { getAllPostsAnalytics, parseRange } from '@/lib/server/analytics-queries'
import { statFormat } from '@/components/analytics/format'
import { RangeSelector } from '@/components/analytics/range-selector'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Analytics · Posts · LawShaoor admin',
}

export default async function PostsAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const sp = await searchParams
  const days = parseRange(sp.range)
  let payload: Awaited<ReturnType<typeof getAllPostsAnalytics>> | null = null
  let error: string | null = null
  try {
    payload = await getAllPostsAnalytics(days)
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load posts analytics'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.22em] uppercase mb-4">
          <Link href="/admin/analytics" className="text-foreground/55 hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Overview
          </Link>
        </div>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="index-chip">Analytics · posts</span>
            <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
              Every post
            </h1>
            <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
              Sorted by views in the selected window. Click any row for a deeper breakdown.
            </p>
          </div>
          <RangeSelector current={days} />
        </div>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10">
        {error && (
          <div className="border border-destructive/40 bg-destructive/5 p-6 mb-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Failed to load
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{error}</p>
          </div>
        )}

        {payload && (
          <div className="border border-foreground/15">
            <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-foreground/15 bg-background-alt/40 text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55">
              <span className="col-span-5">Post</span>
              <span className="col-span-1 text-right">Status</span>
              <span className="col-span-1 text-right">Views</span>
              <span className="col-span-1 text-right">Visitors</span>
              <span className="col-span-1 text-right">Reads</span>
              <span className="col-span-1 text-right">Shares</span>
              <span className="col-span-1 text-right">Engaged</span>
              <span className="col-span-1 text-right">→</span>
            </div>
            {payload.rows.length === 0 ? (
              <div className="p-8 text-center text-sm text-foreground/55 font-heading">
                No posts yet.
              </div>
            ) : (
              payload.rows.map((r) => (
                <Link
                  key={r._id}
                  href={`/admin/analytics/posts/${r.slug}?range=${days}`}
                  className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-foreground/10 last:border-b-0 items-baseline hover:bg-background-alt/60 transition-colors"
                >
                  <span className="col-span-12 md:col-span-5 font-heading text-foreground truncate">
                    {r.title}
                  </span>
                  <span className="col-span-2 md:col-span-1 md:text-right">
                    <span className={`tag text-[9px] ${r.status === 'published' ? 'tag-primary' : ''}`}>
                      {r.status === 'published' ? 'live' : 'draft'}
                    </span>
                  </span>
                  <Cell value={r.views} bold />
                  <Cell value={r.uniques} />
                  <Cell value={r.reads} />
                  <Cell value={r.shares} />
                  <Cell label={statFormat('seconds', r.engagedSeconds)} />
                  <span className="col-span-2 md:col-span-1 text-right">
                    <ArrowRight className="w-3 h-3 text-foreground/35 ml-auto" />
                  </span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Cell({
  value,
  label,
  bold = false,
}: {
  value?: number
  label?: string
  bold?: boolean
}) {
  return (
    <span
      className={`col-span-2 md:col-span-1 text-right tabular-fig font-mono text-xs ${
        bold ? 'text-foreground' : 'text-foreground/70'
      }`}
    >
      {label ?? (value ?? 0).toLocaleString()}
    </span>
  )
}
