import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'

const PUBLIC_PATHS = new Set<string>([
  '/admin/login',
  '/api/admin/login',
])

type SessionPayload = { user?: { name: string } }

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next()

  const password = process.env.SESSION_SECRET
  if (!password || password.length < 32) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 503 })
    }
    return NextResponse.redirect(new URL('/admin/login?err=server', req.url))
  }

  const res = NextResponse.next()
  const session = await getIronSession<SessionPayload>(req, res, {
    password,
    cookieName: 'lawshaoor_admin',
  })

  if (!session.user) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const url = new URL('/admin/login', req.url)
    if (pathname !== '/admin') url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
