'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
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
    transactions: [
      { name: '$450M SaaS Acquisition', detail: 'Strategic buyer transaction' },
      { name: '$200M Recapitalization', detail: 'PE-backed restructuring' },
      { name: '$750M Roll-up Strategy', detail: 'Five add-on acquisitions' },
    ],
    Illo: CirclesInCircumference,
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
    transactions: [
      { name: 'Board Restructuring', detail: 'Optimal composition & committees' },
      { name: 'Policy Development',   detail: 'Bylaws, resolutions, procedures' },
      { name: 'Compliance Programs',  detail: 'Ongoing best practices' },
    ],
    Illo: HexagonalCascade,
  },
  {
    id: 'contracts',
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
    transactions: [
      { name: '1 · Understand intent', detail: 'What do you need to achieve?' },
      { name: '2 · Draft smart',       detail: 'Clear, enforceable terms' },
      { name: '3 · Negotiate hard',    detail: 'Maximize your position' },
      { name: '4 · Close strong',      detail: 'Deal certainty and clarity' },
    ],
    Illo: TesseractCube,
  },
  {
    id: 'capital',
    n: '04',
    eyebrow: 'Capital Markets',
    title: 'Capital & Financing',
    body: 'Debt, equity, warrants, covenants. The paperwork behind the wire transfer — and the cap table you can actually live with at year five.',
    bullets: [
      'Venture & growth equity financings',
      'Senior debt & credit facilities',
      'Convertible notes & SAFEs',
      'Recapitalizations & dividend recaps',
      'Cap-table architecture',
    ],
    transactions: [
      { name: '$180M Senior Facility', detail: 'Refinancing existing debt' },
      { name: 'Series C — $185M',      detail: 'Lead investor terms' },
      { name: '$95M Warrant Issuance', detail: 'Strategic partner equity' },
    ],
    Illo: StackedCubes,
  },
]

export default function PracticeAreas() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[15%] -right-[15%] hidden md:block" />
        <OrbitRings className="absolute -left-20 top-12 w-[320px] h-[320px] opacity-30 hidden md:block" uid="pa-hero-orb" rotate />
        <VectorNode className="absolute -right-8 bottom-0 w-44 h-44 opacity-35 hidden md:block" uid="pa-hero-vn" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">001 · Practice</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-display">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>What we</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal trigger="load" delay={0.35}>actually do.</SplitReveal></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20 items-end">
            <div className="col-span-12 md:col-span-6 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  Four practice groups. Each led by a senior partner who has been in the room when the deal almost died — and stopped it from dying.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-3 hidden md:flex justify-end">
              <GridDots className="w-36 h-36 lg:w-44 lg:h-44 opacity-90" uid="pa-gd" />
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICES — alternating fixed backgrounds */}
      {PRACTICES.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`relative section-pad py-24 md:py-36 border-t border-foreground/15 overflow-hidden ${i % 2 === 0 ? 'bg-fixed-lavender' : 'bg-fixed-deep'}`}
        >
          {i % 2 === 0 ? (
            <>
              <OrbitRings className="absolute -right-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-30 hidden md:block" uid={`pa-${p.id}-orb`} rotate />
              <CirclesInCircumference className="absolute -left-12 -bottom-12 w-48 h-48 opacity-45 hidden md:block float-soft" uid={`pa-${p.id}-circ`} />
            </>
          ) : (
            <>
              <HexagonalCascade className="absolute -left-24 -bottom-12 w-72 h-72 opacity-40 hidden md:block" uid={`pa-${p.id}-hex`} />
              <StackedCubes className="absolute right-8 top-12 w-32 h-44 opacity-50 hidden md:block float-soft" uid={`pa-${p.id}-stk`} />
            </>
          )}

          <div className="max-w-[1440px] mx-auto relative">
            <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
              <div className="col-span-12 md:col-span-2">
                <span className="index-chip">{`00${i + 2} · ${p.n}`}</span>
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="eyebrow text-primary mb-4">— {p.eyebrow}</p>
                <h2 className="display-lg font-display">
                  <SplitReveal>{p.title}</SplitReveal>
                </h2>
              </div>
            </div>

            <Rule className="rule-heavy mb-12 md:mb-16" />

            <div className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Body + bullets */}
              <div className="col-span-12 md:col-span-7 space-y-10">
                <FadeIn>
                  <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/85 max-w-3xl tracking-[-0.01em]">
                    {p.body}
                  </p>
                </FadeIn>

                <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15 border border-foreground/15">
                  {p.bullets.map((b, j) => (
                    <div key={j} className="bg-background p-5 md:p-6 flex items-start gap-4">
                      <span className="eyebrow text-primary mt-0.5">{String(j + 1).padStart(2, '0')}</span>
                      <span className="font-heading text-base md:text-lg text-foreground/90 tracking-[-0.005em]">{b}</span>
                    </div>
                  ))}
                </FadeIn>
              </div>

              {/* Illustration + transactions */}
              <div className="col-span-12 md:col-span-5 space-y-8">
                <FadeIn className="surface bracketed p-8 md:p-12 flex items-center justify-center min-h-[380px] md:min-h-[460px]">
                  <p.Illo className="w-72 h-72 md:w-[360px] md:h-[360px]" uid={`pa-illo-${p.id}`} />
                </FadeIn>

                <div className="space-y-3">
                  <span className="eyebrow text-foreground/65">— Representative work</span>
                  <FadeIn staggerChildren className="space-y-2">
                    {p.transactions.map((t, j) => (
                      <div key={j} className="flex items-start gap-4 py-3 border-b border-foreground/15">
                        <span className="font-mono text-xs text-primary tracking-[0.18em] uppercase mt-1">▣</span>
                        <div className="flex-1">
                          <p className="font-display text-lg md:text-xl tracking-[-0.015em]">{t.name}</p>
                          <p className="text-sm text-foreground/65 font-mono tracking-[0.12em] mt-1">{t.detail}</p>
                        </div>
                      </div>
                    ))}
                  </FadeIn>
                </div>

                <Link href="/contact" className="btn-primary mt-4 inline-flex">
                  <span>Discuss your matter</span>
                  <span className="arrow-magnet">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-mist overflow-hidden">
        <OrbitRings className="absolute -left-20 -bottom-16 w-72 h-72 opacity-45 hidden md:block float-soft" uid="pa-cta-orb" />
        <SquareCascade className="absolute -right-12 -top-8 w-56 h-56 opacity-40 hidden md:block" uid="pa-cta-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">{`00${PRACTICES.length + 2} · Engage`}</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Have a matter</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>in mind?</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Schedule a call</span>
                <span className="arrow-magnet">→</span>
              </Link>
              <Link href="/people" className="btn-ghost">
                <span>Meet the partners</span>
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
