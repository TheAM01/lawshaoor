import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { SectionNav } from '@/components/section-nav'
import { PanelImage } from '@/components/panel-image'
import {
  CirclesInCircumference,
  VectorNode,
  OrbitRings,
  StackedCubes,
  SquareCascade,
} from '@/components/illustrations'
import { getTeam } from '@/lib/server/team'
import { TeamGrid } from './_components/team-grid'

export const dynamic = 'force-dynamic'

export default async function People() {
  const team = await getTeam()

  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb top-[8%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Breadcrumbs items={[{ label: 'Team' }]} className="mb-7" />
            <span className="eyebrow text-foreground/55">Team</span>
            <h1 className="display-xl font-display mt-5">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>The people</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>doing the work.</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                A dedicated team of partners and associates handling civil, commercial, corporate, regulatory
                and dispute-resolution matters across Pakistan and — through our strategic partnership with
                M.B. KEMP (ME) LLP — the UAE, DIFC and ADGM.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-2 hidden lg:block">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
              <PanelImage seed="team" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
              <CirclesInCircumference className="absolute inset-0 m-auto w-[72%] h-[72%] opacity-70" uid="ppl-hero-circ" />
              <VectorNode className="absolute right-5 bottom-5 w-20 h-20 opacity-70" uid="ppl-hero-vn" />
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionNav
        sections={[
          { id: 'team', label: 'The team' },
          { id: 'contact', label: 'Contact' },
        ]}
        label="Team"
      />

      {/* CARD GRID */}
      <section id="team" className="section-pad py-16 md:py-24 border-t border-foreground/15 bg-background scroll-mt-32">
        <div className="max-w-[1560px] mx-auto">
          <Rule className="mb-12" />
          <TeamGrid team={team} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-x-clip scroll-mt-32">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="ppl-cta-orb" rotate />
        <StackedCubes className="absolute right-12 -bottom-8 w-40 h-56 opacity-55 hidden md:block float-soft" uid="ppl-cta-stk" />
        <SquareCascade className="absolute right-1/3 top-12 w-32 h-32 opacity-40 hidden lg:block" uid="ppl-cta-sq" />
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Get in touch</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Discuss your</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>matter with us.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Contact</span>
              </Link>
              <Link href="/practice-areas" className="btn-ghost">
                <span>See practice areas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
