import { z } from 'zod'
import type { ObjectId } from 'mongodb'
import { toSlug } from './post'

export const HighlightSchema = z.object({
  label: z.string().max(60).default(''),
  value: z.string().max(280).default(''),
})

export const TeamMemberInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  slug: z.string().max(120).optional(),
  title: z.string().max(160).default(''),
  location: z.string().max(120).default(''),
  email: z.string().max(160).default(''),
  /** LinkedIn profile URL. Empty = no LinkedIn button shown. */
  linkedin: z.string().max(300).default(''),
  /** Headshot URL (ImgBB or any). Empty = illustration fallback. */
  photo: z.string().max(600).default(''),
  focus: z.string().max(240).default(''),
  /** Illustration registry key used when no photo is set. */
  illustrationKey: z.string().max(64).default(''),
  /** Bio paragraphs. */
  bio: z.array(z.string().max(4000)).max(20).default([]),
  /** Sidebar highlight pairs. */
  highlights: z.array(HighlightSchema).max(12).default([]),
  order: z.number().int().min(0).max(9999).default(0),
})
export type TeamMemberInput = z.infer<typeof TeamMemberInputSchema>
export type Highlight = z.infer<typeof HighlightSchema>

export type TeamMemberDoc = TeamMemberInput & {
  _id?: ObjectId
  slug: string
  createdAt: Date
  updatedAt: Date
}

export type TeamListItem = {
  _id: string
  name: string
  slug: string
  title: string
  location: string
  email: string
  linkedin: string
  photo: string
  focus: string
  illustrationKey: string
  bio: string[]
  highlights: Highlight[]
  order: number
  createdAt: string
  updatedAt: string
}

export function toTeamListItem(doc: TeamMemberDoc): TeamListItem {
  return {
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    title: doc.title ?? '',
    location: doc.location ?? '',
    email: doc.email ?? '',
    linkedin: doc.linkedin ?? '',
    photo: doc.photo ?? '',
    focus: doc.focus ?? '',
    illustrationKey: doc.illustrationKey ?? '',
    bio: Array.isArray(doc.bio) ? doc.bio : [],
    highlights: Array.isArray(doc.highlights) ? doc.highlights : [],
    order: doc.order ?? 0,
    createdAt: (doc.createdAt instanceof Date ? doc.createdAt : new Date()).toISOString(),
    updatedAt: (doc.updatedAt instanceof Date ? doc.updatedAt : new Date()).toISOString(),
  }
}

export function normalizeTeamSlug(name: string, slug?: string): string {
  const candidate = (slug ?? '').trim() || name
  return toSlug(candidate) || 'member'
}

