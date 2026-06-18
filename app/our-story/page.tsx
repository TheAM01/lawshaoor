'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SectionNav } from '@/components/section-nav'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { Marquee } from '@/components/motion/marquee'
import { PanelImage } from '@/components/panel-image'
import { Counter } from '@/components/motion/counter'
import {
  CirclesInCircumference,
  VectorNode,
} from '@/components/illustrations'

const SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'approach',     label: 'Approach' },
  { id: 'capability',   label: 'Capability' },
  { id: 'association',  label: 'Partnership' },
]

const PILLARS = [
  { t: 'Clear',     d: 'We simplify complex legal issues and offer solutions that are both legally sound and commercially workable.' },
  { t: 'Practical', d: 'We focus on professionalism, efficiency, and the best interests of the client — in every matter.' },
  { t: 'Reliable',  d: 'Comprehensive legal support to clients operating in complex business environments — at home and across borders.' },
  { t: 'Connected', d: 'Through our strategic partnership with M.B. KEMP (ME) LLP, we draw on a global team across Hong Kong, London, Milan and Abu Dhabi.' },
]

const KEMP_OFFICES = [
  { city: 'Hong Kong', region: 'East Asia' },
  { city: 'London',    region: 'United Kingdom' },
  { city: 'Milan',     region: 'Europe' },
  { city: 'Abu Dhabi', region: 'UAE · GCC' },
]

