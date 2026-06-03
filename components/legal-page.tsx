import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'

export type LegalSection = { heading: string; body: string[] }

/**
 * Shared shell for static legal pages (Privacy, Disclaimer, Terms…).
 * Renders a breadcrumb trail, title, "last updated" line and prose sections.
 */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      <section className="section-pad pt-32 md:pt-40 pb-12 md:pb-16 bg-fixed-mist border-b border-foreground/15">
        <div className="max-w-[900px] mx-auto">
          <Breadcrumbs items={[{ label: title }]} className="mb-8" />
          <span className="index-chip">Legal</span>
          <h1 className="display-md font-display mt-6">{title}</h1>
          <p className="mt-6 font-heading text-lg text-foreground/80 leading-relaxed max-w-2xl">{intro}</p>
          <p className="mt-6 eyebrow text-foreground/55">Last updated: {updated}</p>
        </div>
      </section>

      <section className="section-pad py-16 md:py-24 bg-background">
        <div className="max-w-[900px] mx-auto">
          <Rule className="mb-12" />
          <div className="space-y-12">
            {sections.map((s, i) => (
              <FadeIn key={s.heading} delay={i * 0.04} className="space-y-4">
                <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{s.heading}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="font-heading text-base md:text-lg text-foreground/80 leading-relaxed">{p}</p>
                ))}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
