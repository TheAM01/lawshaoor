/**
 * PanelImage — a dimmed, grayscale placeholder photo that sits *behind* an
 * illustration inside a `relative` visual panel. The illustration is rendered
 * after this in the DOM, so it overlays on top.
 *
 * NOTE: these are PLACEHOLDER images (picsum.photos). Swap the `src` for real
 * law / office / chambers photography when available.
 */
export function PanelImage({ seed, className = '' }: { seed: string; className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${seed}/900/1100?grayscale`}
        alt=""
        aria-hidden
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover opacity-[0.28] grayscale pointer-events-none ${className}`}
      />
      {/* dim / burn + warm-azure tint so the illustration on top stays readable */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background/55 via-background/20 to-primary/15 mix-blend-multiply"
      />
    </>
  )
}
