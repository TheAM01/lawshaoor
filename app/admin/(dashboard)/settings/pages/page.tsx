import { settingsCollection } from '@/lib/mongo'
import { DEFAULT_SETTINGS, SETTINGS_KEY, type SiteSettings } from '@/lib/models/settings'
import { PagesNavForm } from './_components/pages-nav-form'

export const dynamic = 'force-dynamic'

export default async function PagesNavSettings() {
  let settings: SiteSettings = DEFAULT_SETTINGS
  let dbError: string | null = null

  try {
    const col = await settingsCollection()
    const doc = await col.findOne({ _id: SETTINGS_KEY as unknown as never })
    if (doc) {
      const { _id, ...rest } = doc as Record<string, unknown> & { _id: unknown }
      void _id
      settings = { ...DEFAULT_SETTINGS, ...(rest as Partial<SiteSettings>) }
    }
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Failed to load settings'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Pages &amp; navigation</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          Menu labels, Magazine &amp; Seminars
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          Rename the navigation links, and edit the content of the Magazine and Seminars pages. Toggle either page off to hide it from the menu. Changes go live immediately.
        </p>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10">
        {dbError ? (
          <div className="border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-destructive mb-2">Database error</p>
            <p className="text-sm text-foreground/80 font-heading break-words">{dbError}</p>
          </div>
        ) : (
          <PagesNavForm initial={settings} />
        )}
      </div>
    </div>
  )
}
