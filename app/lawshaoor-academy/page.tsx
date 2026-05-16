import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Marquee } from '@/components/motion/marquee'
import { Rule } from '@/components/motion/rule'
import { Counter } from '@/components/motion/counter'
import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  OrbitRings,
  GridDots,
  VectorNode,
  SquareCascade,
  WaveBars,
  PulseRings,
  BigCircles,
  SegmentedRing,
} from '@/components/illustrations'
import { postsCollection } from '@/lib/mongo'
import type { PostDoc } from '@/lib/models/post'

export const dynamic = 'force-dynamic'

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

type AcademyPost = {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: string
  thumbnailUrl: string
  publishedAt: Date
  readMinutes: number
}

const CATEGORY_ILLO: Record<
  string,
  React.ComponentType<{ className?: string; uid?: string }>
> = {
  'M&A':          CirclesInCircumference,
  'Governance':   HexagonalCascade,
  'Contracts':    TesseractCube,
  'Capital':      StackedCubes,
  'Sector Notes': OrbitRings,
  'Opinion':      VectorNode,
}

const CATEGORY_ORDER = [
  'M&A',
  'Governance',
  'Contracts',
  'Capital',
  'Sector Notes',
  'Opinion',
]

const TOPICS = [
  { label: 'Earnouts',           Illo: OrbitRings },
  { label: 'Cap tables',         Illo: StackedCubes },
  { label: 'Cross-border',       Illo: VectorNode },
  { label: 'Board duty',         Illo: HexagonalCascade },
  { label: 'Drafting craft',     Illo: WaveBars },
  { label: 'Tax structuring',    Illo: SquareCascade },
  { label: 'Diligence',          Illo: GridDots },
  { label: 'Negotiation theory', Illo: SegmentedRing },
]

