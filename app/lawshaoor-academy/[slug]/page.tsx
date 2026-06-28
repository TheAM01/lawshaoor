import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ServerBlockNoteEditor } from '@blocknote/server-util'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FadeIn } from '@/components/motion/fade-in'
import { SplitReveal } from '@/components/motion/split-reveal'
import { Rule } from '@/components/motion/rule'
import {
  CirclesInCircumference,
  StackedCubes,
  OrbitRings,
  GridDots,
  VectorNode,
  SquareCascade,
  WaveBars,
  PulseRings,
  BigCircles,
} from '@/components/illustrations'
import { postsCollection } from '@/lib/mongo'
import type { PostDoc } from '@/lib/models/post'
import { getAllCategories, buildIllustrationKeyMap } from '@/lib/server/categories'
import { getIllustration } from '@/components/illustrations/registry'
import { ShareButtons } from '@/components/share-buttons'

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

type RelatedPost = {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: string
  thumbnailUrl: string
  publishedAt: Date
  readMinutes: number
}

/** Wrapped in React cache() so `generateMetadata` and the page body share a
 *  single Mongo round-trip per render instead of fetching the post twice. */
const getPostBySlug = cache(async (slug: string): Promise<PostDoc | null> => {
  try {
    const col = await postsCollection()
    const doc = await col.findOne({ slug, status: 'published' })
    return (doc as unknown as PostDoc) ?? null
  } catch {
    return null
  }
})

