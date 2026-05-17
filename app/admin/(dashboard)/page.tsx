import Link from 'next/link'
import { FileText, Image as ImageIcon, Tags, Settings as SettingsIcon, Plus, ArrowRight, Pencil } from 'lucide-react'
import {
  categoriesCollection,
  mediaCollection,
  postsCollection,
  settingsCollection,
} from '@/lib/mongo'
import {
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  type SiteSettings,
} from '@/lib/models/settings'
import type { PostDoc } from '@/lib/models/post'

export const dynamic = 'force-dynamic'

type Stat = { label: string; value: string | number; href: string; Icon: typeof FileText }
type RecentPost = { _id: string; title: string; status: string; updatedAt: string }

async function loadDashboard(): Promise<{
  stats: Stat[]
  recent: RecentPost[]
  settings: SiteSettings
  featuredTitle: string | null
  error: string | null
}> {
  try {
    const [posts, categories, media, sCol] = await Promise.all([
      postsCollection(),
      categoriesCollection(),
      mediaCollection(),
      settingsCollection(),
    ])

    const [
      totalPosts,
      draftPosts,
      publishedPosts,
      totalCategories,
      totalMedia,
      recentDocs,
      settingsDoc,
    ] = await Promise.all([
      posts.countDocuments({}),
      posts.countDocuments({ status: 'draft' }),
      posts.countDocuments({ status: 'published' }),
      categories.countDocuments({}),
      media.countDocuments({}),
      posts
        .find({}, { projection: { title: 1, status: 1, updatedAt: 1 } })
        .sort({ updatedAt: -1 })
        .limit(5)
        .toArray(),
      sCol.findOne({ _id: SETTINGS_KEY as unknown as never }),
    ])

    let settings: SiteSettings = DEFAULT_SETTINGS
    if (settingsDoc) {
      const { _id, ...rest } = settingsDoc as Record<string, unknown> & { _id: unknown }
      void _id
      settings = { ...DEFAULT_SETTINGS, ...(rest as Partial<SiteSettings>) }
    }

    let featuredTitle: string | null = null
    if (settings.featuredPostId && /^[0-9a-fA-F]{24}$/.test(settings.featuredPostId)) {
      try {
        const { ObjectId } = await import('mongodb')
        const f = await posts.findOne(
          { _id: new ObjectId(settings.featuredPostId) },
          { projection: { title: 1 } }
        )
        if (f) featuredTitle = String((f as { title?: string }).title ?? '')
      } catch {
        /* ignore */
      }
    }

    const recent: RecentPost[] = recentDocs.map((d) => {
      const x = d as unknown as PostDoc & { _id: { toString(): string } }
      return {
        _id: String(x._id),
        title: x.title || 'Untitled',
        status: x.status,
        updatedAt: (x.updatedAt as Date).toISOString(),
      }
    })

    const stats: Stat[] = [
      { label: 'Total posts',     value: totalPosts,      href: '/admin/posts',      Icon: FileText },
      { label: 'Drafts',          value: draftPosts,      href: '/admin/posts',      Icon: Pencil },
      { label: 'Published',       value: publishedPosts,  href: '/admin/posts',      Icon: FileText },
      { label: 'Categories',      value: totalCategories, href: '/admin/categories', Icon: Tags },
      { label: 'Media files',     value: totalMedia,      href: '/admin/media',      Icon: ImageIcon },
    ]

    return { stats, recent, settings, featuredTitle, error: null }
  } catch (err) {
    return {
      stats: [],
      recent: [],
      settings: DEFAULT_SETTINGS,
      featuredTitle: null,
      error: err instanceof Error ? err.message : 'Failed to load dashboard',
    }
  }
}

