import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SplitReveal } from '@/components/motion/split-reveal'
import { FadeIn } from '@/components/motion/fade-in'
import { Rule } from '@/components/motion/rule'
import {
  OrbitRings,
  GridDots,
  StackedCubes,
  CirclesInCircumference,
  SquareCascade,
} from '@/components/illustrations'
import { postsCollection } from '@/lib/mongo'
import { getAllCategories, getCategoryBySlug } from '@/lib/server/categories'
import { getIllustration } from '@/components/illustrations/registry'
import type { PostDoc } from '@/lib/models/post'

export const dynamic = 'force-dynamic'

type CategoryPost = {
  _id: string
  slug: string
  title: string
  excerpt: string
  thumbnailUrl: string
  publishedAt: Date
  readMinutes: number
}

async function getPostsInCategory(name: string): Promise<CategoryPost[]> {
  try {
    const col = await postsCollection()
    const docs = await col
      .find({ status: 'published', category: name })
      .sort({ publishedAt: -1, updatedAt: -1 })
      .limit(200)
      .toArray()
    return docs.map((d) => {
      const p = d as unknown as PostDoc
      return {
        _id: String(p._id),
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        thumbnailUrl: p.thumbnailUrl,
        publishedAt: p.publishedAt ?? p.updatedAt,
        readMinutes: p.readMinutes ?? 1,
      }
    })
  } catch {
    return []
  }
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatMonth(d: Date) {
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  if (!cat) {
    return { title: { absolute: 'Category not found · LawShaoor Academy' } }
  }
  return {
    title: { absolute: `${cat.name} · LawShaoor Academy — Law. Strategy. Future.` },
    description: cat.description || `Posts in the ${cat.name} category on the LawShaoor Academy.`,
    openGraph: {
      title: `${cat.name} · LawShaoor Academy`,
      description: cat.description || `Posts in the ${cat.name} category.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params
  const cat = await getCategoryBySlug(slug)
  if (!cat) notFound()

  const [posts, allCategories] = await Promise.all([
    getPostsInCategory(cat.name),
    getAllCategories(),
  ])

  const Illo = getIllustration(cat.illustrationKey)
  const otherCategories = allCategories
    .filter((c) => c.slug !== cat.slug)
    .slice(0, 8)

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* ────────────────────────────────────────
          01 · HERO
          ──────────────────────────────────────── */}
      <section className="relative section-pad pt-32 md:pt-44 pb-20 md:pb-28 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[8%] -right-[14%] hidden md:block" />
        <OrbitRings className="absolute -left-24 top-24 w-[320px] h-[320px] opacity-30 hidden md:block" uid="cat-hero-orb" rotate />
        <GridDots className="absolute right-[18%] bottom-16 w-44 h-44 opacity-45 hidden md:block float-soft" uid="cat-hero-dots" />

        <div className="max-w-[1180px] mx-auto relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase mb-10 md:mb-14 flex-wrap">
            <Link href="/lawshaoor-academy" className="text-foreground/55 hover:text-primary transition-colors">
              ← Academy
            </Link>
            <span className="block w-6 h-px bg-foreground/25" />
            <span className="text-foreground/80">Category</span>
            <span className="block w-6 h-px bg-foreground/25" />
            <span className="text-foreground/55">{posts.length} {posts.length === 1 ? 'piece' : 'pieces'}</span>
          </div>

          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-5">
              <span className="index-chip">Category</span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.95]">
                <SplitReveal trigger="load">{cat.name}</SplitReveal>
              </h1>
              {cat.description && (
                <FadeIn delay={0.2}>
                  <p className="font-heading text-xl md:text-2xl text-foreground/85 leading-snug tracking-[-0.005em] max-w-2xl mt-4">
                    {cat.description}
                  </p>
                </FadeIn>
              )}
            </div>
            <div className="col-span-12 md:col-span-4 hidden md:flex justify-end">
              <FadeIn delay={0.3}>
                <Illo className="w-56 lg:w-64 opacity-90" uid={`cat-hero-${cat.slug}`} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          02 · POSTS LIST
          ──────────────────────────────────────── */}
      <section className="relative section-pad py-20 md:py-28 border-t border-foreground/15 bg-background overflow-hidden">
        <CirclesInCircumference className="absolute -right-24 top-24 w-72 h-72 opacity-25 hidden md:block" uid="cat-list-circ" />

        <div className="max-w-[1180px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 mb-10 items-end">
            <div className="col-span-12 md:col-span-8 space-y-3">
              <span className="index-chip">Pieces in {cat.name}</span>
              <h2 className="display-md font-display">
                <SplitReveal>The collection.</SplitReveal>
              </h2>
            </div>
          </div>

          <Rule className="rule-heavy mb-6" />

          {posts.length === 0 ? (
            <div className="border border-dashed border-foreground/20 p-12 md:p-16 text-center">
              <p className="font-display text-2xl md:text-3xl tracking-[-0.02em] text-foreground/85">
                Nothing here yet.
              </p>
              <p className="text-sm text-foreground/60 mt-3 font-heading">
                Pieces tagged <span className="text-foreground font-mono">{cat.name}</span> will show up here when published.
              </p>
              <Link href="/lawshaoor-academy" className="btn-ghost mt-6 inline-flex">
                <span>Browse the Academy</span>
                <span className="arrow-magnet">→</span>
              </Link>
            </div>
          ) : (
            <FadeIn staggerChildren className="border-x border-b border-foreground/15">
              <div className="hidden md:grid grid-cols-12 gap-6 px-5 py-4 border-t border-b border-foreground/15 bg-background-alt/40 text-foreground/55 eyebrow-sm">
                <div className="col-span-1">No.</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-7">Piece</div>
                <div className="col-span-1 text-right">Read</div>
                <div className="col-span-1 text-right">→</div>
              </div>
              {posts.map((p, i) => (
                <Link
                  key={p._id}
                  href={`/lawshaoor-academy/${p.slug}`}
                  className="group grid grid-cols-12 gap-3 md:gap-6 px-5 py-5 md:py-6 border-b border-foreground/10 last:border-b-0 items-baseline hover:bg-background-alt/60 transition-colors"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-xs tracking-[0.18em] text-foreground/45 tabular-fig">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="col-span-3 md:col-span-2 font-mono text-xs tracking-[0.18em] text-foreground/60 tabular-fig">
                    {formatMonth(p.publishedAt)}
                  </span>
                  <span className="col-span-12 md:col-span-7">
                    <span className="block font-display text-xl md:text-2xl tracking-[-0.02em] leading-[1.15] text-foreground group-hover:text-primary transition-colors">
                      {p.title}
                    </span>
                    {p.excerpt && (
                      <span className="block text-sm text-foreground/65 font-heading line-clamp-1 mt-1.5 tracking-[-0.005em]">
                        {p.excerpt}
                      </span>
                    )}
                    <span className="md:hidden block font-mono text-[10px] text-foreground/55 mt-1.5">
                      {formatDate(p.publishedAt)} · {p.readMinutes} min
                    </span>
                  </span>
                  <span className="hidden md:block md:col-span-1 font-mono text-xs tracking-[0.18em] text-foreground/60 tabular-fig text-right">
                    {p.readMinutes} min
                  </span>
                  <span className="hidden md:block md:col-span-1 font-display text-xl text-right opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              ))}
            </FadeIn>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          03 · OTHER CATEGORIES
          ──────────────────────────────────────── */}
      {otherCategories.length > 0 && (
        <section className="relative section-pad py-20 md:py-28 border-t border-foreground/15 bg-fixed-lavender overflow-hidden">
          <StackedCubes className="absolute right-12 -top-8 w-32 h-44 opacity-45 hidden md:block float-soft" uid="cat-other-stk" />
          <SquareCascade className="absolute -left-20 -bottom-16 w-56 h-56 opacity-40 hidden md:block" uid="cat-other-sq" />

          <div className="max-w-[1180px] mx-auto relative">
            <div className="grid grid-cols-12 gap-6 mb-10 items-end">
              <div className="col-span-12 md:col-span-8 space-y-3">
                <span className="index-chip">Browse on</span>
                <h2 className="display-sm font-display">
                  <SplitReveal>Other categories.</SplitReveal>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <Link
                  href="/lawshaoor-academy"
                  className="link-line text-xs font-mono tracking-[0.22em] uppercase text-foreground/80"
                >
                  All pieces →
                </Link>
              </div>
            </div>

            <Rule className="rule-heavy mb-0" />

            <FadeIn staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/15 border-x border-b border-foreground/15">
              {otherCategories.map((c, i) => {
                const Co = getIllustration(c.illustrationKey)
                return (
                  <Link
                    key={c._id}
                    href={`/lawshaoor-academy/c/${c.slug}`}
                    className="group bg-background p-6 md:p-8 lift-card flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-foreground/55">{String(i + 1).padStart(2, '0')}</span>
                      <span className="eyebrow text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center py-3">
                      <Co className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-500 group-hover:scale-110" uid={`other-${c.slug}`} />
                    </div>
                    <span className="font-display text-lg md:text-xl tracking-[-0.02em] group-hover:text-primary transition-colors">
                      {c.name}
                    </span>
                  </Link>
                )
              })}
            </FadeIn>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