async function getRelated(current: PostDoc, limit = 3): Promise<RelatedPost[]> {
  try {
    const col = await postsCollection()
    const sameCat = await col
      .find({
        status: 'published',
        category: current.category,
        slug: { $ne: current.slug },
      })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray()

    let docs = sameCat
    if (docs.length < limit) {
      const fill = await col
        .find({
          status: 'published',
          slug: { $ne: current.slug, $nin: docs.map((d) => (d as { slug: string }).slug) },
        })
        .sort({ publishedAt: -1 })
        .limit(limit - docs.length)
        .toArray()
      docs = [...docs, ...fill]
    }

    return docs.map((d) => {
      const p = d as unknown as PostDoc
      return {
        _id: String(p._id),
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
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
  return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

/** Prerender published posts at build, and opt this route into the Full Route
 *  Cache so new/edited slugs render once on-demand then serve cached until an
 *  admin mutation calls revalidatePath('/lawshaoor-academy'). */
export async function generateStaticParams() {
  try {
    const col = await postsCollection()
    const docs = await col
      .find({ status: 'published' }, { projection: { slug: 1 } })
      .toArray()
    return docs.map((d) => ({ slug: String((d as { slug: string }).slug) }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: { absolute: 'Not found · LawShaoor Academy' } }

  const title = post.seo?.title || post.title
  const description = post.seo?.description || post.excerpt
  const ogImage = post.seo?.ogImage || post.thumbnailUrl || undefined

  return {
    title: { absolute: `${title} · LawShaoor Academy — Law. Strategy. Future.` },
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const editor = ServerBlockNoteEditor.create()
  let html = ''
  try {
    html = await editor.blocksToHTMLLossy(post.blocks as never)
  } catch {
    html = '<p>Failed to render content.</p>'
  }

  const related = await getRelated(post, 3)
  const publishedAt = post.publishedAt ?? post.updatedAt
  const categories = await getAllCategories()
  const keyMap = buildIllustrationKeyMap(categories)
  const HeroIllo = getIllustration(keyMap.get(post.category))
  const postCategory = categories.find((c) => c.name === post.category)

  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      {/* ────────────────────────────────────────
          01 · HERO
          ──────────────────────────────────────── */}
      <section className="relative section-pad pt-32 md:pt-44 pb-16 md:pb-20 bg-fixed-mist overflow-hidden">
        <span aria-hidden className="hero-orb accent-breathe top-[6%] -right-[14%] hidden md:block" />
        <OrbitRings
          className="absolute -left-24 top-32 w-[320px] h-[320px] opacity-30 hidden md:block"
          uid="post-hero-orbit"
          rotate
        />
        <PulseRings
          className="absolute right-14 bottom-12 w-32 h-32 opacity-60 hidden lg:block"
          uid="post-hero-pulse"
        />
        <GridDots
          className="absolute right-[28%] top-24 w-32 h-32 opacity-45 hidden lg:block float-soft"
          uid="post-hero-dots"
        />

        <div className="max-w-[1180px] mx-auto relative">
          {/* Breadcrumb / back */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase mb-10 md:mb-14 flex-wrap">
            <Link
              href="/lawshaoor-academy"
              className="text-foreground/55 hover:text-primary transition-colors"
            >
              ← Academy
            </Link>
            <span className="block w-6 h-px bg-foreground/25" />
            <span className="text-foreground/80">{post.category}</span>
            <span className="block w-6 h-px bg-foreground/25" />
            <span className="text-foreground/55">{formatMonth(publishedAt)}</span>
          </div>

          {/* Category tag + meta */}
          <div className="flex items-center gap-4 flex-wrap mb-7">
            {postCategory ? (
              <Link href={`/lawshaoor-academy/c/${postCategory.slug}`} className="tag tag-primary hover:opacity-80 transition-opacity">
                {post.category}
              </Link>
            ) : (
              <span className="tag tag-primary">{post.category}</span>
            )}
            <span className="eyebrow text-foreground/55">{formatDate(publishedAt)}</span>
            <span className="eyebrow text-foreground/55">·</span>
            <span className="eyebrow text-foreground/55">
              {post.readMinutes ?? 1} min read
            </span>
          </div>

          {/* Display title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.0] max-w-5xl">
            <SplitReveal trigger="load">{post.title}</SplitReveal>
          </h1>

          {/* Standfirst / excerpt */}
          {post.excerpt && (
            <FadeIn delay={0.2}>
              <p className="font-heading text-xl md:text-2xl text-foreground/80 leading-snug tracking-[-0.005em] mt-8 max-w-3xl">
                {post.excerpt}
              </p>
            </FadeIn>
          )}

          {/* Byline strip */}
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-4 mt-12 md:mt-14 pt-6 border-t border-foreground/15 flex-wrap">
              <span
                className="w-10 h-10 border border-primary/50 bg-primary/10 flex items-center justify-center font-display text-primary text-sm tracking-[-0.02em]"
                aria-hidden
              >
                LS
              </span>
              <div>
                <p className="font-heading text-sm text-foreground/85 tracking-[-0.005em]">
                  LawShaoor Partners
                </p>
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-foreground/55 mt-0.5">
                  Editorial · Senior counsel
                </p>
              </div>
              <span className="hidden md:block flex-1" />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/45 mr-2">
                #{post.slug}
              </span>
            </div>
          </FadeIn>

          {/* Share row */}
          <FadeIn delay={0.4} className="mt-6 pt-4 border-t border-foreground/10">
            <ShareButtons title={post.title} excerpt={post.excerpt} />
          </FadeIn>
        </div>
      </section>

      {/* ────────────────────────────────────────
          02 · HERO MEDIA
          ──────────────────────────────────────── */}
      <section className="section-pad pb-12 md:pb-16 border-b border-foreground/15 bg-background">
        <div className="max-w-[1180px] mx-auto">
          {post.thumbnailUrl ? (
            <div className="relative aspect-[16/9] border border-foreground/15 overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-background/15 via-transparent to-transparent"
              />
              <HeroIllo
                className="absolute -bottom-6 -right-6 w-32 h-32 md:w-44 md:h-44 opacity-90 mix-blend-multiply hidden md:block"
                uid={`post-media-${post.slug}`}
              />
            </div>
          ) : (
            <div className="relative aspect-[16/9] border border-foreground/15 bg-background-alt overflow-hidden flex items-center justify-center">
              <HeroIllo className="w-1/2 h-1/2 opacity-90" uid={`post-media-fb-${post.slug}`} />
              <GridDots
                className="absolute inset-0 w-full h-full opacity-20"
                uid={`post-media-bg-${post.slug}`}
              />
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          03 · ARTICLE BODY
          ──────────────────────────────────────── */}
      <section className="relative section-pad py-16 md:py-24 bg-background overflow-hidden">
        <VectorNode
          className="absolute -left-16 top-32 w-24 h-24 opacity-35 hidden lg:block float-soft"
          uid="post-body-vec"
        />
        <SquareCascade
          className="absolute -right-12 top-1/3 w-32 h-32 opacity-30 hidden lg:block"
          uid="post-body-sq"
        />
        <CirclesInCircumference
          className="absolute -left-20 bottom-32 w-32 h-32 opacity-30 hidden lg:block"
          uid="post-body-circ"
        />

        <div className="max-w-[760px] mx-auto relative">
          <article
            className="bn-rendered"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* End-of-article rule + close */}
          <div className="mt-16 md:mt-20 pt-10 border-t border-foreground/15">
            <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-foreground/55">
                · End ·
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/45">
                Filed {formatDate(publishedAt)}
              </span>
            </div>
            <p className="font-heading text-foreground/65 leading-relaxed tracking-[-0.005em] max-w-xl">
              Written by partners at LawShaoor. Comments and corrections welcome —{' '}
              <Link href="/contact" className="link-line text-foreground">
                reach the desk
              </Link>
              .
            </p>

            {/* Share — end of article */}
            <div className="mt-8 pt-6 border-t border-foreground/10">
              <ShareButtons title={post.title} excerpt={post.excerpt} />
            </div>

            {/* Tagline signature */}
            <div className="mt-10 pt-8 border-t border-foreground/10 flex items-center gap-4">
              <span
                className="w-10 h-10 border border-primary/50 bg-primary/10 flex items-center justify-center font-display text-primary text-sm tracking-[-0.02em] shrink-0"
                aria-hidden
              >
                LS
              </span>
              <div className="flex-1">
                <p className="font-display text-base md:text-lg tracking-[-0.015em] text-foreground/90">
                  LawShaoor Chambers
                </p>
                <p className="font-mono text-[10px] md:text-xs tracking-[0.32em] uppercase text-foreground/65 mt-1">
                  Law<span className="text-primary">.</span> Strategy<span className="text-primary">.</span> Future<span className="text-primary">.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          05 · CONTINUE READING (related)
          ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="relative section-pad py-24 md:py-32 border-b border-foreground/15 bg-fixed-lavender overflow-hidden">
          <OrbitRings
            className="absolute -right-32 top-12 w-[480px] h-[480px] opacity-25 hidden md:block"
            uid="post-rel-orb"
            rotate
          />
          <StackedCubes
            className="absolute -left-12 -bottom-12 w-32 h-44 opacity-40 hidden md:block float-soft"
            uid="post-rel-stk"
          />

          <div className="max-w-[1180px] mx-auto relative">
            <div className="grid grid-cols-12 gap-6 mb-12 md:mb-14 items-end">
              <div className="col-span-12 md:col-span-7">
                <span className="index-chip">Continue reading</span>
                <h2 className="display-md font-display mt-4">
                  <SplitReveal>More from</SplitReveal>{' '}
                  <span className="text-primary">
                    <SplitReveal>the desk.</SplitReveal>
                  </span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9 md:text-right">
                <FadeIn>
                  <Link
                    href="/lawshaoor-academy"
                    className="link-line text-xs font-mono tracking-[0.22em] uppercase text-foreground/80"
                  >
                    All pieces →
                  </Link>
                </FadeIn>
              </div>
            </div>

            <Rule className="rule-heavy mb-0" />

            <FadeIn
              staggerChildren
              className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/15 border-x border-b border-foreground/15"
            >
              {related.map((p) => (
                <RelatedCard key={p._id} post={p} keyMap={keyMap} />
              ))}
            </FadeIn>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────
          06 · FOOTER CTA
          ──────────────────────────────────────── */}
      <section className="relative section-pad py-24 md:py-32 bg-fixed-deep overflow-hidden">
        <BigCircles
          className="absolute -left-24 -bottom-12 w-72 h-72 opacity-40 hidden md:block"
          uid="post-cta-big"
        />
        <WaveBars
          className="absolute right-12 top-12 w-44 h-44 opacity-50 hidden md:block float-soft"
          uid="post-cta-wave"
        />

        <div className="max-w-[1180px] mx-auto relative">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8 space-y-5">
              <span className="index-chip">Next step</span>
              <h2 className="display-md font-display">
                <span className="block">
                  <SplitReveal>Have a deal</SplitReveal>
                </span>
                <span className="block text-primary">
                  <SplitReveal>that looks like this?</SplitReveal>
                </span>
              </h2>
              <FadeIn delay={0.2}>
                <p className="font-heading text-lg text-foreground/80 max-w-xl tracking-[-0.005em]">
                  Bring it in. We will tell you whether it needs five minutes of counsel or five months.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3 md:items-end">
              <FadeIn delay={0.3} staggerChildren className="flex flex-col gap-3 md:items-end">
                <Link href="/contact" className="btn-primary">
                  <span>Get in Touch</span>                </Link>
                <Link href="/lawshaoor-academy" className="btn-ghost">
                  <span>Back to Academy</span>                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ──────────────────────────────────────────────
   Related card
   ────────────────────────────────────────────── */

function RelatedCard({
  post,
  keyMap,
}: {
  post: RelatedPost
  keyMap: Map<string, string>
}) {
  const Illo = getIllustration(keyMap.get(post.category))
  return (
    <Link
      href={`/lawshaoor-academy/${post.slug}`}
      className="group bg-background p-6 md:p-7 lg:p-8 lift-card flex flex-col gap-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-background-alt border border-foreground/15">
        {post.thumbnailUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Illo className="w-3/4 h-3/4" uid={`rel-${post._id}`} />
          </div>
        )}
        <span className="absolute top-3 left-3">
          <span className="tag tag-primary bg-background/90 text-[10px]">
            {post.category}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3 text-foreground/55 eyebrow-sm">
        <span>{formatMonth(post.publishedAt)}</span>
        <span>·</span>
        <span>{post.readMinutes} min</span>
      </div>

      <h3 className="font-display text-xl md:text-2xl tracking-[-0.02em] leading-[1.1] text-foreground group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="font-heading text-sm text-foreground/75 leading-relaxed tracking-[-0.005em] line-clamp-2 mt-auto">
          {post.excerpt}
        </p>
      )}

      <span className="font-display text-2xl opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all self-end">
        →
      </span>
    </Link>
  )
}
