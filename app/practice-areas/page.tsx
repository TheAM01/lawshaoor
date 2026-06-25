'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionNav } from '@/components/section-nav'
import { PanelImage } from '@/components/panel-image'

const PA_SECTIONS = [
  { id: 'technology',           label: 'Technology' },
  { id: 'corporate-commercial', label: 'Corporate' },
  { id: 'banking-finance',      label: 'Banking & Finance' },
  { id: 'dispute-resolution',   label: 'Disputes' },
  { id: 'mergers-acquisitions', label: 'M&A' },
  { id: 'government-sector',     label: 'Government' },
  { id: 'healthcare-pharma',    label: 'Healthcare' },
  { id: 'labour-employment',    label: 'Labour' },
  { id: 'non-profit',           label: 'Non-Profit' },
  { id: 'cross-border',         label: 'Cross-Border' },
]
import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  OrbitRings,
  GridDots,
  SquareCascade,
  VectorNode,
} from '@/components/illustrations'

const PRACTICES = [
  {
    id: 'technology',
    eyebrow: 'Technology & TMT',
    title: 'Technology',
    body: 'We get tech and the law around it. We advise technology companies, digital platforms, telecom operators, and software businesses on regulatory compliance, data governance, cross-border technology transactions, encryption, and IT sector licensing. Our team has hands-on experience with Pakistan’s evolving tech and telecom landscape.',
    bullets: [
      'Technology companies & digital platforms',
      'Telecom operators & software businesses',
      'Regulatory compliance',
      'Data governance',
      'Cross-border technology transactions',
      'Encryption',
      'IT sector licensing',
    ],
    keys: [
      { name: 'IT & telecom licensing',             detail: 'Sector authorisations & compliance' },
      { name: 'Pakistan tech & telecom regulation', detail: 'Evolving regulatory landscape' },
    ],
    Illo: VectorNode,
  },
  {
    id: 'corporate-commercial',
    eyebrow: 'Corporate practice',
    title: 'Corporate & Commercial',
    body: 'We assist clients with incorporation of companies, dissolutions, corporate governance, mergers and acquisitions, Islamic modes of investment, licensing, corporate organization, exchange and repatriation controls, tax, and risk insurance — and liaison with concerned regulatory bodies such as the Securities & Exchange Commission of Pakistan, the State Bank of Pakistan, the Federal Board of Revenue, and the Competition Commission of Pakistan.',
    bullets: [
      'Incorporation & dissolutions',
      'Corporate governance',
      'Mergers & acquisitions',
      'Islamic modes of investment',
      'Licensing & corporate organization',
      'Exchange & repatriation controls',
      'Tax & risk insurance',
    ],
    keys: [
      { name: 'SECP', detail: 'Securities & Exchange Commission of Pakistan' },
      { name: 'SBP',  detail: 'State Bank of Pakistan' },
      { name: 'FBR',  detail: 'Federal Board of Revenue' },
      { name: 'CCP',  detail: 'Competition Commission of Pakistan' },
    ],
    Illo: HexagonalCascade,
  },
  {
    id: 'banking-finance',
    eyebrow: 'Regulated finance',
    title: 'Banking & Finance',
    body: 'We advise commercial banks, financial institutions, and non-banking finance companies (NBFCs) on syndicated financing, Islamic finance, debt restructuring, and security documentation. We also represent clients in recovery suits and foreclosure proceedings before Banking Courts and Tribunals.',
    bullets: [
      'Syndicated financing',
      'Islamic finance',
      'Debt restructuring',
      'Security documentation',
      'Recovery suits',
      'Foreclosure proceedings',
    ],
    keys: [
      { name: 'Banking Courts & Tribunals', detail: 'Recovery and foreclosure proceedings' },
    ],
    Illo: StackedCubes,
  },
  {
    id: 'dispute-resolution',
    eyebrow: 'Contentious work',
    title: 'Dispute Resolution & Arbitration',
    body: 'Our litigation team represents clients before the High Courts, District Courts, tribunals, regulators, and arbitration forums. We handle commercial disputes, contractual claims, regulatory proceedings, competition matters, labour disputes, and arbitration under domestic and international rules.',
    bullets: [
      'Commercial disputes',
      'Contractual claims',
      'Regulatory proceedings',
      'Competition matters',
      'Labour disputes',
      'Domestic & international arbitration',
    ],
    keys: [
      { name: 'High Courts & District Courts', detail: 'Trial and appellate representation' },
      { name: 'Tribunals & regulators',        detail: 'Statutory and regulatory forums' },
      { name: 'Arbitration forums',            detail: 'Domestic and international rules' },
    ],
    Illo: TesseractCube,
  },
  {
    id: 'mergers-acquisitions',
    eyebrow: 'M&A',
    title: 'Mergers & Acquisitions',
    body: 'We advise on corporate takeovers, share and asset purchases, due diligence, vendor issues, and court-approved schemes of arrangement. Our experience includes major acquisitions in Pakistan and the UAE.',
    bullets: [
      'Corporate takeovers',
      'Share & asset purchases',
      'Due diligence',
      'Vendor issues',
      'Court-approved schemes of arrangement',
      'Major acquisitions in Pakistan & UAE',
    ],
    keys: [
      { name: 'Company & securities law', detail: 'Transactional experience' },
      { name: 'Competition law',          detail: 'M&A clearance and review' },
    ],
    Illo: CirclesInCircumference,
  },
  {
    id: 'government-sector',
    eyebrow: 'Public sector liaison',
    title: 'Government Sector',
    body: 'The Firm’s substantial experience in negotiation has proved particularly valuable in its interaction with the different departmental levels of the Government of Pakistan, providing additional facilitation and expedition in the procedural administration of applications, renewals, licensing and regulation. Our Islamabad base enables strong liaison with ministries and government bodies.',
    bullets: [
      'Applications, renewals & licensing',
      'Procedural administration',
      'Ministry & government body liaison',
      'Regulatory facilitation',
    ],
    keys: [
      { name: 'Government of Pakistan', detail: 'Ministries & departmental entities' },
    ],
    Illo: HexagonalCascade,
  },
  {
    id: 'healthcare-pharma',
    eyebrow: 'Life sciences',
    title: 'Healthcare & Pharmaceuticals',
    body: 'We advise local and foreign clients on licensing, registration, and regulatory matters before the Drug Regulatory Authority of Pakistan. We assist with compliance, interpretation of applicable laws, and advisory work relating to the healthcare and pharmaceutical sectors.',
    bullets: [
      'Licensing & registration',
      'DRAP regulatory matters',
      'Compliance & interpretation of applicable laws',
      'Healthcare & pharmaceutical advisory',
    ],
    keys: [
      { name: 'DRAP', detail: 'Drug Regulatory Authority of Pakistan' },
    ],
    Illo: OrbitRings,
  },
  {
    id: 'labour-employment',
    eyebrow: 'Workforce',
    title: 'Labour & Employment',
    body: 'We advise on labour legislation, HR policies, CBA negotiations, employee benefits, employment contracts, terminations, settlements, and labour disputes. We represent clients before all labour forums including labour courts, labour appellate tribunals and the High Courts of Pakistan.',
    bullets: [
      'Labour legislation & HR policies',
      'CBA negotiations',
      'Employee benefits',
      'Employment contracts',
      'Terminations & settlements',
      'Labour disputes',
    ],
    keys: [
      { name: 'Labour Courts',            detail: 'Trial-level representation' },
      { name: 'Labour Appellate Tribunals', detail: 'Appellate advocacy' },
      { name: 'High Courts of Pakistan',  detail: 'Constitutional & statutory review' },
    ],
    Illo: GridDots,
  },
  {
    id: 'non-profit',
    eyebrow: 'Philanthropy & aid',
    title: 'Non-Profit',
    body: 'We assist philanthropists, NGOs, and donor agencies with incorporations, trusts, societies, compliance, project structuring, and regulatory matters. Our lawyers are involved in national-level social sector reform initiatives such as education, female empowerment, sustainable community development, child labour, tourism and infrastructure development.',
    bullets: [
      'Incorporations, trusts & societies',
      'NGO & donor agency advisory',
      'Compliance & regulatory matters',
      'Project structuring',
      'Education & female empowerment',
      'Sustainable community development',
      'Social-sector reform initiatives',
    ],
    keys: [
      { name: 'NGOs & donor agencies', detail: 'Incorporation, compliance & structuring' },
      { name: 'Social-sector reform',  detail: 'National-level initiatives' },
    ],
    Illo: SquareCascade,
  },
  {
    id: 'cross-border',
    eyebrow: 'International',
    title: 'UAE & Cross-Border Practice',
    body: 'Through our strategic partnership with M.B. KEMP (ME) LLP, we advise on both onshore and free-zone legal requirements, UAE corporate and commercial matters, banking and finance, M&A, restructuring, DIFC/ADGM regulations, and cross-border disputes.',
    bullets: [
      'Onshore & free-zone legal requirements',
      'UAE corporate & commercial matters',
      'Banking & finance',
      'Mergers & acquisitions',
      'Restructuring',
      'DIFC & ADGM regulations',
      'Cross-border disputes',
    ],
    keys: [
      { name: 'M.B. KEMP (ME) LLP', detail: 'Strategic partner firm — Hong Kong · London · Milan · Abu Dhabi' },
      { name: 'DIFC',               detail: 'Dubai International Financial Centre' },
      { name: 'ADGM',               detail: 'Abu Dhabi Global Market' },
    ],
    Illo: VectorNode,
  },
] as const

