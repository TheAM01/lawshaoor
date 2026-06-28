import {
  postsCollection,
  settingsCollection,
} from '@/lib/mongo'
import {
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  type SiteSettings,
} from '@/lib/models/settings'
import type { PostDoc } from '@/lib/models/post'
import { SiteSettingsForm } from './_components/site-settings-form'

export const dynamic = 'force-dynamic'

export default async function SiteSettingsPage() {
  let settings: SiteSettings = DEFAULT_SETTINGS
  let posts: { _id: string; title: string; status: string }[] = []
  let dbError: string | null = null

  try {
    const sCol = await settingsCollection()
    const doc = await sCol.findOne({ _id: SETTINGS_KEY as unknown as never })
    if (doc) {
      const { _id, ...rest } = doc as Record<string, unknown> & { _id: unknown }
      void _id
      settings = { ...DEFAULT_SETTINGS, ...(rest as Partial<SiteSettings>) }
    }

    const pCol = await postsCollection()
    const docs = await pCol
      .find({}, { projection: { title: 1, status: 1, updatedAt: 1 } })
      .sort({ updatedAt: -1 })
      .limit(200)
      .toArray()
    posts = docs.map((d) => {
      const x = d as unknown as PostDoc & { _id: { toString(): string } }
      return {
        _id: String(x._id),
        title: x.title || 'Untitled',
        status: x.status,
      }
    })
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Failed to load settings'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Site settings</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          What visitors see
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          Featured post, Academy display rules, and the LinkedIn link in the floating side banner. Changes go live immediately — no rebuild needed.
        </p>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10">
        {dbError ? (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">
              Database error
            </p>
            <p className="text-sm text-foreground/80 font-heading break-words">{dbError}</p>
          </div>
        ) : (
          <SiteSettingsForm initial={settings} posts={posts} />
        )}
      </div>
    </div>
  )
}