/** Seeded on first run — migrates the original hardcoded team. */
export const SEED_TEAM_MEMBERS: (TeamMemberInput & { slug: string })[] = [
  {
    slug: 'abdul-manan',
    name: 'Abdul Manan',
    title: 'Founder, LawShaoor Chambers',
    location: 'Islamabad, Pakistan',
    email: 'abdul.manan@lawshaoor.com',
    photo: '',
    focus: 'Corporate · Commercial · Energy · Tech · Banking',
    illustrationKey: 'circles-in-circumference',
    bio: [
      'Abdul Manan is an Islamabad-based corporate and commercial lawyer with over 13 years of experience specialising in the technology, fintech, and banking sectors. As the founder of LawShaoor Chambers, he acts as lead counsel to multinational corporations, financial institutions, and high-growth tech enterprises. His practice combines traditional corporate governance with emerging digital regulatory frameworks, including AI and financial technologies.',
      'Before founding LawShaoor Chambers, he worked with leading law firms in Pakistan and the Gulf region, where he advised on major corporate restructurings, cross-border mergers and acquisitions, corporate finance transactions, and tax matters. His transactional background enables him to provide strategic, commercially focused advice on syndicated lending, venture financing, and regulatory approvals.',
      'Mr. Manan also has significant experience in the energy and petroleum sectors. Drawing on his tenure at RIAA Barker Gillette, CMS (Saudi Arabia), and M.B. Kemp, he has advised major energy companies on the commercial structuring and regulatory compliance of upstream and downstream operations, and has drafted complex project documentation for oil, gas, and mining ventures.',
      'He is committed to legal education and serves as visiting faculty at private and public sector universities in Islamabad.',
    ],
    highlights: [
      { label: 'Experience',     value: '13+ years' },
      { label: 'Prior chambers', value: 'RIAA Barker Gillette · CMS (Saudi Arabia) · M.B. Kemp' },
      { label: 'Sectors',        value: 'Technology · Fintech · Banking · Energy' },
      { label: 'Teaching',       value: 'Visiting faculty, private & public sector universities in Islamabad' },
    ],
    order: 0,
  },
  {
    slug: 'sahibzada-saad',
    name: 'Sahibzada Saad Khan',
    title: 'Off-Counsel',
    location: 'Islamabad, Pakistan',
    email: 'sahibzada.saad@lawshaoor.com',
    photo: '',
    focus: 'Civil & Criminal Litigation · White-Collar Defence',
    illustrationKey: 'tesseract-cube',
    bio: [
      'Sahibzada Saad is a courtroom advocate with more than 13 years of litigation experience across civil and criminal jurisdictions. He has a strong track record in high-stakes disputes, white-collar defence, financial crimes, and regulatory enforcement.',
      'His civil practice includes commercial disputes, breach of contract claims, property litigation, and urgent injunctive relief. He is known for his trial-ready approach and strategic case management from pleadings to final judgment.',
      'In criminal and regulatory matters, Mr. Saad regularly defends individuals and corporate clients in cases involving fraud, embezzlement, breach of trust, and financial misconduct. He provides focused, defence-oriented advice on contentious transactions, fund tracing, and compliance issues.',
    ],
    highlights: [
      { label: 'Experience', value: '13+ years, civil & criminal' },
      { label: 'Defence',    value: 'Fraud · Embezzlement · Breach of trust · Financial misconduct' },
      { label: 'Civil',      value: 'Injunctive relief · Breach of contract · Property & tortious disputes' },
    ],
    order: 1,
  },
  {
    slug: 'muhammad-arif-firdos',
    name: 'Muhammad Arif Firdos',
    title: 'Senior Associate',
    location: 'Islamabad, Pakistan',
    email: 'arif.firdos@lawshaoor.com',
    photo: '',
    focus: 'Dispute Resolution · Corporate · Regulatory',
    illustrationKey: 'stacked-cubes',
    bio: [
      'Muhammad Arif has over a decade of experience in dispute resolution, representing clients before Pakistan’s superior and subordinate courts as well as various quasi-judicial forums. He also advises corporate and commercial clients on transactional and regulatory matters.',
      'His litigation practice covers civil disputes, contractual claims, property and real estate matters, constitutional petitions, and regulatory proceedings. He is known for his strong command of procedural law and his practical, outcome-driven approach to case strategy.',
    ],
    highlights: [
      { label: 'Experience', value: 'Decade+ in dispute resolution' },
      { label: 'Forums',     value: 'Superior & subordinate courts · Quasi-judicial forums' },
      { label: 'Litigation', value: 'Civil disputes · Contractual claims · Property & real estate · Constitutional petitions' },
      { label: 'Advisory',   value: 'Corporate, commercial & regulatory matters' },
    ],
    order: 2,
  },
  {
    slug: 'komal-iqbal',
    name: 'Komal Iqbal',
    title: 'Senior Associate',
    location: 'Islamabad, Pakistan',
    email: 'komal.iqbal@lawshaoor.com',
    photo: '',
    focus: 'Data Protection · GDPR · International Commercial',
    illustrationKey: 'orbit-rings',
    bio: [
      'Komal Iqbal is an Advocate of the High Courts of Pakistan with a specialised practice in data protection, GDPR compliance, and international regulatory frameworks. She advises clients on privacy governance, cross-border data transfers, data processing agreements, internal compliance policies, and risk management.',
      'She has worked with legal practices in Pakistan and the UAE, gaining experience in DIFC and ADGM data protection regimes and broader international commercial law. Her practice also includes corporate compliance, dispute resolution, intellectual property matters, and regulatory advisory work. She has represented clients before SECP, CCP, and other judicial and quasi-judicial bodies.',
    ],
    highlights: [
      { label: 'Admission',  value: 'Advocate of the High Courts of Pakistan' },
      { label: 'Education',  value: 'LL.M. International Commercial Law — University of Aberdeen, Scotland' },
      { label: 'Forums',     value: 'SECP · CCP · Other judicial & quasi-judicial bodies' },
      { label: 'Speciality', value: 'DIFC & ADGM data protection · GDPR · Cross-border data' },
    ],
    order: 3,
  },
  {
    slug: 'malak-hussain-adeed',
    name: 'Malak Hussain Adeed',
    title: 'Associate',
    location: 'Islamabad, Pakistan',
    email: 'hussain.adeed@lawshaoor.com',
    photo: '',
    focus: 'Criminal Defence · White-Collar · Civil Litigation',
    illustrationKey: 'vector-node',
    bio: [
      'Malak Hussain Adeed is an Advocate of the High Courts and a graduate of the University of London. He represents clients in criminal and civil litigation, with a focus on criminal defence and complex multi-party disputes.',
      'He regularly appears before trial courts, special tribunals, and the High Courts. His experience includes handling cases involving fraud, breach of trust, financial irregularities, regulatory offences, and other statutory violations. His courtroom advocacy and understanding of procedural law enable him to effectively represent individuals and businesses facing criminal proceedings.',
    ],
    highlights: [
      { label: 'Education', value: 'University of London' },
      { label: 'Admission', value: 'Advocate of the High Courts' },
      { label: 'Forums',    value: 'Trial courts · Special tribunals · High Courts' },
      { label: 'Focus',     value: 'Fraud · Breach of trust · Financial irregularities · Statutory violations' },
    ],
    order: 4,
  },
  {
    slug: 'mohammad-kalim-wali',
    name: 'Mohammad Kalim Wali',
    title: 'Junior Associate',
    location: 'Islamabad, Pakistan',
    email: 'kalim.wali@lawshaoor.com',
    photo: '',
    focus: 'Litigation · Corporate · Regulatory · Research',
    illustrationKey: 'grid-dots',
    bio: [
      'Mohammad Kalim Wali is an Associate with experience in litigation, corporate law, regulatory compliance, and legal research. He handles civil, criminal, family, and corporate matters, including drafting pleadings, legal notices, contracts, and legal opinions.',
      'He also manages SECP-related compliance, corporate record-keeping, and liaison with regulatory authorities. Mr. Kalim holds an LLB from NUST Law School and previously worked with the Office of Legal Affairs at the University of Central Asia in Bishkek, where he contributed to compliance and policy initiatives. His academic research focused on legal and regulatory challenges faced by gig-economy workers in Pakistan.',
    ],
    highlights: [
      { label: 'Education',  value: 'LLB — NUST Law School' },
      { label: 'Prior role', value: 'Office of Legal Affairs, University of Central Asia (Bishkek, Kyrgyzstan)' },
      { label: 'Thesis',     value: 'Legal protections for gig economy workers in Pakistan' },
      { label: 'Work',       value: 'District courts · SECP matters · Drafting · Compliance' },
    ],
    order: 5,
  },
]
