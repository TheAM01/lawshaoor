import { z } from 'zod'

export const SETTINGS_KEY = 'site'

/** A simple {title, body} content block used by the Magazine & Seminars pages. */
export const ContentBlockSchema = z.object({
  title: z.string().max(120).default(''),
  body: z.string().max(1000).default(''),
})
export type ContentBlock = z.infer<typeof ContentBlockSchema>

/** Editable label overrides for the public navigation. Empty = use the built-in default. */
export const NavLabelsSchema = z.object({
  theChambers:   z.string().max(40).default(''),
  practiceAreas: z.string().max(40).default(''),
  team:          z.string().max(40).default(''),
  knowledge:     z.string().max(40).default(''),
  academy:       z.string().max(40).default(''),
  magazine:      z.string().max(40).default(''),
  seminars:      z.string().max(40).default(''),
  careers:       z.string().max(40).default(''),
  contact:       z.string().max(40).default(''),
})
export type NavLabels = z.infer<typeof NavLabelsSchema>

export const MagazineSchema = z.object({
  visible:     z.boolean().default(true),
  eyebrow:     z.string().max(60).default('Digital publication'),
  title:       z.string().max(80).default('LawShaoor'),
  subtitle:    z.string().max(80).default('Magazine.'),
  intro:       z.string().max(600).default('A digital legal review from the chambers — commentary on corporate, banking, energy, regulatory and cross-border law. Published here and delivered to your inbox via Substack.'),
  substackUrl: z.string().max(500).default('https://lawshaoor.substack.com'),
  sections:    z.array(ContentBlockSchema).max(12).default([
    { title: 'The Review',   body: 'Long-form analysis of the deals, judgments and regulatory shifts that actually move the market.' },
    { title: 'Cross-Border', body: 'What changes in the UAE, DIFC and ADGM mean for clients operating between Pakistan and the Gulf.' },
    { title: 'Briefings',    body: 'Short, plain-language notes on new legislation, SECP/SBP circulars and compliance deadlines.' },
  ]),
})
export type MagazineContent = z.infer<typeof MagazineSchema>

export const SeminarsSchema = z.object({
  visible:       z.boolean().default(true),
  eyebrow:       z.string().max(60).default('Events & training'),
  title:         z.string().max(80).default('Seminars'),
  subtitle:      z.string().max(80).default('& training.'),
  intro:         z.string().max(600).default('Practical legal education from working lawyers — not lecture-hall theory. We run briefings, workshops and continuing education for in-house teams, businesses and the next generation of the profession.'),
  formats:       z.array(ContentBlockSchema).max(12).default([
    { title: 'In-house briefings', body: 'Tailored sessions for legal and compliance teams — board duties, regulatory exposure, contract risk.' },
    { title: 'Public workshops',   body: 'Practical, plain-language training on governance, data protection, banking and energy regulation.' },
    { title: 'University lectures', body: 'Our partners teach. We bring that into structured sessions for students and young lawyers.' },
  ]),
  upcomingTitle: z.string().max(160).default('No public seminars scheduled right now.'),
  upcomingNote:  z.string().max(400).default("Want a session for your team? Get in touch and we'll build one around your needs."),
})
export type SeminarsContent = z.infer<typeof SeminarsSchema>

export const SettingsSchema = z.object({
  /** Site-wide SEO overrides for the home page (left empty to use route-level defaults). */
  siteTitle: z.string().max(120).default(''),
  siteTagline: z.string().max(140).default(''),
  metaDescription: z.string().max(280).default(''),

  /** Featured post — _id of a post (string), or empty for "use latest". */
  featuredPostId: z.string().max(64).default(''),

  /** Pin a post to the top of the Academy listing. */
  pinnedPostId: z.string().max(64).default(''),

  /** Whether to show the Academy newsletter section. */
  showNewsletter: z.boolean().default(true),

  /** Number of posts to show in the "Latest" rail (0 = unlimited). */
  latestLimit: z.number().int().min(0).max(50).default(5),

  /** LinkedIn URL for the floating side banner. */
  linkedInUrl: z.string().max(500).default(''),

  /** Public contact-page-only fields. */
  contactNote: z.string().max(280).default(''),

  /** Editable public navigation labels. */
  navLabels: NavLabelsSchema.default({}),

  /** Magazine page content (under Academy / Knowledge). */
  magazine: MagazineSchema.default({}),

  /** Seminars page content (under Academy / Knowledge). */
  seminars: SeminarsSchema.default({}),
})

export type SiteSettings = z.infer<typeof SettingsSchema>

/** All fields carry zod defaults, so the canonical defaults are simply the
 *  result of parsing an empty object. Keeps nested objects (navLabels,
 *  magazine, seminars) in sync automatically. */
export const DEFAULT_SETTINGS: SiteSettings = SettingsSchema.parse({})
