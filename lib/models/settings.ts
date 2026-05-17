import { z } from 'zod'

export const SETTINGS_KEY = 'site'

/** Default marquee labels used on the home page when the admin hasn't customized them. */
export const DEFAULT_MARQUEE_ITEMS = [
  'Banking & Finance',
  'Corporate & Commercial',
  'Energy & Natural Resources',
  'Construction & Operation',
  'Dispute Resolution',
  'Mergers & Acquisitions',
  'Government Sector',
  'Telecommunication & IT',
  'Healthcare & Pharmaceuticals',
  'Labour & Employment',
  'Non-Profit',
  'UAE & Cross-Border',
] as const

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

  /** Strings shown in the scrolling marquee strip on the home page.
   *  Empty array = fall back to DEFAULT_MARQUEE_ITEMS so the marquee is never empty. */
  siteMarqueeItems: z.array(z.string().max(80)).max(40).default([]),
})

export type SiteSettings = z.infer<typeof SettingsSchema>

export const DEFAULT_SETTINGS: SiteSettings = {
  siteTitle: '',
  siteTagline: '',
  metaDescription: '',
  featuredPostId: '',
  pinnedPostId: '',
  showNewsletter: true,
  latestLimit: 5,
  linkedInUrl: '',
  contactNote: '',
  siteMarqueeItems: [],
}

/** Returns the configured marquee strings, falling back to defaults if empty. */
export function resolveMarqueeItems(items: string[]): string[] {
  const cleaned = items.map((s) => s.trim()).filter(Boolean)
  return cleaned.length > 0 ? cleaned : [...DEFAULT_MARQUEE_ITEMS]
}
