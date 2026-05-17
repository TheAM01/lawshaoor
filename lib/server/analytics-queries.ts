import 'server-only'
import {
  analyticsEventsCollection,
  analyticsSessionsCollection,
  postsCollection,
} from '@/lib/mongo'
import {
  lastNDays,
  shiftDay,
  todayUTC,
  type EventType,
  type PageKind,
  type StoredEvent,
} from '@/lib/models/analytics'
import type { PostDoc } from '@/lib/models/post'

/* All aggregations here are read-only. They take a UTC day range and
 * return JSON-serializable shapes ready for the React server components
 * in the admin dashboard.
 *
 * We deliberately do not pre-aggregate (no nightly job). With a 90-day
 * TTL and the indexes we set up in lib/mongo.ts, these aggregations are
 * sub-100ms on the kinds of volumes a blog generates. If/when traffic
 * blows past that, the analytics_daily collection is already wired up
 * to be the rollup target — drop in an aggregator later without changing
 * any query callsites. */

export type DayRange = { from: string; to: string; days: string[] }

export function rangeForLastN(n: number): DayRange {
  const days = lastNDays(n)
  return { from: days[0], to: days[days.length - 1], days }
}

/* ──────────────────────────────────────────────
   Overview
   ────────────────────────────────────────────── */

export type OverviewTotals = {
  views: number
  uniques: number
  sessions: number
  reads: number
  shares: number
  outbound: number
  engagedSeconds: number
  bounceRate: number             // 0..1 — sessions with exactly 1 view
  pagesPerSession: number        // mean
  avgEngagementSeconds: number   // per session
}

export type TimeSeriesPoint = {
  day: string
  views: number
  uniques: number
  reads: number
}

export type RankedRow = { key: string; label: string; value: number }

export type Overview = {
  range: DayRange
  totals: OverviewTotals
  series: TimeSeriesPoint[]
  retentionSeries: RetentionPoint[]
  retentionRate: number  // 0..1 over the whole range
  topPosts: Array<{ slug: string; title: string; views: number; uniques: number; reads: number }>
  topPaths: Array<{ path: string; label: string; views: number; uniques: number }>
  topCategories: RankedRow[]
  topReferrers: RankedRow[]
  byRefSource: RankedRow[]
  byDevice: RankedRow[]
  byCountry: RankedRow[]
  byRegion: RankedRow[]
  byBrowser: RankedRow[]
  byOS: RankedRow[]
}

export type RetentionPoint = {
  day: string
  newVisitors: number
  returningVisitors: number
}