async function getPublished(): Promise<{ posts: AcademyPost[]; error: string | null }> {
  try {
    const col = await postsCollection()
    const docs = await col
      .find({ status: 'published' })
      .sort({ publishedAt: -1, updatedAt: -1 })
      .limit(50)
      .toArray()
    const posts: AcademyPost[] = docs.map((d) => {
      const p = d as unknown as PostDoc
      return {
        _id: String(p._id),
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        thumbnailUrl: p.thumbnailUrl,
        publishedAt: p.publishedAt ?? p.updatedAt,
        readMinutes: p.readMinutes ?? 1,
      }
    })
    return { posts, error: null }
  } catch (err) {
    return { posts: [], error: err instanceof Error ? err.message : 'Failed to load posts' }
  }
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

function formatDay(d: Date) {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function groupByYear(posts: AcademyPost[]) {
  const groups = new Map<number, AcademyPost[]>()
  for (const p of posts) {
    const y = p.publishedAt.getFullYear()
    if (!groups.has(y)) groups.set(y, [])
    groups.get(y)!.push(p)
  }
  return Array.from(groups.entries()).sort((a, b) => b[0] - a[0])
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */

export default async function Academy() {
  const { posts, error } = await getPublished()
  const [featured, ...rest] = posts

  // Stats
  const totalRead = posts.reduce((acc, p) => acc + p.readMinutes, 0)
  const categoriesUsed = new Set(posts.map((p) => p.category)).size

  const categoryCounts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1
    return acc
  }, {})

  // Editorial layout: first 5 in mixed grid (1 large + 4 standard), rest in archive
  const editorialPicks = rest.slice(0, 5)
  const editorialHero = editorialPicks[0]
  const editorialRail = editorialPicks.slice(1)
  const archivePosts = rest.slice(5)

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* ────────────────────────────────────────
          01 · HERO
          ──────────────────────────────────────── */}
      <section className="relative section-pad pt-32 md:pt-44 pb-24 md:pb-32 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[8%] -right-[14%] hidden md:block" />
        <span
          aria-hidden
          className="hero-orb accent-breathe bottom-[-20%] -left-[15%] hidden md:block"
          style={{ animationDelay: '1.2s', opacity: 0.35 }}
        />
        <OrbitRings className="absolute -left-20 top-24 w-[360px] h-[360px] opacity-30 hidden md:block" uid="ac-hero-orbit-l" rotate />
        <PulseRings className="absolute right-12 top-32 w-40 h-40 opacity-60 hidden lg:block" uid="ac-hero-pulse" />
        <GridDots className="absolute right-[18%] bottom-16 w-44 h-44 opacity-50 hidden md:block float-soft" uid="ac-hero-dots" />
        <CirclesInCircumference className="absolute left-[42%] -bottom-12 w-36 h-36 opacity-55 hidden lg:block float-soft" uid="ac-hero-circ" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
            <span className="index-chip">001 · Academy</span>
            <div className="hidden md:flex gap-6 text-foreground/65">
              <span className="eyebrow-sm">Long-form · Corporate law</span>
              <span className="eyebrow-sm">Updated weekly</span>
            </div>
          </div>

          <h1 className="display-xl font-display">
            <span className="block">
              <SplitReveal trigger="load" delay={0.1}>The LawShaoor</SplitReveal>
            </span>
            <span className="block text-gradient">
              <SplitReveal trigger="load" delay={0.35}>Academy.</SplitReveal>
            </span>
          </h1>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20 items-start">
            <div className="col-span-12 md:col-span-7 md:col-start-1">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em] max-w-2xl">
                  Long-form notes, deal teardowns, and practical guides on corporate law. Written by the partners doing the work — for operators, founders, GCs, and the curious.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="mt-8 flex flex-wrap gap-3">
                <Link href="#latest" className="btn-primary">
                  <span>Read the latest</span>
                  <span className="arrow-magnet">→</span>
                </Link>
                <Link href="#archive" className="btn-ghost">
                  <span>Browse archive</span>
                  <span className="arrow-magnet">→</span>
                </Link>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 hidden md:block">
              <FadeIn delay={0.3}>
                <CirclesInCircumference className="w-full max-w-xs ml-auto opacity-90" uid="ac-hero-big" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          01b · STATS STRIP (animated counters)
          ──────────────────────────────────────── */}
      <section className="border-y border-foreground/15 bg-background-alt/70 section-pad py-10 md:py-14">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
            <Stat n="01" v={posts.length}      suffix="+" label="Pieces published" />
            <Stat n="02" v={categoriesUsed}    suffix=""  label="Categories" />
            <Stat n="03" v={totalRead}         suffix=" min" label="Total reading time" />
            <Stat n="04" v={5}                 suffix="+" label="Partners writing" last />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          01c · CATEGORY MARQUEE
          ──────────────────────────────────────── */}
      <div className="border-b border-foreground/15 bg-background py-5 md:py-6 overflow-hidden">
        <Marquee speed={40}>
          <div className="flex items-center gap-12 pr-12 text-foreground/85 font-display text-xl md:text-2xl whitespace-nowrap tracking-[0.02em]">
            {['Mergers', 'Governance', 'Contracts', 'Capital', 'Sector Notes', 'Opinion', 'Cross-Border', 'Restructuring', 'Diligence', 'Boards', 'Earnouts', 'Drafting'].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* ────────────────────────────────────────
          02 · FEATURED PIECE (editorial)
          ──────────────────────────────────────── */}
      {featured && (
        <section className="relative section-pad py-24 md:py-32 border-b border-foreground/15 bg-fixed-lavender overflow-hidden">
          <OrbitRings className="absolute -right-32 top-12 w-[520px] h-[520px] opacity-25 hidden md:block" uid="ac-feat-orb" rotate />
          <SquareCascade className="absolute -left-20 -bottom-16 w-72 h-72 opacity-35 hidden md:block float-soft" uid="ac-feat-sq" />

          <div className="max-w-[1440px] mx-auto relative">
            <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
              <div className="col-span-12 md:col-span-6 space-y-3">
                <span className="index-chip">002 · This month&apos;s read</span>
                <h2 className="display-sm font-display">
                  <SplitReveal>Featured.</SplitReveal>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9 md:text-right">
                <FadeIn>
                  <p className="font-mono text-xs tracking-[0.22em] uppercase text-foreground/55">
                    {formatDate(featured.publishedAt)} · {featured.readMinutes} min read
                  </p>
                </FadeIn>
              </div>
            </div>

            <Rule className="rule-heavy mb-10" />

            <FadeIn>
              <article className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-16">
                <div className="col-span-12 md:col-span-6 order-2 md:order-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="tag tag-primary">{featured.category}</span>
                    <span className="eyebrow text-foreground/55">{formatDay(featured.publishedAt)} · {featured.publishedAt.getFullYear()}</span>
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.025em] leading-[0.98] mb-7">
                    <Link href={`/lawshaoor-academy/${featured.slug}`} className="hover:text-primary transition-colors">
                      {featured.title}
                    </Link>
                  </h3>
                  <p className="font-heading text-lg md:text-xl text-foreground/85 leading-relaxed mb-8 max-w-2xl tracking-[-0.005em]">
                    {featured.excerpt}
                  </p>
                  <Link href={`/lawshaoor-academy/${featured.slug}`} className="btn-primary self-start">
                    <span>Read the piece</span>
                    <span className="arrow-magnet">→</span>
                  </Link>
                </div>

                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                  <FeaturedVisual post={featured} />
                </div>
              </article>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────
          03 · LATEST WRITING (editorial mixed grid)
          ──────────────────────────────────────── */}
      <section
        id="latest"
        className="relative section-pad py-24 md:py-36 border-b border-foreground/15 bg-background overflow-hidden"
      >
        <OrbitRings className="absolute -left-32 top-1/3 w-[520px] h-[520px] opacity-25 hidden md:block" uid="ac-latest-orb" rotate />
        <StackedCubes className="absolute right-10 -top-12 w-36 h-56 opacity-45 hidden md:block float-soft" uid="ac-latest-stk" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-7">
              <span className="index-chip">003 · Latest pieces</span>
              <h2 className="display-md font-display mt-4">
                <SplitReveal>Recent writing,</SplitReveal>{' '}
                <span className="text-gradient">
                  <SplitReveal>fresh off the desk.</SplitReveal>
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">
                  New pieces every week or two. No filler. If we publish it, a partner sat down and wrote it.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-12 md:mb-14" />

          {error ? (
            <div className="border border-destructive/40 bg-destructive/5 p-8">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
                Failed to load articles
              </p>
              <p className="text-sm text-foreground/80 font-heading">{error}</p>
            </div>
          ) : editorialPicks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-foreground/15 border border-foreground/15">
              {editorialHero && (
                <FadeIn className="lg:col-span-7 lg:row-span-2 bg-background">
                  <HeroCard post={editorialHero} />
                </FadeIn>
              )}
              {editorialRail.map((p, i) => (
                <FadeIn
                  key={p._id}
                  delay={0.05 * (i + 1)}
                  className="lg:col-span-5 bg-background"
                >
                  <RailCard post={p} index={i + 2} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          04 · MANIFESTO / EDITORIAL CALLOUT
          ──────────────────────────────────────── */}
      <section className="relative section-pad py-28 md:py-40 border-b border-foreground/15 bg-fixed-deep overflow-hidden">
        <SquareCascade className="absolute -right-24 -top-12 w-[460px] h-[460px] opacity-30 hidden md:block" uid="ac-man-sq" />
        <GridDots className="absolute -left-20 bottom-0 w-64 h-64 opacity-35 hidden md:block" uid="ac-man-dots" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="col-span-12 md:col-span-3 hidden md:flex justify-center">
              <FadeIn>
                <BigCircles className="w-64 h-64 lg:w-72 lg:h-72 opacity-85" uid="ac-man-big" />
              </FadeIn>
            </div>

            <div className="col-span-12 md:col-span-9 space-y-7">
              <span className="index-chip">004 · Editorial</span>
              <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.025em] text-foreground">
                <SplitReveal>No drip campaigns.</SplitReveal>{' '}
                <SplitReveal>No SEO bait.</SplitReveal>{' '}
                <span className="text-gradient">
                  <SplitReveal>One piece, when there is</SplitReveal>{' '}
                  <SplitReveal>something worth reading.</SplitReveal>
                </span>
              </blockquote>
              <FadeIn delay={0.2}>
                <p className="font-heading text-lg text-foreground/75 leading-relaxed max-w-2xl tracking-[-0.005em]">
                  Every piece on the Academy is drafted by a partner who is doing the work, not a marketing team writing in their voice. We publish slowly and edit honestly.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          05 · BROWSE BY CATEGORY
          ──────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-32 border-b border-foreground/15 bg-background overflow-hidden">
        <GridDots className="absolute -left-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-30 hidden md:block" uid="ac-cat-dots" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-5 space-y-3">
              <span className="index-chip">005 · Browse</span>
              <h2 className="display-md font-display">
                <SplitReveal>By category.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">
                  Six running threads. Every piece sits in one — and every category is updated on its own rhythm.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          <FadeIn
            staggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/15 border-x border-b border-foreground/15"
          >
            {CATEGORY_ORDER.map((label, i) => (
              <CategoryCard
                key={label}
                label={label}
                index={i + 1}
                count={categoryCounts[label] ?? 0}
              />
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────
          06 · TOPIC TILES
          ──────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-32 border-b border-foreground/15 bg-fixed-lavender overflow-hidden">
        <PulseRings className="absolute -right-24 -top-12 w-72 h-72 opacity-50 hidden md:block" uid="ac-topic-pulse" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-5">
              <span className="index-chip">006 · Topics</span>
              <h2 className="display-md font-display mt-4">
                <SplitReveal>Threads</SplitReveal>{' '}
                <span className="text-gradient">
                  <SplitReveal>we keep pulling on.</SplitReveal>
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">
                  Eight running threads that show up across our writing. Click in for the curated sequence.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          <FadeIn
            staggerChildren
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/15 border-x border-b border-foreground/15"
          >
            {TOPICS.map((t, i) => {
              const Illo = t.Illo
              return (
                <Link
                  key={t.label}
                  href="#"
                  className="group bg-background p-8 md:p-10 lift-card flex flex-col gap-6 items-start"
                >
                  <span className="eyebrow text-foreground/55">{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-full flex justify-center py-2">
                    <Illo className="w-32 h-32 md:w-40 md:h-40 group-hover:scale-110 transition-transform duration-500" uid={`tp-${i}`} />
                  </div>
                  <span className="font-display text-xl md:text-2xl tracking-[-0.02em] group-hover:text-primary transition-colors mt-auto">
                    {t.label}
                  </span>
                </Link>
              )
            })}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────
          07 · ARCHIVE INDEX (full list)
          ──────────────────────────────────────── */}
      <section
        id="archive"
        className="relative section-pad py-24 md:py-32 border-b border-foreground/15 bg-background overflow-hidden"
      >
        <VectorNode className="absolute right-10 top-16 w-36 h-36 opacity-50 hidden md:block" uid="ac-archive-vec" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-10 md:mb-12 items-end">
            <div className="col-span-12 md:col-span-6">
              <span className="index-chip">007 · Archive</span>
              <h2 className="display-md font-display mt-4">
                <SplitReveal>The whole shelf.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed font-heading tracking-[-0.005em]">
                  Every piece we have published. Sorted newest first, grouped by year.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="border-x border-b border-foreground/15">
              <div className="hidden md:grid grid-cols-12 gap-6 px-5 py-4 border-b border-foreground/15 bg-background-alt/40 text-foreground/55 eyebrow-sm">
                <div className="col-span-1">No.</div>
                <div className="col-span-1">Date</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-6">Piece</div>
                <div className="col-span-1 text-right">Read</div>
                <div className="col-span-1 text-right">→</div>
              </div>
              {groupByYear(posts).flatMap(([year, group], yi) => [
                <div
                  key={`year-${year}`}
                  className="grid grid-cols-12 gap-6 px-5 py-4 border-b border-foreground/10 bg-background"
                >
                  <div className="col-span-12 md:col-span-2 font-display text-2xl tracking-[-0.02em]">
                    <span className="text-gradient">{year}</span>
                  </div>
                  <div className="col-span-12 md:col-span-10 flex items-end text-foreground/55 eyebrow-sm">
                    {group.length} {group.length === 1 ? 'piece' : 'pieces'}
                  </div>
                </div>,
                ...group.map((p, i) => (
                  <ArchiveRow
                    key={p._id}
                    post={p}
                    index={yi * 100 + i + 1}
                  />
                )),
              ])}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          08 · NEWSLETTER
          ──────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-36 bg-fixed-lavender overflow-hidden">
        <GridDots className="absolute -left-32 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-40 hidden md:block" uid="ac-news-dots" />
        <StackedCubes className="absolute right-12 -bottom-8 w-44 h-56 opacity-50 hidden md:block float-soft" uid="ac-news-stk" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7 space-y-6">
              <span className="index-chip">008 · Subscribe</span>
              <h2 className="display-lg font-display">
                <span className="block">
                  <SplitReveal>Get the next piece</SplitReveal>
                </span>
                <span className="block text-gradient">
                  <SplitReveal>in your inbox.</SplitReveal>
                </span>
              </h2>
              <FadeIn delay={0.2}>
                <p className="font-heading text-lg md:text-xl text-foreground/85 max-w-xl tracking-[-0.005em]">
                  No drip campaigns. No funnel. One email when there is something worth reading.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-5">
              <FadeIn delay={0.3} className="surface bracketed p-6 md:p-8">
                <form className="space-y-4">
                  <div className="field">
                    <label>Email</label>
                    <input type="email" required placeholder="you@company.com" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <span>Subscribe</span>
                    <span className="arrow-magnet">→</span>
                  </button>
                  <p className="eyebrow text-foreground/55">Unsubscribe in one click. We don&apos;t share email.</p>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ──────────────────────────────────────────────
   Subcomponents
   ────────────────────────────────────────────── */

function Stat({
  n,
  v,
  suffix = '',
  label,
  last = false,
}: {
  n: string
  v: number
  suffix?: string
  label: string
  last?: boolean
}) {
  return (
    <FadeIn
      className={`relative px-5 md:px-8 first:pl-0 ${last ? '' : 'md:border-r'} border-foreground/15`}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span className="eyebrow-sm text-foreground/60">{n}</span>
        <span className="block w-6 h-px bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)]" />
      </div>
      <div className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.025em] text-foreground">
        <Counter value={v} suffix={suffix} />
      </div>
      <p className="eyebrow text-foreground/60 mt-3">{label}</p>
    </FadeIn>
  )
}

function EmptyState() {
  return (
    <div className="border border-dashed border-foreground/20 p-12 md:p-16 text-center">
      <p className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-foreground/85">
        More pieces coming soon.
      </p>
      <p className="text-sm text-foreground/60 mt-3 font-heading">
        The next article is already being written. Run{' '}
        <code className="font-mono text-xs bg-background-alt px-2 py-1">pnpm seed:posts</code>{' '}
        to populate the launch content.
      </p>
    </div>
  )
}

function FeaturedVisual({ post }: { post: AcademyPost }) {
  if (post.thumbnailUrl) {
    return (
      <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden border border-foreground/15 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-transparent"
        />
        <CategoryGlyph category={post.category} className="absolute -bottom-8 -right-8 w-44 h-44 opacity-90 mix-blend-multiply hidden md:block" uid={`feat-${post._id}`} />
      </div>
    )
  }
  const Illo = CATEGORY_ILLO[post.category] ?? CirclesInCircumference
  return (
    <div className="relative aspect-[5/6] flex items-center justify-center bg-background-alt border border-foreground/15">
      <Illo className="w-3/4 h-3/4" uid={`feat-${post._id}`} />
    </div>
  )
}

function CategoryGlyph({
  category,
  className,
  uid,
}: {
  category: string
  className?: string
  uid?: string
}) {
  const Illo = CATEGORY_ILLO[category] ?? CirclesInCircumference
  return <Illo className={className} uid={uid} />
}

function HeroCard({ post }: { post: AcademyPost }) {
  return (
    <Link
      href={`/lawshaoor-academy/${post.slug}`}
      className="group relative flex flex-col h-full min-h-[480px] overflow-hidden"
    >
      <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 overflow-hidden bg-background-alt">
        {post.thumbnailUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <CategoryGlyph category={post.category} className="w-2/3 h-2/3 opacity-80" uid={`hero-${post._id}`} />
          </div>
        )}
        <span className="absolute top-5 left-5">
          <span className="tag tag-primary bg-background/90">{post.category}</span>
        </span>
      </div>

      <div className="p-7 md:p-9 lg:p-10 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-foreground/55 eyebrow-sm">
          <span>01</span>
          <span className="block w-6 h-px bg-foreground/30" />
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readMinutes} min</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.025em] leading-[1.05] text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="font-heading text-base md:text-lg text-foreground/75 leading-relaxed tracking-[-0.005em] line-clamp-3">
          {post.excerpt}
        </p>
        <span className="link-line text-xs font-mono tracking-[0.22em] uppercase text-foreground/85 mt-2 self-start">
          Read →
        </span>
      </div>
    </Link>
  )
}

function RailCard({ post, index }: { post: AcademyPost; index: number }) {
  const Illo = CATEGORY_ILLO[post.category] ?? CirclesInCircumference
  return (
    <Link
      href={`/lawshaoor-academy/${post.slug}`}
      className="group relative flex flex-col md:flex-row h-full p-6 md:p-7 lg:p-8 gap-5 lift-card"
    >
      <div className="md:w-32 lg:w-40 shrink-0 flex items-start justify-center">
        {post.thumbnailUrl ? (
          <div className="w-full aspect-square overflow-hidden border border-foreground/15 bg-background-alt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </div>
        ) : (
          <Illo className="w-28 h-28 lg:w-36 lg:h-36 transition-transform duration-500 group-hover:scale-105" uid={`rail-${post._id}`} />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-3 mb-3 text-foreground/55 eyebrow-sm">
          <span>{String(index).padStart(2, '0')}</span>
          <span className="block w-4 h-px bg-foreground/30" />
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readMinutes} min</span>
        </div>
        <h3 className="font-display text-xl md:text-2xl tracking-[-0.02em] leading-[1.1] text-foreground group-hover:text-primary transition-colors mb-3">
          {post.title}
        </h3>
        <p className="font-heading text-sm text-foreground/75 leading-relaxed tracking-[-0.005em] line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="tag text-[10px]">{post.category}</span>
          <span className="font-display text-2xl opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
        </div>
      </div>
    </Link>
  )
}

function CategoryCard({
  label,
  index,
  count,
}: {
  label: string
  index: number
  count: number
}) {
  const Illo = CATEGORY_ILLO[label] ?? CirclesInCircumference
  return (
    <Link
      href={`#archive`}
      className="group bg-background p-8 md:p-10 lift-card flex flex-col gap-5 min-h-[280px]"
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow text-foreground/55">{String(index).padStart(2, '0')}</span>
        <span className="eyebrow text-primary">
          {count} {count === 1 ? 'piece' : 'pieces'}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center py-2">
        <Illo className="w-28 h-28 md:w-36 md:h-36 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" uid={`cat-${index}`} />
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="font-display text-2xl md:text-3xl tracking-[-0.02em] group-hover:text-primary transition-colors">
          {label}
        </span>
        <span className="font-display text-2xl opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
          →
        </span>
      </div>
    </Link>
  )
}

function ArchiveRow({ post, index }: { post: AcademyPost; index: number }) {
  return (
    <Link
      href={`/lawshaoor-academy/${post.slug}`}
      className="group grid grid-cols-12 gap-3 md:gap-6 px-5 py-5 md:py-6 border-b border-foreground/10 last:border-b-0 items-baseline hover:bg-background-alt/60 transition-colors"
    >
      <span className="col-span-2 md:col-span-1 font-mono text-xs tracking-[0.18em] text-foreground/45 tabular-fig">
        {String(index).padStart(2, '0')}
      </span>
      <span className="hidden md:block md:col-span-1 font-mono text-xs tracking-[0.18em] text-foreground/60 tabular-fig">
        {formatDay(post.publishedAt)}
      </span>
      <span className="col-span-4 md:col-span-2">
        <span className="tag text-[10px]">{post.category}</span>
      </span>
      <span className="col-span-6 md:col-span-6 font-display text-xl md:text-2xl tracking-[-0.02em] leading-[1.1] text-foreground group-hover:text-primary transition-colors">
        {post.title}
      </span>
      <span className="hidden md:block md:col-span-1 font-mono text-xs tracking-[0.18em] text-foreground/60 tabular-fig text-right">
        {post.readMinutes} min
      </span>
      <span className="col-span-12 md:col-span-1 font-display text-xl md:text-2xl text-right opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
        →
      </span>
    </Link>
  )
}
