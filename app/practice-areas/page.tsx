'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { ScrollLine } from '@/components/motion/scroll-line'

const PRACTICES = [
  {
    id: 'mergers',
    n: '01',
    eyebrow: 'M&A Transactions',
    title: 'Mergers & Acquisitions',
    body: 'From identifying targets to closing the deal — we guide companies through every stage of M&A. Strategic acquisitions, financial buyer transactions, complex multi-party deals, the awkward cross-border ones.',
    bullets: [
      'Strategic acquisitions & divestitures',
      'Financial buyer transactions',
      'Hostile and friendly takeovers',
      'Earnout negotiation & agreements',
      'Post-acquisition integration planning',
    ],
    cta: 'Discuss your deal',
    transactions: [
      { name: '$450M SaaS Acquisition', detail: 'Strategic buyer transaction' },
      { name: '$200M Recapitalization', detail: 'PE-backed restructuring' },
      { name: '$750M Roll-up Strategy', detail: 'Multiple add-on acquisitions' },
    ],
  },
  {
    id: 'governance',
    n: '02',
    eyebrow: 'Governance',
    title: 'Corporate Governance',
    body: 'Strong governance creates value. We help boards and management teams design frameworks that enable real decisions, real accountability, and survive the next twenty board meetings.',
    bullets: [
      'Board composition & committee design',
      'Bylaws, resolutions & procedures',
      'Compliance programs & training',
      'Board succession & evaluation',
      'Crisis & litigation readiness',
    ],
    cta: 'Schedule a governance review',
    transactions: [
      { name: 'Board Restructuring', detail: 'Optimal composition & committees' },
      { name: 'Policy Development', detail: 'Bylaws, resolutions, procedures' },
      { name: 'Compliance Programs', detail: 'Ongoing best practices' },
    ],
  },
  {
    id: 'strategy',
    n: '03',
    eyebrow: 'Commercial Strategy',
    title: 'Strategic Partnerships & Contracts',
    body: 'Every contract is a business document first. We negotiate and draft agreements that reflect your commercial objectives while managing legal risk — not the other way around.',
    bullets: [
      'Distribution & licensing agreements',
      'Joint venture & partnership structures',
      'Software & SaaS agreements',
      'Vendor & supplier negotiations',
      'Employment & executive agreements',
    ],
    cta: 'Get legal support',
    transactions: [
      { name: '1. Understand intent', detail: 'What do you need to achieve?' },
      { name: '2. Draft smart',       detail: 'Clear, enforceable terms' },
      { name: '3. Negotiate hard',    detail: 'Maximize your position' },
      { name: '4. Close strong',      detail: 'Deal certainty and clarity' },
    ],
  },
]

export default function PracticeAreas() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <ScrollLine />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[18%] -right-[12%] hidden md:block" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">001 — Practice</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-serif">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>Three lines</SplitReveal></span>
                <span className="block"><SplitReveal trigger="load" delay={0.3}>of</SplitReveal> <span className="italic-display text-accent-shimmer"><SplitReveal trigger="load" delay={0.5}>deep work.</SplitReveal></span></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-16 md:mt-24 items-end">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-serif text-xl md:text-2xl leading-snug text-foreground/90">
                  We specialize narrowly so we can go deep. M&A, governance, commercial contracts — and the strategic counsel that holds them together.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn delay={0.4} className="surface p-6 md:p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="index-chip">Capability index</span>
                </div>
                <div className="h-px bg-foreground/30 mb-3" />
                <ul className="space-y-3">
                  {[
                    { k: 'M&A', v: '$2.3B+', s: 'closed' },
                    { k: 'Governance', v: '50+', s: 'boards advised' },
                    { k: 'Commercial', v: '400+', s: 'contracts/year' },
                  ].map((row) => (
                    <li key={row.k} className="flex items-baseline justify-between gap-4 border-b border-foreground/25 pb-2 last:border-0 last:pb-0">
                      <span className="eyebrow text-foreground/80">{row.k}</span>
                      <div className="text-right">
                        <p className="font-serif text-xl tracking-tight text-primary">{row.v}</p>
                        <p className="text-xs text-foreground/75">{row.s}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE BLOCKS */}
      {PRACTICES.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`section-pad py-24 md:py-36 border-t-2 border-foreground/30 ${i % 2 === 1 ? 'bg-secondary' : ''}`}
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-1">
                <span className="eyebrow text-foreground/65">{p.n}</span>
              </div>

              <div className="col-span-12 md:col-span-6 space-y-8">
                <p className="eyebrow text-primary">— {p.eyebrow}</p>
                <h2 className="display-md font-serif">
                  <SplitReveal>{p.title}</SplitReveal>
                </h2>
                <Rule className="my-6" />
                <FadeIn>
                  <p className="text-lg md:text-xl leading-relaxed text-foreground/85 max-w-2xl">{p.body}</p>
                </FadeIn>
                <FadeIn staggerChildren className="space-y-3 pt-4">
                  {p.bullets.map((b, j) => (
                    <div key={j} className="flex items-baseline gap-4 group">
                      <span className="text-primary text-sm">→</span>
                      <span className="text-foreground/85 group-hover:text-foreground transition-colors">{b}</span>
                    </div>
                  ))}
                </FadeIn>
                <FadeIn>
                  <Link href="/contact" className="btn-ink mt-4">
                    <span>{p.cta}</span>
                    <span className="arrow-magnet">→</span>
                  </Link>
                </FadeIn>
              </div>

              {/* Sidecar list */}
              <div className="col-span-12 md:col-span-4 md:col-start-9 md:sticky md:top-28">
                <FadeIn>
                  <div className="surface p-8 md:p-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="index-chip">
                        {p.id === 'mergers' ? 'Recent matters' : p.id === 'governance' ? 'Services' : 'Approach'}
                      </span>
                      <span className="dot-live" />
                    </div>
                    <ul className="space-y-5">
                      {p.transactions.map((t, k) => (
                        <li key={k} className="border-b border-foreground/25 pb-4 last:border-0 last:pb-0">
                          <p className="font-serif text-xl tracking-[-0.02em]">{t.name}</p>
                          <p className="text-sm text-foreground/60 mt-1">{t.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-pad py-32 md:py-44 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <p className="eyebrow text-foreground/55 mb-6">— 005 / Engage</p>
              <h2 className="display-lg font-serif">
                <span className="block"><SplitReveal>Specifically,</SplitReveal></span>
                <span className="block italic-display text-primary"><SplitReveal>what do you need?</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end">
              <Link href="/contact" className="btn-ink">
                <span>Tell us</span>
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
