import { NextResponse } from 'next/server'
import { get } from '@vercel/blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ path: string[] }> }

export async function GET(req: Request, ctx: Ctx) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not set on the server' },
      { status: 503 }
    )
  }

  const { path } = await ctx.params
  if (!path || path.length === 0) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }
  const pathname = path.map((seg) => decodeURIComponent(seg)).join('/')

  // Forward If-None-Match for client-side caching.
  const ifNoneMatch = req.headers.get('if-none-match') ?? undefined

  let result
  try {
    result = await get(pathname, {
      access: 'private',
      token,
      ifNoneMatch,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Blob fetch failed' },
      { status: 502 }
    )
  }

  if (!result) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (result.statusCode === 304) {
    return new NextResponse(null, { status: 304 })
  }

  const headers = new Headers()
  headers.set('Content-Type', result.blob.contentType)
  headers.set('Content-Length', String(result.blob.size))
  if (result.blob.contentDisposition) {
    headers.set('Content-Disposition', result.blob.contentDisposition)
  }
  if (result.blob.etag) {
    headers.set('ETag', result.blob.etag)
  }
  // Long cache for blog media — blob URLs are content-addressed via random suffix.
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')

  return new NextResponse(result.stream, { status: 200, headers })
}
