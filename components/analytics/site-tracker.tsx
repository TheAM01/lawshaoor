'use client'

import { usePathname } from 'next/navigation'
import { Tracker } from './tracker'
import type { PageKind } from '@/lib/models/analytics'

/* Single tracker mount-point for every public page on the site.
 *
 * Lives in the root layout so home / our-story / people / contact /
 * practice-areas / academy / posts / categories all get instrumented
 * automatically. New marketing pages need no wiring — drop a page.tsx
 * in app/, the tracker picks it up via usePathname.
 *
 * Pathname → (pageKind, slug):
 *   /lawshaoor-academy/c/{slug}    → category, slug
 *   /lawshaoor-academy/{slug}      → post, slug
 *   /lawshaoor-academy             → listing
 *   /admin/...                     → SKIPPED (don't track the admin
 *                                     interface in its own dashboard)
 *   /api/...                       → SKIPPED (would never run here, but
 *                                     belt-and-braces)
 *   anything else                  → other (marketing pages bucket)
 *
 * The server endpoint already filters the signed-in admin via cookie;
 * the client-side admin skip below is an additional cheap guard so
 * preview tabs don't fire useless beacons. */

type Resolved = { kind: PageKind; slug?: string } | null

function classify(path: string | null): Resolved {
  if (!path) return null
  if (path.startsWith('/admin')) return null
  if (path.startsWith('/api')) return null

  // Strip query string if any made it through (usePathname shouldn't,
  // but tolerate it).
  const clean = path.split('?')[0]

  if (clean === '/lawshaoor-academy' || clean === '/lawshaoor-academy/') {
    return { kind: 'listing' }
  }
  const cat = clean.match(/^\/lawshaoor-academy\/c\/([^\/]+)\/?$/)
  if (cat) return { kind: 'category', slug: cat[1] }

  const post = clean.match(/^\/lawshaoor-academy\/([^\/]+)\/?$/)
  if (post) return { kind: 'post', slug: post[1] }

  return { kind: 'other' }
}

export function SiteTracker() {
  const pathname = usePathname()
  const resolved = classify(pathname)
  if (!resolved) return null
  return (
    <Tracker
      // Re-mount whenever pathname changes so the Tracker's internal
      // 'view fired' guard runs for the new page.
      key={pathname}
      pageKind={resolved.kind}
      slug={resolved.slug}
    />
  )
}
