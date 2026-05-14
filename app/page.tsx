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
import { ScrollLine } from '@/components/motion/scroll-line'
import { Rule } from '@/components/motion/rule'
import { PinnedWords } from '@/components/motion/pinned-words'
import { GridLines } from '@/components/motion/grid-lines'
import { HeroStatus } from '@/components/hero-status'

const EXPERTISE = [
  {
    n: '01',
    title: 'Mergers & Acquisitions',
    blurb: 'Buy-side, sell-side, carve-outs and roll-ups. Strategy through close — and the integration that actually matters.',
    href: '/practice-areas#mergers',
  },
  {
    n: '02',
    title: 'Corporate Governance',
    blurb: 'Boards, bylaws, committees, compliance. The unsexy architecture that determines who decides what, and when.',
    href: '/practice-areas#governance',
  },
  {
    n: '03',
    title: 'Commercial Contracts',
    blurb: 'Partnerships, licensing, SaaS, distribution. Drafted to win at the negotiation table — and survive year five.',
    href: '/practice-areas#strategy',
  },
  {
    n: '04',
    title: 'Capital & Financing',
    blurb: 'Debt, equity, warrants, covenants. The paperwork behind the wire transfer.',
    href: '/services',
  },
]

const PROCESS = [
  { n: '01', t: 'Listen', d: 'A real conversation. The actual problem, not the cleaned-up version.' },
  { n: '02', t: 'Frame', d: 'Strategy first, then law. We tell you what we would do, and why.' },
  { n: '03', t: 'Execute', d: 'Senior lawyers at the desk. Detail by detail, deadline by deadline.' },
  { n: '04', t: 'Stay', d: 'After close, we are still on the call. That is the whole point.' },
]

const INDUSTRIES = [
  'Technology & SaaS',
  'Healthcare & Life Sciences',
  'Private Equity',
  'Consumer & Retail',
  'Manufacturing',
  'Real Estate & Finance',
  'Media & Entertainment',
  'Energy & Climate',
]

const TESTIMONIALS = [
  {
    quote: 'They actually care. The deal doesn\'t happen without them.',
    name: 'Daniela Reyes',
    role: 'CEO, Fortune 500 Industrial',
    matter: '$2.4B carve-out · 11 jurisdictions',
  },
  {
    quote: 'Three weeks faster to close than our last deal. And we got a better cap table out of it.',
    name: 'Marcus Hale',
    role: 'Founder & CEO, Hale Robotics',
    matter: 'Series C — $185M',
  },
  {
    quote: 'They told us not to do the deal. Saved us roughly forty million dollars in regret.',
    name: 'Priya Anand',
    role: 'Managing Partner, Anand Capital',
    matter: 'Aborted acquisition · diligence stage',
  },
  {
    quote: 'A partner on the call every time. Not a junior, not a memo. The actual partner.',
    name: 'Thomas Vance',
    role: 'GC, NorthBay Health Systems',
    matter: 'Ongoing general counsel',
  },
]

