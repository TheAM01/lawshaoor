'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/motion/gsap-init'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionNav } from '@/components/section-nav'
import { PanelImage } from '@/components/panel-image'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Marquee } from '@/components/motion/marquee'
import { Counter } from '@/components/motion/counter'
import { Rule } from '@/components/motion/rule'
import { HeroStatus } from '@/components/hero-status'
import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  OrbitRings,
  VectorNode,
} from '@/components/illustrations'

const SECTIONS = [
  { id: 'chambers',   label: 'The Chambers' },
  { id: 'capability', label: 'Capability' },
  { id: 'practice',   label: 'Practice' },
  { id: 'sectors',    label: 'Sectors' },
  { id: 'approach',   label: 'Approach' },
  { id: 'clients',    label: 'Clients' },
  { id: 'contact',    label: 'Contact' },
]

const EXPERTISE = [
  {
    title: 'Banking & Finance',
    blurb: 'Commercial banks, financial institutions and NBFCs. Syndicated financing, Islamic modes of finance, debt restructuring, security documentation, SBP regulatory compliance, and recovery suits before Banking Courts and Tribunals.',
    href: '/practice-areas#banking-finance',
    Illo: StackedCubes,
  },
  {
    title: 'Corporate & Commercial',
    blurb: 'Incorporations, dissolutions, corporate governance, mergers and acquisitions, Islamic modes of investment, licensing, exchange and repatriation controls, and liaison with SECP, SBP, FBR, and the Competition Commission of Pakistan.',
    href: '/practice-areas#corporate-commercial',
    Illo: HexagonalCascade,
  },
  {
    title: 'Energy & Natural Resources',
    blurb: 'Upstream, midstream and downstream advisory. Licensing, concession agreements, joint operating agreements, LNG supply, pipeline and terminal development, refinery documentation, EPC contracts, and matters before OGRA, DGPC and the Ministry of Energy.',
    href: '/practice-areas#energy-natural-resources',
    Illo: CirclesInCircumference,
  },
  {
    title: 'Dispute Resolution & Arbitration',
    blurb: 'High Courts, District Courts, specialized tribunals, regulatory bodies, and arbitration forums. Commercial disputes, contractual claims, regulatory proceedings, competition matters, labour disputes, and domestic and international arbitration.',
    href: '/practice-areas#dispute-resolution',
    Illo: TesseractCube,
  },
]

const PROCESS = [
  { t: 'Listen',  d: 'Understand the commercial objective and the regulatory context — not just the legal question.' },
  { t: 'Simplify',d: 'Translate complex legal issues into clear options, with the trade-offs named, not buried.' },
  { t: 'Execute', d: 'Advisory and contentious work delivered by experienced lawyers familiar with the regulatory landscape in Pakistan.' },
  { t: 'Support', d: 'Comprehensive legal support across the matter — from advisory through to courts, tribunals and regulatory authorities.' },
]

const INDUSTRIES = [
  { t: 'Banking & Finance',           d: 'Commercial banks, financial institutions and NBFCs — financing, restructuring, security documentation and recovery.' },
  { t: 'Energy & Natural Resources',  d: 'Upstream, midstream and downstream advisory, licensing, EPC contracts and regulatory matters.' },
  { t: 'Infrastructure',              d: 'Construction, engineering and procurement — FIDIC-based contracts and project documentation.' },
  { t: 'Corporate Transactions',      d: 'Incorporations, governance, mergers and acquisitions, and cross-border investment.' },
  { t: 'Telecommunication & IT',      d: 'Internet and satellite services, software, data and the regulatory framework that governs them.' },
  { t: 'Healthcare & Pharmaceuticals',d: 'Licensing, registration and regulatory matters before the Drug Regulatory Authority of Pakistan.' },
  { t: 'Government & Public Sector',  d: 'Ministry and departmental liaison, licensing, and panel advocacy for government bodies.' },
  { t: 'Non-Profit & Aid Agencies',   d: 'Trusts, societies and the representation of international and governmental aid agencies.' },
]

