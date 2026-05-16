'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Marquee } from '@/components/motion/marquee'
import { Rule } from '@/components/motion/rule'
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
} from '@/components/illustrations'

const CATEGORIES = [
  { slug: 'mergers',     label: 'M&A',          count: 24 },
  { slug: 'governance',  label: 'Governance',   count: 18 },
  { slug: 'contracts',   label: 'Contracts',    count: 31 },
  { slug: 'capital',     label: 'Capital',      count: 22 },
  { slug: 'sector',      label: 'Sector Notes', count: 14 },
  { slug: 'opinion',     label: 'Opinion',      count: 11 },
]

const FEATURED = {
  category: 'M&A',
  date: 'April 2026',
  read: '12 min read',
  title: 'The earnout clauses that quietly kill deals',
  excerpt:
    'Earnouts are sold as a bridge between buyer and seller. In practice they are the most-litigated clause in the modern transaction. Here is what the post-close fights actually look like — and the seven drafting choices that prevent them.',
  Illo: CirclesInCircumference,
}

const ARTICLES = [
  {
    n: '01', category: 'Governance', date: 'April 2026', read: '8 min',
    title: 'What boards get wrong about \"oversight\"',
    excerpt: 'The Delaware Caremark line has shifted again. A practical update on what directors actually have to do now.',
    Illo: HexagonalCascade,
  },
  {
    n: '02', category: 'Capital', date: 'April 2026', read: '6 min',
    title: 'Convertible notes, ten years on',
    excerpt: 'The instrument that ate venture finance. What the cap-table math really looks like at conversion.',
    Illo: StackedCubes,
  },
  {
    n: '03', category: 'Contracts', date: 'March 2026', read: '11 min',
    title: 'Reading an MSA in twenty minutes',
    excerpt: 'A senior-counsel reading order: the seven sections that matter, in the order you should hit them.',
    Illo: TesseractCube,
  },
  {
    n: '04', category: 'M&A', date: 'March 2026', read: '9 min',
    title: 'Diligence for the AI-era target',
    excerpt: 'Model rights, data provenance, and the new representations that should be in every tech-stack acquisition.',
    Illo: VectorNode,
  },
  {
    n: '05', category: 'Sector Notes', date: 'March 2026', read: '7 min',
    title: 'Healthcare roll-ups: the regulatory floor is rising',
    excerpt: 'CMS, FTC, and state AGs are coordinating more than they used to. What that means for add-on strategy.',
    Illo: OrbitRings,
  },
  {
    n: '06', category: 'Opinion', date: 'February 2026', read: '5 min',
    title: 'Stop using \"reasonable best efforts\" without asking what it means',
    excerpt: 'It does not mean what your last counterparty thought it meant. A short polemic with cases attached.',
    Illo: VectorNode,
  },
  {
    n: '07', category: 'Capital', date: 'February 2026', read: '10 min',
    title: 'Senior debt covenants in a higher-rate world',
    excerpt: 'The covenants lenders are tightening in 2026 — and the counter-moves that still work.',
    Illo: StackedCubes,
  },
  {
    n: '08', category: 'Contracts', date: 'February 2026', read: '6 min',
    title: 'Indemnity caps: where the real negotiation lives',
    excerpt: 'A walkthrough of the four cap structures, when each one is appropriate, and the fights they predict.',
    Illo: CirclesInCircumference,
  },
  {
    n: '09', category: 'Governance', date: 'January 2026', read: '8 min',
    title: 'When the founder is the problem',
    excerpt: 'A field guide for boards navigating high-conflict founder transitions without litigation.',
    Illo: GridDots,
  },
]

const TOPICS = [
  { label: 'Earnouts',           Illo: OrbitRings },
  { label: 'Cap tables',         Illo: StackedCubes },
  { label: 'Cross-border',       Illo: VectorNode },
  { label: 'Board duty',         Illo: HexagonalCascade },
  { label: 'Drafting craft',     Illo: WaveBars },
  { label: 'Tax structuring',    Illo: SquareCascade },
  { label: 'Diligence',          Illo: GridDots },
  { label: 'Negotiation theory', Illo: OrbitRings },
]

