'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/motion/gsap-init'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Marquee } from '@/components/motion/marquee'
import { Counter } from '@/components/motion/counter'
import { Rule } from '@/components/motion/rule'
import { PinnedWords } from '@/components/motion/pinned-words'
import { HeroStatus } from '@/components/hero-status'
import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  OrbitRings,
  GridDots,
  SquareCascade,
  VectorNode,
} from '@/components/illustrations'

const EXPERTISE = [
  {
    n: '01',
    title: 'Banking & Finance',
    blurb: 'Commercial banks, financial institutions and NBFCs. Syndicated financing, Islamic modes of finance, debt restructuring, security documentation, SBP regulatory compliance, and recovery suits before Banking Courts and Tribunals.',
    href: '/practice-areas#banking-finance',
    Illo: StackedCubes,
  },
  {
    n: '02',
    title: 'Corporate & Commercial',
    blurb: 'Incorporations, dissolutions, corporate governance, mergers and acquisitions, Islamic modes of investment, licensing, exchange and repatriation controls, and liaison with SECP, SBP, FBR, and the Competition Commission of Pakistan.',
    href: '/practice-areas#corporate-commercial',
    Illo: HexagonalCascade,
  },
  {
    n: '03',
    title: 'Energy & Natural Resources',
    blurb: 'Upstream, midstream and downstream advisory. Licensing, concession agreements, joint operating agreements, LNG supply, pipeline and terminal development, refinery documentation, EPC contracts, and matters before OGRA, DGPC and the Ministry of Energy.',
    href: '/practice-areas#energy-natural-resources',
    Illo: CirclesInCircumference,
  },
  {
    n: '04',
    title: 'Dispute Resolution & Arbitration',
    blurb: 'High Courts, District Courts, specialized tribunals, regulatory bodies, and arbitration forums. Commercial disputes, contractual claims, regulatory proceedings, competition matters, labour disputes, and domestic and international arbitration.',
    href: '/practice-areas#dispute-resolution',
    Illo: TesseractCube,
  },
]

const PROCESS = [
  { n: '01', t: 'Listen',  d: 'Understand the commercial objective and the regulatory context — not just the legal question.' },
  { n: '02', t: 'Simplify',d: 'Translate complex legal issues into clear options, with the trade-offs named, not buried.' },
  { n: '03', t: 'Execute', d: 'Advisory and contentious work delivered by experienced lawyers familiar with the regulatory landscape in Pakistan.' },
  { n: '04', t: 'Support', d: 'Comprehensive legal support across the matter — from advisory through to courts, tribunals and regulatory authorities.' },
]

const INDUSTRIES = [
  'Banking & Finance',
  'Energy & Natural Resources',
  'Infrastructure',
  'Corporate Transactions',
  'Telecommunication & IT',
  'Healthcare & Pharmaceuticals',
  'Government & Public Sector',
  'Non-Profit & Aid Agencies',
]

