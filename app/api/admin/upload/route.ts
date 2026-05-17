import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { mediaCollection } from '@/lib/mongo'
import type { MediaDoc } from '@/lib/models/media'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_IMAGE_BYTES = 32 * 1024 * 1024
const MAX_BLOB_BYTES = 500 * 1024 * 1024

export async function POST(req: Request) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const raw = form.get('file') ?? form.get('image')
  if (!(raw instanceof Blob)) {
    return NextResponse.json(
      { error: 'A "file" or "image" field is required' },
      { status: 400 }
    )
  }
  const file = raw as File

  const mime = file.type || 'application/octet-stream'
  const isImage = mime.startsWith('image/')

  if (isImage) {
    return uploadImageToImgBB(file, mime)
  }
  return uploadToVercelBlob(file, mime)
}

async function uploadImageToImgBB(file: File, mime: string) {
  const apiKey = process.env.IMGBB_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'IMGBB_API_KEY is not set on the server' },
      { status: 503 }
    )
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: 'Image too large (max 32 MB)' }, { status: 413 })
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

  await recordMedia({
    url,
    name: file.name || 'image',
    mime,
    size: file.size,
    source: 'imgbb',
    uploadedAt: new Date(),
  })

  return NextResponse.json({ url })
}

async function uploadToVercelBlob(file: File, mime: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not set on the server' },
      { status: 503 }
    )
  }
  if (file.size > MAX_BLOB_BYTES) {
    return NextResponse.json({ error: 'File too large (max 500 MB)' }, { status: 413 })
  }

  const safeName = sanitizeFilename(file.name) || `upload-${Date.now()}`
  const key = `posts/${Date.now()}-${randomId()}-${safeName}`

  try {
    const blob = await put(key, file, {
      access: 'private',
      contentType: mime,
      token,
      addRandomSuffix: false,
    })
    const proxyUrl = `/api/blob/${blob.pathname}`

    await recordMedia({
      url: proxyUrl,
      pathname: blob.pathname,
      name: file.name || safeName,
      mime,
      size: file.size,
      source: 'vercel-blob',
      uploadedAt: new Date(),
    })

    return NextResponse.json({ url: proxyUrl })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Blob upload failed' },
      { status: 502 }
    )
  }
}

async function recordMedia(doc: Omit<MediaDoc, '_id'>) {
  try {
    const col = await mediaCollection()
    // url is unique-indexed; ignore duplicates silently (re-uploaded same blob).
    await col.insertOne(doc as never).catch(() => undefined)
  } catch {
    /* best-effort, never break the upload response on media-tracking failure */
  }
}

function sanitizeFilename(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[^\w.\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120)
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 10)
}
