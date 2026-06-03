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
      'Abdul Manan is an Islamabad-based corporate and commercial lawyer with over 13 years of experience specializing in the energy, technology, fintech, and banking sectors. He handles the full range of corporate and commercial matters, representing multinational corporations, financial institutions, high-growth tech enterprises, non-profit organizations and local & foreign companies. He regularly advises clients on everything from complex corporate structuring to the regulatory nuances of AI and financial technologies.',
      'Before establishing LawShaoor Chambers, Mr. Manan worked with premier law chambers across Pakistan and the Gulf region. He has a proven track record in executing major corporate restructurings, cross-border mergers and acquisitions, and corporate finance transactions.',
      'Alongside his primary focus on corporate and technology law, Mr. Manan possesses extensive experience in the energy and petroleum sectors. Drawing on his tenure at RIAA Barker Gillette, CMS (Saudi Arabia), and M.B. Kemp, he advised major energy companies on the commercial structuring, regulatory compliance and project documentation relating to upstream and downstream operations. His work included drafting and negotiating agreements for oil and gas projects, advising on licensing and regulatory frameworks, and supporting clients on cross-border energy transactions. This experience has given him a strong understanding of the legal and commercial dynamics of Pakistan’s energy and petroleum industry.',
      'Complementing his active practice, Mr. Manan is committed to the development of the legal profession. He serves as a visiting faculty member at several public sector universities in Islamabad, where he lectures on law.',
    ],
    highlights: [
      { label: 'Experience',     value: '13+ years' },
      { label: 'Prior chambers', value: 'RIAA Barker Gillette · CMS (Saudi Arabia) · M.B. Kemp' },
      { label: 'Sectors',        value: 'Energy · Technology · Fintech · Banking' },
      { label: 'Teaching',       value: 'Visiting faculty, public sector universities in Islamabad' },
    ],
    order: 0,
  },
  {
    slug: 'sahibzada-saad',
    name: 'Sahibzada Saad',
    title: 'Off-Counsel',
    location: 'Islamabad, Pakistan',
    email: 'sahibzada.saad@lawshaoor.com',
    photo: '',
    focus: 'Civil & Criminal Litigation · White-Collar Defence',
    illustrationKey: 'tesseract-cube',
    bio: [
      'Sahibzada Saad is a courtroom advocate with over a decade of intensive litigation experience in civil and criminal litigation, white-collar defence, financial crimes, and regulatory matters. He routinely defends individuals and corporate entities facing severe exposure in fraud, embezzlement, breach of trust, and complex financial misconduct cases. He provides incisive, defence-oriented counsel on contentious financial transactions, fund tracing, and regulatory compliance.',
      'On the civil front, Mr. Saad regularly acts in hard-fought commercial and civil disputes. He is highly adept at securing urgent injunctive relief, navigating complex breach of contract claims, and managing protracted property and tortious disputes. His civil practice is defined by a highly strategic, trial-ready posture, ensuring clients are robustly represented from the issuance of pleadings through to final judgment and enforcement.',
    ],
    highlights: [
      { label: 'Experience', value: 'Decade+ of intensive litigation' },
      { label: 'Defence',    value: 'Fraud · Embezzlement · Breach of trust · Financial misconduct' },
      { label: 'Civil',      value: 'Injunctive relief · Breach of contract · Property & tortious disputes' },
    ],
    order: 1,
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
      'Ms. Komal is an Advocate of the High Courts of Pakistan with a specialized practice in data protection, GDPR compliance, and international regulatory frameworks. She has experience in civil litigation, corporate advisory, and international commercial law. She advises clients on privacy governance, cross-border data transfers, data processing agreements, internal compliance policies, and risk management relating to personal data.',
      'She has worked with legal practices in Pakistan and the UAE, where she gained experience in DIFC and ADGM data protection regulations and broader international commercial law. Her practice includes advising on corporate compliance, dispute resolution, intellectual property matters, and regulatory obligations. She has represented clients before the Securities and Exchange Commission of Pakistan, the Competition Commission of Pakistan, and other judicial and quasi-judicial forums.',
      'Ms. Komal holds an LL.M. in International Commercial Law from the University of Aberdeen, Scotland, where her academic focus included data protection, digital regulation, and international commercial frameworks.',
    ],
    highlights: [
      { label: 'Admission',  value: 'Advocate of the High Courts of Pakistan' },
      { label: 'Education',  value: 'LL.M. International Commercial Law — University of Aberdeen, Scotland' },
      { label: 'Forums',     value: 'SECP · CCP · Other judicial & quasi-judicial forums' },
      { label: 'Speciality', value: 'DIFC & ADGM data protection · GDPR · Cross-border data' },
    ],
    order: 2,
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
      'Mr. Hussain is an Islamabad-based advocate and a graduate of the University of London, currently practicing at LawShaoor Chambers. He is an Advocate of the High Courts and represents clients in a wide range of criminal and civil litigation matters. His practice focuses on criminal defence, white-collar offences, financial crimes, and complex multi-party disputes, where he regularly appears before trial courts, special tribunals, and the High Courts.',
      'He has extensive experience handling criminal trials, including matters involving fraud, breach of trust, financial irregularities, regulatory offences, and other statutory violations. His courtroom advocacy and practical understanding of procedural law allow him to effectively represent individuals and businesses facing criminal proceedings.',
    ],
    highlights: [
      { label: 'Education', value: 'University of London' },
      { label: 'Admission', value: 'Advocate of the High Courts' },
      { label: 'Forums',    value: 'Trial courts · Special tribunals · High Courts' },
      { label: 'Focus',     value: 'Fraud · Breach of trust · Financial irregularities · Statutory violations' },
    ],
    order: 3,
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
      'Mr. Kalim is an Associate at LawShaoor Chambers, with experience in litigation, corporate law, regulatory compliance, and legal research. He regularly handles civil, criminal, family, and corporate matters, providing legal services through research, drafting, case preparation, and court representation.',
      'He regularly handles district court matters and drafts pleadings, legal notices, contracts, agreements, replies, and legal opinions across a range of practice areas. Mr. Kalim is also involved in corporate and regulatory compliance work, including SECP-related matters, maintenance of corporate records, and liaison with regulatory authorities to ensure compliance with legal and procedural requirements.',
      'Mr. Kalim completed his LLB from NUST Law School. He previously worked with the Office of Legal Affairs at the University of Central Asia, Bishkek, Kyrgyzstan, where he contributed to compliance initiatives, legal research, and institutional policy projects. His final year thesis focused on the legal and regulatory challenges faced by gig economy workers in Pakistan and the need for stronger legal protections and policy reforms in the sector.',
    ],
    highlights: [
      { label: 'Education',  value: 'LLB — NUST Law School' },
      { label: 'Prior role', value: 'Office of Legal Affairs, University of Central Asia (Bishkek, Kyrgyzstan)' },
      { label: 'Thesis',     value: 'Legal protections for gig economy workers in Pakistan' },
      { label: 'Work',       value: 'District courts · SECP matters · Drafting · Compliance' },
    ],
    order: 4,
  },
]
