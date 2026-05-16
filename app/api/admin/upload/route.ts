import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_SIZE_BYTES = 32 * 1024 * 1024

export async function POST(req: Request) {
  const apiKey = process.env.IMGBB_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'IMGBB_API_KEY is not set on the server' },
      { status: 503 }
    )
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = form.get('image')
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: 'Field "image" is required' }, { status: 400 })
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large (max 32 MB)' }, { status: 413 })
  }

  const upstream = new FormData()
  upstream.append('image', file)

  let r: Response
  try {
    r = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      { method: 'POST', body: upstream }
    )
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Network error' },
      { status: 502 }
    )
  }

  if (!r.ok) {
    const text = await r.text().catch(() => '')
    return NextResponse.json(
      { error: `ImgBB rejected upload (${r.status})`, detail: text.slice(0, 400) },
      { status: 502 }
    )
  }

  const data = (await r.json().catch(() => null)) as
    | { data?: { url?: string; display_url?: string; image?: { url?: string } } }
    | null
  const url =
    data?.data?.url ?? data?.data?.display_url ?? data?.data?.image?.url ?? null

  if (!url) {
    return NextResponse.json({ error: 'No image URL returned by ImgBB' }, { status: 502 })
  }

  return NextResponse.json({ url })
}
