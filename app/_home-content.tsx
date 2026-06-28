'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/motion/gsap-init'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionNav } from '@/components/section-nav'
import { PanelImage } from '@/components/panel-image'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { Counter } from '@/components/motion/counter'
import { HeroStatus } from '@/components/hero-status'
import {
  CirclesInCircumference,
  OrbitRings,
  VectorNode,
} from '@/components/illustrations'

const SECTIONS = [
  { id: 'chambers',    label: 'The Chambers' },
  { id: 'capability',  label: 'Capability' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'contact',     label: 'Contact' },
]

export function HomeContent() {
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
            <h1 className="display-hero font-display">
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
                LawShaoor Chambers is a full-service law firm based in Islamabad, with associated offices
                across Pakistan. Working in strategic partnership with M.B. KEMP (ME) LLP supporting clients
                across the UAE, DIFC, ADGM and other international jurisdictions.
              </p>
            </FadeIn>
          </div>

          {/* RIGHT — 40% : abstract, professional visual panel */}
          <FadeIn delay={0.5} className="lg:col-span-2">
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
                  LawShaoor Chambers is a full-service law chambers based in Islamabad — and, in strategic
                  partnership with M.B. KEMP (ME) LLP, working across the UAE, DIFC and ADGM.
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
              { v: 4, suffix: '', label: 'Partner firms' },
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
          STRATEGIC PARTNERSHIP — M.B. KEMP
          ──────────────────────────────────────────── */}
      <section id="partnership" className="relative section-pad py-24 md:py-32 border-t border-foreground/12 bg-background overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 md:mb-16 lg:items-end">
            <div className="lg:col-span-3 space-y-4">
              <span className="eyebrow text-foreground/55">International reach</span>
              <h2 className="display-md font-display">
                <SplitReveal>Strategic partnership</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>with M.B. KEMP (ME) LLP.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-foreground/70 leading-relaxed">
                  Through our strategic partnership with M.B. KEMP (ME) LLP, we support clients on matters involving the
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
          CTA
          ──────────────────────────────────────────── */}
      <section id="contact" className="relative section-pad pt-28 md:pt-40 pb-16 md:pb-24 border-t border-foreground/12 bg-fixed-deep overflow-hidden scroll-mt-32">
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
              <FadeIn delay={0.2} className="flex flex-col gap-3 lg:items-end">
                <Link href="/contact" className="btn-primary">
                  <span>Schedule a Consultation</span>
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