export async function getOverview(rangeDays = 30): Promise<Overview> {
  const range = rangeForLastN(rangeDays)
  const events = await analyticsEventsCollection()
  const sessions = await analyticsSessionsCollection()
  const posts = await postsCollection()
  const filter = { dayUTC: { $gte: range.from, $lte: range.to } }

  /* Run the slow-ish aggregations in parallel. They all hit the
   * (dayUTC, slug) compound index so the planner can stream. */
  const [
    totalsAgg,
    seriesAgg,
    topPostsAgg,
    topPathsAgg,
    topCategoriesAgg,
    topReferrersAgg,
    bySourceAgg,
    byDeviceAgg,
    byCountryAgg,
    byRegionAgg,
    byBrowserAgg,
    byOSAgg,
    sessionTotals,
    retentionAgg,
  ] = await Promise.all([
    events.aggregate(
      [
        { $match: filter },
        {
          $group: {
            _id: null,
            views: { $sum: { $cond: [{ $eq: ['$type', 'view'] }, 1, 0] } },
            uniques: { $addToSet: { $cond: [{ $eq: ['$type', 'view'] }, '$visitorId', null] } },
            reads: { $sum: { $cond: [{ $eq: ['$type', 'read'] }, 1, 0] } },
            shares: { $sum: { $cond: [{ $eq: ['$type', 'share'] }, 1, 0] } },
            outbound: { $sum: { $cond: [{ $eq: ['$type', 'outbound'] }, 1, 0] } },
            engagedSeconds: {
              $sum: { $cond: [{ $eq: ['$type', 'engage'] }, { $ifNull: ['$seconds', 0] }, 0] },
            },
          },
        },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: { $in: ['view', 'read'] } } },
        {
          $group: {
            _id: { day: '$dayUTC', type: '$type' },
            count: { $sum: 1 },
            uniques: { $addToSet: '$visitorId' },
          },
        },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view', pageKind: 'post' } },
        {
          $group: {
            _id: '$slug',
            views: { $sum: 1 },
            uniques: { $addToSet: '$visitorId' },
          },
        },
        { $project: { views: 1, uniques: { $size: '$uniques' } } },
        { $sort: { views: -1 } },
        { $limit: 12 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    /* Site-wide top paths — every URL, not just posts. Includes
     * marketing pages, listings, categories. Strips the query string
     * by grouping on a $first-bucketed path. */
    events.aggregate(
      [
        { $match: { ...filter, type: 'view' } },
        {
          $group: {
            _id: '$path',
            views: { $sum: 1 },
            uniques: { $addToSet: '$visitorId' },
          },
        },
        { $project: { views: 1, uniques: { $size: '$uniques' } } },
        { $sort: { views: -1 } },
        { $limit: 12 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view', pageKind: 'category' } },
        { $group: { _id: '$slug', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
        { $limit: 10 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view', refHost: { $ne: '' } } },
        { $group: { _id: '$refHost', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
        { $limit: 10 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view' } },
        { $group: { _id: '$refSource', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view' } },
        { $group: { _id: '$device', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view', country: { $ne: '' } } },
        { $group: { _id: '$country', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
        { $limit: 12 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    /* Regions / cities, where the platform supplies them. Filtered to
     * non-empty to avoid a giant '' bucket dominating the list. */
    events.aggregate(
      [
        { $match: { ...filter, type: 'view', region: { $ne: '' } } },
        { $group: { _id: '$region', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
        { $limit: 12 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view' } },
        { $group: { _id: '$browser', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...filter, type: 'view' } },
        { $group: { _id: '$os', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
      ],
      { allowDiskUse: true }
    ).toArray(),

    sessions
      .aggregate(
        [
          { $match: { startedAt: { $gte: dayStartUTC(range.from) } } },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              pageViews: { $sum: '$pageViews' },
              bounces: { $sum: { $cond: [{ $lte: ['$pageViews', 1] }, 1, 0] } },
            },
          },
        ],
        { allowDiskUse: true }
      )
      .toArray(),

    /* Retention pass — for every (fingerprint, day) seen in the range,
     * we'll classify the day as 'new' (their first day in the range)
     * or 'returning' (they appeared on an earlier day). Group + sort
     * server-side; the new-vs-returning split is computed in JS. */
    events.aggregate(
      [
        { $match: { ...filter, type: 'view' } },
        { $group: { _id: { fp: '$fingerprint', day: '$dayUTC' } } },
        { $sort: { '_id.fp': 1, '_id.day': 1 } },
      ],
      { allowDiskUse: true }
    ).toArray(),
  ])

  /* Resolve totals */
  const t = (totalsAgg[0] as undefined | {
    views: number
    uniques: string[]
    reads: number
    shares: number
    outbound: number
    engagedSeconds: number
  }) ?? { views: 0, uniques: [], reads: 0, shares: 0, outbound: 0, engagedSeconds: 0 }
  const uniqueIds = new Set((t.uniques ?? []).filter(Boolean) as string[])

  const sessionRow = (sessionTotals[0] as undefined | {
    count: number
    pageViews: number
    bounces: number
  }) ?? { count: 0, pageViews: 0, bounces: 0 }

  const totals: OverviewTotals = {
    views: t.views ?? 0,
    uniques: uniqueIds.size,
    sessions: sessionRow.count ?? 0,
    reads: t.reads ?? 0,
    shares: t.shares ?? 0,
    outbound: t.outbound ?? 0,
    engagedSeconds: t.engagedSeconds ?? 0,
    bounceRate: sessionRow.count > 0 ? sessionRow.bounces / sessionRow.count : 0,
    pagesPerSession:
      sessionRow.count > 0 ? sessionRow.pageViews / sessionRow.count : 0,
    avgEngagementSeconds:
      sessionRow.count > 0 ? (t.engagedSeconds ?? 0) / sessionRow.count : 0,
  }

  /* Time series — fill missing days with 0 so the chart renders a
   * continuous line even when traffic is patchy. */
  type SeriesAggRow = { _id: { day: string; type: string }; count: number; uniques: string[] }
  const seriesByDay: Record<string, TimeSeriesPoint> = Object.fromEntries(
    range.days.map((day) => [day, { day, views: 0, uniques: 0, reads: 0 }])
  )
  for (const row of seriesAgg as SeriesAggRow[]) {
    const point = seriesByDay[row._id.day]
    if (!point) continue
    if (row._id.type === 'view') {
      point.views = row.count
      point.uniques = new Set(row.uniques).size
    } else if (row._id.type === 'read') {
      point.reads = row.count
    }
  }
  const series = range.days.map((d) => seriesByDay[d])

  /* Top posts — join with the posts collection for human-friendly title. */
  type TopAgg = { _id: string; views: number; uniques: number }
  const topPostsRaw = topPostsAgg as TopAgg[]
  const slugs = topPostsRaw.map((r) => r._id).filter(Boolean)
  const postDocs = (await posts
    .find({ slug: { $in: slugs } }, { projection: { slug: 1, title: 1 } })
    .toArray()) as unknown as Array<Pick<PostDoc, 'slug' | 'title'>>
  const titleBySlug = new Map(postDocs.map((p) => [p.slug, p.title]))
  // Need read counts joined in — second pass, scoped to just those slugs.
  const readsBySlug = await events
    .aggregate(
      [
        { $match: { ...filter, type: 'read', pageKind: 'post', slug: { $in: slugs } } },
        { $group: { _id: '$slug', reads: { $sum: 1 } } },
      ],
      { allowDiskUse: true }
    )
    .toArray()
  const readsMap = new Map(
    (readsBySlug as Array<{ _id: string; reads: number }>).map((r) => [r._id, r.reads])
  )

  const topPosts = topPostsRaw.map((r) => ({
    slug: r._id,
    title: titleBySlug.get(r._id) ?? r._id,
    views: r.views,
    uniques: r.uniques,
    reads: readsMap.get(r._id) ?? 0,
  }))

  /* Top paths — site-wide. Friendly labels:
   *   '/' → 'Home'
   *   '/our-story' → 'Our Story'
   *   '/lawshaoor-academy/{slug}' → resolved post title if known
   *   anything else → titlecased final segment */
  type PathAggRow = { _id: string; views: number; uniques: number }
  const pathRaw = topPathsAgg as PathAggRow[]
  const pathPostSlugs = pathRaw
    .map((r) => r._id.match(/^\/lawshaoor-academy\/(?!c\/)([^\/?#]+)/)?.[1])
    .filter((s): s is string => Boolean(s))
  const extraTitles = pathPostSlugs.length
    ? ((await posts
        .find({ slug: { $in: pathPostSlugs } }, { projection: { slug: 1, title: 1 } })
        .toArray()) as unknown as Array<Pick<PostDoc, 'slug' | 'title'>>)
    : []
  const titleByPathSlug = new Map(extraTitles.map((p) => [p.slug, p.title]))
  const topPaths = pathRaw.map((r) => ({
    path: r._id,
    label: friendlyPathLabel(r._id, titleByPathSlug),
    views: r.views,
    uniques: r.uniques,
  }))

  /* Retention — classify each (fingerprint, day) as 'new' (their first
   * day in the range) or 'returning'. Counts go into per-day buckets;
   * the headline rate is `returning / total visitors with > 1 day`. */
  type FpDayRow = { _id: { fp: string; day: string } }
  const seenFps = new Map<string, string>() // fingerprint → first day seen in range
  const retByDay: Record<string, RetentionPoint> = Object.fromEntries(
    range.days.map((day) => [day, { day, newVisitors: 0, returningVisitors: 0 }])
  )
  for (const row of retentionAgg as FpDayRow[]) {
    const { fp, day } = row._id
    if (!fp || !day) continue
    const point = retByDay[day]
    if (!point) continue
    const firstDay = seenFps.get(fp)
    if (firstDay === undefined) {
      seenFps.set(fp, day)
      point.newVisitors += 1
    } else {
      point.returningVisitors += 1
    }
  }
  const retentionSeries = range.days.map((d) => retByDay[d])
  const totalFps = seenFps.size
  // A visitor 'retained' if they showed up on ≥ 2 distinct days. The
  // retentionAgg rows are deduped (fp, day) tuples — so just count fps
  // that appeared on more than one day.
  const dayCountByFp = new Map<string, number>()
  for (const row of retentionAgg as FpDayRow[]) {
    dayCountByFp.set(row._id.fp, (dayCountByFp.get(row._id.fp) ?? 0) + 1)
  }
  let retained = 0
  for (const c of dayCountByFp.values()) if (c > 1) retained += 1
  const retentionRate = totalFps > 0 ? retained / totalFps : 0

  /* Simple ranked tables. The `label` is the human-readable form; for
   * categories we'd ideally resolve the slug → name, but the category
   * page itself uses the slug, so we keep it as-is here. */
  const rank = (rows: Array<{ _id: string | null; value: number }>): RankedRow[] =>
    rows
      .filter((r) => r._id !== null && r._id !== undefined && r._id !== '')
      .map((r) => ({ key: String(r._id), label: String(r._id), value: r.value }))

  return {
    range,
    totals,
    series,
    retentionSeries,
    retentionRate,
    topPosts,
    topPaths,
    topCategories: rank(topCategoriesAgg as Array<{ _id: string | null; value: number }>),
    topReferrers: rank(topReferrersAgg as Array<{ _id: string | null; value: number }>),
    byRefSource: rank(bySourceAgg as Array<{ _id: string | null; value: number }>),
    byDevice: rank(byDeviceAgg as Array<{ _id: string | null; value: number }>),
    byCountry: rank(byCountryAgg as Array<{ _id: string | null; value: number }>),
    byRegion: rank(byRegionAgg as Array<{ _id: string | null; value: number }>),
    byBrowser: rank(byBrowserAgg as Array<{ _id: string | null; value: number }>),
    byOS: rank(byOSAgg as Array<{ _id: string | null; value: number }>),
  }
}

/* Map a URL path to a human-friendly label for the dashboard.
 *   Posts get their real title (if resolved); known marketing routes
 *   get hand-picked names; everything else falls back to titlecasing
 *   the last path segment. */
function friendlyPathLabel(path: string, postTitles: Map<string, string>): string {
  if (path === '/' || path === '') return 'Home'
  const KNOWN: Record<string, string> = {
    '/our-story': 'Our Story',
    '/practice-areas': 'Practice Areas',
    '/people': 'People',
    '/contact': 'Contact',
    '/lawshaoor-academy': 'Academy · Listing',
  }
  if (KNOWN[path]) return KNOWN[path]

  const postMatch = path.match(/^\/lawshaoor-academy\/(?!c\/)([^\/?#]+)/)
  if (postMatch) {
    const title = postTitles.get(postMatch[1])
    return title ? `${title}` : `Post · ${postMatch[1]}`
  }
  const catMatch = path.match(/^\/lawshaoor-academy\/c\/([^\/?#]+)/)
  if (catMatch) return `Category · ${catMatch[1]}`

  // Generic — titlecase the last segment
  const tail = path.split('/').filter(Boolean).pop() ?? path
  return tail
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/* ──────────────────────────────────────────────
   Per-post breakdown
   ────────────────────────────────────────────── */

export type PostAnalytics = {
  slug: string
  title: string
  range: DayRange
  totals: OverviewTotals
  series: TimeSeriesPoint[]
  scrollFunnel: { reached25: number; reached50: number; reached75: number; reached100: number; reads: number }
  topReferrers: RankedRow[]
  byCountry: RankedRow[]
  byDevice: RankedRow[]
  byRefSource: RankedRow[]
}

export async function getPostAnalytics(
  slug: string,
  rangeDays = 30
): Promise<PostAnalytics | null> {
  const range = rangeForLastN(rangeDays)
  const events = await analyticsEventsCollection()
  const sessions = await analyticsSessionsCollection()
  const posts = await postsCollection()
  const postDoc = (await posts.findOne({ slug }, { projection: { slug: 1, title: 1 } })) as
    | Pick<PostDoc, 'slug' | 'title'>
    | null
  if (!postDoc) return null

  const baseFilter = {
    dayUTC: { $gte: range.from, $lte: range.to },
    pageKind: 'post' as PageKind,
    slug,
  }

  const [
    totalsAgg,
    seriesAgg,
    scrollAgg,
    refsAgg,
    countryAgg,
    deviceAgg,
    refSourceAgg,
    sessionTotals,
  ] = await Promise.all([
    events.aggregate(
      [
        { $match: baseFilter },
        {
          $group: {
            _id: null,
            views: { $sum: { $cond: [{ $eq: ['$type', 'view'] }, 1, 0] } },
            uniques: { $addToSet: { $cond: [{ $eq: ['$type', 'view'] }, '$visitorId', null] } },
            reads: { $sum: { $cond: [{ $eq: ['$type', 'read'] }, 1, 0] } },
            shares: { $sum: { $cond: [{ $eq: ['$type', 'share'] }, 1, 0] } },
            outbound: { $sum: { $cond: [{ $eq: ['$type', 'outbound'] }, 1, 0] } },
            engagedSeconds: {
              $sum: { $cond: [{ $eq: ['$type', 'engage'] }, { $ifNull: ['$seconds', 0] }, 0] },
            },
          },
        },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...baseFilter, type: { $in: ['view', 'read'] } } },
        {
          $group: {
            _id: { day: '$dayUTC', type: '$type' },
            count: { $sum: 1 },
            uniques: { $addToSet: '$visitorId' },
          },
        },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...baseFilter, type: { $in: ['scroll', 'read', 'view'] } } },
        {
          $group: {
            _id: null,
            views: { $sum: { $cond: [{ $eq: ['$type', 'view'] }, 1, 0] } },
            r25: {
              $sum: {
                $cond: [{ $and: [{ $eq: ['$type', 'scroll'] }, { $eq: ['$depth', 25] }] }, 1, 0],
              },
            },
            r50: {
              $sum: {
                $cond: [{ $and: [{ $eq: ['$type', 'scroll'] }, { $eq: ['$depth', 50] }] }, 1, 0],
              },
            },
            r75: {
              $sum: {
                $cond: [{ $and: [{ $eq: ['$type', 'scroll'] }, { $eq: ['$depth', 75] }] }, 1, 0],
              },
            },
            r100: {
              $sum: {
                $cond: [{ $and: [{ $eq: ['$type', 'scroll'] }, { $eq: ['$depth', 100] }] }, 1, 0],
              },
            },
            reads: { $sum: { $cond: [{ $eq: ['$type', 'read'] }, 1, 0] } },
          },
        },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...baseFilter, type: 'view', refHost: { $ne: '' } } },
        { $group: { _id: '$refHost', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
        { $limit: 10 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...baseFilter, type: 'view', country: { $ne: '' } } },
        { $group: { _id: '$country', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
        { $limit: 12 },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...baseFilter, type: 'view' } },
        { $group: { _id: '$device', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
      ],
      { allowDiskUse: true }
    ).toArray(),

    events.aggregate(
      [
        { $match: { ...baseFilter, type: 'view' } },
        { $group: { _id: '$refSource', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
      ],
      { allowDiskUse: true }
    ).toArray(),

    /* Sessions where this post was the entry path — proxy for
     * 'post-driven session' metrics. */
    sessions
      .aggregate(
        [
          {
            $match: {
              startedAt: { $gte: dayStartUTC(range.from) },
              entryPath: { $regex: `/${slug}(/|$|\\?)` },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              pageViews: { $sum: '$pageViews' },
              bounces: { $sum: { $cond: [{ $lte: ['$pageViews', 1] }, 1, 0] } },
            },
          },
        ],
        { allowDiskUse: true }
      )
      .toArray(),
  ])

  const t = (totalsAgg[0] as undefined | {
    views: number
    uniques: string[]
    reads: number
    shares: number
    outbound: number
    engagedSeconds: number
  }) ?? { views: 0, uniques: [], reads: 0, shares: 0, outbound: 0, engagedSeconds: 0 }
  const uniqueIds = new Set((t.uniques ?? []).filter(Boolean) as string[])

  const sessionRow = (sessionTotals[0] as undefined | {
    count: number
    pageViews: number
    bounces: number
  }) ?? { count: 0, pageViews: 0, bounces: 0 }

  const totals: OverviewTotals = {
    views: t.views,
    uniques: uniqueIds.size,
    sessions: sessionRow.count,
    reads: t.reads,
    shares: t.shares,
    outbound: t.outbound,
    engagedSeconds: t.engagedSeconds,
    bounceRate: sessionRow.count > 0 ? sessionRow.bounces / sessionRow.count : 0,
    pagesPerSession:
      sessionRow.count > 0 ? sessionRow.pageViews / sessionRow.count : 0,
    avgEngagementSeconds:
      sessionRow.count > 0 ? t.engagedSeconds / sessionRow.count : 0,
  }

  /* Series with zero-fill */
  type SeriesAggRow = { _id: { day: string; type: string }; count: number; uniques: string[] }
  const seriesByDay: Record<string, TimeSeriesPoint> = Object.fromEntries(
    range.days.map((day) => [day, { day, views: 0, uniques: 0, reads: 0 }])
  )
  for (const row of seriesAgg as SeriesAggRow[]) {
    const point = seriesByDay[row._id.day]
    if (!point) continue
    if (row._id.type === 'view') {
      point.views = row.count
      point.uniques = new Set(row.uniques).size
    } else if (row._id.type === 'read') {
      point.reads = row.count
    }
  }
  const series = range.days.map((d) => seriesByDay[d])

  const s = (scrollAgg[0] as undefined | {
    views: number
    r25: number
    r50: number
    r75: number
    r100: number
    reads: number
  }) ?? { views: 0, r25: 0, r50: 0, r75: 0, r100: 0, reads: 0 }

  const rank = (rows: Array<{ _id: string | null; value: number }>): RankedRow[] =>
    rows
      .filter((r) => r._id !== null && r._id !== undefined && r._id !== '')
      .map((r) => ({ key: String(r._id), label: String(r._id), value: r.value }))

  return {
    slug,
    title: postDoc.title,
    range,
    totals,
    series,
    scrollFunnel: {
      reached25: s.r25,
      reached50: s.r50,
      reached75: s.r75,
      reached100: s.r100,
      reads: s.reads,
    },
    topReferrers: rank(refsAgg as Array<{ _id: string | null; value: number }>),
    byCountry: rank(countryAgg as Array<{ _id: string | null; value: number }>),
    byDevice: rank(deviceAgg as Array<{ _id: string | null; value: number }>),
    byRefSource: rank(refSourceAgg as Array<{ _id: string | null; value: number }>),
  }
}

/* ──────────────────────────────────────────────
   All-posts list
   ──────────────────────────────────────────────
   Driven by the posts collection (so unpublished/no-traffic posts can
   still appear with zero counts). We join in view/read counts. */

export type PostAnalyticsRow = {
  _id: string
  slug: string
  title: string
  status: string
  publishedAt: string | null
  views: number
  uniques: number
  reads: number
  shares: number
  engagedSeconds: number
}

export async function getAllPostsAnalytics(
  rangeDays = 30
): Promise<{ range: DayRange; rows: PostAnalyticsRow[] }> {
  const range = rangeForLastN(rangeDays)
  const events = await analyticsEventsCollection()
  const posts = await postsCollection()

  const postDocs = (await posts
    .find({}, { projection: { slug: 1, title: 1, status: 1, publishedAt: 1 } })
    .sort({ publishedAt: -1, updatedAt: -1 })
    .toArray()) as unknown as Array<
      Pick<PostDoc, 'slug' | 'title' | 'status' | 'publishedAt'> & {
        _id: { toString(): string }
      }
    >

  const slugs = postDocs.map((p) => p.slug)
  const agg = await events
    .aggregate(
      [
        {
          $match: {
            dayUTC: { $gte: range.from, $lte: range.to },
            pageKind: 'post',
            slug: { $in: slugs },
          },
        },
        {
          $group: {
            _id: '$slug',
            views: { $sum: { $cond: [{ $eq: ['$type', 'view'] }, 1, 0] } },
            uniques: { $addToSet: { $cond: [{ $eq: ['$type', 'view'] }, '$visitorId', null] } },
            reads: { $sum: { $cond: [{ $eq: ['$type', 'read'] }, 1, 0] } },
            shares: { $sum: { $cond: [{ $eq: ['$type', 'share'] }, 1, 0] } },
            engagedSeconds: {
              $sum: { $cond: [{ $eq: ['$type', 'engage'] }, { $ifNull: ['$seconds', 0] }, 0] },
            },
          },
        },
      ],
      { allowDiskUse: true }
    )
    .toArray()

  type AggRow = {
    _id: string
    views: number
    uniques: string[]
    reads: number
    shares: number
    engagedSeconds: number
  }
  const bySlug = new Map<string, AggRow>(
    (agg as AggRow[]).map((r) => [r._id, r])
  )

  const rows: PostAnalyticsRow[] = postDocs.map((p) => {
    const a = bySlug.get(p.slug)
    const uniques = new Set((a?.uniques ?? []).filter(Boolean) as string[]).size
    return {
      _id: String(p._id),
      slug: p.slug,
      title: p.title,
      status: p.status,
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
      views: a?.views ?? 0,
      uniques,
      reads: a?.reads ?? 0,
      shares: a?.shares ?? 0,
      engagedSeconds: a?.engagedSeconds ?? 0,
    }
  })

  rows.sort((a, b) => b.views - a.views || a.title.localeCompare(b.title))
  return { range, rows }
}

/* ──────────────────────────────────────────────
   Dashboard summary
   ──────────────────────────────────────────────
   Small payload for the /admin home page — last-7-day headline + a
   tiny trend series. Cheap to compute (single overview call, then we
   project the relevant fields). */

export type DashboardSummary = {
  range: DayRange
  views: number
  visitors: number
  sessions: number
  reads: number
  bounceRate: number
  retentionRate: number
  series: TimeSeriesPoint[]
  topPath: { path: string; label: string; views: number } | null
  topReferrer: { key: string; value: number } | null
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const overview = await getOverview(7)
  return {
    range: overview.range,
    views: overview.totals.views,
    visitors: overview.totals.uniques,
    sessions: overview.totals.sessions,
    reads: overview.totals.reads,
    bounceRate: overview.totals.bounceRate,
    retentionRate: overview.retentionRate,
    series: overview.series,
    topPath:
      overview.topPaths.length > 0
        ? {
            path: overview.topPaths[0].path,
            label: overview.topPaths[0].label,
            views: overview.topPaths[0].views,
          }
        : null,
    topReferrer:
      overview.topReferrers.length > 0
        ? { key: overview.topReferrers[0].key, value: overview.topReferrers[0].value }
        : null,
  }
}

/* ──────────────────────────────────────────────
   Realtime
   ──────────────────────────────────────────────
   "Realtime" = activity in the last 30 minutes. Cheap to compute — TTL
   limits the working set and the createdAt index keeps it fast. */

export type RealtimePoint = { minute: number; views: number }

export type RealtimeSnapshot = {
  activeVisitors: number          // distinct visitorIds, last 30 min
  activeSessions: number          // distinct sessionIds, last 30 min
  viewsLast30Min: number
  byMinute: RealtimePoint[]       // 30 entries, [0]=oldest .. [29]=now
  topPaths: Array<{ path: string; views: number; title?: string }>
}

export async function getRealtime(): Promise<RealtimeSnapshot> {
  const events = await analyticsEventsCollection()
  const posts = await postsCollection()
  const since = new Date(Date.now() - 30 * 60 * 1000)

  const [tail, byMinuteAgg] = await Promise.all([
    events
      .find(
        { createdAt: { $gte: since }, type: { $in: ['view', 'engage', 'read'] } },
        { projection: { type: 1, visitorId: 1, sessionId: 1, path: 1, slug: 1, createdAt: 1 } }
      )
      .sort({ createdAt: -1 })
      .limit(5000)
      .toArray(),

    events
      .aggregate(
        [
          { $match: { createdAt: { $gte: since }, type: 'view' } },
          {
            $group: {
              _id: {
                $dateTrunc: { date: '$createdAt', unit: 'minute' },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],
        { allowDiskUse: true }
      )
      .toArray(),
  ])

  type Tail = {
    type: EventType
    visitorId: string
    sessionId: string
    path: string
    slug?: string
    createdAt: Date
  }
  const visitors = new Set<string>()
  const sessions = new Set<string>()
  const pathHits = new Map<string, { path: string; views: number; slug?: string }>()
  for (const e of tail as unknown as Tail[]) {
    visitors.add(e.visitorId)
    sessions.add(e.sessionId)
    if (e.type === 'view') {
      const existing = pathHits.get(e.path)
      if (existing) existing.views += 1
      else pathHits.set(e.path, { path: e.path, views: 1, slug: e.slug })
    }
  }

  /* Minute bucketing — fill 30 slots ending at "now" so the chart shape
   * is stable regardless of when within a minute we're called. */
  type MinAggRow = { _id: Date; count: number }
  const buckets: RealtimePoint[] = []
  for (let i = 29; i >= 0; i--) {
    const t = new Date(Date.now() - i * 60 * 1000)
    buckets.push({ minute: floorMinute(t), views: 0 })
  }
  const bucketByMinute = new Map(buckets.map((b) => [b.minute, b]))
  for (const row of byMinuteAgg as MinAggRow[]) {
    const key = floorMinute(row._id)
    const slot = bucketByMinute.get(key)
    if (slot) slot.views = row.count
  }

  /* Top paths — resolve slugs to titles for nicer display. */
  const topPathsRaw = Array.from(pathHits.values())
    .sort((a, b) => b.views - a.views)
    .slice(0, 8)
  const slugSet = topPathsRaw
    .map((p) => p.slug)
    .filter((s): s is string => Boolean(s))
  const titles = slugSet.length
    ? ((await posts
        .find({ slug: { $in: slugSet } }, { projection: { slug: 1, title: 1 } })
        .toArray()) as unknown as Array<{ slug: string; title: string }>)
    : []
  const titleBySlug = new Map(titles.map((t) => [t.slug, t.title]))

  return {
    activeVisitors: visitors.size,
    activeSessions: sessions.size,
    viewsLast30Min: buckets.reduce((acc, b) => acc + b.views, 0),
    byMinute: buckets,
    topPaths: topPathsRaw.map((p) => ({
      path: p.path,
      views: p.views,
      title: p.slug ? titleBySlug.get(p.slug) : undefined,
    })),
  }
}

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

function dayStartUTC(day: string): Date {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0))
}

function floorMinute(d: Date): number {
  return Math.floor(d.getTime() / 60000) * 60000
}

/** Sanitize a query-string `?range=` into one of the allowed presets. */
export function parseRange(s: string | null | undefined): number {
  const n = Number(s)
  if ([1, 7, 30, 90].includes(n)) return n
  return 30
}

// Re-export tightly-used helpers for the API route ergonomics.
export { lastNDays, shiftDay, todayUTC }
