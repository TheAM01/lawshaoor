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

/** Seeded on first run — migrates the original hardcoded team.
 *  Bios follow the client's `lib/new-content.docx`. */
export const SEED_TEAM_MEMBERS: (TeamMemberInput & { slug: string })[] = [
  {
    slug: 'abdul-manan',
    name: 'Abdul Manan',
    title: 'Founder and Lead Partner',
    location: 'Islamabad, Pakistan',
    email: 'abdul.manan@lawshaoor.com',
    linkedin: '',
    photo: '',
    focus: 'Technology · Fintech · Banking · Corporate · Energy',
    illustrationKey: 'circles-in-circumference',
    bio: [
      'Abdul Manan is an Islamabad-based corporate and commercial lawyer with more than 13 years’ experience advising technology businesses, financial institutions, multinational companies and high-growth enterprises.',
      'His practice focuses on technology, fintech, banking, corporate structuring, finance and regulatory matters. He advises clients on digital banking frameworks, syndicated lending, corporate governance, technology transactions, artificial intelligence, virtual reality, virtual assets and the commercialisation of digital intellectual property.',
      'Before establishing LawShaoor Chambers, Mr. Manan built a formidable corporate practice at premier law firms across Pakistan and the Gulf region. He has a proven track record in executing major corporate restructurings, cross-border mergers and acquisitions, corporate finance transactions.',
      'His work bridges conventional corporate law and emerging digital business models.',
      'Complementing his active practice, Mr. Manan is committed to the development of the legal profession. He serves as a visiting faculty member at several public sector universities in Islamabad, where he lectures on law.',
    ],
    highlights: [
      { label: 'Experience',     value: '13+ years' },
      { label: 'Prior chambers', value: 'RIAA Barker Gillette · CMS (Saudi Arabia) · M.B. Kemp' },
      { label: 'Sectors',        value: 'Technology · Fintech · Banking · Energy' },
      { label: 'Teaching',       value: 'Visiting faculty, public sector universities in Islamabad' },
    ],
    order: 0,
  },
  {
    slug: 'sahibzada-saad',
    name: 'Sahibzada Saad ul Amin',
    title: 'Partner',
    location: 'Islamabad, Pakistan',
    email: 'sahibzada.saad@lawshaoor.com',
    linkedin: '',
    photo: '',
    focus: 'Civil Litigation · White-Collar Defence · Financial Crime',
    illustrationKey: 'tesseract-cube',
    bio: [
      'Sahibzada Saad is a courtroom advocate with more than 13 years’ experience in contentious civil litigation, white-collar defence, financial crime and regulatory enforcement.',
      'He represents companies, individuals and senior executives facing exposure arising from fraud, breach of trust, financial misconduct, contentious transactions and regulatory investigations.',
      'His practice is defence-oriented, commercially pragmatic and focused on protecting the client’s position from the earliest stage of a dispute or investigation.',
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
    linkedin: '',
    photo: '',
    focus: 'Dispute Resolution · Corporate Advisory',
    illustrationKey: 'stacked-cubes',
    bio: [
      'Muhammad Arif Firdos has a decade of experience in dispute resolution and corporate advisory.',
      'He represents clients before Pakistan’s superior and subordinate courts, as well as quasi-judicial and regulatory forums. His practice includes civil disputes, contractual claims, property and real estate litigation, corporate matters and constitutional petitions.',
      'He combines procedural knowledge with a practical approach to litigation strategy and commercial risk.',
    ],
    highlights: [
      { label: 'Experience', value: 'Decade+ in dispute resolution' },
      { label: 'Forums',     value: 'Superior & subordinate courts · Quasi-judicial & regulatory forums' },
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
    linkedin: '',
    photo: '',
    focus: 'Data Protection · Privacy Governance · AI · Cross-Border',
    illustrationKey: 'orbit-rings',
    bio: [
      'Komal Iqbal is an Advocate of the High Courts specialising in data protection, privacy governance and international regulatory frameworks.',
      'She holds an LL.M. in International Commercial Law from the University of Aberdeen and advises clients on cross-border data transfers, privacy compliance, artificial intelligence, machine-learning models and data-related issues arising in digital and virtual environments.',
      'Having worked across Pakistan and the UAE, she also advises on DIFC and ADGM-related regulatory considerations.',
    ],
    highlights: [
      { label: 'Admission',  value: 'Advocate of the High Courts' },
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
    linkedin: '',
    photo: '',
    focus: 'Criminal Defence · White-Collar · Financial Crime',
    illustrationKey: 'vector-node',
    bio: [
      'Malak Hussain Adeed is an Advocate of the High Courts and a graduate of the University of London.',
      'His practice focuses on high-stakes criminal defence, white-collar offences, financial crimes and complex multi-party disputes. He regularly appears before trial courts and specialised tribunals, representing businesses and individuals facing statutory, regulatory and criminal exposure.',
    ],
    highlights: [
      { label: 'Education', value: 'University of London' },
      { label: 'Admission', value: 'Advocate of the High Courts' },
      { label: 'Forums',    value: 'Trial courts · Specialised tribunals · High Courts' },
      { label: 'Focus',     value: 'Fraud · Breach of trust · Financial irregularities · Statutory violations' },
    ],
    order: 4,
  },
  {
    slug: 'mohammad-kalim-wali',
    name: 'Mohammad Kalim Wali',
    title: 'Associate',
    location: 'Islamabad, Pakistan',
    email: 'kalim.wali@lawshaoor.com',
    linkedin: '',
    photo: '',
    focus: 'Civil · Corporate · Regulatory · SECP',
    illustrationKey: 'grid-dots',
    bio: [
      'Mohammad Kalim Wali advises on civil, corporate and regulatory matters, including corporate compliance, SECP-related matters, corporate records and regulatory liaison.',
      'A graduate of NUST Law School, his academic research focused on the legal and regulatory challenges of the gig economy. He brings a contemporary understanding of technology-led workforces, digital platforms and modern employment models.',
    ],
    highlights: [
      { label: 'Education',  value: 'LLB — NUST Law School' },
      { label: 'Prior role', value: 'Office of Legal Affairs, University of Central Asia (Bishkek, Kyrgyzstan)' },
      { label: 'Research',   value: 'Legal & regulatory challenges of the gig economy' },
      { label: 'Work',       value: 'SECP matters · Corporate records · Compliance · Regulatory liaison' },
    ],
    order: 5,
  },
]
