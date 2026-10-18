import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/lib/server/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Public, unauthenticated read of the bits the public chrome needs:
 *  navigation labels, which Knowledge sub-pages are visible, and the
 *  Substack URL (blank = hide Substack links). */
export async function GET() {
  const s = await getSiteSettings()
  return NextResponse.json({
    navLabels: s.navLabels,
    magazineVisible: s.magazine.visible,
    seminarsVisible: s.seminars.visible,
    substackUrl: s.magazine.substackUrl.trim(),
  })
}
