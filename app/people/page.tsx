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
  GridDots,
  VectorNode,
  OrbitRings,
  SquareCascade,
} from '@/components/illustrations'

const PARTNERS = [
  {
    name: 'Alexandra Sterling',
    title: 'Founding Partner',
    focus: 'M&A · Strategy',
    bio: '18 years of M&A across two coasts. $2.3B+ in transactions. Yale Law.',
    education: ['Yale Law School, J.D.', 'Princeton, A.B. Economics'],
    matters: ['$2.4B carve-out', 'Series of cross-border PE roll-ups'],
    Illo: CirclesInCircumference,
  },
  {
    name: 'James Chen',
    title: 'Partner',
    focus: 'Commercial · Tech',
    bio: '15 years in tech and SaaS. Led 40+ company financings. Harvard Law.',
    education: ['Harvard Law School, J.D.', 'MIT, S.B. Computer Science'],
    matters: ['Series A–D financings for unicorn-tier SaaS companies', 'Licensing terms for top-5 cloud platform'],
    Illo: TesseractCube,
  },
  {
    name: 'Margaret O\'Brien',
    title: 'Partner',
    focus: 'Governance · Compliance',
    bio: '20 years in governance. Advised 50+ public boards.',
    education: ['Columbia Law School, J.D.', 'Georgetown, B.S.F.S.'],
    matters: ['Board restructure for $40B public company', 'Compliance program rebuild post-investigation'],
    Illo: HexagonalCascade,
  },
  {
    name: 'David Martinez',
    title: 'Senior Counsel',
    focus: 'Financing · Restructuring',
    bio: '12 years in private equity and restructuring. Columbia Law.',
    education: ['Columbia Law School, J.D.', 'Wharton, M.B.A.'],
    matters: ['$1.1B refinancing through chapter-11 exit', 'PE-led recapitalizations'],
    Illo: StackedCubes,
  },
  {
    name: 'Sarah Patel',
    title: 'Senior Counsel',
    focus: 'Employment · Executive',
    bio: '10 years in employment and executive matters. Stanford Law.',
    education: ['Stanford Law School, J.D.', 'Brown, A.B. Public Policy'],
    matters: ['Executive comp redesign for Fortune 100', 'High-stakes departures and clawbacks'],
    Illo: OrbitRings,
  },
  {
    name: 'Michael Thompson',
    title: 'Counsel',
    focus: 'Diligence · Documentation',
    bio: '8 years in transaction support and due diligence. Northwestern Law.',
    education: ['Northwestern Pritzker, J.D.', 'University of Chicago, A.B.'],
    matters: ['Coordinated diligence on 25+ M&A transactions', 'Built our internal data-room playbook'],
    Illo: GridDots,
  },
]

