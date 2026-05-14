'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { ScrollLine } from '@/components/motion/scroll-line'
import { Marquee } from '@/components/motion/marquee'

const TEAM = [
  { name: 'Alexandra Sterling', title: 'Founding Partner', bio: '18 years of M&A. $2.3B+ in transactions. Yale Law.', focus: 'M&A / Strategy' },
  { name: 'James Chen',         title: 'Partner',          bio: '15 years in tech & SaaS. Led 40+ company financings. Harvard Law.', focus: 'Commercial / Tech' },
  { name: 'Margaret O\'Brien',  title: 'Partner',          bio: '20 years in governance. Advised 50+ public boards.', focus: 'Governance / Compliance' },
  { name: 'David Martinez',     title: 'Senior Counsel',   bio: '12 years in private equity & restructuring. Columbia Law.', focus: 'Financing / Restructuring' },
  { name: 'Sarah Patel',        title: 'Senior Counsel',   bio: '10 years in employment & executive matters. Stanford Law.', focus: 'Employment / Executive' },
  { name: 'Michael Thompson',   title: 'Counsel',          bio: '8 years in transaction support & due diligence. Northwestern Law.', focus: 'Due Diligence / Documentation' },
]

const VALUES = [
  { t: 'Excellence', d: 'Every brief, every negotiation, every agreement. Done at the standard you would do it yourself.' },
  { t: 'Honesty',    d: 'We tell you what we think — not what you want to hear. Risks named, not buried.' },
  { t: 'Efficiency', d: 'Your time and budget are the constraint. Smart processes, faster turnarounds, clear costs.' },
  { t: 'Partnership',d: 'We measure success by your wins. We are still here at year five, year ten, year twenty.' },
]

export default function About() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <ScrollLine />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[15%] -right-[15%] hidden md:block" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-2">
              <span className="index-chip">001 — Our Story</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-serif">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>A law firm</SplitReveal></span>
                <span className="block"><SplitReveal trigger="load" delay={0.3}>built for</SplitReveal> <span className="italic-display text-accent-shimmer"><SplitReveal trigger="load" delay={0.5}>operators.</SplitReveal></span></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-16 md:mt-24 items-end">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-serif text-xl md:text-2xl leading-snug text-foreground/90">
                  We started LawShaoor because we believed corporate law could be faster, sharper, and more honest. So we built it that way.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <FadeIn delay={0.4} className="surface p-6 md:p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="index-chip">At a glance</span>
                  <span className="dot-live" />
                </div>
                <div className="h-px bg-foreground/30 mb-3" />
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between gap-4 items-baseline"><span className="text-foreground/80">Founded</span><span className="font-serif text-lg">2005</span></li>
                  <li className="flex justify-between gap-4 items-baseline"><span className="text-foreground/80">Partners</span><span className="font-serif text-lg">6</span></li>
                  <li className="flex justify-between gap-4 items-baseline"><span className="text-foreground/80">Cities</span><span className="font-serif text-base">NY · CA · TX · IL</span></li>
                  <li className="flex justify-between gap-4 items-baseline"><span className="text-foreground/80">Deals closed</span><span className="font-serif text-lg">200+</span></li>
                  <li className="flex justify-between gap-4 items-baseline"><span className="text-foreground/80">Retention</span><span className="font-serif text-lg text-primary">98%</span></li>
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y-2 border-foreground/30 bg-secondary py-5 md:py-7">
        <Marquee speed={45}>
          <div className="flex items-center gap-12 pr-12 text-foreground/75 font-serif italic-display text-xl md:text-2xl whitespace-nowrap">
            {['Excellence', 'Honesty', 'Efficiency', 'Partnership', 'Discretion', 'Speed', 'Depth'].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* STORY */}
      <section className="section-pad py-24 md:py-36">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="eyebrow text-foreground/75">— 002 / Origin</p>
            </div>
            <div className="col-span-12 md:col-span-9 space-y-8">
              <h2 className="display-md font-serif max-w-3xl">
                <SplitReveal>The version of the firm we wished existed.</SplitReveal>
              </h2>
              <Rule className="my-6" />
              <FadeIn staggerChildren className="space-y-7 text-lg md:text-xl leading-relaxed text-foreground/85 max-w-3xl">
                <p>
                  For years, we worked at major firms and inside Fortune 500 legal departments. We saw incredible legal work — and we saw unnecessary complexity, misaligned incentives, and lawyers who didn't really understand their clients' businesses.
                </p>
                <p>
                  We wanted to build something different. A firm where partners stay deeply involved in every matter. Where we understand your strategy, not just your legal issues. Where pricing is transparent and efficiency is actually rewarded.
                </p>
                <p className="font-serif italic-display text-2xl md:text-3xl text-foreground/95 leading-snug">
                  That is LawShaoor. A boutique with deep corporate expertise, run like a modern business.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-pad py-24 md:py-36 border-t-2 border-foreground/30 bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-3 space-y-4">
              <span className="index-chip">003 — The Team</span>
              <h2 className="display-sm font-serif">
                <SplitReveal>People on the desk.</SplitReveal>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed">
                  Six senior practitioners. Every engagement gets a partner on the call — not a first-year passing notes to a senior associate passing notes to you.
                </p>
              </FadeIn>
            </div>
          </div>

          <Rule className="mb-2" />

          <ul>
            {TEAM.map((m, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 md:gap-6 items-baseline py-7 md:py-9 border-b border-foreground/25 group hover:bg-card transition-colors">
                <div className="col-span-2 md:col-span-1">
                  <span className="eyebrow text-foreground/65">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="font-serif text-3xl md:text-5xl tracking-[-0.03em] group-hover:text-primary transition-colors duration-300">
                    {m.name}
                  </h3>
                  <p className="eyebrow text-foreground/75 mt-2">{m.title}</p>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <p className="text-foreground/75 leading-relaxed">{m.bio}</p>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <p className="eyebrow text-foreground/75">{m.focus}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-pad py-24 md:py-36 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow text-foreground/75 mb-3">— 004 / What we believe</p>
              <h2 className="display-md font-serif">
                <SplitReveal>Values, kept short.</SplitReveal>
              </h2>
            </div>
          </div>

          <Rule className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {VALUES.map((v, i) => (
              <FadeIn key={i} delay={i * 0.08} className="border-t-2 border-foreground/30 pt-8">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="eyebrow text-foreground/65">0{i + 1}</span>
                  <h3 className="font-serif text-4xl md:text-6xl tracking-[-0.035em]">{v.t}</h3>
                </div>
                <p className="text-foreground/75 leading-relaxed max-w-md">{v.d}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad py-32 md:py-44 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <p className="eyebrow text-foreground/75 mb-6">— 005 / Work with us</p>
              <h2 className="display-lg font-serif">
                <span className="block"><SplitReveal>Ready when</SplitReveal></span>
                <span className="block italic-display text-primary"><SplitReveal>you are.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end">
              <Link href="/contact" className="btn-ink">
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
