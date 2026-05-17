import 'server-only'
import { settingsCollection } from '@/lib/mongo'
import {
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  type SiteSettings,
} from '@/lib/models/settings'

/** Server-side settings loader. Falls back to defaults if the DB is
 *  unreachable so public pages never 500 on misconfig. */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const col = await settingsCollection()
    const doc = await col.findOne({ _id: SETTINGS_KEY as unknown as never })
    if (!doc) return DEFAULT_SETTINGS
    const { _id, ...rest } = doc as Record<string, unknown> & { _id: unknown }
    void _id
    return { ...DEFAULT_SETTINGS, ...(rest as Partial<SiteSettings>) }
  } catch {
    return DEFAULT_SETTINGS
  }
}
