import { NextResponse } from 'next/server'
import { getRealtime } from '@/lib/server/analytics-queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Admin-gated by middleware (path is under /api/admin/*).
// Polled by the dashboard's RealtimeWidget every ~15s.
export async function GET() {
  const snapshot = await getRealtime()
  return NextResponse.json(snapshot, {
    headers: { 'cache-control': 'no-store' },
  })
}
