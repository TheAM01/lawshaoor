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

const PILLARS = [
  {
    t: 'Clear',
    d: 'We simplify complex legal issues and offer solutions that are both legally sound and commercially workable.',
  },
  {
    t: 'Practical',
    d: 'We focus on professionalism, efficiency, and the best interests of the client — in every matter.',
  },
  {
    t: 'Reliable',
    d: 'Comprehensive legal support to clients operating in complex business environments — at home and across borders.',
  },
  {
    t: 'Connected',
    d: 'Through our strategic partnership with M.B. KEMP (ME) LLP, we draw on a global team across Hong Kong, London, Milan and Abu Dhabi.',
  },
]

const KEMP_OFFICES = [
  { city: 'Hong Kong', region: 'East Asia' },
  { city: 'London',    region: 'United Kingdom' },
  { city: 'Milan',     region: 'Europe' },
  { city: 'Abu Dhabi', region: 'UAE · GCC' },
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
          <div className="mb-10 md:mb-14">
            <span className="index-chip">001 · The Firm</span>
          </div>

          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>A full-service</SplitReveal></span>
            <span className="block">
              <SplitReveal trigger="load" delay={0.3}>law firm in </SplitReveal>
              <span className="text-gradient"><SplitReveal trigger="load" delay={0.5}>Islamabad.</SplitReveal></span>
            </span>
          </h1>

          <div className="grid grid-cols-12 gap-6 mt-16 md:mt-24 items-start">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  LawShaoor Chambers is a full-service law firm based in Islamabad, with associated offices in other major cities of Pakistan.
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
                    ['Headquarters', 'Islamabad'],
                    ['Reach', 'Other major cities of Pakistan'],
                    ['Lawyers', '6'],
                    ['Practice areas', '12'],
                    ['Partner firm', 'M.B. KEMP (ME) LLP'],
                  ].map(([k, v], i) => (
                    <li key={i} className="flex justify-between gap-4 items-baseline">
                      <span className="text-foreground/70 font-mono text-xs tracking-[0.18em] uppercase">{k}</span>
                      <span className="font-display text-base text-foreground text-right">{v}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE — practice areas */}
      <div className="border-y border-foreground/15 bg-background-alt py-5 md:py-6">
        <Marquee speed={45}>
          <div className="flex items-center gap-12 pr-12 text-foreground/85 font-display text-xl md:text-2xl whitespace-nowrap">
            {['Banking', 'Corporate', 'Energy', 'Construction', 'Disputes', 'M&A', 'Government', 'Telecoms', 'Healthcare', 'Labour', 'Non-Profit', 'UAE'].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* INTRODUCTION (PDF content) */}
      <section className="section-pad py-24 md:py-36 bg-background relative overflow-hidden">
        <OrbitRings className="absolute -right-16 top-8 w-[360px] h-[360px] opacity-30 hidden md:block float-soft" uid="story-orb" />
        <SquareCascade className="absolute -left-12 -bottom-12 w-56 h-56 opacity-45 hidden md:block" uid="story-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <span className="index-chip">002 · Introduction</span>
            </div>
            <div className="col-span-12 md:col-span-8 space-y-8">
              <h2 className="display-md font-display max-w-3xl">
                <SplitReveal>Clear, practical, reliable.</SplitReveal>
              </h2>
              <FadeIn className="space-y-6 font-heading text-lg md:text-xl leading-relaxed text-foreground/85 tracking-[-0.005em] max-w-3xl">
                <p>
                  We are committed to providing clear, practical, and reliable legal services that meet the commercial needs of our clients. Our approach is to simplify complex legal issues and offer solutions that are both legally sound and commercially workable.
                </p>
                <p>
                  The Firm combines the experience of its partners with the skills of a dedicated team of associates to handle a wide range of civil, commercial, corporate, regulatory, and dispute resolution matters. We act for local and foreign companies, financial institutions, non-profit organizations, and individual clients. In every matter, we focus on professionalism, efficiency, and the best interests of the client.
                </p>
                <p>
                  LawShaoor Chambers has developed strength in sectors that are heavily regulated and commercially sensitive, including banking and finance, energy and natural resources, infrastructure, and corporate transactions. Our lawyers are familiar with the regulatory landscape in Pakistan and regularly appear before courts, tribunals, and regulatory authorities. Through this combination of advisory and contentious work, we aim to provide comprehensive legal support to clients operating in complex business environments.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section-pad py-24 md:py-36 border-t border-foreground/15 bg-fixed-lavender">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-4 space-y-4">
              <span className="index-chip">003 · Approach</span>
              <h2 className="display-sm font-display">
                <SplitReveal>How we work,</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>and why.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15">
            {PILLARS.map((v, i) => (
              <div key={i} className="bg-background p-8 md:p-12 lift-card">
                <span className="eyebrow text-foreground/55 mb-4 block">0{i + 1}</span>
                <h3 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mb-3 text-gradient">{v.t}</h3>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em] max-w-md">{v.d}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITY STATS */}
      <section className="relative section-pad py-24 md:py-32 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <CirclesInCircumference className="absolute -right-24 -bottom-12 w-[420px] h-[420px] opacity-35 hidden md:block" uid="story-stats-circ" />
        <StackedCubes className="absolute -left-12 -top-12 w-40 h-56 opacity-55 hidden md:block float-soft" uid="story-stats-stk" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 items-end">
            <div className="col-span-12 md:col-span-5 space-y-4">
              <span className="index-chip">004 · Capability</span>
              <h2 className="display-md font-display">
                <SplitReveal>At a glance.</SplitReveal>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
            {[
              { v: 12, suffix: '', label: 'Practice areas' },
              { v: 6, suffix: '', label: 'Lawyers' },
              { v: 4, suffix: '', label: 'Partner-firm offices abroad' },
              { v: 1, suffix: '', label: 'Strategic partnership' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/20 first:border-l-0">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="eyebrow-sm text-foreground/60">0{i + 1}</span>
                  <span className="block w-6 h-px bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)]" />
                </div>
                <div className="display-md font-display">
                  <Counter value={s.v} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/60 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* M.B. KEMP PARTNERSHIP */}
      <section className="section-pad py-24 md:py-36 border-t border-foreground/15 bg-background relative overflow-hidden">
        <HexagonalCascade className="absolute -left-24 top-12 w-[400px] h-[400px] opacity-30 hidden md:block" uid="kemp-hex" />
        <OrbitRings className="absolute -right-24 bottom-0 w-[360px] h-[360px] opacity-30 hidden md:block" uid="kemp-orb" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-4 space-y-4">
              <span className="index-chip">005 · Strategic partnership</span>
              <h2 className="display-md font-display">
                <SplitReveal>M.B. KEMP</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>(ME) LLP.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 font-heading text-lg md:text-xl leading-relaxed text-foreground/85 tracking-[-0.005em]">
              <FadeIn>
                <p>
                  LawShaoor Chambers works in strategic partnership with M.B. KEMP (ME) LLP, a law firm with offices in Hong Kong, London, Milan and Abu Dhabi.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p>
                  Through this collaboration, we are able to support clients on matters involving the UAE, DIFC, ADGM and other international jurisdictions.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  The partnership strengthens our cross-border capability and allows us to draw on the experience of a global team recognized for its work in corporate, commercial, banking and finance, restructuring, international arbitration and complex dispute resolution.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
            {KEMP_OFFICES.map((c) => (
              <div key={c.city} className="bg-background p-8 md:p-10 flex flex-col gap-2">
                <span className="eyebrow text-foreground/55">M.B. KEMP office</span>
                <p className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{c.city}</p>
                <p className="text-sm text-foreground/65 font-mono tracking-[0.16em] uppercase mt-1">{c.region}</p>
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
