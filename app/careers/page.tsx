import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { SectionNav } from '@/components/section-nav'
import { StackedCubes, VectorNode, OrbitRings } from '@/components/illustrations'
import { PanelImage } from '@/components/panel-image'

const SECTIONS = [
  { id: 'why',   label: 'Why LawShaoor' },
  { id: 'roles', label: 'Open roles' },
  { id: 'apply', label: 'Apply' },
]

export const metadata: Metadata = {
  title: 'Careers — Join LawShaoor Chambers',
  description: 'Build your career at LawShaoor Chambers. We hire associates, litigators and interns who want real responsibility, cross-border work, and partner-level mentoring from day one.',
  keywords: ['law jobs Islamabad', 'legal careers Pakistan', 'associate lawyer jobs', 'law internship Pakistan', 'LawShaoor careers'],
}

const WHY = [
  { t: 'Real work, early', d: 'No drip-fed busywork. You touch live matters — drafting, research, hearings — with partners who actually mentor.' },
  { t: 'Cross-border exposure', d: 'Through our strategic partnership with M.B. KEMP (ME) LLP, you work on UAE, DIFC and ADGM matters alongside Pakistan practice.' },
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
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-x-clip">
        <span aria-hidden className="hero-orb top-[10%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Breadcrumbs items={[{ label: 'Careers' }]} className="mb-7" />
            <span className="eyebrow text-foreground/55">Join us</span>
            <h1 className="display-xl font-display mt-5">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>Build a career</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>that actually moves.</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                We hire lawyers who want responsibility, not a queue. If you want cross-border work,
                partner-level mentoring and room to grow, we want to hear from you.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-2 hidden lg:block">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage seed="careers" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
              <StackedCubes className="absolute inset-0 m-auto w-[55%] h-[60%] opacity-70" uid="careers-hero-stk" />
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionNav sections={SECTIONS} label="Careers" />

      {/* WHY JOIN */}
      <section id="why" className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <span className="index-chip mb-10 inline-flex">Why LawShaoor</span>
          <Rule className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {WHY.map((w, i) => (
              <FadeIn key={w.t} delay={i * 0.06} className="az-card">
                <span aria-hidden className="az-mark block w-7 h-px mb-1" />
                <h2 className="font-display text-2xl md:text-3xl">{w.t}</h2>
                <p className="text-base text-foreground/65 leading-relaxed">{w.d}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="roles" className="section-pad py-20 md:py-28 border-t border-foreground/15 bg-background-alt scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <span className="index-chip mb-10 inline-flex">Open roles</span>
          <Rule className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {ROLES.map((r) => (
              <FadeIn key={r.role} className="az-card">
                <h3 className="font-display text-2xl">{r.role}</h3>
                <p className="text-base text-foreground/65 leading-relaxed">{r.detail}</p>
                <span className="eyebrow text-foreground/55 mt-auto pt-3">{r.type}</span>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 text-sm text-foreground/65 font-heading">
            Don&apos;t see your role? We still want to meet good lawyers. Send us a speculative application.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden scroll-mt-32">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="careers-cta-orb" rotate />
        <VectorNode className="absolute right-12 bottom-8 w-44 h-44 opacity-40 hidden md:block" uid="careers-cta-vn" />
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Apply</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Send us your</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>application.</SplitReveal></span>
              </h2>
              <p className="text-base text-foreground/75 max-w-xl">
                Email your CV and a short note on the work you want to do to <a href="mailto:careers@lawshaoor.com" className="link-line text-primary">careers@lawshaoor.com</a>.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <a href="mailto:careers@lawshaoor.com" className="btn-primary">
                <span>Apply now</span>
              </a>
              <Link href="/contact" className="btn-ghost">
                <span>General enquiries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