/** Protect abbreviations whose internal periods are NOT sentence boundaries
 *  (e.g. the partner firm "M.B. KEMP (ME) LLP") before naive sentence splitting. */
const FIRM = 'M.B. KEMP (ME) LLP'
const FIRM_TOKEN = '__FIRM__'
const protectFirm = (s: string) => s.split(FIRM).join(FIRM_TOKEN)
const restoreFirm = (s: string) => s.split(FIRM_TOKEN).join(FIRM)

/** Short one-line summary (first sentence, truncated on a word boundary). */
function summarize(body: string, max = 150): string {
  const b = protectFirm(body)
  const first = restoreFirm((b.match(/^[^.]+\./) ?? [b])[0]).trim()
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).trim() + '…'
}

/** Split a long body string into shorter, easier-to-read paragraphs. */
function toParagraphs(body: string): string[] {
  const b = protectFirm(body)
  const sentences = (b.match(/[^.]+\./g) ?? [b]).map(restoreFirm)
  const out: string[] = []
  for (let i = 0; i < sentences.length; i += 2) {
    out.push(sentences.slice(i, i + 2).join(' ').trim())
  }
  return out
}

export default function PracticeAreas() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* HERO — 60/40 */}
      <section className="relative section-pad pt-32 md:pt-40 pb-16 md:pb-24 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb top-[10%] -right-[12%] hidden md:block" />
        <div className="max-w-[1560px] mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Breadcrumbs items={[{ label: 'Practice Areas' }]} className="mb-7" />
            <span className="eyebrow text-foreground/55">Practice</span>
            <h1 className="display-xl font-display mt-5">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>Practice</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>areas.</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                Civil, commercial, corporate, regulatory and dispute-resolution matters — across heavily
                regulated and commercially sensitive sectors. We act for local and foreign companies, financial
                institutions, non-profit organizations, and individual clients.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-2 hidden lg:block">
            <div className="relative aspect-[4/5] bg-background-alt border border-foreground/12 overflow-hidden">
              <PanelImage seed="practice-areas" />
              <span aria-hidden className="hero-orb accent-breathe top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
              <OrbitRings className="absolute inset-0 m-auto w-[80%] h-[80%] opacity-70" uid="pa-hero-orbit" rotate />
              <GridDots className="absolute right-5 top-5 w-20 h-20 opacity-70" uid="pa-hero-gd" />
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionNav sections={PA_SECTIONS} label="Practice areas" />

      {/* INDEX — large square cards, each with a description; hover fills azure */}
      <section className="section-pad py-16 md:py-24 border-t border-foreground/12 bg-background-alt">
        <div className="max-w-[1560px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="eyebrow text-foreground/55 whitespace-nowrap">Index — jump to a practice area</span>
            <span className="block h-px flex-1 bg-foreground/12" />
          </div>
          <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {PRACTICES.map((p) => (
              <Link key={p.id} href={`#${p.id}`} className="az-card group">
                <p className="eyebrow text-primary group-hover:text-primary-foreground transition-colors">{p.eyebrow}</p>
                <h3 className="font-display text-2xl md:text-[1.6rem] leading-tight">{p.title}</h3>
                <p className="text-sm md:text-base text-foreground/65 leading-relaxed">{summarize(p.body)}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm text-primary group-hover:text-primary-foreground transition-colors">
                  Read <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* PRACTICES — sticky title + 60/40 split */}
      {PRACTICES.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`relative section-pad py-20 md:py-28 border-t border-foreground/12 scroll-mt-32 ${i % 2 === 0 ? 'bg-fixed-lavender' : 'bg-background'}`}
        >
          <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-10">
            {/* LEFT — 60% : title (sticky) + description + bullets */}
            <div className="lg:col-span-3">
              <div className={`sticky top-[116px] md:top-[128px] z-10 ${i % 2 === 0 ? 'bg-background-alt' : 'bg-background'} pb-5 mb-7 border-b border-foreground/12`}>
                <p className="eyebrow text-primary mb-3">{p.eyebrow}</p>
                <h2 className="display-md font-display">
                  <SplitReveal>{p.title}</SplitReveal>
                </h2>
              </div>

              <FadeIn className="space-y-5 max-w-2xl">
                {toParagraphs(p.body).map((para, j) => (
                  <p key={j} className="text-base md:text-lg leading-relaxed text-foreground/75">
                    {para}
                  </p>
                ))}
              </FadeIn>

              <FadeIn staggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                {p.bullets.map((b, j) => (
                  <div key={j} className="group border border-foreground/12 bg-card p-5 md:p-6 flex items-start gap-3 hover:bg-primary transition-colors">
                    <span aria-hidden className="block w-3 h-px bg-primary group-hover:bg-primary-foreground mt-3 shrink-0 transition-colors" />
                    <span className="text-sm md:text-base text-foreground/85 group-hover:text-primary-foreground transition-colors">{b}</span>
                  </div>
                ))}
              </FadeIn>
            </div>

            {/* RIGHT — 40% : key authorities + visual */}
            <div className="lg:col-span-2 space-y-8">
              <FadeIn className="relative aspect-square bg-background-alt border border-foreground/12 overflow-hidden flex items-center justify-center">
                <PanelImage seed={`pa-${p.id}`} />
                <p.Illo className="relative w-3/5 h-3/5" uid={`pa-illo-${p.id}`} />
              </FadeIn>

              {p.keys.length > 0 && (
                <div className="space-y-3">
                  <span className="eyebrow text-foreground/55">Key authorities & frameworks</span>
                  <FadeIn staggerChildren className="space-y-0 border-t border-foreground/12">
                    {p.keys.map((t, j) => (
                      <div key={j} className="flex items-start gap-3 py-3 border-b border-foreground/12">
                        <span aria-hidden className="text-primary mt-1.5 text-xs">◆</span>
                        <div className="flex-1">
                          <p className="font-display text-base md:text-lg">{t.name}</p>
                          <p className="text-sm text-foreground/60 mt-0.5">{t.detail}</p>
                        </div>
                      </div>
                    ))}
                  </FadeIn>
                </div>
              )}

              <Link href="/contact" className="btn-ghost w-full">
                <span>Discuss this practice</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative section-pad py-28 md:py-40 border-t border-foreground/12 bg-fixed-deep overflow-hidden">
        <div className="max-w-[1560px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="eyebrow text-foreground/55">Get in touch</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Have a matter</SplitReveal></span>
                <span className="block text-primary"><SplitReveal>in mind?</SplitReveal></span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Schedule a Consultation</span>
              </Link>
              <Link href="/people" className="btn-ghost">
                <span>Meet the team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