export default function People() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[10%] -right-[12%] hidden md:block" />
        <CirclesInCircumference className="absolute -left-16 top-12 w-[300px] h-[300px] opacity-30 hidden md:block" uid="ppl-hero-circ" />
        <VectorNode className="absolute -right-8 -bottom-8 w-44 h-44 opacity-35 hidden md:block" uid="ppl-hero-vn" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">001 · People</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-display">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>The people</SplitReveal></span>
                <span className="block">
                  <SplitReveal trigger="load" delay={0.3}>doing </SplitReveal>
                  <span className="text-gradient"><SplitReveal trigger="load" delay={0.5}>the work.</SplitReveal></span>
                </span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
            <div className="col-span-12 md:col-span-6 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  No first-year associates dressed up as partners. The names below are the names you will deal with — every meeting, every revision, every call.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* PEOPLE GRID — fixed lavender */}
      <section className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-fixed-lavender">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
            <div className="col-span-12 md:col-span-5">
              <span className="index-chip">002 · Partners & counsel</span>
              <h2 className="display-md font-display mt-4">
                <SplitReveal>Six names.</SplitReveal>{' '}
                <span className="text-gradient"><SplitReveal>One bench.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <FadeIn>
                <p className="text-foreground/80 leading-relaxed font-heading tracking-[-0.005em]">
                  Small by design. Each person on this page leads matters end-to-end. No hand-off, no junior-team detour.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="rule-heavy mb-0" />

          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/15">
            {PARTNERS.map((p, i) => (
              <PersonCard key={p.name} index={i} person={p} />
            ))}
          </FadeIn>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative section-pad py-24 md:py-36 border-t border-foreground/15 bg-background overflow-hidden">
        <OrbitRings className="absolute -right-20 top-8 w-[420px] h-[420px] opacity-30 hidden md:block float-soft" uid="ppl-orb" />
        <SquareCascade className="absolute -left-12 -bottom-12 w-56 h-56 opacity-45 hidden md:block" uid="ppl-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <span className="index-chip">003 · How we hire</span>
              <h2 className="display-md font-display mt-4">
                <SplitReveal>A bench, not a pyramid.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 font-heading text-lg md:text-xl leading-relaxed text-foreground/85 tracking-[-0.005em]">
              <FadeIn>
                <p>
                  Most law firms grow by adding associates. We grow by adding partners. The math is different — and so is the work.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p>
                  Every lawyer here has at least eight years of transactional experience. Most have more. No one gets handed a deal they have not already done five times.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  That is why our clients see the same faces in year one and year ten. The bench is the firm.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERS CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="ppl-cta-orb" rotate />
        <StackedCubes className="absolute right-12 -bottom-8 w-40 h-56 opacity-55 hidden md:block float-soft" uid="ppl-cta-stk" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">004 · Careers</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Eight+ years</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>in the work?</SplitReveal></span>
              </h2>
              <FadeIn delay={0.2}>
                <p className="font-heading text-lg md:text-xl text-foreground/85 max-w-2xl tracking-[-0.005em]">
                  We are always interested in senior practitioners with a real book and a real opinion. Send a note.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <a href="mailto:careers@lawshaoor.com" className="btn-primary">
                <span>careers@lawshaoor.com</span>
                <span className="arrow-magnet">→</span>
              </a>
              <Link href="/contact" className="btn-ghost">
                <span>General contact</span>
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

function PersonCard({
  person,
  index,
}: {
  person: typeof PARTNERS[number]
  index: number
}) {
  const { name, title, focus, bio, education, matters, Illo } = person

  return (
    <article className="bg-background p-8 md:p-10 lift-card flex flex-col">
      {/* Placeholder portrait area with illustration overlay */}
      <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-background-alt border border-foreground/15">
        {/* placeholder image marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Illo className="w-[95%] h-[95%]" uid={`ppl-${index}`} />
        </div>
        <span className="absolute top-3 left-3 eyebrow text-foreground/55 font-mono tracking-[0.32em] bg-background/70 px-2 py-1 backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute bottom-3 right-3 eyebrow text-foreground/45 font-mono bg-background/70 px-2 py-1 backdrop-blur">
          [ photo · placeholder ]
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{name}</h3>
      </div>
      <p className="eyebrow text-primary mb-3">{title}</p>
      <p className="text-sm text-foreground/65 font-mono tracking-[0.16em] uppercase mb-5">{focus}</p>

      <p className="font-heading text-base text-foreground/85 leading-relaxed mb-6 tracking-[-0.005em]">{bio}</p>

      <div className="space-y-3 mb-6 text-sm text-foreground/80">
        <div>
          <p className="eyebrow text-foreground/55 mb-1">Education</p>
          <ul className="space-y-0.5 font-heading tracking-[-0.005em]">
            {education.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-foreground/55 mb-1">Selected matters</p>
          <ul className="space-y-0.5 font-heading tracking-[-0.005em]">
            {matters.map((m) => <li key={m}>· {m}</li>)}
          </ul>
        </div>
      </div>

      <a href="mailto:hello@lawshaoor.com" className="link-line text-sm font-mono tracking-[0.18em] uppercase text-foreground/85 mt-auto self-start">
        Contact →
      </a>
    </article>
  )
}