const FEATURED_MATTERS = [
  { code: 'M-2204', y: '2026', t: 'Cross-border SaaS acquisition', v: '$420M', stage: 'Closed' },
  { code: 'G-3110', y: '2026', t: 'Public-company board restructure', v: 'Confidential', stage: 'Active' },
  { code: 'C-7728', y: '2025', t: 'Strategic JV — Series C portfolio', v: '$95M', stage: 'Closed' },
  { code: 'F-1190', y: '2025', t: 'Senior debt facility renegotiation', v: '$180M', stage: 'Closed' },
  { code: 'M-2098', y: '2025', t: 'Healthcare roll-up — five add-ons', v: '$750M', stage: 'Closed' },
  { code: 'E-4421', y: '2024', t: 'Executive compensation redesign', v: 'Confidential', stage: 'Closed' },
]

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const wordSwapRef = useRef<HTMLSpanElement>(null)

  // Rotating accent word — strict delay so the BLACK headline finishes
  // first (SplitReveals: start 0.35s + duration 0.55s = done at 0.9s),
  // then a beat of stillness, THEN the orange word fades in.
  //
  // Delay is enforced as an explicit "wait" tween at the head of the
  // timeline (not as `delay:` on the timeline config) because the latter
  // can be skipped if useGSAP re-runs under React strict mode.
  useGSAP(() => {
    if (!wordSwapRef.current) return
    const words = ['mergers.', 'governance.', 'capital.', 'contracts.', 'strategy.']
    const node = wordSwapRef.current
    const HOLD = 1.5
    const FADE = 0.8
    const INTRO_WAIT = 2 // 0.9s black-text reveal + 0.7s breathing room

    // Lock hidden via inline style; CSS class is a backup.
    gsap.set(node, { opacity: 0 })

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: FADE, ease: 'expo.inOut' },
    })

    // Hard wait at the very start of the timeline — invisible no-op tween
    // that holds opacity:0 for INTRO_WAIT seconds.
    tl.to(node, { opacity: 0, duration: INTRO_WAIT })

    // Initial fade-in of the first word.
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
      <ScrollLine />

      {/* ────────────────────────────────────────────
          01 · HERO — headline only, exact viewport height
          ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[100svh] section-pad bg-grid overflow-hidden flex items-center">
        <span aria-hidden className="hero-orb accent-breathe top-[18%] -right-[10%] hidden md:block" />
        <span aria-hidden className="hero-orb accent-breathe bottom-[-20%] -left-[15%] hidden md:block" style={{ animationDelay: '1.6s', opacity: 0.35 }} />
        <div className="max-w-[1440px] mx-auto w-full relative">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-2 flex md:flex-col gap-4 md:gap-3">
              <span className="index-chip">001 — Studio</span>
              <div className="hidden md:flex flex-col gap-1.5 mt-3 text-foreground/70">
                <span className="eyebrow-sm">EST. 2005</span>
                <span className="eyebrow-sm">NY · CA · TX · IL</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-hero font-serif">
                <span className="block"><SplitReveal trigger="load" delay={0.15}>Corporate law,</SplitReveal></span>
                <span className="block"><SplitReveal trigger="load" delay={0.35}>redrawn for</SplitReveal></span>
                <span className="block italic-display">
                  <span
                    id='this-should-have-delay'
                    ref={wordSwapRef}
                    className="rotating-word text-accent-shimmer"
                  >mergers.</span>
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Floating scroll cue, pinned to bottom of hero */}
        <FadeIn delay={1.1} className="absolute left-0 right-0 bottom-6 md:bottom-8 section-pad">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-foreground/70">
            <div className="flex items-center gap-6">
              <span className="eyebrow flex items-center gap-2"><span className="dot-live" /> Scroll</span>
              <span className="block w-16 h-px bg-foreground/55" />
            </div>
            <span className="eyebrow">001 / 008</span>
          </div>
        </FadeIn>
      </section>

      {/* ────────────────────────────────────────────
          01b · INTRO — paragraph, CTAs, on-the-desk panel
          ──────────────────────────────────────────── */}
      <section className="section-pad py-20 md:py-28 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-1">
              <span className="eyebrow text-foreground/65">001b</span>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-2 space-y-7">
              <FadeIn>
                <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground/95 max-w-xl">
                  A boutique practice for operators who move fast and think long. We handle the big deals, the messy boards, the contracts that actually matter.
                </p>
              </FadeIn>
              <FadeIn staggerChildren className="flex flex-col sm:flex-row gap-3 items-start">
                <Link href="/contact" className="btn-ink">
                  <span>Schedule a call</span>
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
      <div className="border-y-2 border-foreground/30 py-5 md:py-7 bg-secondary">
        <Marquee speed={50}>
          <div className="flex items-center gap-10 pr-10 text-foreground/75 font-serif italic-display text-xl md:text-2xl whitespace-nowrap">
            {[
              'M&A',
              'Governance',
              'Capital Markets',
              'Strategic Partnerships',
              'Restructuring',
              'Joint Ventures',
              'Compliance',
              'Executive Matters',
              'Tech & SaaS',
              'Cross-Border Transactions',
            ].map((w, i) => (
              <span key={i} className="flex items-center gap-10">
                {w}
                <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* ────────────────────────────────────────────
          02 · MANIFESTO (pinned)
          ──────────────────────────────────────────── */}
      <PinnedWords
        words={[
          'We don\'t write contracts. We design leverage — and then we paper it.',
          'Senior lawyers at the desk. Always. No first-year associates dressed up as partners.',
          'Strategy first. Citations later. The law is a tool, not the point.',
          'The deal closes. We stay on the call. That\'s where the work actually lives.',
        ]}
      />

      {/* ────────────────────────────────────────────
          03 · STATS
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-32 border-t-2 border-foreground/30">
        <GridLines />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20 items-end">
            <div className="col-span-12 md:col-span-4 space-y-4">
              <span className="index-chip">002 — Track record</span>
              <h2 className="display-sm font-serif">
                <SplitReveal>By the numbers</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed">
                  Two decades of corporate work — across two coasts and four jurisdictions. The receipts.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
            {[
              { v: 48, prefix: '$', suffix: 'B+', label: 'Capital deployed' },
              { v: 200, suffix: '+', label: 'Deals closed' },
              { v: 98, suffix: '%', label: 'Client retention' },
              { v: 20, suffix: '+', label: 'Years on the desk' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/30 first:border-l-0">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="eyebrow-sm text-foreground/65">0{i + 1}</span>
                  <span className="block w-6 h-px bg-primary" />
                </div>
                <div className="display-md font-serif text-foreground">
                  <Counter value={s.v} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/65 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          04 · EXPERTISE — editorial index
          ──────────────────────────────────────────── */}
      <section className="section-pad py-24 md:py-36 border-t-2 border-foreground/30 bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">003 — Practice</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h2 className="display-lg font-serif">
                <span className="block"><SplitReveal>What we</SplitReveal></span>
                <span className="block italic-display text-primary"><SplitReveal>actually do.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy" />

          <ul>
            {EXPERTISE.map((item, i) => (
              <ExpertiseRow key={item.n} index={i} {...item} />
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          05 · INDUSTRIES — chip wall
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-36 border-t-2 border-foreground/30">
        <GridLines columns={6} />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-3 space-y-4">
              <span className="index-chip">004 — Sectors</span>
              <h2 className="display-sm font-serif">
                <SplitReveal>Industries we know</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed">
                  We work across sectors where corporate decisions move fast and the legal architecture has to keep up. Not generalist — specifically trained for the messiness of operator-led businesses.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-12" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-foreground/25">
            {INDUSTRIES.map((s, i) => (
              <div
                key={i}
                className={`group flex items-baseline gap-5 py-6 border-b border-foreground/25 ${i % 2 === 0 ? 'md:border-r md:pr-8' : 'md:pl-8'} cursor-default hover:bg-card transition-colors duration-300`}
              >
                <span className="eyebrow text-foreground/65 w-10">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-2xl md:text-4xl tracking-[-0.02em] text-foreground/90 group-hover:text-primary transition-colors duration-300 flex-1">
                  {s}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary text-xl">→</span>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          06 · PROCESS — timeline with rules
          ──────────────────────────────────────────── */}
      <section className="section-pad py-24 md:py-36 border-t-2 border-foreground/30 bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-4 space-y-4">
              <span className="index-chip">005 — Method</span>
              <h2 className="display-md font-serif">
                <SplitReveal>How we work,</SplitReveal>{' '}
                <span className="italic-display text-primary"><SplitReveal>in four moves.</SplitReveal></span>
              </h2>
            </div>
          </div>

          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      {/* ────────────────────────────────────────────
          06b · FEATURED MATTERS — recent work table
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-36 border-t-2 border-foreground/30">
        <GridLines columns={6} />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-5 space-y-4">
              <span className="index-chip">006 — Recent matters</span>
              <h2 className="display-md font-serif">
                <SplitReveal>Selected work,</SplitReveal>{' '}
                <span className="italic-display text-primary"><SplitReveal>on the desk lately.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed">
                  A short slice of what we've been working through. Some are public. Most are not — names off, shape on.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-2" />

          <FadeIn staggerChildren className="grid grid-cols-1">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-12 gap-6 py-4 border-b border-foreground/30 text-foreground/65 eyebrow-sm">
              <div className="col-span-1">Code</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-6">Matter</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            {FEATURED_MATTERS.map((m, i) => (
              <div
                key={m.code}
                className="group grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6 py-5 md:py-6 border-b border-foreground/30 items-baseline hover:bg-card transition-colors duration-300 cursor-default"
              >
                <span className="md:col-span-1 eyebrow text-primary font-bold">{m.code}</span>
                <span className="md:col-span-1 text-sm text-foreground/65 tabular-fig">{m.y}</span>
                <span className="col-span-2 md:col-span-6 font-serif text-xl md:text-2xl tracking-[-0.02em] text-foreground group-hover:text-primary transition-colors">{m.t}</span>
                <span className="md:col-span-2 text-sm text-foreground/85 tabular-fig">{m.v}</span>
                <span className="md:col-span-2 md:text-right text-xs">
                  <span className={`tag ${m.stage === 'Active' ? 'tag-primary' : ''}`}>
                    {m.stage === 'Active' && <span className="dot-live" />}
                    {m.stage}
                  </span>
                </span>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          07 · TESTIMONIALS — multi-card grid + big quote
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-36 border-t-2 border-foreground/30 bg-secondary overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 hidden md:block" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-6 space-y-4">
              <span className="index-chip">007 — Word on the street</span>
              <h2 className="display-md font-serif">
                <SplitReveal>What clients</SplitReveal>{' '}
                <span className="italic-display text-primary"><SplitReveal>actually say.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed">
                  Real founders, real GCs, real partners — quoted with permission. No anonymous testimonials, no "Fortune 500 executive" filler.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/20">
            {TESTIMONIALS.map((t, i) => (
              <article
                key={i}
                className="bg-secondary p-8 md:p-10 lift-card relative"
              >
                <span aria-hidden className="absolute top-4 right-6 font-serif italic-display text-primary/40 text-6xl leading-none select-none">"</span>
                <p className="font-serif text-2xl md:text-3xl leading-[1.2] tracking-[-0.02em] text-foreground mb-8">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-foreground/30">
                  <span className="w-10 h-10 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center font-serif text-primary text-lg">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-foreground/70 truncate">{t.role}</p>
                  </div>
                  <span className="tag tag-primary hidden md:inline-flex">{t.matter}</span>
                </div>
              </article>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          08 · CTA
          ──────────────────────────────────────────── */}
      <section className="relative section-pad py-32 md:py-44 border-t-2 border-foreground/30 bg-secondary overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">008 — Next step</span>
              <h2 className="display-lg font-serif">
                <span className="block"><SplitReveal>Bring the deal.</SplitReveal></span>
                <span className="block italic-display text-primary"><SplitReveal>We bring the law.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:items-end">
              <FadeIn delay={0.3} staggerChildren className="flex flex-col gap-3 md:items-end">
                <Link href="/contact" className="btn-ink">
                  <span>Schedule a call</span>
                  <span className="arrow-magnet">→</span>
                </Link>
                <Link href="/insights" className="btn-ghost">
                  <span>Read the journal</span>
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
   Expertise row with hover reveal
   ──────────────────────────────────────────── */
function ExpertiseRow({
  index,
  n,
  title,
  blurb,
  href,
}: {
  index: number
  n: string
  title: string
  blurb: string
  href: string
}) {
  const row = useRef<HTMLLIElement>(null)

  useGSAP(
    () => {
      if (!row.current) return
      const blurbEl = row.current.querySelector('[data-blurb]')
      const titleEl = row.current.querySelector('[data-title]')
      const arrow = row.current.querySelector('[data-arrow]')

      gsap.set(blurbEl, { height: 0, opacity: 0 })

      const onEnter = () => {
        gsap.to(blurbEl, { height: 'auto', opacity: 1, duration: 0.35, ease: 'expo.inOut' })
        gsap.to(titleEl, { x: 12, color: 'var(--primary)', duration: 0.35, ease: 'expo.inOut' })
        gsap.to(arrow, { x: 12, opacity: 1, duration: 0.3, ease: 'expo.inOut' })
      }
      const onLeave = () => {
        gsap.to(blurbEl, { height: 0, opacity: 0, duration: 0.3, ease: 'expo.inOut' })
        gsap.to(titleEl, { x: 0, color: 'var(--foreground)', duration: 0.3, ease: 'expo.inOut' })
        gsap.to(arrow, { x: 0, opacity: 0.4, duration: 0.25, ease: 'expo.inOut' })
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
    <li ref={row} className="group border-b border-foreground/25">
      <Link href={href} className="block py-8 md:py-12 cursor-pointer">
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-baseline">
          <div className="col-span-2 md:col-span-1">
            <span className="eyebrow text-foreground/65">{n}</span>
          </div>
          <div className="col-span-9 md:col-span-9">
            <h3
              data-title
              className="display-md font-serif tracking-[-0.035em]"
              style={{ willChange: 'transform, color' }}
            >
              {title}
            </h3>
            <div data-blurb className="overflow-hidden">
              <p className="font-sans text-base md:text-lg text-foreground/75 leading-relaxed mt-6 max-w-2xl">
                {blurb}
              </p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 text-right">
            <span
              data-arrow
              className="inline-block font-serif text-3xl md:text-5xl opacity-40 will-change-transform"
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
   Process timeline — vertical line draws as you scroll
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
        className="absolute left-[14px] md:left-[calc(8.333%-1px)] top-0 bottom-0 w-px bg-primary z-0 pointer-events-none"
      />
      <Rule className="mb-0" />
      {steps.map((step, i) => (
        <div
          key={step.n}
          className="grid grid-cols-12 gap-4 md:gap-6 items-baseline py-10 md:py-14 border-b border-foreground/25 relative"
        >
          <div className="col-span-2 md:col-span-1 relative">
            <span className="absolute -left-1 top-2 w-3 h-3 rounded-full bg-primary z-10" />
            <span className="eyebrow text-foreground/75 ml-8 md:ml-6">{step.n}</span>
          </div>
          <div className="col-span-10 md:col-span-7 md:col-start-3">
            <h3 className="display-sm font-serif">
              <SplitReveal>{step.t}</SplitReveal>
            </h3>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <FadeIn>
              <p className="text-foreground/75 leading-relaxed">{step.d}</p>
            </FadeIn>
          </div>
        </div>
      ))}
    </div>
  )
}