export default function OurStory() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb top-[8%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Breadcrumbs items={[{ label: 'The Chambers' }]} className="mb-7" />
            <span className="eyebrow text-foreground/55">The Chambers</span>
            <h1 className="display-xl font-display mt-5">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>A full-service law</SplitReveal></span>
              <span className="block">
                <SplitReveal trigger="load" delay={0.3}>chambers in </SplitReveal>
                <span className="text-primary"><SplitReveal trigger="load" delay={0.5}>Islamabad.</SplitReveal></span>
              </span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                LawShaoor Chambers is a full-service law chambers based in Islamabad, with associated offices in
                other major cities of Pakistan — and, in strategic partnership with M.B. KEMP (ME) LLP, reach across the
                UAE, DIFC and ADGM.
              </p>
            </FadeIn>
            <FadeIn delay={0.65} staggerChildren className="mt-8 flex flex-col sm:flex-row gap-3 items-start">
              <Link href="/people" className="btn-primary"><span>Meet the team</span></Link>
              <Link href="/practice-areas" className="btn-ghost"><span>Practice areas</span></Link>
            </FadeIn>
          </div>

          {/* Right 40% — "at a glance" visual card */}
          <FadeIn delay={0.4} className="lg:col-span-2">
            <div className="relative bg-background-alt border border-foreground/12 p-6 md:p-8 overflow-hidden">
              <span aria-hidden className="hero-orb accent-breathe -right-16 -top-16 opacity-40" />
              <div className="relative flex items-center justify-between mb-4">
                <span className="eyebrow text-foreground/55">At a glance</span>
                <span className="dot-live" />
              </div>
              <div className="h-px bg-foreground/15 mb-4" />
              <ul className="relative space-y-3.5 text-sm">
                {[
                  ['Headquarters', 'Islamabad'],
                  ['Reach', 'Major cities of Pakistan'],
                  ['Lawyers', '6'],
                  ['Practice areas', '12'],
                  ['Strategic partnership', 'M.B. KEMP (ME) LLP'],
                ].map(([k, v], i) => (
                  <li key={i} className="flex justify-between gap-4 items-baseline">
                    <span className="text-foreground/55 text-xs tracking-[0.1em] uppercase">{k}</span>
                    <span className="font-display text-base text-foreground text-right">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MARQUEE — practice areas */}
      <div className="border-y border-foreground/12 bg-background-alt py-5 md:py-6">
        <Marquee speed={45}>
          <div className="flex items-center gap-12 pr-12 text-foreground/80 font-display text-xl md:text-2xl whitespace-nowrap">
            {['Banking', 'Corporate', 'Energy', 'Construction', 'Disputes', 'M&A', 'Government', 'Telecoms', 'Healthcare', 'Labour', 'Non-Profit', 'UAE'].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <SectionNav sections={SECTIONS} label="The Chambers" />

      {/* INTRODUCTION — 60/40, short paragraphs */}
      <section id="introduction" className="section-pad py-20 md:py-28 bg-background relative overflow-x-clip scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-10">
          <div className="lg:col-span-3 space-y-7">
            <span className="eyebrow text-foreground/55">Introduction</span>
            <h2 className="display-md font-display max-w-2xl">
              <SplitReveal>Clear, practical, reliable.</SplitReveal>
            </h2>
            <FadeIn className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/75 max-w-2xl">
              <p>
                We are committed to providing clear, practical, and reliable legal services that meet the
                commercial needs of our clients.
              </p>
              <p>
                Our approach is to simplify complex legal issues and offer solutions that are both legally sound
                and commercially workable.
              </p>
              <p>
                The Chambers combines the experience of its partners with the skills of a dedicated team of
                associates to handle civil, commercial, corporate, regulatory, and dispute-resolution matters.
              </p>
              <p>
                We act for local and foreign companies, financial institutions, non-profit organizations, and
                individual clients. In every matter, we focus on professionalism, efficiency, and the best
                interests of the client.
              </p>
              <p>
                LawShaoor Chambers has developed strength in sectors that are heavily regulated and commercially
                sensitive — banking and finance, energy and natural resources, infrastructure, and corporate
                transactions. Our lawyers are familiar with the regulatory landscape in Pakistan and regularly
                appear before courts, tribunals, and regulatory authorities.
              </p>
            </FadeIn>
          </div>

          {/* Right 40% — simple office/visual panel */}
          <div className="lg:col-span-2">
            <FadeIn className="lg:sticky lg:top-[120px] relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage seed="our-story-chambers" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
              <CirclesInCircumference className="absolute inset-0 m-auto w-[70%] h-[70%] opacity-70" uid="story-hero-circ" />
              <VectorNode className="absolute right-5 bottom-5 w-20 h-20 opacity-70" uid="story-hero-vn" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* APPROACH — pillars */}
      <section id="approach" className="section-pad py-20 md:py-28 border-t border-foreground/12 bg-fixed-lavender scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <div className="mb-10 md:mb-14 space-y-4">
            <span className="eyebrow text-foreground/55">Approach</span>
            <h2 className="display-sm font-display">
              <SplitReveal>How we work,</SplitReveal>{' '}
              <span className="text-primary"><SplitReveal>and why.</SplitReveal></span>
            </h2>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {PILLARS.map((v, i) => (
              <div key={i} className="az-card">
                <h3 className="font-display text-3xl md:text-4xl text-primary">{v.t}</h3>
                <p className="text-foreground/65 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITY STATS */}
      <section id="capability" className="relative section-pad py-20 md:py-28 border-t border-foreground/12 bg-fixed-deep overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="mb-10 space-y-4">
            <span className="eyebrow text-foreground/55">Capability</span>
            <h2 className="display-md font-display">
              <SplitReveal>At a glance.</SplitReveal>
            </h2>
          </div>

          <Rule className="rule-heavy mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
            {[
              { v: 12, suffix: '', label: 'Practice areas' },
              { v: 6, suffix: '', label: 'Lawyers' },
              { v: 4, suffix: '', label: 'Partner firms' },
              { v: 1, suffix: '', label: 'Strategic partnership' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08} className="relative px-5 md:px-8 first:pl-0 border-l border-foreground/15 first:border-l-0">
                <span aria-hidden className="block w-6 h-px bg-primary mb-3" />
                <div className="display-md font-display">
                  <Counter value={s.v} suffix={s.suffix} />
                </div>
                <p className="eyebrow text-foreground/55 mt-3">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* M.B. KEMP ASSOCIATION — 60/40 */}
      <section id="association" className="section-pad py-20 md:py-28 border-t border-foreground/12 bg-background relative overflow-hidden scroll-mt-32">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-8 mb-12 md:mb-16">
            <div className="lg:col-span-2 space-y-4">
              <span className="eyebrow text-foreground/55">Strategic partnership</span>
              <h2 className="display-md font-display">
                <SplitReveal>M.B. KEMP</SplitReveal>{' '}
                <span className="text-primary"><SplitReveal>(ME) LLP.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-3 space-y-5 text-base md:text-lg leading-relaxed text-foreground/75">
              <FadeIn><p>LawShaoor Chambers works in strategic partnership with M.B. KEMP (ME) LLP, a law chambers with offices in Hong Kong, London, Milan and Abu Dhabi.</p></FadeIn>
              <FadeIn delay={0.1}><p>Through this partnership, we are able to support clients on matters involving the UAE, DIFC, ADGM and other international jurisdictions.</p></FadeIn>
              <FadeIn delay={0.2}><p>The partnership strengthens our cross-border capability and lets us draw on the experience of a global team recognized for corporate, banking and finance, restructuring, international arbitration and complex dispute resolution.</p></FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-10" />

          <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/12 border border-foreground/12">
            {KEMP_OFFICES.map((c) => (
              <div key={c.city} className="bg-background p-8 md:p-10 flex flex-col gap-2">
                <span className="eyebrow text-foreground/50">M.B. KEMP office</span>
                <p className="font-display text-2xl md:text-3xl">{c.city}</p>
                <p className="text-sm text-foreground/60 tracking-[0.12em] uppercase mt-1">{c.region}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-28 md:py-40 border-t border-foreground/12 bg-fixed-deep overflow-hidden">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Work with us</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Meet the people</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>behind the work.</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <Link href="/people" className="btn-primary"><span>Meet the team</span></Link>
              <Link href="/contact" className="btn-ghost"><span>Contact</span></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
