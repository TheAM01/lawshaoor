'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { ScrollLine } from '@/components/motion/scroll-line'
import { ArrowLeft } from 'lucide-react'

export default function ArticlePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <ScrollLine />

      {/* META + TITLE */}
      <section className="section-pad pt-32 md:pt-44 pb-12 md:pb-16">
        <div className="max-w-[1100px] mx-auto">
          <Link href="/insights" className="group inline-flex items-center gap-2 eyebrow text-foreground/75 hover:text-primary mb-12 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to journal
          </Link>

          <p className="eyebrow text-primary mb-6">— M&A · 8 min read</p>

          <h1 className="display-lg font-serif">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>The art of</SplitReveal></span>
            <span className="block italic-display text-primary"><SplitReveal trigger="load" delay={0.3}>strategic due diligence.</SplitReveal></span>
          </h1>

          <FadeIn delay={0.5} className="flex flex-wrap gap-x-10 gap-y-4 mt-14 pt-8 border-t-2 border-foreground/30">
            <div>
              <p className="eyebrow text-foreground/65 mb-1">Published</p>
              <p className="text-foreground/85">March 15, 2026</p>
            </div>
            <div>
              <p className="eyebrow text-foreground/65 mb-1">Author</p>
              <p className="text-foreground/85">Alexandra Sterling</p>
            </div>
            <div>
              <p className="eyebrow text-foreground/65 mb-1">Read</p>
              <p className="text-foreground/85">8 minutes</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="section-pad py-12 md:py-20">
        <div className="max-w-[760px] mx-auto">
          <Rule className="mb-12" />

          <FadeIn className="space-y-8 text-lg md:text-xl leading-[1.7] text-foreground/85">
            <p className="font-serif text-2xl md:text-3xl leading-snug italic-display text-foreground">
              In over a decade of advising on M&A transactions, I have seen deals succeed and fail on a single factor: the <em>strategic focus</em> of the due diligence — not its thoroughness.
            </p>

            <p>
              Most companies approach due diligence as a box-checking exercise. They create massive data rooms, hire armies of junior associates to review documents, and generate thousands of pages of reports. Six months later, they close a deal full of undisclosed liabilities.
            </p>

            <h2 className="font-serif text-3xl md:text-5xl tracking-[-0.035em] !mt-16 !mb-6 leading-tight">
              <SplitReveal>What actually matters.</SplitReveal>
            </h2>

            <p>The best due diligence isn't comprehensive — it's strategic. Here's what we focus on, in order of leverage:</p>

            <h3 className="font-serif text-2xl md:text-3xl tracking-[-0.025em] !mt-12 !mb-3 text-primary">
              01 — Revenue Quality
            </h3>
            <p>Every dollar of revenue is not created equal. We dig into:</p>
            <ul className="space-y-3 pl-0">
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span><strong className="text-foreground">Customer concentration.</strong> Do three customers represent 80% of revenue?</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span><strong className="text-foreground">Contract duration.</strong> Are these one-time sales or multi-year agreements?</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span><strong className="text-foreground">Renewal rates.</strong> What percentage of customers actually renew?</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span><strong className="text-foreground">Implied churn.</strong> Is the pipeline growing or shrinking under the surface?</span></li>
            </ul>
            <p>A company with $50M in high-quality, diversified, recurring revenue is worth far more than one with $100M in concentrated, one-time sales. This is where most acquirers get it wrong.</p>

            <h3 className="font-serif text-2xl md:text-3xl tracking-[-0.025em] !mt-12 !mb-3 text-primary">
              02 — Customer Dependencies
            </h3>
            <p>Beyond revenue concentration, we analyze customer risk:</p>
            <ul className="space-y-3 pl-0">
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span>Contractual relationships — can customers terminate without cause?</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span>Personal relationships — are they tied to individual employees?</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span>Market conditions — are these customers under financial stress?</span></li>
            </ul>
            <p>
              I have seen deals where the acquisition itself triggered customer defection — a major software client left because they didn't want to pay a larger company, and the contract had no change-of-control clause. These aren't surprises if you look.
            </p>

            <h3 className="font-serif text-2xl md:text-3xl tracking-[-0.025em] !mt-12 !mb-3 text-primary">
              03 — Intellectual Property
            </h3>
            <p>Is the IP actually theirs? We verify:</p>
            <ul className="space-y-3 pl-0">
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span>Ownership documentation from founders and early employees</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span>Contractor and consultant IP assignments</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span>Third-party licensing and open-source dependencies</span></li>
              <li className="flex gap-4"><span className="text-primary mt-1.5 text-sm">→</span><span>Patent landscapes and potential infringement risks</span></li>
            </ul>
            <p>
              I represented a buyer in a deal where the target's core technology was built on unlicensed open-source code. We caught it, renegotiated the price, and avoided a post-close nightmare.
            </p>

            <h2 className="font-serif text-3xl md:text-5xl tracking-[-0.035em] !mt-16 !mb-6 leading-tight">
              <SplitReveal>The process that works.</SplitReveal>
            </h2>
            <p>Strategic due diligence isn't about volume. It's about depth on what matters. Our playbook:</p>
            <ul className="space-y-4 pl-0">
              <li><strong className="text-primary">Week 1–2.</strong> Management presentations and initial document reviews. Focus on the business model, not parsing contracts.</li>
              <li><strong className="text-primary">Week 3–4.</strong> Deep dives into revenue quality and customer relationships. Interview key customers. Analyze historical churn and renewal data.</li>
              <li><strong className="text-primary">Week 5–6.</strong> IP diligence and legal review. Verify ownership, check for encumbrances, analyze third-party dependencies.</li>
              <li><strong className="text-primary">Week 7–8.</strong> Financial and operational analysis. Sustainable growth? What's the unit economics story?</li>
            </ul>
            <p>This isn't sequential — it's parallel, with frequent checkpoints. As soon as we identify a risk, we pivot.</p>

            <h2 className="font-serif text-3xl md:text-5xl tracking-[-0.035em] !mt-16 !mb-6 leading-tight">
              <SplitReveal>The bottom line.</SplitReveal>
            </h2>
            <p>
              Due diligence can't eliminate deal risk. But it can shift it from <em>surprises</em> to <em>anticipated challenges</em>. A deal that closes with known issues is far better than one that closes with hidden ones.
            </p>
            <p>
              The best acquirers don't aim for comprehensive due diligence. They aim for <em>smart</em> due diligence — focused on the factors that actually drive value and risk.
            </p>
          </FadeIn>

          <Rule className="mt-20 mb-10" />

          <FadeIn>
            <p className="eyebrow text-foreground/75 mb-3">— Written by</p>
            <p className="font-serif text-2xl md:text-3xl tracking-[-0.025em]">Alexandra Sterling</p>
            <p className="text-foreground/65 mt-1 text-sm">Founding Partner · 18 years of M&A · Yale Law</p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad py-32 md:py-44 border-t-2 border-foreground/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <p className="eyebrow text-foreground/75 mb-6">— On the desk</p>
              <h2 className="display-lg font-serif">
                <span className="block"><SplitReveal>Got a deal</SplitReveal></span>
                <span className="block italic-display text-primary"><SplitReveal>worth diligencing?</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end">
              <Link href="/contact" className="btn-ink">
                <span>Talk to us</span>
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