export default async function AdminIndex() {
  const { stats, recent, settings, featuredTitle, error } = await loadDashboard()

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Dashboard</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          Overview
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          A quick look at what's on the desk.
        </p>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10 space-y-10">
        {error && (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Database error
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{error}</p>
          </div>
        )}

        {/* Quick stats */}
        <section>
          <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
            Numbers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-foreground/15 border border-foreground/15">
            {stats.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="bg-background p-5 lift-card flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <s.Icon className="w-4 h-4 text-foreground/55" />
                  <ArrowRight className="w-3 h-3 text-foreground/35" />
                </div>
                <p className="font-display text-3xl tracking-[-0.025em]">{s.value}</p>
                <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/65">
                  {s.label}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-foreground/15 border border-foreground/15">
          {/* Recent activity */}
          <section className="bg-background p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                Recently updated
              </p>
              <Link
                href="/admin/posts"
                className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55 hover:text-primary transition-colors"
              >
                All →
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="text-sm text-foreground/55 font-heading">
                No posts yet. <Link href="/admin/posts" className="link-line text-foreground">Create one →</Link>
              </p>
            ) : (
              <ul className="space-y-2">
                {recent.map((p) => (
                  <li key={p._id} className="flex items-center gap-3 py-2 border-b border-foreground/10 last:border-b-0">
                    <Link
                      href={`/admin/posts/${p._id}/edit`}
                      className="flex-1 min-w-0 font-heading text-foreground hover:text-primary transition-colors truncate"
                    >
                      {p.title}
                    </Link>
                    <span className={`tag text-[9px] ${p.status === 'published' ? 'tag-primary' : ''}`}>
                      {p.status === 'published' ? 'live' : 'draft'}
                    </span>
                    <span className="text-[10px] font-mono text-foreground/55 tabular-fig hidden md:inline">
                      {formatRelative(p.updatedAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Current site config */}
          <section className="bg-background p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
                Site config
              </p>
              <Link
                href="/admin/settings"
                className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55 hover:text-primary transition-colors"
              >
                Settings →
              </Link>
            </div>
            <dl className="space-y-3 text-sm">
              <Row label="Featured post">
                <span className="font-heading text-foreground/85">
                  {featuredTitle ?? <span className="text-foreground/55 italic">Most recent published</span>}
                </span>
              </Row>
              <Row label="Newsletter">
                <span className="font-heading text-foreground/85">
                  {settings.showNewsletter ? 'Visible' : 'Hidden'}
                </span>
              </Row>
              <Row label="Latest rail size">
                <span className="font-heading text-foreground/85 font-mono">
                  {settings.latestLimit === 0 ? 'Unlimited' : settings.latestLimit}
                </span>
              </Row>
              <Row label="Tagline">
                <span className="font-heading text-foreground/85 truncate">
                  {settings.siteTagline || <span className="text-foreground/55 italic">Default</span>}
                </span>
              </Row>
            </dl>
          </section>
        </div>

        {/* Quick actions */}
        <section>
          <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-4">
            Quick actions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
            <ActionCard href="/admin/posts" label="New post" desc="Start a new draft" Icon={Plus} />
            <ActionCard href="/admin/media" label="Upload media" desc="Add images, video, files" Icon={ImageIcon} />
            <ActionCard href="/admin/categories" label="Manage categories" desc="Rename, reorder, retire" Icon={Tags} />
            <ActionCard href="/admin/settings" label="Site settings" desc="Featured post, SEO, links" Icon={SettingsIcon} />
          </div>
        </section>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-foreground/10 last:border-b-0">
      <dt className="text-[10px] font-mono tracking-[0.22em] uppercase text-foreground/55 shrink-0">
        {label}
      </dt>
      <dd className="text-right min-w-0 max-w-[60%]">{children}</dd>
    </div>
  )
}

function ActionCard({
  href,
  label,
  desc,
  Icon,
}: {
  href: string
  label: string
  desc: string
  Icon: typeof FileText
}) {
  return (
    <Link href={href} className="bg-background p-5 lift-card flex flex-col gap-3 group">
      <Icon className="w-5 h-5 text-primary" />
      <p className="font-display text-lg tracking-[-0.015em] group-hover:text-primary transition-colors">
        {label}
      </p>
      <p className="text-xs text-foreground/65 font-heading leading-relaxed">{desc}</p>
      <span className="font-display text-xl opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all self-end">
        →
      </span>
    </Link>
  )
}

function formatRelative(iso: string): string {
  const d = new Date(iso)
  const diff = Date.now() - d.getTime()
  const day = 86_400_000
  if (diff < 60_000) return 'just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < day) return `${Math.floor(diff / 3_600_000)}h ago`
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
