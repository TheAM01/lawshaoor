'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { ScrollLine } from '@/components/motion/scroll-line'

const ARTICLES = [
  { id: 1, title: 'The Art of M&A Due Diligence',                 excerpt: 'What separates successful deals from disasters? Often it is the due diligence — but not the way most teams think about it.', date: 'March 15, 2026',    category: 'M&A',           readTime: '8 min' },
  { id: 2, title: 'Board Composition as a Strategic Decision',    excerpt: 'Your board affects everything. Size, expertise, diversity — we break down the choices that actually matter.',              date: 'March 8, 2026',     category: 'Governance',    readTime: '6 min' },
  { id: 3, title: 'SaaS Contracts: The Terms That Actually Work', excerpt: 'Master service agreements are confusing. Here is a practical guide to the clauses that protect the business.',              date: 'February 28, 2026', category: 'Commercial',    readTime: '7 min' },
  { id: 4, title: 'Founder-Friendly Deal Structures',             excerpt: 'PE deals are evolving. New structures are giving founders more control, more upside, and a cleaner exit.',                  date: 'February 21, 2026', category: 'M&A',           readTime: '9 min' },
  { id: 5, title: 'Regulatory Compliance in 2026',                excerpt: 'New regulations are rewriting the landscape. The lines we are watching, and the playbook to stay ahead.',                   date: 'February 14, 2026', category: 'Compliance',    readTime: '10 min' },
  { id: 6, title: 'Negotiating with Private Equity',              excerpt: 'PE buyers have a playbook. Learn their tactics — and how to negotiate the terms you actually want.',                        date: 'February 7, 2026',  category: 'M&A',           readTime: '8 min' },
]

export default function Insights() {
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
              <span className="index-chip">001 — Journal</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display-xl font-serif">
                <span className="block"><SplitReveal trigger="load" delay={0.1}>Field notes</SplitReveal></span>
                <span className="block"><SplitReveal trigger="load" delay={0.3}>from</SplitReveal> <span className="italic-display text-accent-shimmer"><SplitReveal trigger="load" delay={0.5}>the desk.</SplitReveal></span></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-16 items-end">
            <div className="col-span-12 md:col-span-5 md:col-start-3">
              <FadeIn>
                <p className="font-serif text-xl md:text-2xl leading-snug text-foreground/90">
                  What we learn from the work — written for operators, not other lawyers. Long-form, practical, and honest about what we don't know yet.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-wrap gap-2">
              {['M&A','Governance','Commercial','Compliance','Capital','Strategy'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
              <span className="tag tag-primary"><span className="dot-live" /> New entry monthly</span>
            </div>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="section-pad py-16 md:py-24 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <p className="eyebrow text-foreground/75">— 002 / Index</p>
            <p className="eyebrow text-foreground/75">{ARTICLES.length.toString().padStart(2, '0')} entries</p>
          </div>

          <Rule className="mb-0" />

          <ul>
            {ARTICLES.map((a, i) => (
              <li key={a.id} className="group border-b border-foreground/25">
                <Link href={`/insights/${a.id}`} className="block py-8 md:py-12">
                  <div className="grid grid-cols-12 gap-4 md:gap-6 items-baseline">
                    <div className="col-span-2 md:col-span-1">
                      <span className="eyebrow text-foreground/65">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="col-span-10 md:col-span-7">
                      <h2 className="font-serif text-3xl md:text-5xl tracking-[-0.035em] leading-tight group-hover:text-primary transition-colors duration-300">
                        {a.title}
                      </h2>
                      <p className="text-foreground/70 mt-4 max-w-2xl leading-relaxed">{a.excerpt}</p>
                    </div>
                    <div className="col-span-6 md:col-span-2 md:col-start-9 mt-3 md:mt-0">
                      <p className="eyebrow text-primary">{a.category}</p>
                      <p className="eyebrow text-foreground/75 mt-2">{a.readTime}</p>
                    </div>
                    <div className="col-span-6 md:col-span-2 md:text-right mt-3 md:mt-0">
                      <p className="eyebrow text-foreground/65">{a.date}</p>
                      <span className="inline-block font-serif text-2xl mt-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section-pad py-24 md:py-32 border-t-2 border-foreground/30 bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="eyebrow text-foreground/75 mb-5">— 003 / Subscribe</p>
              <h2 className="display-md font-serif">
                <SplitReveal>Get the journal,</SplitReveal>{' '}
                <span className="italic-display text-primary"><SplitReveal>monthly.</SplitReveal></span>
              </h2>
              <FadeIn>
                <p className="text-foreground/75 leading-relaxed max-w-xl mt-5">
                  No promotions, no fluff. Once a month, the field notes we wish we had earlier.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-5">
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <div className="field">
                  <label>Your email</label>
                  <input type="email" placeholder="you@company.com" required />
                </div>
                <div className="pt-6">
                  <button type="submit" className="btn-ink">
                    <span>Subscribe</span>
                    <span className="arrow-magnet">→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
