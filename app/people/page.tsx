import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
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
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[10%] -right-[12%] hidden md:block" />
        <CirclesInCircumference className="absolute -left-16 top-12 w-[300px] h-[300px] opacity-30 hidden md:block" uid="ppl-hero-circ" />
        <VectorNode className="absolute -right-8 -bottom-8 w-44 h-44 opacity-35 hidden md:block" uid="ppl-hero-vn" />

        <div className="max-w-[1440px] mx-auto relative">
          <Breadcrumbs items={[{ label: 'Team' }]} className="mb-8" />

          <div className="mb-10 md:mb-14">
            <span className="index-chip">001 · Team</span>
          </div>

          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>The people</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.3}>doing the work.</SplitReveal></span>
          </h1>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  A dedicated team of partners and associates handling civil, commercial, corporate, regulatory, and dispute resolution matters across Pakistan and — through our association with M.B. KEMP (ME) LLP — the UAE, DIFC and ADGM.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CARD GRID */}
      <section className="section-pad py-16 md:py-24 border-t border-foreground/15 bg-background">
        <div className="max-w-[1440px] mx-auto">
          <Rule className="mb-12" />
          <TeamGrid team={team} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-deep overflow-hidden">
        <OrbitRings className="absolute -left-20 -top-12 w-[420px] h-[420px] opacity-30 hidden md:block" uid="ppl-cta-orb" rotate />
        <StackedCubes className="absolute right-12 -bottom-8 w-40 h-56 opacity-55 hidden md:block float-soft" uid="ppl-cta-stk" />
        <SquareCascade className="absolute right-1/3 top-12 w-32 h-32 opacity-40 hidden lg:block" uid="ppl-cta-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Get in Touch</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Discuss your</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>matter with us.</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Contact Us</span>
                <span className="arrow-magnet">→</span>
              </Link>
              <Link href="/practice-areas" className="btn-ghost">
                <span>See practice areas</span>
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
