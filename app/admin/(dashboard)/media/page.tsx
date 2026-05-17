import { mediaCollection } from '@/lib/mongo'
import { toMediaListItem, type MediaDoc } from '@/lib/models/media'
import { MediaClient } from './_components/media-client'

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  let initial: ReturnType<typeof toMediaListItem>[] = []
  let dbError: string | null = null

  try {
    const col = await mediaCollection()
    const docs = await col.find({}).sort({ uploadedAt: -1 }).limit(200).toArray()
    initial = docs.map((d) => toMediaListItem(d as unknown as MediaDoc))
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Failed to load media'
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Media</span>
        <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] mt-3">
          Media library
          <span className="text-foreground/40 ml-3 text-xl md:text-2xl font-mono tracking-[0.05em]">
            {initial.length}
          </span>
        </h1>
        <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
          Every file uploaded through the editor or thumbnail picker. Images live on ImgBB; videos, audio, and files live on Vercel Blob (served through the private-proxy route).
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
          <MediaClient initial={initial} />
        )}
      </div>
    </div>
  )
}