export default function Academy() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[10%] -right-[12%] hidden md:block" />
        <CirclesInCircumference className="absolute -left-16 -top-8 w-[340px] h-[340px] opacity-30 hidden md:block" uid="ac-hero-bc" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="mb-10 md:mb-14">
            <span className="index-chip">001 · Academy</span>
          </div>

          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>The LawShaoor</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.35}>Academy.</SplitReveal></span>
          </h1>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20 items-start">
            <div className="col-span-12 md:col-span-6 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  Long-form notes, deal teardowns, and practical guides on corporate law. Written by the partners doing the work — for operators, founders, GCs, and the curious.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-3 hidden md:flex justify-end">
              <CirclesInCircumference className="w-36 h-36 lg:w-44 lg:h-44 opacity-90" uid="ac-hero-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY MARQUEE */}
      <div className="border-y border-foreground/15 bg-background-alt py-5 md:py-6">
        <Marquee speed={40}>
          <div className="flex items-center gap-12 pr-12 text-foreground/85 font-display text-xl md:text-2xl whitespace-nowrap">
            {['Mergers', 'Governance', 'Contracts', 'Capital', 'Sector Notes', 'Opinion', 'Cross-Border', 'Restructuring', 'Diligence', 'Boards'].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* FEATURED ARTICLE — big card with big illustration */}
      <section className="relative section-pad py-20 md:py-28 border-t border-foreground/15 bg-fixed-lavender overflow-hidden">
        <OrbitRings className="absolute -right-40 top-10 w-[520px] h-[520px] opacity-35 hidden md:block" uid="ac-feat-seg" rotate />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-10 items-end">
            <div className="col-span-12 md:col-span-5 space-y-3">
              <span className="index-chip">002 · Featured</span>
              <h2 className="display-sm font-display">
                <SplitReveal>This month&apos;s read.</SplitReveal>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn>
            <article className="grid grid-cols-12 gap-6 md:gap-10 bg-background border border-foreground/15 p-8 md:p-12 lift-card">
              <div className="col-span-12 md:col-span-5 flex items-center justify-center">
                <FEATURED.Illo className="w-72 h-72 md:w-[420px] md:h-[420px]" uid="ac-featured" />
              </div>
              <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="tag tag-primary">{FEATURED.category}</span>
                  <span className="eyebrow text-foreground/55">{FEATURED.date}</span>
                  <span className="eyebrow text-foreground/55">· {FEATURED.read}</span>
                </div>
                <h3 className="font-display text-4xl md:text-6xl tracking-[-0.025em] mb-6 leading-[0.95]">
                  {FEATURED.title}
                </h3>
                <p className="font-heading text-lg md:text-xl text-foreground/85 leading-relaxed mb-8 max-w-2xl tracking-[-0.005em]">
                  {FEATURED.excerpt}
                </p>
                <Link href="#" className="btn-primary self-start">
                  <span>Read the piece</span>
                  <span className="arrow-magnet">→</span>
                </Link>
              </div>
            </article>
          </FadeIn>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative section-pad py-20 md:py-24 border-t border-foreground/15 bg-background overflow-hidden">
        <SquareCascade className="absolute -left-24 -top-8 w-[420px] h-[420px] opacity-25 hidden md:block" uid="ac-cat-iso" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-10 items-end">
            <div className="col-span-12 md:col-span-4 space-y-3">
              <span className="index-chip">003 · Browse</span>
              <h2 className="display-sm font-display">
                <SplitReveal>By category.</SplitReveal>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/15">
            {CATEGORIES.map((c, i) => (
              <Link
                key={c.slug}
                href={`#${c.slug}`}
                className="group bg-background p-6 md:p-8 lift-card flex flex-col gap-3"
              >
                <span className="eyebrow text-foreground/55">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-xl md:text-2xl tracking-[-0.02em] group-hover:text-primary transition-colors">
                  {c.label}
                </span>
                <span className="eyebrow text-primary mt-auto">{c.count} pieces</span>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ARTICLE GRID — fixed deep bg */}
      <section className="relative section-pad py-24 md:py-32 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -right-24 bottom-0 w-[520px] h-[520px] opacity-35 hidden md:block" uid="ac-arc" />
        <CirclesInCircumference className="absolute -left-20 top-10 w-72 h-72 opacity-40 hidden md:block float-soft" uid="ac-sph" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-6">
              <span className="index-chip">004 · Latest pieces</span>
              <h2 className="display-md font-display mt-4">
                <SplitReveal>Recent writing,</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>fresh off the desk.</SplitReveal></span>
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

          <Rule className="rule-heavy mb-0" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/15 border-x border-b border-foreground/15">
            {ARTICLES.map((a) => (
              <ArticleCard key={a.n} article={a} />
            ))}
          </FadeIn>

          <FadeIn className="mt-12 flex justify-center">
            <Link href="#" className="btn-ghost">
              <span>View all pieces</span>
              <span className="arrow-magnet">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* TOPIC TILES — visual exploration */}
      <section className="relative section-pad py-24 md:py-32 border-t border-foreground/15 bg-background overflow-hidden">
        <HexagonalCascade className="absolute -right-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-30 hidden md:block" uid="ac-hex" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-5">
              <span className="index-chip">005 · Topics</span>
              <h2 className="display-md font-display mt-4">
                <SplitReveal>Threads</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>we keep pulling on.</SplitReveal></span>
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

          <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/15">
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

      {/* NEWSLETTER — fixed lavender */}
      <section className="relative section-pad py-24 md:py-36 border-t border-foreground/15 bg-fixed-lavender overflow-hidden">
        <GridDots className="absolute -left-32 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-40 hidden md:block" uid="ac-newsletter-dmo" />
        <StackedCubes className="absolute right-12 -bottom-8 w-44 h-56 opacity-50 hidden md:block float-soft" uid="ac-newsletter-stk" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7 space-y-6">
              <span className="index-chip">006 · Subscribe</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Get the next piece</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>in your inbox.</SplitReveal></span>
              </h2>
              <FadeIn delay={0.2}>
                <p className="font-heading text-lg md:text-xl text-foreground/85 max-w-xl tracking-[-0.005em]">
                  No drip campaigns. No funnel. One email when there is something worth reading.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-5">
              <FadeIn delay={0.3} className="surface bracketed p-6 md:p-8">
                <form
                  onSubmit={(e) => { e.preventDefault() }}
                  className="space-y-4"
                >
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

function ArticleCard({
  article,
}: {
  article: typeof ARTICLES[number]
}) {
  const { category, date, read, title, excerpt, Illo } = article

  return (
    <article className="bg-background p-7 md:p-8 lift-card flex flex-col">
      {/* Illustration block */}
      <div className="relative aspect-[5/3] mb-6 overflow-hidden bg-background-alt border border-foreground/15 flex items-center justify-center">
        <Illo className="w-3/4 h-3/4" uid={`art-${article.n}`} />
      </div>

      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="tag tag-primary">{category}</span>
        <span className="eyebrow text-foreground/55">{date}</span>
        <span className="eyebrow text-foreground/55">· {read}</span>
      </div>

      <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] mb-3 leading-[1.05]">
        {title}
      </h3>

      <p className="font-heading text-sm md:text-base text-foreground/80 leading-relaxed mb-6 tracking-[-0.005em]">
        {excerpt}
      </p>

      <Link href="#" className="link-line text-xs font-mono tracking-[0.22em] uppercase text-foreground/85 mt-auto self-start">
        Read →
      </Link>
    </article>
  )
}
