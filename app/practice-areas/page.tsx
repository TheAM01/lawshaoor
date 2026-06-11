'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import { SectionNav } from '@/components/section-nav'
import { PanelImage } from '@/components/panel-image'

const PA_SECTIONS = [
  { id: 'banking-finance',          label: 'Banking & Finance' },
  { id: 'corporate-commercial',     label: 'Corporate' },
  { id: 'energy-natural-resources', label: 'Energy' },
  { id: 'construction-operation',   label: 'Construction' },
  { id: 'dispute-resolution',       label: 'Disputes' },
  { id: 'mergers-acquisitions',     label: 'M&A' },
  { id: 'government-sector',         label: 'Government' },
  { id: 'telecom-it',               label: 'Telecom & IT' },
  { id: 'healthcare-pharma',        label: 'Healthcare' },
  { id: 'labour-employment',        label: 'Labour' },
  { id: 'non-profit',               label: 'Non-Profit' },
  { id: 'cross-border',             label: 'Cross-Border' },
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
    id: 'banking-finance',
    eyebrow: 'Regulated finance',
    title: 'Banking & Finance',
    body: 'The Chambers regularly advises commercial banks, financial institutions, and non-banking finance companies (NBFCs) on a wide array of matters. Our expertise encompasses syndicated financing, Islamic modes of finance, debt restructuring, and the drafting and vetting of complex security documentation. We provide strategic counsel on regulatory compliance with State Bank of Pakistan (SBP) directives and represent financial institutions in high-value recovery suits and foreclosure proceedings before specialized Banking Courts and Tribunals.',
    bullets: [
      'Syndicated financing',
      'Islamic modes of finance',
      'Debt restructuring',
      'Security documentation',
      'SBP regulatory compliance',
      'Recovery & foreclosure proceedings',
    ],
    keys: [
      { name: 'State Bank of Pakistan (SBP)', detail: 'Regulatory directives & compliance' },
      { name: 'Banking Courts & Tribunals', detail: 'High-value recovery and foreclosure' },
    ],
    Illo: StackedCubes,
  },
  {
    id: 'corporate-commercial',
    eyebrow: 'Corporate practice',
    title: 'Corporate & Commercial',
    body: 'The Lawyers of the Chambers have experience in mainstream and specialized corporate and commercial matters that extend to a diverse range of matters such as incorporation of companies, dissolutions, corporate governance, mergers and acquisitions, Islamic modes of investment, licensing, corporate organization, exchange and repatriation controls, tax, and risk insurance and liaison with concerned regulatory bodies such as the Securities & Exchange Commission of Pakistan, the State Bank of Pakistan, the Federal Board of Revenue, the Competition Commission of Pakistan etc.',
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
    id: 'energy-natural-resources',
    eyebrow: 'Energy & petroleum',
    title: 'Energy & Natural Resources',
    body: 'LawShaoor Chambers has developed strong capabilities in the energy and petroleum sectors. Our Lawyers have advised clients across the upstream, midstream, and downstream chain, including matters involving OGRA, DGPC, and the Ministry of Energy. Our work includes assistance with licensing, concession agreements, joint operating agreements, LNG supply and storage arrangements, pipeline and terminal development, refinery documentation, EPC contracts, fuel supply arrangements, and environmental compliance. We also assist with cross-border energy transactions and regulatory matters affecting both local and international investors. Our lawyers also possess extensive experience of representing petroleum companies in high-stakes litigation matters.',
    bullets: [
      'Upstream · midstream · downstream',
      'Licensing & concession agreements',
      'Joint operating agreements',
      'LNG supply & storage arrangements',
      'Pipeline & terminal development',
      'Refinery documentation & EPC contracts',
      'Fuel supply arrangements',
      'Environmental compliance',
      'Cross-border energy transactions',
      'High-stakes petroleum litigation',
    ],
    keys: [
      { name: 'OGRA',                detail: 'Oil & Gas Regulatory Authority' },
      { name: 'DGPC',                detail: 'Directorate General of Petroleum Concessions' },
      { name: 'Ministry of Energy',  detail: 'Government of Pakistan' },
    ],
    Illo: CirclesInCircumference,
  },
  {
    id: 'construction-operation',
    eyebrow: 'EPC & infrastructure',
    title: 'Construction & Operation',
    body: 'The team at LawShaoor Chambers have a proven ability of assisting in matters involving construction, maintenance, engineering and procurement issues etc. They have a proven track record of drafting, negotiating and advising on contracts based on FIDIC forms of contracts with contractors of international repute. In this respect, their practical experience in connection with export and import controls, licensing and understanding of regulatory compliance has provided additional value to the service provided to the Chambers’s Clients.',
    bullets: [
      'Construction & maintenance',
      'Engineering & procurement',
      'FIDIC-based contract drafting & negotiation',
      'Export & import controls',
      'Licensing & regulatory compliance',
    ],
    keys: [
      { name: 'FIDIC forms', detail: 'International standard construction contracts' },
    ],
    Illo: SquareCascade,
  },
  {
    id: 'dispute-resolution',
    eyebrow: 'Contentious work',
    title: 'Dispute Resolution & Arbitration',
    body: 'Dispute resolution is one of the Chambers’s core strengths. We represent clients before the High Courts, District Courts, specialized tribunals, regulatory bodies, and arbitration forums. Our experience includes commercial disputes, contractual claims, regulatory proceedings, competition matters, labor disputes, and arbitration under domestic and international rules. We handle all stages of dispute resolution, including pleadings, evidence, cross-examination, and final arguments.',
    bullets: [
      'Commercial disputes',
      'Contractual claims',
      'Regulatory proceedings',
      'Competition matters',
      'Labour disputes',
      'Domestic & international arbitration',
      'Pleadings · evidence · cross-examination · final arguments',
    ],
    keys: [
      { name: 'High Courts & District Courts', detail: 'Trial and appellate representation' },
      { name: 'Specialized tribunals',         detail: 'Regulatory and statutory forums' },
      { name: 'Arbitration forums',            detail: 'Domestic and international rules' },
    ],
    Illo: TesseractCube,
  },
  {
    id: 'mergers-acquisitions',
    eyebrow: 'M&A',
    title: 'Mergers & Acquisitions',
    body: 'The Partner’s involvement in some of the recent corporate acquisitions in Pakistan and UAE has established mergers and acquisitions as one of the Chambers’s most prominent strengths. The Chambers’s substantial experience in company, securities and competition law and its familiarity with the regulatory regime and relevant offices provide additional insight into the quality of advice rendered in proposing corporate mergers. In addition, the Chambers’s experience in proposing, undertaking and implementing Court approved compromises, arrangements and reconstructions provides an additional capability enabling sound and qualitative legal assistance.',
    bullets: [
      'Private limited company sales & purchases',
      'Asset purchases & sales',
      'Take-overs',
      'Vendor issues',
      'Legal due diligence',
      'Court-approved schemes of arrangement',
      'Compromises, arrangements & reconstructions',
    ],
    keys: [
      { name: 'Company law',     detail: 'Substantive transactional experience' },
      { name: 'Securities law',  detail: 'Familiarity with regulatory regime' },
      { name: 'Competition law', detail: 'M&A clearance and review' },
    ],
    Illo: CirclesInCircumference,
  },
  {
    id: 'government-sector',
    eyebrow: 'Public sector liaison',
    title: 'Government Sector',
    body: 'The Chambers’s substantial experience in negotiation has proved particularly valuable in its interaction with the different departmental levels of the Government of Pakistan, providing additional facilitation and expedition in the procedural administration of applications, renewals, licensing and regulation. Based in the capital, its high-level co-operation with the Government, its Ministries and departmental entities has established a firm liaison with the concerned commercial bodies of the government. This access proves an invaluable asset to our clients. The Chambers is also on the panel of advocates for various government departments.',
    bullets: [
      'Applications, renewals & licensing',
      'Procedural administration',
      'Ministry & departmental liaison',
      'Panel advocacy for government departments',
    ],
    keys: [
      { name: 'Government of Pakistan', detail: 'Ministries & departmental entities' },
      { name: 'Panel of advocates',     detail: 'For various government departments' },
    ],
    Illo: HexagonalCascade,
  },
  {
    id: 'telecom-it',
    eyebrow: 'TMT',
    title: 'Telecommunication & Information Technology',
    body: 'The Chambers has developed a broad capability with respect to the frontier aspects of the emerging fields of telecommunications and information technology. Lawyers of the Chambers have extensively advised on the provision of Internet-based services, the setting-up of software houses, regulatory frameworks, satellite-based services, voice over internet protocol (VOIP), telecommunication systems and services, Long Distance International and fiber network, E-banking, data communications, and encryption. We also advise on the import, installation, operation and maintenance of telecommunication equipment, and ancillary matters such as cryptographic products and their legal status — supported by a practical understanding of the regulation and policy directives governing the sector in Pakistan.',
    bullets: [
      'Internet-based services',
      'Software house set-up',
      'Satellite-based services & VOIP',
      'Long Distance International & fiber network',
      'E-banking & data communications',
      'Encryption & cryptographic products',
      'Telecommunication equipment import, installation & operation',
      'Regulatory framework & policy directives',
    ],
    keys: [
      { name: 'TMT regulation', detail: 'Policy directives in Pakistan' },
    ],
    Illo: VectorNode,
  },
  {
    id: 'healthcare-pharma',
    eyebrow: 'Life sciences',
    title: 'Healthcare & Pharmaceuticals',
    body: 'Our lawyers advise local and foreign clients on licensing, registration, and regulatory matters before the Drug Regulatory Authority of Pakistan. We assist with compliance, interpretation of applicable laws, and advisory work relating to the healthcare and pharmaceutical sectors.',
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
    body: 'Lawyers in the Chambers regularly advise foreign as well as local clients on all labour and HR related issues in Pakistan, including the interpretation and application of labour legislation, advice and strategy on CBA negotiations, employee benefits, compensation, employment contracts, termination, settlements, plant closings and lay-offs. We advise on employment insurance, protection and welfare, the construction of labour management systems, and the drafting of collective bargaining agreements including first contracts and renewals — in addition to acting as counsel before all labour forums including labour courts, labour appellate tribunals and the High Courts of Pakistan.',
    bullets: [
      'Labour legislation interpretation',
      'CBA negotiations',
      'Employee benefits & compensation',
      'Employment contracts',
      'Termination & settlements',
      'Plant closings & lay-offs',
      'Employment insurance, protection & welfare',
      'Labour management systems',
      'Collective bargaining agreements',
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
    body: 'Lawyers of the Chambers have extensively advised both local and foreign philanthropists at a national, international and private level to devise logistically and financially sustainable strategies. We routinely advise on private non-profit ventures — including incorporations and the establishment of trusts, societies and companies for objects as diverse as education, female empowerment, sustainable community development, child labour, tourism and infrastructure development. The Chambers has also been prominently involved in national initiatives on social-sector reform and in the representation of international and governmental aid agencies with respect to their administrative and project-related activities in Pakistan.',
    bullets: [
      'Trusts, societies & non-profit companies',
      'Education & female empowerment ventures',
      'Sustainable community development',
      'Child labour & social-sector projects',
      'Tourism & infrastructure development',
      'Social-sector reform initiatives',
      'Representation of international & governmental aid agencies',
    ],
    keys: [
      { name: 'Aid agencies',          detail: 'International & governmental' },
      { name: 'Social-sector reform',  detail: 'Legislative, financial & administrative review' },
    ],
    Illo: SquareCascade,
  },
  {
    id: 'cross-border',
    eyebrow: 'International',
    title: 'UAE & Cross-Border Practice',
    body: 'In addition to our Pakistan-based practice, LawShaoor Chambers provides legal support on UAE-related matters through its association with M.B. KEMP (ME) LLP. Our combined team advises on corporate and commercial transactions, banking and finance, regulatory compliance, mergers and acquisitions, restructuring, DIFC and ADGM matters, and cross-border disputes. With experienced lawyers based in Abu Dhabi and Dubai, we are able to assist clients with both onshore and free-zone legal requirements, ensuring coordinated and efficient representation across jurisdictions.',
    bullets: [
      'Corporate & commercial transactions',
      'Banking & finance',
      'Regulatory compliance',
      'Mergers & acquisitions',
      'Restructuring',
      'DIFC & ADGM matters',
      'Cross-border disputes',
      'Onshore & free-zone legal requirements',
    ],
    keys: [
      { name: 'M.B. KEMP (ME) LLP', detail: 'Associated firm — Hong Kong · London · Milan · Abu Dhabi' },
      { name: 'DIFC',               detail: 'Dubai International Financial Centre' },
      { name: 'ADGM',               detail: 'Abu Dhabi Global Market' },
    ],
    Illo: VectorNode,
  },
] as const

/** Short one-line summary (first sentence, truncated on a word boundary). */
function summarize(body: string, max = 150): string {
  const first = (body.match(/^[^.]+\./) ?? [body])[0].trim()
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).trim() + '…'
}

/** Split a long body string into shorter, easier-to-read paragraphs. */
function toParagraphs(body: string): string[] {
  const sentences = body.match(/[^.]+\./g) ?? [body]
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
