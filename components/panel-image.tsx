import { cn } from '@/lib/utils'

/**
 * PanelImage — an image that sits *behind* an illustration inside a `relative`
 * visual panel. The illustration is rendered after this in the DOM, so it
 * overlays on top.
 *
 * Pass `src` for a bundled pencil sketch (e.g. `/images/seed/team.jpg`). The
 * sketch is blended so only its lines show: multiplied in light mode (the white
 * paper drops out), shown as-is but dimmed in dark mode.
 * Without `src`, `seed` picks a random PLACEHOLDER photo from picsum.photos,
 * dimmed and tinted as before.
 */
export function PanelImage({
  seed,
  src,
  className = '',
}: {
  seed?: string
  src?: string
  className?: string
}) {
  if (src) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden
          loading="lazy"
          className={cn(
            'absolute inset-0 w-full h-full object-cover grayscale contrast-125 pointer-events-none',
            'opacity-70 mix-blend-multiply dark:mix-blend-normal dark:brightness-90 dark:opacity-60',
            className,
          )}
        />
        {/* soft wash so the sketch sits back as texture, plus a deeper fade at
            the foot so bottom-aligned text stays legible */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background-alt/50 via-background-alt/30 to-primary/10"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-background-alt/80 to-transparent"
        />
      </>
    )
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${seed}/900/1100?grayscale`}
        alt=""
        aria-hidden
        loading="lazy"
        className={cn('absolute inset-0 w-full h-full object-cover opacity-[0.28] grayscale pointer-events-none', className)}
      />
      {/* dim / burn + warm-azure tint so the illustration on top stays readable */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background/55 via-background/20 to-primary/15 mix-blend-multiply"
      />
    </>
  )
}
