'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
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
    n: '01',
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
    n: '02',
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
    n: '03',
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
    n: '04',
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
    n: '05',
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
    n: '06',
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
    n: '07',
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
    id: 'tmt',
    n: '08',
    eyebrow: 'TMT',
    title: 'Telecommunication & Information Technology',
    body: 'The Chambers has developed a broad capability with respect to the frontier aspects of the emerging fields of telecommunications and information technology. In this connection, lawyers of the Chambers have extensively advised on telecommunication and information technology matters, including provision of Internet-based services; setting-up of software houses; regulatory framework, satellite-based services, Internet-based services, voice over internet protocol (VOIP); telecommunication systems & services, infrastructure Long Distance International, fiber network; E-banking; data communications; encryption; import, installation, operation and maintenance of telecommunication equipment, and other ancillary matters such as cryptographic products and its legal status. The Chambers has successfully developed a practical understanding of all legal and practical issues involved in these areas and provides additional expertise to its routine advice and other areas of practice by way of its familiarity with the use and practice of state-of-the-art technology and its regulation and policy directives in Pakistan.',
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
    n: '09',
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
    n: '10',
    eyebrow: 'Workforce',
    title: 'Labour & Employment',
    body: 'Lawyers in the Chambers regularly advise foreign as well as local clients on all labor/HR related issues in Pakistan including interpretation and application of labor legislation; advice and strategy with respect to CBA negotiations, employee benefits, compensation, employment contracts, termination, settlements, plant closings, lay-offs, employment contracts, employment insurance & protection and welfare, construction of labor management systems, drafting collective bargaining agreements including first contracts and renewals, in addition to acting as counsels and appearing before all labor forums including labor courts, labor appellate tribunals and High Courts of Pakistan.',
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
    n: '11',
    eyebrow: 'Philanthropy & aid',
    title: 'Non-Profit',
    body: 'Lawyers of the Chambers have extensively advised both local and foreign philanthropists on a national, international and private level to devise logistically and financially sustainable strategies for its Clients. While routinely involved in advising and assisting with respect to private non-profit sector ventures including incorporations and establishment of trusts, societies and companies for objects as diverse as education, female empowerment, sustainable community development, child labor, tourism and infrastructure development, the Chambers has been prominently involved in national initiatives on social sector reform and the representation of international and governmental aid agencies with respect to their administrative and project related activities in Pakistan. The lawyers’ participation in social reform projects has involved advice and facilitation in all aspects of review and reform of the legislative, financial, administrative and co-coordinative reform of the concerned sectors while its representation of foreign donor agencies has entailed substantive advice and assistance with respect to project, labor, administrative, governmental, licensing, property, and other legal concerns arising in the context of their presence in Pakistan.',
    bullets: [
      'Trusts, societies & non-profit companies',
      'Education & female empowerment ventures',
      'Sustainable community development',
      'Child labor & social-sector projects',
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
    id: 'uae-cross-border',
    n: '12',
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

export default function PracticeAreas() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[15%] -right-[15%] hidden md:block" />
        <OrbitRings className="absolute -left-20 top-12 w-[320px] h-[320px] opacity-30 hidden md:block" uid="pa-hero-orb" rotate />
        <VectorNode className="absolute -right-8 bottom-0 w-44 h-44 opacity-35 hidden md:block" uid="pa-hero-vn" />

        <div className="max-w-[1440px] mx-auto relative">
          <div className="mb-10 md:mb-14">
            <Breadcrumbs items={[{ label: 'Practice Areas' }]} className="mb-8" />
            <span className="index-chip">001 · Practice</span>
          </div>

          <h1 className="display-xl font-display">
            <span className="block"><SplitReveal trigger="load" delay={0.1}>Twelve practice</SplitReveal></span>
            <span className="block text-gradient"><SplitReveal trigger="load" delay={0.35}>areas.</SplitReveal></span>
          </h1>

          <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20 items-end">
            <div className="col-span-12 md:col-span-6 md:col-start-3">
              <FadeIn>
                <p className="font-heading text-xl md:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  Civil, commercial, corporate, regulatory, and dispute resolution matters — across heavily regulated and commercially sensitive sectors. The Chambers acts for local and foreign companies, financial institutions, non-profit organizations, and individual clients.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-3 hidden md:flex justify-end">
              <GridDots className="w-36 h-36 lg:w-44 lg:h-44 opacity-90" uid="pa-gd" />
            </div>
          </div>
        </div>
      </section>

      {/* INDEX */}
      <section className="section-pad py-12 md:py-16 border-t border-foreground/15 bg-background-alt">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-4 mb-6">
            <div className="col-span-12 md:col-span-3">
              <span className="index-chip">Index</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="eyebrow text-foreground/60">Jump to a practice area</p>
            </div>
          </div>
          <Rule className="mb-6" />
          <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            {PRACTICES.map((p) => (
              <Link
                key={p.id}
                href={`#${p.id}`}
                className="group flex items-baseline gap-3 py-2 border-b border-foreground/10 hover:border-primary transition-colors"
              >
                <span className="eyebrow text-foreground/55 w-8">{p.n}</span>
                <span className="font-display text-base md:text-lg tracking-[-0.015em] text-foreground/90 group-hover:text-primary transition-colors flex-1">
                  {p.title}
                </span>
                <span className="opacity-0 group-hover:opacity-100 text-primary transition-opacity">→</span>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* PRACTICES */}
      {PRACTICES.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`relative section-pad py-24 md:py-32 border-t border-foreground/15 overflow-hidden ${i % 2 === 0 ? 'bg-fixed-lavender' : 'bg-fixed-deep'}`}
        >
          {i % 2 === 0 ? (
            <>
              <OrbitRings className="absolute -right-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-25 hidden md:block" uid={`pa-${p.id}-orb`} rotate />
              <CirclesInCircumference className="absolute -left-12 -bottom-12 w-48 h-48 opacity-40 hidden md:block float-soft" uid={`pa-${p.id}-circ`} />
            </>
          ) : (
            <>
              <HexagonalCascade className="absolute -left-24 -bottom-12 w-72 h-72 opacity-35 hidden md:block" uid={`pa-${p.id}-hex`} />
              <StackedCubes className="absolute right-8 top-12 w-32 h-44 opacity-50 hidden md:block float-soft" uid={`pa-${p.id}-stk`} />
            </>
          )}

          <div className="max-w-[1440px] mx-auto relative">
            <div className="grid grid-cols-12 gap-6 mb-10 md:mb-14">
              <div className="col-span-12 md:col-span-2">
                <span className="index-chip">{`${p.n} of 12`}</span>
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="eyebrow text-primary mb-4">— {p.eyebrow}</p>
                <h2 className="display-lg font-display">
                  <SplitReveal>{p.title}</SplitReveal>
                </h2>
              </div>
            </div>

            <Rule className="rule-heavy mb-12 md:mb-16" />

            <div className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Body + bullets */}
              <div className="col-span-12 md:col-span-7 space-y-10">
                <FadeIn>
                  <p className="font-heading text-lg md:text-xl leading-relaxed text-foreground/85 max-w-3xl tracking-[-0.005em]">
                    {p.body}
                  </p>
                </FadeIn>

                <FadeIn staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15 border border-foreground/15">
                  {p.bullets.map((b, j) => (
                    <div key={j} className="bg-background p-5 md:p-6 flex items-start gap-4">
                      <span className="eyebrow text-primary mt-0.5">{String(j + 1).padStart(2, '0')}</span>
                      <span className="font-heading text-base md:text-lg text-foreground/90 tracking-[-0.005em]">{b}</span>
                    </div>
                  ))}
                </FadeIn>
              </div>

              {/* Illustration + key authorities */}
              <div className="col-span-12 md:col-span-5 space-y-8">
                <FadeIn className="surface bracketed p-8 md:p-12 flex items-center justify-center min-h-[320px] md:min-h-[400px]">
                  <p.Illo className="w-64 h-64 md:w-[320px] md:h-[320px]" uid={`pa-illo-${p.id}`} />
                </FadeIn>

                {p.keys.length > 0 && (
                  <div className="space-y-3">
                    <span className="eyebrow text-foreground/65">— Key authorities & frameworks</span>
                    <FadeIn staggerChildren className="space-y-2">
                      {p.keys.map((t, j) => (
                        <div key={j} className="flex items-start gap-4 py-3 border-b border-foreground/15">
                          <span className="font-mono text-xs text-primary tracking-[0.18em] uppercase mt-1">▣</span>
                          <div className="flex-1">
                            <p className="font-display text-lg md:text-xl tracking-[-0.015em]">{t.name}</p>
                            <p className="text-sm text-foreground/65 font-mono tracking-[0.12em] mt-1">{t.detail}</p>
                          </div>
                        </div>
                      ))}
                    </FadeIn>
                  </div>
                )}

                <Link href="/contact" className="btn-primary mt-4 inline-flex">
                  <span>Get in Touch</span>
                  <span className="arrow-magnet">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative section-pad py-32 md:py-44 border-t border-foreground/15 bg-fixed-mist overflow-hidden">
        <OrbitRings className="absolute -left-20 -bottom-16 w-72 h-72 opacity-45 hidden md:block float-soft" uid="pa-cta-orb" />
        <SquareCascade className="absolute -right-12 -top-8 w-56 h-56 opacity-40 hidden md:block" uid="pa-cta-sq" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-6">
              <span className="index-chip">Get in Touch</span>
              <h2 className="display-lg font-display">
                <span className="block"><SplitReveal>Have a matter</SplitReveal></span>
                <span className="block text-gradient"><SplitReveal>in mind?</SplitReveal></span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-primary">
                <span>Schedule a Consultation</span>
                <span className="arrow-magnet">→</span>
              </Link>
              <Link href="/people" className="btn-ghost">
                <span>Meet the team</span>
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
