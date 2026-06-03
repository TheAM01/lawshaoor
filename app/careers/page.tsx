import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { StackedCubes, VectorNode, OrbitRings } from '@/components/illustrations'

export const metadata: Metadata = {
  title: 'Careers — Join LawShaoor Chambers',
  description: 'Build your career at LawShaoor Chambers. We hire associates, litigators and interns who want real responsibility, cross-border work, and partner-level mentoring from day one.',
  keywords: ['law jobs Islamabad', 'legal careers Pakistan', 'associate lawyer jobs', 'law internship Pakistan', 'LawShaoor careers'],
}

const WHY = [
  { t: 'Real work, early', d: 'No drip-fed busywork. You touch live matters — drafting, research, hearings — with partners who actually mentor.' },
  { t: 'Cross-border exposure', d: 'Through our association with M.B. KEMP (ME) LLP, you work on UAE, DIFC and ADGM matters alongside Pakistan practice.' },
  { t: 'Range, not a silo', d: 'Corporate, banking, energy, regulatory and disputes under one roof — find your edge instead of being boxed in.' },
  { t: 'Built to teach', d: 'Our partners lecture at universities. That teaching instinct runs through how we bring people up.' },
]

const ROLES = [
  { role: 'Associates', detail: 'Corporate · Commercial · Banking & Finance · Disputes', type: 'Full-time · Islamabad' },
  { role: 'Litigators', detail: 'Civil & criminal litigation, white-collar defence', type: 'Full-time · Islamabad' },
  { role: 'Interns', detail: 'Law students & recent graduates — research, drafting, court support', type: 'Rolling intake' },
]

export default function Careers() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[8%] -right-[12%] hidden md:block" />
        <StackedCubes className="absolute -left-10 bottom-0 w-44 h-60 opacity-40 hidden md:block float-soft" uid="careers-hero-stk" />
        <div className="max-w-[1440px] mx-auto relative">
          <Breadcrumbs items={[{ label: 'Careers' }]} className="mb-8" />
          <div className="mb-10 md:mb-14">
            <span className="index-chip">Join us</span>
          </div>
          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>Build a career</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.3}>that actually moves.</SplitReveal></span>
          </h1>
          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  We hire lawyers who want responsibility, not a queue. If you want cross-border work, partner-level mentoring and room to grow, we want to hear from you.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background">
        <div className="max-w-[1440px] mx-auto">
          <span className="index-chip mb-10 inline-flex">Why LawShaoor</span>
          <Rule className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/12 border border-foreground/12">
            {WHY.map((w, i) => (
              <FadeIn key={w.t} delay={i * 0.06} className="bg-background p-8 md:p-10 space-y-3">
                <span className="eyebrow text-foreground/55">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{w.t}</h2>
                <p className="font-heading text-base text-foreground/80 leading-relaxed">{w.d}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background-alt">
        <div className="max-w-[1440px] mx-auto">
          <span className="index-chip mb-10 inline-flex">Open roles</span>
          <Rule className="mb-10" />
          <div className="divide-y divide-foreground/15 border-y border-foreground/15">
            {ROLES.map((r) => (
              <FadeIn key={r.role} className="grid grid-cols-12 gap-4 py-7 items-baseline">
                <div className="col-span-12 md:col-span-4">
                  <h3 className="font-display text-2xl tracking-[-0.02em]">{r.role}</h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="font-heading text-base text-foreground/80">{r.detail}</p>
                </div>
                <div className="col-span-12 md:col-span-3 md:text-right">
                  <span className="eyebrow text-foreground/60">{r.type}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 text-sm text-foreground/65 font-heading">
            Don&apos;t see your role? We still want to meet good lawyers. Send us a speculative application.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="careers-cta-orb" rotate />
        <VectorNode className="absolute right-12 bottom-8 w-44 h-44 opacity-40 hidden md:block" uid="careers-cta-vn" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Apply</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Send us your</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>application.</SplitReveal></span>
              </h2>
              <p className="font-heading text-base text-foreground/80 max-w-xl">
                Email your CV and a short note on the work you want to do to <a href="mailto:careers@lawshaoor.com" className="link-line text-primary">careers@lawshaoor.com</a>.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <a href="mailto:careers@lawshaoor.com" className="btn-primary">
                <span>Apply now</span>
                <span className="arrow-magnet">→</span>
              </a>
              <Link href="/contact" className="btn-ghost">
                <span>General enquiries</span>
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
