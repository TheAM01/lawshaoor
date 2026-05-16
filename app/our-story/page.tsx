'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { Marquee } from '@/components/motion/marquee'
import { Counter } from '@/components/motion/counter'
import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  VectorNode,
  SquareCascade,
  OrbitRings,
  GridDots,
} from '@/components/illustrations'

const TIMELINE = [
  { y: '2005', t: 'Founded',           d: 'Two M&A partners leave Big Law to build a sharper, faster firm.' },
  { y: '2009', t: 'New York office',   d: 'Fifth Avenue studio opens. First $500M deal closed.' },
  { y: '2014', t: 'West Coast',        d: 'San Francisco team formed. Tech and venture practice launches.' },
  { y: '2019', t: 'Cross-border',      d: 'European desk added. First trans-Atlantic carve-out.' },
  { y: '2023', t: 'Academy launches',  d: 'In-house programs and operator-led legal training go public.' },
  { y: '2026', t: 'Today',             d: '40+ professionals · 4 cities · $48B+ in transactions.' },
]

const VALUES = [
  { t: 'Excellence',  d: 'Every brief, every negotiation. Done at the standard you would do yourself.' },
  { t: 'Honesty',     d: 'We tell you what we think — not what you want to hear. Risks named, not buried.' },
  { t: 'Efficiency',  d: 'Your time and budget are the constraint. Smart processes. Faster turns.' },
  { t: 'Partnership', d: 'We measure success by your wins. We are still here at year five, year ten, year twenty.' },
]

