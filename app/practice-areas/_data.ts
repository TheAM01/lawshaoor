import type { IllustrationComponent } from '@/components/illustrations/registry'
import {
  NodeLattice,
  VaultArches,
  Octagram,
  SealTicks,
  Balance,
  LinkedRings,
  Colonnade,
  PlusModules,
  Ascent,
  Corridor,
} from '@/components/illustrations/abstract'

export type Practice = {
  id: string
  /** Short label for compact UI (prev/next links, chips). */
  short: string
  eyebrow: string
  title: string
  /** One-line positioning line under the title. Optional. */
  tagline?: string
  paragraphs: string[]
  bullets: string[]
  keys: { name: string; detail: string }[]
  Illo: IllustrationComponent
}

/** Seed sketch that sits behind the illustration on cards and the detail hero. */
export const practiceImage = (id: string) => `/images/seed/pa-${id}.jpg`

export const PRACTICES: Practice[] = [
  {
    id: 'technology',
    short: 'Technology',
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
    Illo: NodeLattice,
  },
  {
    id: 'banking-finance',
    short: 'Fintech & Banking',
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
    Illo: VaultArches,
  },
  {
    id: 'corporate-commercial',
    short: 'Corporate',
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
    Illo: Octagram,
  },
  {
    id: 'ip-data',
    short: 'IP & Data',
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
    Illo: SealTicks,
  },
  {
    id: 'dispute-resolution',
    short: 'Disputes',
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
    Illo: Balance,
  },
  {
    id: 'labour-employment',
    short: 'Employment',
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
    Illo: LinkedRings,
  },
  {
    id: 'government-sector',
    short: 'Government',
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
    Illo: Colonnade,
  },
  {
    id: 'healthcare-pharma',
    short: 'Healthcare',
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
    Illo: PlusModules,
  },
  {
    id: 'non-profit',
    short: 'Non-Profit',
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
    Illo: Ascent,
  },
  {
    id: 'cross-border',
    short: 'Pakistan–GCC',
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
    Illo: Corridor,
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
export function summarize(p: Practice, max = 150): string {
  if (p.tagline) return p.tagline
  const b = protectFirm(p.paragraphs[0] ?? '')
  const first = restoreFirm((b.match(/^[^.]+\./) ?? [b])[0]).trim()
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).trim() + '…'
}

export function getPractice(id: string) {
  return PRACTICES.find((p) => p.id === id)
}
