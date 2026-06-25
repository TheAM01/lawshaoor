import { NextResponse } from 'next/server'
import { settingsCollection } from '@/lib/mongo'
import {
  DEFAULT_SETTINGS,
  SettingsSchema,
  SETTINGS_KEY,
  type SiteSettings,
} from '@/lib/models/settings'
import { revalidateSiteWide } from '@/lib/server/revalidate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const col = await settingsCollection()
  const doc = await col.findOne({ _id: SETTINGS_KEY as unknown as never })
  if (!doc) {
    return NextResponse.json({ settings: DEFAULT_SETTINGS })
  }
  const { _id, ...rest } = doc as Record<string, unknown> & { _id: unknown }
  void _id
  // Merge with defaults so newly-added keys always come back populated.
  const merged: SiteSettings = { ...DEFAULT_SETTINGS, ...(rest as Partial<SiteSettings>) }
  return NextResponse.json({ settings: merged })
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = SettingsSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const col = await settingsCollection()
  const now = new Date()
  await col.updateOne(
    { _id: SETTINGS_KEY as unknown as never },
    {
      $set: { ...parsed.data, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  )

  revalidateSiteWide()
  return NextResponse.json({ ok: true })
}
