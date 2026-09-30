'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionNav } from '@/components/section-nav'
import { PanelImage } from '@/components/panel-image'

const PA_SECTIONS = [
  { id: 'technology',           label: 'Technology' },
  { id: 'banking-finance',      label: 'Fintech & Banking' },
  { id: 'corporate-commercial', label: 'Corporate' },
  { id: 'ip-data',              label: 'IP & Data' },
  { id: 'dispute-resolution',   label: 'Disputes' },
  { id: 'labour-employment',    label: 'Employment' },
  { id: 'government-sector',    label: 'Government' },
  { id: 'healthcare-pharma',    label: 'Healthcare' },
  { id: 'non-profit',           label: 'Non-Profit' },
  { id: 'cross-border',         label: 'Pakistan–GCC' },
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

type Practice = {
  id: string
  eyebrow: string
  title: string
  /** One-line positioning line under the title. Optional. */
  tagline?: string
  paragraphs: string[]
  bullets: string[]
  keys: { name: string; detail: string }[]
  Illo: typeof VectorNode
}

const PRACTICES: Practice[] = [
  {
    id: 'technology',
    eyebrow: 'Technology & TMT',
    title: 'Technology & Digital Frontiers',
    tagline: 'Legal architecture for businesses building what comes next.',
    paragraphs: [
      'Technology businesses move quickly, while the legal framework around them continues to evolve. We advise software companies, digital platforms, technology investors, fintech ventures and emerging businesses on the legal structures required to build, launch and scale.',
      'Our work covers digital platforms, SaaS and cloud services, artificial intelligence, machine learning, virtual and immersive environments, blockchain, digital assets, API integrations, technology procurement, software development, licensing and platform terms.',
      'We advise clients from the design stage, helping them incorporate legal and regulatory considerations into their products, data processes, customer journeys and commercial arrangements. Our approach is based on compliance by design: identifying legal risk early and building practical safeguards into the business model.',
      'We also advise on AI governance, training data, intellectual property in AI-generated outputs, algorithmic accountability, automated decision-making, confidentiality, procurement and the responsible deployment of AI tools.',
    ],
    bullets: [
      'Digital platforms, SaaS & cloud services',
      'Artificial intelligence & machine learning',
      'Virtual & immersive environments',
      'Blockchain & digital assets',
      'API integrations & technology procurement',
      'Software development, licensing & platform terms',
      'AI governance & responsible deployment',
      'Compliance by design',
    ],
    keys: [
      { name: 'IT & telecom licensing',             detail: 'Sector authorisations & compliance' },
      { name: 'Pakistan tech & telecom regulation', detail: 'Evolving regulatory landscape' },
    ],
    Illo: VectorNode,
  },
  {
    id: 'banking-finance',
    eyebrow: 'Regulated finance',
    title: 'Fintech, Banking and Financial Regulation',
    tagline: 'Making regulated innovation workable.',
    paragraphs: [
      'Financial services are becoming increasingly digital, interconnected and technology-dependent. We advise banks, financial institutions, NBFCs, fintech businesses, payment providers and technology companies operating in or around the financial sector.',
      'Our work includes digital banking, payment services, electronic money, digital wallets, embedded finance, fintech licensing, payment interoperability, API arrangements, cloud outsourcing, virtual assets and emerging digital financial models. We also advise on AML/CFT frameworks, financial product documentation, syndicated lending, Islamic finance, security documentation, financial institution governance, regulatory investigations and enforcement.',
      'We help clients navigate Pakistan’s financial regulatory environment while preserving the commercial viability of their products and operating models.',
    ],
    bullets: [
      'Digital banking & payment services',
      'Electronic money, digital wallets & embedded finance',
      'Fintech licensing & payment interoperability',
      'Cloud outsourcing & virtual assets',
      'AML/CFT frameworks',
      'Syndicated lending & Islamic finance',
      'Security & financial product documentation',
      'Regulatory investigations & enforcement',
    ],
    keys: [
      { name: 'SBP',                        detail: 'State Bank of Pakistan' },
      { name: 'Banking Courts & Tribunals', detail: 'Recovery and foreclosure proceedings' },
    ],
    Illo: StackedCubes,
  },
  {
    id: 'corporate-commercial',
    eyebrow: 'Corporate practice',
    title: 'Corporate Transactions, Investment and Commercial Growth',
    tagline: 'Structuring ambition before it becomes exposure.',
    paragraphs: [
      'We support businesses throughout their corporate and commercial lifecycle, from initial structuring and investment through to expansion, restructuring and exit.',
      'Our practice covers corporate structuring, shareholder arrangements, joint ventures, strategic alliances, mergers and acquisitions, foreign investment, technology transactions, due diligence, corporate governance, restructuring and commercial contracting. We prepare and negotiate share purchase agreements, shareholders’ agreements, term sheets, investment documents, vendor and procurement contracts, distribution arrangements and other strategic commercial agreements.',
      'We also advise founders, investors and growing businesses on SAFEs (Simple Agreements for Future Equity), convertible investment structures and ESOPs (Employee Stock Ownership Plans), helping align investment, ownership and employee incentives with the company’s long-term growth strategy.',
      'For businesses without a fully developed in-house legal function, we provide practical day-to-day support, including contract review, negotiation, legal triage, corporate records, regulatory correspondence and executive-level advice.',
    ],
    bullets: [
      'Corporate structuring & shareholder arrangements',
      'Joint ventures & strategic alliances',
      'Mergers & acquisitions',
      'Foreign investment & due diligence',
      'Corporate governance & restructuring',
      'SAFEs, convertibles & ESOPs',
      'Commercial contracting',
      'Outsourced in-house legal support',
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
    id: 'ip-data',
    eyebrow: 'Intangible assets',
    title: 'Intellectual Property, Data and Brand Protection',
    tagline: 'Protecting the assets that make the business valuable.',
    paragraphs: [
      'Modern businesses are often built on intangible assets: software, brands, data, algorithms, content and proprietary business models.',
      'We advise on trademarks, copyrights, patents, software ownership, source-code protection, employee and contractor intellectual property, AI models and outputs, data ownership, technology licensing, IP assignments, research and development arrangements, technology transfer, brand licensing, digital content and platform terms.',
      'Our advice connects intellectual property with corporate, commercial, employment and data protection considerations. We help clients establish ownership, preserve confidentiality, commercialise their assets and respond to infringement.',
    ],
    bullets: [
      'Trademarks, copyrights & patents',
      'Software ownership & source-code protection',
      'Employee & contractor IP',
      'AI models & outputs',
      'Data ownership & protection',
      'Technology licensing & transfer',
      'Brand licensing & digital content',
      'Infringement response',
    ],
    keys: [],
    Illo: CirclesInCircumference,
  },
  {
    id: 'dispute-resolution',
    eyebrow: 'Contentious work',
    title: 'Dispute Resolution, Arbitration and White-Collar Defence',
    paragraphs: [
      'Disputes can disrupt cash flow, delay transactions, damage relationships and expose businesses and executives to regulatory or reputational risk.',
      'We represent companies, financial institutions, shareholders, executives and individuals in contractual, corporate, banking, regulatory, civil and criminal matters. Our work includes commercial disputes, shareholder claims, recovery proceedings, fraud and misrepresentation, constitutional petitions, injunctions, arbitration, financial crime investigations, white-collar defence, breach of trust allegations and complex multi-party disputes.',
      'We also advise before proceedings begin, helping clients preserve evidence, manage exposure, improve settlement leverage and develop a clear strategy for resolution or defence.',
    ],
    bullets: [
      'Commercial & shareholder disputes',
      'Recovery proceedings',
      'Fraud & misrepresentation',
      'Constitutional petitions & injunctions',
      'Arbitration',
      'Financial crime investigations',
      'White-collar defence & breach of trust',
      'Pre-action strategy & evidence preservation',
    ],
    keys: [
      { name: 'High Courts & District Courts', detail: 'Trial and appellate representation' },
      { name: 'Tribunals & regulators',        detail: 'Statutory and regulatory forums' },
      { name: 'Arbitration forums',            detail: 'Domestic and international rules' },
    ],
    Illo: TesseractCube,
  },
  {
    id: 'labour-employment',
    eyebrow: 'Workforce',
    title: 'Employment, Workforce and HR Structuring',
    tagline: 'Workforce structures for businesses that intend to grow.',
    paragraphs: [
      'We advise local and international businesses on the legal frameworks required to recruit, manage, incentivise and reorganise their workforce.',
      'Our work includes executive employment agreements, employment policies, confidentiality and non-disclosure arrangements, intellectual property ownership, restrictive covenants, employee incentives, ESOP-related documentation, workforce restructuring, termination strategy, disciplinary processes, workplace investigations, contractor arrangements and labour disputes.',
      'Our objective is to help employers make commercially necessary decisions while reducing contractual, procedural and reputational risk.',
    ],
    bullets: [
      'Executive employment agreements',
      'Employment policies & NDAs',
      'Restrictive covenants & IP ownership',
      'Employee incentives & ESOPs',
      'Workforce restructuring & terminations',
      'Disciplinary processes & investigations',
      'Contractor arrangements',
      'Labour disputes',
    ],
    keys: [
      { name: 'Labour Courts',              detail: 'Trial-level representation' },
      { name: 'Labour Appellate Tribunals', detail: 'Appellate advocacy' },
      { name: 'High Courts of Pakistan',    detail: 'Constitutional & statutory review' },
    ],
    Illo: GridDots,
  },
  {
    id: 'government-sector',
    eyebrow: 'Public sector',
    title: 'Government Relations, Regulatory Affairs and Public Policy',
    tagline: 'Helping businesses navigate the institutions that shape their operating environment.',
    paragraphs: [
      'From our base in Islamabad, we advise clients on government-facing legal and regulatory matters, including licensing and approvals, regulator and ministry engagement, policy and legislative analysis, public-sector contracting, regulatory correspondence, public-private initiatives, government investigations and strategic policy advocacy.',
      'We help clients understand institutional processes, present their position effectively and pursue lawful, transparent and commercially informed engagement with public authorities.',
    ],
    bullets: [
      'Licensing & approvals',
      'Regulator & ministry engagement',
      'Policy & legislative analysis',
      'Public-sector contracting',
      'Public-private initiatives',
      'Government investigations',
      'Strategic policy advocacy',
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
    tagline: 'Legal support for sectors where regulation and public interest are inseparable.',
    paragraphs: [
      'Healthcare, pharmaceutical and life sciences businesses operate under significant regulatory, ethical and operational pressure.',
      'We advise healthcare providers, pharmaceutical companies, medical technology businesses and life sciences organisations on business structuring, DRAP and other relevant health-sector regulatory requirements, licensing, product registration, market access, distribution, procurement, medical technology agreements, clinical and research arrangements, pharmaceutical and technology licensing, intellectual property, advertising, patient confidentiality, employment and regulatory investigations.',
      'Our advice is designed to help clients operate commercially while maintaining appropriate standards of patient welfare, product integrity and regulatory compliance.',
    ],
    bullets: [
      'DRAP & health-sector regulation',
      'Licensing & product registration',
      'Market access, distribution & procurement',
      'Medical technology agreements',
      'Clinical & research arrangements',
      'Pharmaceutical & technology licensing',
      'Advertising & patient confidentiality',
      'Regulatory investigations',
    ],
    keys: [
      { name: 'DRAP', detail: 'Drug Regulatory Authority of Pakistan' },
    ],
    Illo: OrbitRings,
  },
  {
    id: 'non-profit',
    eyebrow: 'Philanthropy & aid',
    title: 'Non-Profit, Trusts and Development Organisations',
    paragraphs: [
      'We advise non-profit organisations, trusts, donor-funded entities and international organisations establishing or operating programmes in Pakistan.',
      'Our work covers organisational structuring, governance, donor and grant documentation, registrations, international donor operations, employment and consultancy arrangements, local implementation structures and operational compliance.',
    ],
    bullets: [
      'Organisational structuring & governance',
      'Donor & grant documentation',
      'Registrations',
      'International donor operations',
      'Employment & consultancy arrangements',
      'Local implementation structures',
      'Operational compliance',
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
    title: 'Pakistan–GCC and Cross-Border Business',
    tagline: 'Coordinated advice across a strategic commercial corridor.',
    paragraphs: [
      'Pakistan’s commercial relationships with the Gulf Cooperation Council (GCC) are creating significant opportunities in investment, technology, financial services, trade, remittances, real estate and corporate expansion, particularly in the United Arab Emirates and Saudi Arabia.',
      'Through our strategic partnership with M.B. KEMP (ME) LLP, an international law firm with offices in Abu Dhabi, Dubai, London, Milan and Hong Kong, we support clients operating between Pakistan and the GCC, with a particular focus on the UAE and Saudi Arabia.',
      'Our cross-border practice covers investment, corporate establishment and restructuring, inbound and outbound transactions, cross-border payments, remittance corridors, technology transfer, fintech, financial services, DIFC and ADGM structures, UAE free-zone and onshore arrangements, Saudi Arabian market entry, commercial agreements, regulatory coordination and cross-border disputes.',
      'We aim to provide a unified legal strategy across the relevant jurisdictions, rather than disconnected advice from separate teams. Our clients benefit from coordinated support as they establish operations, structure investments, enter regulated markets and develop commercial relationships across Pakistan, the UAE and Saudi Arabia.',
    ],
    bullets: [
      'Investment & corporate establishment',
      'Inbound & outbound transactions',
      'Cross-border payments & remittance corridors',
      'Technology transfer, fintech & financial services',
      'DIFC & ADGM structures',
      'UAE free-zone & onshore arrangements',
      'Saudi Arabian market entry',
      'Cross-border disputes',
    ],
    keys: [
      { name: 'M.B. KEMP (ME) LLP', detail: 'Strategic partner firm — Abu Dhabi · Dubai · London · Milan · Hong Kong' },
      { name: 'DIFC',               detail: 'Dubai International Financial Centre' },
      { name: 'ADGM',               detail: 'Abu Dhabi Global Market' },
      { name: 'Saudi Arabia',       detail: 'Market entry & regulatory coordination' },
    ],
    Illo: VectorNode,
  },
]

/** Protect abbreviations whose internal periods are NOT sentence boundaries
 *  (e.g. the partner firm "M.B. KEMP (ME) LLP") before naive sentence splitting. */
const FIRM = 'M.B. KEMP (ME) LLP'
const FIRM_TOKEN = '__FIRM__'
const protectFirm = (s: string) => s.split(FIRM).join(FIRM_TOKEN)
const restoreFirm = (s: string) => s.split(FIRM_TOKEN).join(FIRM)

/** Short one-line summary for the index cards: the tagline, else the first
 *  sentence (truncated on a word boundary). */
function summarize(p: Practice, max = 150): string {
  if (p.tagline) return p.tagline
  const b = protectFirm(p.paragraphs[0] ?? '')
  const first = restoreFirm((b.match(/^[^.]+\./) ?? [b])[0]).trim()
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).trim() + '…'
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
            <h1 className="display-xl font-display">
              <span className="block"><SplitReveal trigger="load" delay={0.1}>Practice</SplitReveal></span>
              <span className="block text-primary"><SplitReveal trigger="load" delay={0.3}>areas.</SplitReveal></span>
            </h1>
            <FadeIn delay={0.5}>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-foreground/70 max-w-xl">
                Our work is concentrated in sectors where legal complexity is greatest and the cost of imprecision
                is highest. We help clients launch, structure, finance, regulate, protect, defend and scale their
                businesses with greater confidence.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-2">
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
                <p className="text-sm md:text-base text-foreground/65 leading-relaxed">{summarize(p)}</p>
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

              {p.tagline && (
                <FadeIn>
                  <p className="font-display text-xl md:text-2xl leading-snug text-foreground max-w-2xl mb-6">
                    {p.tagline}
                  </p>
                </FadeIn>
              )}

              <FadeIn className="space-y-5 max-w-2xl">
                {p.paragraphs.map((para, j) => (
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