export function HomeContent({ marqueeItems }: { marqueeItems: string[] }) {
  const wordSwapRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!wordSwapRef.current) return
    const words = ['business.', 'banking.', 'energy.', 'disputes.', 'cross-border.']
    const node = wordSwapRef.current
    const HOLD = 1.5
    const FADE = 0.8
    const INTRO_WAIT = 2

    gsap.set(node, { opacity: 0 })

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: FADE, ease: 'expo.inOut' },
    })

    tl.to(node, { opacity: 0, duration: INTRO_WAIT })
    tl.to(node, { opacity: 1 })

    for (let i = 0; i < words.length; i++) {
      const next = words[(i + 1) % words.length]
      tl.to(node, { opacity: 0 }, `+=${HOLD}`)
        .set(node, { textContent: next })
        .to(node, { opacity: 1 })
    }
  })

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* ────────────────────────────────────────────
          01 · HERO
          ──────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] section-pad bg-fixed-mist bg-grid overflow-hidden flex items-center pt-28 pb-16">
        <span aria-hidden className="hero-orb accent-breathe top-[10%] -right-[12%] hidden md:block" />
        <span aria-hidden className="hero-orb accent-breathe bottom-[-20%] -left-[15%] hidden md:block" style={{ animationDelay: '1.6s', opacity: 0.4 }} />
        <CirclesInCircumference className="absolute top-24 right-12 w-28 h-28 lg:w-36 lg:h-36 hidden md:block opacity-80" uid="hero-c1" />
        <StackedCubes className="absolute bottom-36 right-32 w-20 h-28 lg:w-24 lg:h-32 hidden md:block opacity-70" uid="hero-c2" />

        <div className="max-w-[1440px] mx-auto w-full relative">
          {/* Meta row */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
            <span className="index-chip">001 · Chambers</span>
            <div className="hidden md:flex gap-6 text-foreground/65">
              <span className="eyebrow-sm">Islamabad · UAE · DIFC · ADGM</span>
              <span className="eyebrow-sm">In association with M.B. KEMP (ME) LLP</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="display-hero font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.15}>Practical law,</SplitReveal></span>
            <span className="block">
              <SplitReveal trigger="load" delay={0.35}>for </SplitReveal>
              <span
                ref={wordSwapRef}
                className="text-gradient"
              >business.</span>
            </span>
          </h1>

          {/* Tagline */}
          <FadeIn delay={0.9} className="mt-8 md:mt-12">
            <p className="font-mono text-[11px] md:text-sm tracking-[0.42em] uppercase text-foreground/75 inline-flex items-center gap-4 md:gap-5">
              <span aria-hidden className="block w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-primary" />
              <span>
                Law<span className="text-primary">.</span> Strategy<span className="text-primary">.</span> Future<span className="text-primary">.</span>
              </span>
              <span aria-hidden className="block w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-primary" />
            </p>
          </FadeIn>

          {/* Hero CTAs */}
          <FadeIn delay={1.0} staggerChildren className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 items-start">
            <Link href="/contact" className="btn-primary">
              <span>Contact Us</span>
              <span className="arrow-magnet">→</span>
            </Link>
            <Link href="/practice-areas" className="btn-ghost">
              <span>Our Practice Areas</span>
              <span className="arrow-magnet">→</span>
            </Link>
          </FadeIn>
        </div>

        {/* Scroll cue */}
        <FadeIn delay={1.1} className="absolute left-0 right-0 bottom-6 md:bottom-8 section-pad">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-foreground/65">
            <div className="flex items-center gap-6">
              <span className="eyebrow flex items-center gap-2"><span className="dot-live" /> Scroll</span>
              <span className="block w-16 h-px bg-foreground/45" />
            </div>
            <span className="eyebrow">001 / 007</span>
          </div>
        </FadeIn>
      </section>

      {/* ────────────────────────────────────────────
          01b · INTRO
          ──────────────────────────────────────────── */}
      <section className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-1">
              <span className="eyebrow text-foreground/60">001b</span>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-2 space-y-7">
              <FadeIn>
                <p className="font-heading text-2xl md:text-3xl leading-snug text-foreground/95 max-w-xl tracking-[-0.01em]">
                  LawShaoor Chambers is a full-service law chambers based in Islamabad — and, in association with M.B. KEMP (ME) LLP, working across the UAE, DIFC and ADGM.
                </p>
              </FadeIn>
              <FadeIn staggerChildren className="flex flex-col sm:flex-row gap-3 items-start">
                <Link href="/contact" className="btn-primary">
                  <span>Get in Touch</span>
                  <span className="arrow-magnet">→</span>
                </Link>
                <Link href="/practice-areas" className="btn-ghost">
                  <span>See practice areas</span>
                  <span className="arrow-magnet">→</span>
                </Link>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <HeroStatus />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <div className="border-y border-foreground/15 py-5 md:py-6 bg-background-alt">
        <Marquee speed={50}>
          <div className="flex items-center gap-10 pr-10 text-foreground/85 font-display text-xl md:text-2xl whitespace-nowrap tracking-[0.02em]">
            {marqueeItems.map((w, i) => (
              <span key={i} className="flex items-center gap-10">
                {w}
                <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* ────────────────────────────────────────────
          02 · MANIFESTO (pinned) — direct from PDF
          ──────────────────────────────────────────── */}
      <div className="bg-fixed-lavender">
        <PinnedWords
          words={[
            'Clear, practical, and reliable legal services that meet the commercial needs of our clients.',
            'We simplify complex legal issues and offer solutions that are both legally sound and commercially workable.',
            'Professionalism, efficiency, and the best interests of the client — in every matter.',
            'Comprehensive legal support to clients operating in complex business environments.',
            'Law. Strategy. Future.',
          ]}
        />
      </div>

      {/* ────────────────────────────────────────────
          03 · CAPABILITY SNAPSHOT
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-32 border-t border-foreground/15 bg-fixed-mist overflow-hidden">
        <OrbitRings className="absolute -right-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-30 hidden md:block" uid="stats-orb" rotate />
        <GridDots className="absolute -left-12 -top-12 w-56 h-56 opacity-40 hidden md:block float-soft" uid="stats-gd" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20 items-end">
            <div className="col-span-12 md:col-span-4 space-y-4">
              <span className="index-chip">002 · Capability</span>
              <h2 className="display-sm font-display">
                <SplitReveal>At a glance.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed font-heading tracking-[-0.005em]">
                  A dedicated team handling civil, commercial, corporate, regulatory, and dispute resolution matters — for local and foreign companies, financial institutions, non-profit organizations, and individual clients.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
            {[
              { v: 12, suffix: '', label: 'Practice areas' },
              { v: 6, suffix: '', label: 'Lawyers on the bench' },
              { v: 4, suffix: '', label: 'Partner-chambers offices abroad' },
              { v: 13, suffix: '+ yrs', label: 'Founder experience' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/20 first:border-l-0">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="eyebrow-sm text-foreground/60">0{i + 1}</span>
                  <span className="block w-6 h-px bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)]" />
                </div>
                <div className="display-md font-display text-foreground">
                  <Counter value={s.v} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/60 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          04 · EXPERTISE
          ──────────────────────────────────────────── */}
      <section className="section-pad py-24 md:py-36 border-t border-foreground/15 bg-fixed-lavender">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-3">
              <span className="index-chip">003 · Practice</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Core areas of</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>practice.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy" />

          <ul>
            {EXPERTISE.map((item, i) => (
              <ExpertiseRow key={item.n} index={i} {...item} />
            ))}
          </ul>

          <FadeIn className="mt-12 md:mt-16">
            <Link href="/practice-areas" className="btn-ghost">
              <span>See all 12 practice areas</span>
              <span className="arrow-magnet">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          05 · INDUSTRIES / SECTORS
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-36 border-t border-foreground/15 bg-background overflow-hidden">
        <OrbitRings className="absolute -left-32 top-12 w-[480px] h-[480px] opacity-30 hidden md:block" uid="ind-orb" rotate />
        <CirclesInCircumference className="absolute -right-20 bottom-0 w-72 h-72 opacity-35 hidden md:block" uid="ind-circ" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-3 space-y-4">
              <span className="index-chip">004 · Sectors</span>
              <h2 className="display-sm font-display">
                <SplitReveal>Sectors we know.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed font-heading tracking-[-0.005em]">
                  Strength in sectors that are heavily regulated and commercially sensitive — banking and finance, energy and natural resources, infrastructure, and corporate transactions. Our lawyers are familiar with the regulatory landscape in Pakistan and regularly appear before courts, tribunals, and regulatory authorities.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-12" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-foreground/15">
            {INDUSTRIES.map((s, i) => (
              <div
                key={i}
                className={`group flex items-baseline gap-5 py-6 border-b border-foreground/15 ${i % 2 === 0 ? 'md:border-r md:pr-8' : 'md:pl-8'} cursor-default hover:bg-background-alt transition-colors duration-300`}
              >
                <span className="eyebrow text-foreground/55 w-10">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl md:text-4xl tracking-[-0.02em] text-foreground/90 group-hover:text-primary transition-colors duration-300 flex-1">
                  {s}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary text-xl">→</span>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          06 · METHOD
          ──────────────────────────────────────────── */}
      <section className="section-pad py-24 md:py-36 border-t border-foreground/15 bg-fixed-deep relative overflow-hidden">
        <StackedCubes className="absolute right-10 -top-4 w-44 h-56 opacity-55 hidden md:block float-soft" uid="proc-stk" />
        <HexagonalCascade className="absolute -left-24 -bottom-12 w-72 h-72 opacity-35 hidden md:block" uid="proc-hex" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-6 space-y-4">
              <span className="index-chip">005 · Approach</span>
              <h2 className="display-md font-display">
                <SplitReveal>How we work,</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>in four moves.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      {/* ────────────────────────────────────────────
          06b · STRATEGIC ASSOCIATION — M.B. KEMP
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-36 border-t border-foreground/15 bg-background overflow-hidden">
        <VectorNode className="absolute right-8 top-12 w-44 h-44 opacity-40 hidden md:block" uid="mbk-vn" />
        <SquareCascade className="absolute -left-12 bottom-0 w-56 h-56 opacity-45 hidden md:block float-soft" uid="mbk-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-6 space-y-4">
              <span className="index-chip">006 · International reach</span>
              <h2 className="display-md font-display">
                <SplitReveal>Strategic association</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>with M.B. KEMP (ME) LLP.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">
                  Through our collaboration with M.B. KEMP (ME) LLP, we support clients on matters involving the UAE, DIFC, ADGM and other international jurisdictions — drawing on a global team recognized for corporate, commercial, banking and finance, restructuring, international arbitration and complex dispute resolution.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Cross-border capability — jurisdictions we operate across */}
          <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15 mb-12">
            {[
              { j: 'Pakistan', d: 'Full-service home practice — corporate, banking, energy, regulatory & disputes.' },
              { j: 'UAE',      d: 'Onshore & free-zone matters across the Emirates.' },
              { j: 'DIFC',     d: 'Dubai International Financial Centre — common-law framework.' },
              { j: 'ADGM',     d: 'Abu Dhabi Global Market — international financial centre.' },
            ].map((x) => (
              <div key={x.j} className="bg-background p-6 md:p-8 flex flex-col gap-2">
                <span className="eyebrow text-primary">Capability</span>
                <p className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{x.j}</p>
                <p className="text-sm text-foreground/70 font-heading leading-snug">{x.d}</p>
              </div>
            ))}
          </FadeIn>

          <div className="flex items-center gap-4 mb-10">
            <span className="eyebrow text-foreground/55 whitespace-nowrap">M.B. KEMP offices</span>
            <Rule className="rule-heavy flex-1" />
          </div>

          <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
            {[
              { city: 'Hong Kong', region: 'East Asia' },
              { city: 'London',    region: 'United Kingdom' },
              { city: 'Milan',     region: 'Europe' },
              { city: 'Abu Dhabi', region: 'UAE · GCC' },
            ].map((c) => (
              <div key={c.city} className="bg-background p-8 md:p-10 flex flex-col gap-2">
                <span className="eyebrow text-foreground/55">M.B. KEMP office</span>
                <p className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{c.city}</p>
                <p className="text-sm text-foreground/65 font-mono tracking-[0.16em] uppercase mt-1">{c.region}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          07 · WHO WE ACT FOR
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-36 border-t border-foreground/15 bg-fixed-lavender overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 hidden md:block" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-6 space-y-4">
              <span className="index-chip">007 · Clients</span>
              <h2 className="display-md font-display">
                <SplitReveal>Who we</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>act for.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">
                  We combine advisory and contentious work, providing legal support to clients operating in complex business environments — at home and across borders.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15">
            {[
              { t: 'Local & foreign companies',     d: 'Mainstream and specialized corporate and commercial matters across regulated and commercially sensitive sectors.' },
              { t: 'Financial institutions',         d: 'Commercial banks, financial institutions, and non-banking finance companies (NBFCs) on a wide array of matters.' },
              { t: 'Non-profit organizations',       d: 'Local and foreign philanthropists, international and governmental aid agencies, trusts and societies.' },
              { t: 'Individual clients',             d: 'Private clients on civil, commercial and dispute resolution matters before courts, tribunals and regulatory authorities.' },
            ].map((c, i) => (
              <article key={i} className="bg-background p-8 md:p-10 lift-card relative">
                <span className="eyebrow text-foreground/55 mb-4 block">0{i + 1}</span>
                <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] mb-3">{c.t}</h3>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em] max-w-md">{c.d}</p>
              </article>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          08 · CTA
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -bottom-20 w-72 h-72 opacity-45 hidden md:block float-soft" uid="cta-orb" />
        <VectorNode className="absolute right-8 top-8 w-44 h-44 opacity-50 hidden md:block" uid="cta-vn" />
        <SquareCascade className="absolute right-1/3 bottom-8 w-32 h-32 opacity-40 hidden lg:block" uid="cta-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">008 · Next step</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Have a matter</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>to discuss?</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:items-end">
              <FadeIn delay={0.3} staggerChildren className="flex flex-col gap-3 md:items-end">
                <Link href="/contact" className="btn-primary">
                  <span>Schedule a Consultation</span>
                  <span className="arrow-magnet">→</span>
                </Link>
                <Link href="/lawshaoor-academy" className="btn-ghost">
                  <span>Explore the Academy</span>
                  <span className="arrow-magnet">→</span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ────────────────────────────────────────────
   Expertise row with hover reveal + illustration
   ──────────────────────────────────────────── */
function ExpertiseRow({
  n,
  title,
  blurb,
  href,
  Illo,
}: {
  index: number
  n: string
  title: string
  blurb: string
  href: string
  Illo: React.ComponentType<{ className?: string; uid?: string }>
}) {
  const row = useRef<HTMLLIElement>(null)

  useGSAP(
    () => {
      if (!row.current) return
      const blurbEl = row.current.querySelector('[data-blurb]')
      const titleEl = row.current.querySelector('[data-title]')
      const arrow = row.current.querySelector('[data-arrow]')
      const illo = row.current.querySelector('[data-illo]')

      gsap.set(blurbEl, { height: 0, opacity: 0 })
      gsap.set(illo, { opacity: 0.4, scale: 1 })

      const onEnter = () => {
        gsap.to(blurbEl, { height: 'auto', opacity: 1, duration: 0.4, ease: 'expo.inOut' })
        gsap.to(titleEl, { x: 12, color: 'var(--primary)', duration: 0.4, ease: 'expo.inOut' })
        gsap.to(arrow, { x: 12, opacity: 1, duration: 0.3, ease: 'expo.inOut' })
        gsap.to(illo, { opacity: 1, scale: 1.05, duration: 0.5, ease: 'expo.out' })
      }
      const onLeave = () => {
        gsap.to(blurbEl, { height: 0, opacity: 0, duration: 0.3, ease: 'expo.inOut' })
        gsap.to(titleEl, { x: 0, color: 'var(--foreground)', duration: 0.3, ease: 'expo.inOut' })
        gsap.to(arrow, { x: 0, opacity: 0.4, duration: 0.25, ease: 'expo.inOut' })
        gsap.to(illo, { opacity: 0.4, scale: 1, duration: 0.4, ease: 'expo.inOut' })
      }

      const el = row.current
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: row as any }
  )

  return (
    <li ref={row} className="group border-b border-foreground/15">
      <Link href={href} className="block py-8 md:py-12 cursor-pointer">
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="col-span-2 md:col-span-1">
            <span className="eyebrow text-foreground/55">{n}</span>
          </div>
          <div className="col-span-9 md:col-span-7">
            <h3
              data-title
              className="display-md font-display tracking-[-0.025em]"
              style={{ willChange: 'transform, color' }}
            >
              {title}
            </h3>
            <div data-blurb className="overflow-hidden">
              <p className="font-heading text-base md:text-lg text-foreground/75 leading-relaxed mt-6 max-w-2xl tracking-[-0.005em]">
                {blurb}
              </p>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-3 justify-center">
            <span data-illo className="block w-40 h-40 lg:w-52 lg:h-52" style={{ willChange: 'transform, opacity' }}>
              <Illo className="w-full h-full" uid={`exp-${n}`} />
            </span>
          </div>
          <div className="col-span-1 md:col-span-1 text-right">
            <span
              data-arrow
              className="inline-block font-display text-3xl md:text-5xl opacity-40 will-change-transform"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

/* ────────────────────────────────────────────
   Process timeline
   ──────────────────────────────────────────── */
function ProcessTimeline({ steps }: { steps: typeof PROCESS }) {
  const wrap = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!line.current || !wrap.current) return
      gsap.set(line.current, { scaleY: 0, transformOrigin: 'top center' })
      ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 0.4,
        onUpdate: (self) => {
          gsap.set(line.current!, { scaleY: self.progress })
        },
      })
    },
    { scope: wrap as any }
  )

  return (
    <div ref={wrap} className="relative">
      <div
        ref={line}
        className="absolute left-[14px] md:left-[calc(8.333%-1px)] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--grad-from)] to-[var(--grad-to)] z-0 pointer-events-none"
      />
      <Rule className="mb-0" />
      {steps.map((step) => (
        <div
          key={step.n}
          className="grid grid-cols-12 gap-4 md:gap-6 items-baseline py-10 md:py-14 border-b border-foreground/15 relative"
        >
          <div className="col-span-2 md:col-span-1 relative">
            <span className="absolute -left-1 top-2 w-3 h-3 bg-gradient-to-br from-[var(--grad-from)] to-[var(--grad-to)] z-10" />
            <span className="eyebrow text-foreground/75 ml-8 md:ml-6">{step.n}</span>
          </div>
          <div className="col-span-10 md:col-span-7 md:col-start-3">
            <h3 className="display-sm font-display">
              <SplitReveal>{step.t}</SplitReveal>
            </h3>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <FadeIn>
              <p className="text-foreground/75 leading-relaxed font-heading tracking-[-0.005em]">{step.d}</p>
            </FadeIn>
          </div>
        </div>
      ))}
    </div>
  )
}
