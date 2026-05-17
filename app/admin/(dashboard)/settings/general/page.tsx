import { settingsCollection } from '@/lib/mongo'
import {
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  type SiteSettings,
} from '@/lib/models/settings'
import { GeneralSettingsForm } from './_components/general-settings-form'

export const dynamic = 'force-dynamic'

export default async function GeneralSettingsPage() {
  let settings: SiteSettings = DEFAULT_SETTINGS
  let dbError: string | null = null

  try {
    const sCol = await settingsCollection()
    const doc = await sCol.findOne({ _id: SETTINGS_KEY as unknown as never })
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
        <span className="index-chip">General settings</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          Metadata & defaults
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          Site title, tagline, default meta description, and any administrative defaults. These mostly affect how the site appears in search results and social shares — not the visible layout.
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
          <GeneralSettingsForm initial={settings} />
        )}
      </div>
    </div>
  )
}