export function HomeContent({ marqueeItems }: { marqueeItems: string[] }) {
  const wordSwapRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!wordSwapRef.current) return
    const words = ['business.', 'banking.', 'energy.', 'disputes.', 'cross-border.']
    const node = wordSwapRef.current
    const HOLD = 1.8
    const FADE = 0.6
    const INTRO_WAIT = 2

    gsap.set(node, { opacity: 0 })

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: FADE, ease: 'power2.inOut' },
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
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* ────────────────────────────────────────────
          HERO — split-screen 60/40
          ──────────────────────────────────────────── */}
      <section className="relative min-h-[92svh] section-pad bg-fixed-mist overflow-hidden flex items-center pt-28 md:pt-32 pb-16">
        <span aria-hidden className="hero-orb top-[6%] -right-[10%] hidden md:block" />

        <div className="max-w-[1560px] mx-auto w-full relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* LEFT — 60% */}
          <div className="lg:col-span-3">
            <FadeIn>
              <span className="eyebrow text-foreground/55 flex items-center gap-3">
                <span aria-hidden className="block w-8 h-px bg-primary/70" />
                Est. Islamabad · UAE · DIFC · ADGM
              </span>
            </FadeIn>

            <h1 className="display-hero font-display mt-6 md:mt-8">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>Practical law,</SplitReveal></span>
              <span className="block">
                <SplitReveal trigger="load" delay={0.28}>for </SplitReveal>
                <span
                  ref={wordSwapRef}
                  className="text-primary underline decoration-2 underline-offset-[6px] decoration-primary/45"
                >business.</span>
              </span>
            </h1>

            <FadeIn delay={0.7}>
              <p className="mt-7 md:mt-9 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                A full-service law chambers based in Islamabad — clear, practical, commercially-minded
                counsel, and, in association with M.B. KEMP (ME) LLP, reach across the UAE, DIFC and ADGM.
              </p>
            </FadeIn>

            <FadeIn delay={0.85} className="mt-5">
              <p className="font-heading text-xs md:text-sm tracking-[0.28em] uppercase text-foreground/65 inline-flex items-center gap-3">
                Law<span className="text-gold">.</span> Strategy<span className="text-gold">.</span> Future<span className="text-gold">.</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.95} staggerChildren className="mt-9 md:mt-10 flex flex-col sm:flex-row gap-3 items-start">
              <Link href="/contact" className="btn-primary">
                <span>Schedule a Consultation</span>
              </Link>
              <Link href="/practice-areas" className="btn-ghost">
                <span>Our Practice Areas</span>
              </Link>
            </FadeIn>
          </div>

          {/* RIGHT — 40% : abstract, professional visual panel */}
          <FadeIn delay={0.5} className="lg:col-span-2 hidden lg:block">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden">
              <PanelImage seed="lawshaoor-chambers" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
              <OrbitRings className="absolute inset-0 m-auto w-[78%] h-[78%] opacity-70" uid="hero-orbit" rotate />
              <CirclesInCircumference className="absolute right-5 top-5 w-20 h-20 opacity-80" uid="hero-c1" />
              <VectorNode className="absolute left-5 bottom-5 w-24 h-24 opacity-70" uid="hero-vn" />
              <div className="absolute left-6 bottom-6 right-6">
                <span className="eyebrow text-foreground/50">In association with</span>
                <p className="font-display text-xl font-semibold mt-1 text-foreground/85">M.B. KEMP (ME) LLP</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sticky path bar */}
      <SectionNav sections={SECTIONS} label="On this page" />

      {/* ────────────────────────────────────────────
          THE CHAMBERS — intro
          ──────────────────────────────────────────── */}
      <section id="chambers" className="section-pad py-20 md:py-28 border-t border-foreground/12 bg-background scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 space-y-7">
              <span className="eyebrow text-foreground/55">The Chambers</span>
              <FadeIn>
                <p className="font-display text-[1.6rem] md:text-[2rem] leading-snug text-foreground max-w-2xl">
                  LawShaoor Chambers is a full-service law chambers based in Islamabad — and, in association
                  with M.B. KEMP (ME) LLP, working across the UAE, DIFC and ADGM.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed max-w-xl">
                  We provide clear, practical and reliable legal services that meet the commercial needs of our
                  clients — simplifying complex issues into solutions that are both legally sound and commercially
                  workable.
                </p>
              </FadeIn>
              <FadeIn staggerChildren className="flex flex-col sm:flex-row gap-3 items-start pt-1">
                <Link href="/our-story" className="btn-primary">
                  <span>About the Chambers</span>
                </Link>
                <Link href="/practice-areas" className="btn-ghost">
                  <span>See practice areas</span>
                </Link>
              </FadeIn>
            </div>
            <div className="lg:col-span-2">
              <HeroStatus />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <div className="border-y border-foreground/12 py-5 md:py-6 bg-background-alt">
        <Marquee speed={50}>
          <div className="flex items-center gap-10 pr-10 text-foreground/80 font-display text-xl md:text-2xl whitespace-nowrap">
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
          CAPABILITY SNAPSHOT
          ──────────────────────────────────────────── */}
      <section id="capability" className="relative section-pad py-24 md:py-32 border-t border-foreground/12 bg-fixed-mist overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16 md:mb-20 lg:items-end">
            <div className="lg:col-span-3 space-y-4">
              <span className="eyebrow text-foreground/55">Capability</span>
              <h2 className="display-sm font-display">
                <SplitReveal>At a glance.</SplitReveal>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  A dedicated team handling civil, commercial, corporate, regulatory, and dispute resolution
                  matters — for local and foreign companies, financial institutions, non-profit organizations,
                  and individual clients.
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
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/15 first:border-l-0">
                <span aria-hidden className="block w-6 h-px bg-primary mb-3" />
                <div className="display-md font-display text-foreground">
                  <Counter value={s.v} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/55 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          PRACTICE
          ──────────────────────────────────────────── */}
      <section id="practice" className="section-pad py-24 md:py-32 border-t border-foreground/12 bg-fixed-lavender scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-14 md:mb-20 lg:items-end">
            <div className="lg:col-span-3">
              <span className="eyebrow text-foreground/55 mb-4 block">Practice</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Core areas of</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>practice.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  We do not generalize. We act with clinical depth across the sectors that matter most to our
                  clients — regulated, commercially sensitive, and often cross-border.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy" />

          <ul>
            {EXPERTISE.map((item) => (
              <ExpertiseRow key={item.title} {...item} />
            ))}
          </ul>

          <FadeIn className="mt-12 md:mt-16">
            <Link href="/practice-areas" className="btn-ghost">
              <span>See all practice areas</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTORS
          ──────────────────────────────────────────── */}
      <section id="sectors" className="relative section-pad py-24 md:py-32 border-t border-foreground/12 bg-background overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-14 md:mb-20 lg:items-end">
            <div className="lg:col-span-3 space-y-4">
              <span className="eyebrow text-foreground/55">Sectors</span>
              <h2 className="display-sm font-display">
                <SplitReveal>Sectors we know.</SplitReveal>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  Strength in sectors that are heavily regulated and commercially sensitive. Our lawyers are
                  familiar with the regulatory landscape in Pakistan and regularly appear before courts,
                  tribunals, and regulatory authorities.
                </p>
              </FadeIn>
            </div>
          </div>

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {INDUSTRIES.map((s) => (
              <div key={s.t} className="az-card">
                <span aria-hidden className="az-mark block w-7 h-px mb-2" />
                <h3 className="font-display text-xl md:text-2xl leading-tight">{s.t}</h3>
                <p className="text-sm md:text-[0.95rem] text-foreground/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          APPROACH
          ──────────────────────────────────────────── */}
      <section id="approach" className="section-pad py-24 md:py-32 border-t border-foreground/12 bg-fixed-deep relative overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 md:mb-20">
            <div className="space-y-4">
              <span className="eyebrow text-foreground/55">Approach</span>
              <h2 className="display-md font-display">
                <SplitReveal>How we work,</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>in four moves.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      {/* ────────────────────────────────────────────
          STRATEGIC ASSOCIATION — M.B. KEMP
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-32 border-t border-foreground/12 bg-background overflow-hidden">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 md:mb-16 lg:items-end">
            <div className="lg:col-span-3 space-y-4">
              <span className="eyebrow text-foreground/55">International reach</span>
              <h2 className="display-md font-display">
                <SplitReveal>Strategic association</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>with M.B. KEMP (ME) LLP.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  Through our collaboration with M.B. KEMP (ME) LLP, we support clients on matters involving the
                  UAE, DIFC, ADGM and other international jurisdictions — drawing on a global team recognized for
                  corporate, banking and finance, restructuring, and international arbitration.
                </p>
              </FadeIn>
            </div>
          </div>

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-12">
            {[
              { j: 'Pakistan', d: 'Full-service home practice — corporate, banking, energy, regulatory & disputes.' },
              { j: 'UAE',      d: 'Onshore & free-zone matters across the Emirates.' },
              { j: 'DIFC',     d: 'Dubai International Financial Centre — common-law framework.' },
              { j: 'ADGM',     d: 'Abu Dhabi Global Market — international financial centre.' },
            ].map((x) => (
              <div key={x.j} className="az-card">
                <span className="eyebrow text-primary">Capability</span>
                <h3 className="font-display text-2xl md:text-3xl">{x.j}</h3>
                <p className="text-sm text-foreground/65 leading-snug">{x.d}</p>
              </div>
            ))}
          </FadeIn>

          <div className="flex items-center gap-4 mb-10">
            <span className="eyebrow text-foreground/55 whitespace-nowrap">M.B. KEMP offices</span>
            <Rule className="rule-heavy flex-1" />
          </div>

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { city: 'Hong Kong', region: 'East Asia' },
              { city: 'London',    region: 'United Kingdom' },
              { city: 'Milan',     region: 'Europe' },
              { city: 'Abu Dhabi', region: 'UAE · GCC' },
            ].map((c) => (
              <div key={c.city} className="az-card">
                <span className="eyebrow text-foreground/50">M.B. KEMP office</span>
                <h3 className="font-display text-2xl md:text-3xl">{c.city}</h3>
                <p className="text-sm text-foreground/60 tracking-[0.12em] uppercase mt-1">{c.region}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          WHO WE ACT FOR
          ──────────────────────────────────────────── */}
      <section id="clients" className="relative section-pad py-24 md:py-32 border-t border-foreground/12 bg-fixed-lavender overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 md:mb-16 lg:items-end">
            <div className="lg:col-span-3 space-y-4">
              <span className="eyebrow text-foreground/55">Clients</span>
              <h2 className="display-md font-display">
                <SplitReveal>Who we</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>act for.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  We combine advisory and contentious work, providing legal support to clients operating in
                  complex business environments — at home and across borders.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {[
              { t: 'Local & foreign companies', d: 'Mainstream and specialized corporate and commercial matters across regulated and commercially sensitive sectors.' },
              { t: 'Financial institutions',     d: 'Commercial banks, financial institutions, and non-banking finance companies (NBFCs) on a wide array of matters.' },
              { t: 'Non-profit organizations',   d: 'Local and foreign philanthropists, international and governmental aid agencies, trusts and societies.' },
              { t: 'Individual clients',         d: 'Private clients on civil, commercial and dispute resolution matters before courts, tribunals and regulatory authorities.' },
            ].map((c, i) => (
              <article key={i} className="az-card">
                <span aria-hidden className="az-mark block w-7 h-px mb-2" />
                <h3 className="font-display text-2xl md:text-3xl">{c.t}</h3>
                <p className="text-foreground/65 leading-relaxed">{c.d}</p>
              </article>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          CTA
          ──────────────────────────────────────────── */}
      <section id="contact" className="relative section-pad py-28 md:py-40 border-t border-foreground/12 bg-fixed-deep overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Next step</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Have a matter</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>to discuss?</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
              <FadeIn delay={0.2} staggerChildren className="flex flex-col gap-3 lg:items-end">
                <Link href="/contact" className="btn-primary">
                  <span>Schedule a Consultation</span>
                </Link>
                <Link href="/lawshaoor-academy" className="btn-ghost">
                  <span>Explore the Academy</span>
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
  title,
  blurb,
  href,
  Illo,
}: {
  title: string
  blurb: string
  href: string
  Illo: React.ComponentType<{ className?: string; uid?: string }>
}) {
  return (
    <li className="group border-b border-foreground/12">
      <Link href={href} className="block py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12 items-center">
          {/* 60% — text, always visible */}
          <div className="lg:col-span-3">
            <h3 className="display-md font-display group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed mt-4 max-w-2xl">
              {blurb}
            </p>
          </div>
          {/* 40% — illustration */}
          <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-5">
            <span className="block w-28 h-28 lg:w-44 lg:h-44 opacity-70 group-hover:opacity-100 transition-opacity">
              <Illo className="w-full h-full" uid={`exp-${title}`} />
            </span>
            <span className="font-display text-3xl md:text-4xl text-primary opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              →
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

/* ────────────────────────────────────────────
   Process timeline (no numbering — dots + titles)
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
        className="absolute left-[7px] top-0 bottom-0 w-px bg-primary z-0 pointer-events-none"
      />
      <Rule className="mb-0" />
      {steps.map((step) => (
        <div
          key={step.t}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline py-10 md:py-14 border-b border-foreground/12 relative"
        >
          <div className="md:col-span-1 relative">
            <span className="absolute -left-1 top-3 w-3.5 h-3.5 bg-primary rounded-full z-10" />
          </div>
          <div className="md:col-span-6 md:col-start-3">
            <h3 className="display-sm font-display">
              <SplitReveal>{step.t}</SplitReveal>
            </h3>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <FadeIn>
              <p className="text-foreground/70 leading-relaxed">{step.d}</p>
            </FadeIn>
          </div>
        </div>
      ))}
    </div>
  )
}
