import 'server-only'
import { revalidatePath } from 'next/cache'

/**
 * On-demand cache invalidation for the public site.
 *
 * Public pages are cached in Next's Full Route Cache (they no longer set
 * `dynamic = 'force-dynamic'`), so admin mutations must explicitly bust the
 * affected surfaces. Each helper revalidates a section layout, which covers
 * that segment's page plus every nested route (including dynamic ones).
 */

/** Academy listing, individual posts, category pages, magazine, seminars. */
export function revalidateAcademy() {
  revalidatePath('/lawshaoor-academy', 'layout')
}

/** People listing + individual member pages. */
export function revalidatePeople() {
  revalidatePath('/people', 'layout')
}

/** Site settings surface everywhere (home, footer, Academy header). */
export function revalidateSiteWide() {
  revalidatePath('/', 'layout')
}
