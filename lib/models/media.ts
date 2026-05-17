import type { ObjectId } from 'mongodb'

export type MediaSource = 'imgbb' | 'vercel-blob'

export type MediaDoc = {
  _id?: ObjectId
  url: string
  /** For Vercel Blob, the pathname/key used for delete + proxy lookups. */
  pathname?: string
  name: string
  mime: string
  size: number
  source: MediaSource
  uploadedAt: Date
}

export type MediaListItem = {
  _id: string
  url: string
  pathname: string
  name: string
  mime: string
  size: number
  source: MediaSource
  uploadedAt: string
}

export function toMediaListItem(d: MediaDoc): MediaListItem {
  return {
    _id: String(d._id),
    url: d.url,
    pathname: d.pathname ?? '',
    name: d.name,
    mime: d.mime,
    size: d.size,
    source: d.source,
    uploadedAt: d.uploadedAt.toISOString(),
  }
}

export function isImageMime(mime: string): boolean {
  return mime.startsWith('image/')
}

export function isVideoMime(mime: string): boolean {
  return mime.startsWith('video/')
}

export function isAudioMime(mime: string): boolean {
  return mime.startsWith('audio/')
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`
}