export default function OurStory() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[10%] -right-[15%] hidden md:block" />
        <CirclesInCircumference className="absolute -left-20 -top-8 w-[320px] h-[320px] opacity-30 hidden md:block" uid="story-circ" />
        <VectorNode className="absolute -right-8 bottom-0 w-44 h-44 opacity-35 hidden md:block" uid="story-vn" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">001 · Our Story</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-display">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>A law firm</SplitReveal></span>
                <span className="block">
                  <SplitReveal trigger="load" delay={0.3}>built for </SplitReveal>
                  <span className="text-gradient"><SplitReveal trigger="load" delay={0.5}>operators.</SplitReveal></span>
                </span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-16 md:mt-24 items-start">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  We started LawShaoor because we believed corporate law could be faster, sharper, and more honest. So we built it that way — and we keep rebuilding it, year over year.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn delay={0.4} className="surface bracketed p-6 md:p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="index-chip">At a glance</span>
                  <span className="dot-live" />
                </div>
                <div className="h-px bg-foreground/25 mb-3" />
                <ul className="space-y-3 text-sm">
                  {[
                    ['Founded', '2005'],
                    ['Partners', '6'],
                    ['Cities', 'NY · CA · TX · IL'],
                    ['Deals closed', '200+'],
                    ['Retention', '98%'],
                  ].map(([k, v], i) => (
                    <li key={i} className="flex justify-between gap-4 items-baseline">
                      <span className="text-foreground/70 font-mono text-xs tracking-[0.18em] uppercase">{k}</span>
                      <span className="font-display text-base text-foreground">{v}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-foreground/15 bg-background-alt py-5 md:py-6">
        <Marquee speed={45}>
          <div className="flex items-center gap-12 pr-12 text-foreground/85 font-display text-xl md:text-2xl whitespace-nowrap">
            {['Excellence', 'Honesty', 'Efficiency', 'Partnership', 'Discretion', 'Speed', 'Depth'].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* STORY */}
      <section className="section-pad py-24 md:py-36 bg-background relative overflow-hidden">
        <OrbitRings className="absolute -right-16 top-8 w-[360px] h-[360px] opacity-30 hidden md:block float-soft" uid="story-orb" />
        <SquareCascade className="absolute -left-12 -bottom-12 w-56 h-56 opacity-45 hidden md:block" uid="story-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <span className="index-chip">002 · Origin</span>
            </div>
            <div className="col-span-12 md:col-span-8 space-y-8">
              <h2 className="display-md font-display max-w-3xl">
                <SplitReveal>The version of the firm we wished existed.</SplitReveal>
              </h2>
              <FadeIn className="space-y-6 font-heading text-lg md:text-xl leading-relaxed text-foreground/85 tracking-[-0.005em] max-w-3xl">
                <p>
                  We had been at the big firms — billing in six-minute increments, watching deals get held up by partners who had never been in the room.
                </p>
                <p>
                  So in 2005 we walked out and built a different kind of practice. Senior lawyers in every meeting. Honest pricing. A small bench by design.
                </p>
                <p>
                  Twenty years later, the model has not budged. The clients have. They get bigger, faster, more demanding. So do we.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE — fixed bg lavender */}
      <section className="section-pad py-24 md:py-36 border-t border-foreground/15 bg-fixed-lavender">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-4 space-y-4">
              <span className="index-chip">003 · Timeline</span>
              <h2 className="display-sm font-display">
                <SplitReveal>Twenty-one years,</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>step by step.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-2" />

          <FadeIn staggerChildren>
            {TIMELINE.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 md:gap-6 items-baseline py-8 md:py-10 border-b border-foreground/15"
              >
                <div className="col-span-3 md:col-span-2">
                  <span className="font-display text-2xl md:text-4xl text-gradient">{t.y}</span>
                </div>
                <div className="col-span-9 md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{t.t}</h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">{t.d}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* STATS — fixed bg deep */}
      <section className="relative section-pad py-24 md:py-32 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <CirclesInCircumference className="absolute -right-24 -bottom-12 w-[420px] h-[420px] opacity-35 hidden md:block" uid="story-stats-circ" />
        <StackedCubes className="absolute -left-12 -top-12 w-40 h-56 opacity-55 hidden md:block float-soft" uid="story-stats-stk" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 items-end">
            <div className="col-span-12 md:col-span-5 space-y-4">
              <span className="index-chip">004 · Receipts</span>
              <h2 className="display-md font-display">
                <SplitReveal>The proof.</SplitReveal>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
            {[
              { v: 48, prefix: '$', suffix: 'B+', label: 'Capital deployed' },
              { v: 200, suffix: '+', label: 'Deals closed' },
              { v: 98, suffix: '%', label: 'Client retention' },
              { v: 21, suffix: ' yrs', label: 'In practice' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/20 first:border-l-0">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="eyebrow-sm text-foreground/60">0{i + 1}</span>
                  <span className="block w-6 h-px bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)]" />
                </div>
                <div className="display-md font-display">
                  <Counter value={s.v} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/60 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-pad py-24 md:py-36 border-t border-foreground/15 bg-background relative overflow-hidden">
        <HexagonalCascade className="absolute -left-24 top-12 w-[400px] h-[400px] opacity-30 hidden md:block" uid="val-hex" />
        <OrbitRings className="absolute -right-24 bottom-0 w-[360px] h-[360px] opacity-30 hidden md:block" uid="val-orb" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-4 space-y-4">
              <span className="index-chip">005 · Principles</span>
              <h2 className="display-md font-display">
                <SplitReveal>What we hold</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>to.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-background p-8 md:p-12 lift-card">
                <span className="eyebrow text-foreground/55 mb-4 block">0{i + 1}</span>
                <h3 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-3 text-gradient">{v.t}</h3>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em] max-w-md">{v.d}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -bottom-20 w-72 h-72 opacity-45 hidden md:block float-soft" uid="story-cta-orb" />
        <SquareCascade className="absolute right-12 -top-8 w-56 h-56 opacity-45 hidden md:block" uid="story-cta-sq" />
        <GridDots className="absolute right-1/3 bottom-8 w-32 h-32 opacity-40 hidden lg:block" uid="story-cta-gd" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">006 · Work with us</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Meet the people</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>behind the work.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/people" className="btn-primary">
                <span>Meet the team</span>
                <span className="arrow-magnet">→</span>
              </Link>
              <Link href="/contact" className="btn-ghost">
                <span>Start a conversation</span>
                <span className="arrow-magnet">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
