import Link from 'next/link'

export type Crumb = { label: string; href?: string }

/**
 * Editorial breadcrumb trail — Home > Category > Current Page.
 * The last crumb is rendered as plain (current) text; earlier crumbs link.
 * Also emits BreadcrumbList JSON-LD for SEO.
 */
export function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: 'Home', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://www.lawshaoor.com${c.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-foreground/55">
        {trail.map((c, i) => {
          const isLast = i === trail.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-3">
              {c.href && !isLast ? (
                <Link href={c.href} className="link-line hover:text-primary transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-foreground/90' : ''}>{c.label}</span>
              )}
              {!isLast && <span aria-hidden className="text-foreground/30">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
