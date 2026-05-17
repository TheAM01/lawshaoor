# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # next dev — local dev server (Turbopack)
pnpm build        # next build — production build
pnpm start        # next start — serve the production build
pnpm lint         # eslint .
pnpm seed:posts   # tsx scripts/seed-posts.ts — seed sample Academy posts
                  # use RESEED=1 pnpm seed:posts to overwrite existing posts
```

There is no test suite. Both `package-lock.json` and `pnpm-lock.yaml` are committed — **pnpm is the source of truth**. The lockfile encodes critical pnpm overrides (see Gotchas).

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`. The build will *not* fail on TS errors, so do not assume a green `pnpm build` means types are clean — run `tsc --noEmit` if you need a real type check.

It also lists `serverExternalPackages: ['@blocknote/server-util', 'jsdom', 'mongodb']` — these packages must not be bundled by Turbopack for server components.

## Architecture

Marketing site + blog (the "Academy") + admin CMS for "LawShaoor" (a fictional corporate law firm). Built on **Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/ui + MongoDB + BlockNote**.

### Tech stack

- **Next.js 16** App Router with Turbopack (dev + build)
- **React 19** — strict mode in dev
- **Tailwind v4** via `@theme inline` block in `app/globals.css` (no `tailwind.config.*`)
- **MongoDB** via the native `mongodb` driver (no Mongoose). Connection cached in `globalThis._mongoClientPromise` to survive HMR / serverless invocations.
- **iron-session** for the single-admin session cookie. Not NextAuth.
- **BlockNote** (`@blocknote/core`, `react`, `mantine`, `server-util`) — Notion-style block editor on top of Tiptap + ProseMirror. Server-side rendering via `@blocknote/server-util` → HTML for the public Academy posts.
- **GSAP + @gsap/react** for motion (`SplitReveal`, `FadeIn`, `Counter`, `Marquee`, `PinnedWords`, `Rule` in `components/motion/`).
- **ImgBB** as the image host. The editor's image block and the thumbnail/OG picker both POST through `/api/admin/upload`.

### Three layers of the app

1. **Public marketing pages** (`app/page.tsx`, `app/our-story`, `app/practice-areas`, `app/people`, `app/contact`). Static, hardcoded content. Use the same brand voice — blunt, edgy, partner-first ("Law that actually works", "No drip campaigns").
2. **Public Academy / blog** (`app/lawshaoor-academy/page.tsx` + `[slug]/page.tsx`). Reads from MongoDB. Listing is editorial mixed-size grid; post page renders BlockNote JSON via `ServerBlockNoteEditor.blocksToHTMLLossy()` into the `.bn-rendered` prose styles in `globals.css`.
3. **Admin CMS** (`app/admin/*`). Gated by middleware (cookie-based session). Posts list, BlockNote editor with right-side properties panel (Block + Post tabs), thumbnail/SEO picker.

### Routing

```
app/
  layout.tsx                      ← root: fonts, ThemeProvider, ThemeScript
  page.tsx                        ← home
  our-story/page.tsx
  practice-areas/page.tsx
  people/page.tsx
  contact/page.tsx
  lawshaoor-academy/
    page.tsx                      ← editorial listing (server, fetches from Mongo)
    [slug]/page.tsx               ← single post (server, BlockNote → HTML)
  admin/
    login/                        ← public login page (sibling of (dashboard))
      page.tsx
      login-form.tsx
    (dashboard)/                  ← route group; wraps with sidebar layout
      layout.tsx
      page.tsx                    ← redirects to /admin/posts
      _components/sidebar.tsx
      posts/
        page.tsx                  ← list (server, fetches from Mongo)
        _components/posts-header.tsx
        _components/posts-table.tsx
        [id]/edit/
          page.tsx                ← fetches post, hands off to client editor
          _components/editor-loader.tsx     ← next/dynamic({ ssr:false }) wrapper
          _components/editor-shell.tsx       ← BlockNote + state orchestration
          _components/top-bar.tsx
          _components/properties-panel.tsx  ← Block + Post tabs
          _components/editor.css
    editor-test/                  ← minimal BlockNote smoke-test (debug only)
  api/
    admin/
      login/route.ts              ← POST creds → sets iron-session cookie
      logout/route.ts             ← destroys session
      posts/route.ts              ← GET list / POST create draft
      posts/[id]/route.ts         ← GET / PATCH / DELETE single post
      upload/route.ts             ← POST multipart → proxies to ImgBB → { url }
middleware.ts                     ← gates /admin/* and /api/admin/* (skips login)
```

### Theming & styling

- **Tailwind v4** with `@theme inline` block in `app/globals.css`. Design tokens are CSS variables on `:root` (light) and `.dark` (dark) — colors authored in `oklch()`. Always use `bg-primary`, `text-foreground`, etc. — not hex.
- **Fonts (via `next/font` in `app/layout.tsx`):**
  - `Syne` → `--font-display` (used by `.font-display`, all headings)
  - `Space Grotesk` → `--font-heading` (body copy)
  - `Geist` → `--font-sans`
  - `Geist Mono` → `--font-mono` (eyebrows, chips, monospace meta)
- **Theme provider** — `components/theme-provider.tsx` is a **custom** mini provider, NOT `next-themes` (removed because of a React 19 script-tag warning). Same API: `<ThemeProvider attribute="class" defaultTheme="light" ...>` and `useTheme()` returning `{ theme, setTheme, resolvedTheme }`. Also exports `<ThemeScript />`, rendered in `<head>` from `app/layout.tsx` to set the html class before hydration (no FOUC).
- **Custom utility classes** in `globals.css`: `display-xl/lg/md/sm/hero`, `font-display`, `font-heading`, `eyebrow`, `eyebrow-sm`, `index-chip`, `tag`, `tag-primary`, `btn-primary`, `btn-ghost`, `link-line`, `rule-heavy`, `surface`, `bracketed`, `dot-live`, `field`, `lift-card`, `hero-orb`, `bg-fixed-mist`, `bg-fixed-lavender`, `bg-fixed-deep`, `bg-grid`, `text-gradient`, `arrow-magnet`, `mask-reveal`, `bn-rendered` (public post prose styles).
- **Design intent**: sleek, minimal, professional, editorial, illustration-heavy. Brand voice is blunt ("No drip campaigns", "We bring the law"). Match the tone when editing copy.
- **Illustrations** (`components/illustrations/index.tsx`): a large SVG library. **Prefer atomic primitives** — `CirclesInCircumference`, `OrbitRings`, `GridDots`, `SquareCascade`, `VectorNode`, `HexagonalCascade`, `TesseractCube`, `StackedCubes`, `WaveBars`, `PulseRings`, `BigCircles`, `SegmentedRing`. Avoid the busier ones (`GradientSphere`, `HoneycombCluster`, `BlockTower`, `IsoBlockWall`, `LayerCake`, `ConcentricArcs`, `PrismFan`, `DotMatrixOrb`, `GradientGlobe`) — they make pages feel cluttered.
- **Category → illustration map** (used by Academy + post pages):
  - M&A → `CirclesInCircumference`
  - Governance → `HexagonalCascade`
  - Contracts → `TesseractCube`
  - Capital → `StackedCubes`
  - Sector Notes → `OrbitRings`
  - Opinion → `VectorNode`

### Components

- `components/navbar.tsx`, `components/footer.tsx` — public site chrome. Admin pages do NOT use these; they have their own sidebar layout in `app/admin/(dashboard)/layout.tsx`.
- `components/theme-provider.tsx` — see Theming above.
- `components/motion/*` — GSAP-powered animation primitives. All client components.
- `components/illustrations/index.tsx` — SVG illustration library (see list above).
- `components/ui/*` — shadcn/ui (style: `new-york`, base color: `neutral`, RSC enabled). Add with `npx shadcn@latest add <name>`; config in `components.json`.

### Path aliases (from `tsconfig.json` + `components.json`)

- `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils` (the `cn()` helper), `@/hooks`
- `cn()` = `twMerge(clsx(...))` — use whenever conditionally composing classNames.

## Library files (`lib/`)

- **`lib/mongo.ts`** — singleton MongoDB client. `getDb()` returns the `Db`, `postsCollection()` returns the posts collection. Connection cached on `globalThis._mongoClientPromise` (survives HMR + serverless cold starts). On first connect, auto-creates indexes on `posts`: unique on `slug`, compound on `(status, publishedAt)`, compound on `(category, publishedAt)`.
- **`lib/auth.ts`** — iron-session helpers. `getSessionOptions()` reads `SESSION_SECRET` and configures the cookie (`lawshaoor_admin`, secure in prod, sameSite lax, httpOnly). `getSession()` returns the typed session inside route handlers/server components. `verifyAdminCredentials(u, p)` compares against `ADMIN_USERNAME` / `ADMIN_PASSWORD`.
- **`lib/models/post.ts`** — Post types, zod schemas, helpers:
  - `PostInputSchema` — what the API accepts (partial in PATCH)
  - `PostDoc` — what's stored in Mongo
  - `PostListItem` — serialized form for the client
  - `CATEGORIES = ['M&A', 'Governance', 'Contracts', 'Capital', 'Sector Notes', 'Opinion']`
  - `toSlug(s)` — slugify helper
  - `estimateReadMinutes(blocks)` — walks BlockNote JSON, counts words, ~220 wpm
  - `defaultBlocks()` — initial content for a new post (uses BlockNote string-content shorthand)
  - `sanitizeBlocks(blocks)` — defensive normalizer for blocks read from storage. Coerces verbose `[{type:'text', text, styles:{}}]` content into plain strings. Run before passing stored blocks to `editor.replaceBlocks()`.

## Conventions

- **Adding a public route**: create `app/<route>/page.tsx`, import `Navbar` and `Footer` directly (no shared layout slot), follow the section / `max-w-[1440px] mx-auto` / `bg-fixed-*` / `index-chip` pattern from existing pages.
- **CTAs**: every page should have a primary CTA pointing to `/contact` ("Schedule a call").
- **Public marketing content** in `app/page.tsx`, `our-story`, `practice-areas`, `people`, `contact` is hardcoded inline — no CMS for these. Edit the arrays/JSX directly.
- **Academy/blog content** lives in MongoDB. Add posts via `/admin/posts` (the editor) or update `scripts/seed-posts.ts` and run `RESEED=1 pnpm seed:posts`.
- **Adding an admin route**: put it inside `app/admin/(dashboard)/...` so it picks up the sidebar layout. The `(dashboard)` route group does NOT show up in URLs (so `/admin/posts` still serves at `/admin/posts`).
- **Adding an admin API route**: put it under `app/api/admin/...` — middleware auto-gates everything there except `/api/admin/login`.
- **Server vs client**: Public pages are server components by default (interior bits — illustrations with hover effects, GSAP motion — are client islands). The admin editor MUST stay client-side (BlockNote uses `window`) — load it through `editor-loader.tsx` which uses `next/dynamic({ ssr: false })`.

## Environment variables

Defined in `.env.local` (gitignored) — template is `.env.example`.

| Variable | Required | Purpose |
|---|---|---|
| `ADMIN_USERNAME` | yes | Username for `/admin/login` |
| `ADMIN_PASSWORD` | yes | Password for `/admin/login` |
| `SESSION_SECRET` | yes | iron-session cookie secret — **must be ≥32 characters**. Generate with `openssl rand -hex 32` |
| `MONGODB_URI` | yes | MongoDB Atlas connection string. Include the database name in the path: `.../lawshaoor?retryWrites=true&w=majority` |
| `IMGBB_API_KEY` | yes | ImgBB API key — get one at https://api.imgbb.com/ |

On Vercel: set all of these in Project Settings → Environment Variables, and **redeploy** after changing them (Vercel does NOT auto-restart on env changes).

## Database

Single collection: `posts`. Indexes auto-created on first connection (see `lib/mongo.ts`).

```ts
type PostDoc = {
  _id: ObjectId
  title: string
  slug: string                  // unique
  excerpt: string
  category: string              // one of CATEGORIES
  thumbnailUrl: string
  blocks: unknown[]             // BlockNote JSON
  status: 'draft' | 'published'
  seo: { title: string; description: string; ogImage: string }
  readMinutes: number           // computed from blocks
  publishedAt: Date | null      // set on first publish
  createdAt: Date
  updatedAt: Date
}
```

## Critical gotchas (do NOT remove without thinking)

1. **`pnpm.overrides.prosemirror-model = "1.24.1"`** in `package.json`. Prosemirror-model 1.25.x narrowed `renderSpec` to only accept text nodes for the `{dom, contentDOM}` return form. That breaks every Tiptap/BlockNote node — the editor throws `RangeError: Invalid array passed to renderSpec` on first render. The override forces all Tiptap/BlockNote deps to resolve to 1.24.1. Verify with `readlink node_modules/.pnpm/@tiptap+pm@*/node_modules/prosemirror-model`.
2. **Mantine peer dependencies must be explicitly installed** — `@mantine/core` and `@mantine/hooks` are peer deps of `@blocknote/mantine` and pnpm does NOT auto-install peers. Without them, BlockNote's slash menu and toolbars try to render undefined Mantine primitives and throw renderSpec. Pinned at `^8.3.18`.
3. **Editor must be client-only** — `useCreateBlockNote` accesses `window`. The editor is loaded via `app/admin/(dashboard)/posts/[id]/edit/_components/editor-loader.tsx` which wraps it in `next/dynamic({ ssr: false })`. Do not import `editor-shell.tsx` directly from a server component.
4. **`serverExternalPackages` in `next.config.mjs`** — `@blocknote/server-util`, `jsdom`, and `mongodb` must NOT be bundled for server components (they use Node-only APIs). Do NOT add `@blocknote/core` or `@blocknote/react` here — they're used in client components and need to be bundled.
5. **`middleware.ts` is the chosen name** — Next 16 deprecation warning suggests `proxy.ts`. Cosmetic, ignore.
6. **Editor block content sanitization** — when loading a post into the editor, the blocks pass through `sanitizeBlocks()` from `lib/models/post.ts` before being handed to `editor.replaceBlocks`. Editor content is loaded in a `useEffect` (not via `initialContent`) so any failure logs and recovers instead of crashing the editor.
7. **No `next-themes`** — we removed it in favour of a custom `components/theme-provider.tsx` (React 19 fires a console error on the script tag next-themes renders). API is compatible — same imports just from `@/components/theme-provider`.

## Deployment (Vercel)

Mostly works out of the box. Checklist on first deploy:

1. Add all env vars in Vercel project settings (Production + Preview).
2. **MongoDB Atlas → Network Access → add `0.0.0.0/0`** — Vercel functions don't have stable IPs.
3. Verify `pnpm-lock.yaml` is committed so the prosemirror-model override resolves the same on Vercel.
4. After first deploy, seed Mongo by running `pnpm seed:posts` locally with the prod `MONGODB_URI` in `.env.local`. (There is no seed endpoint on the server.)
5. If you see SSL alert 80 from Mongo on Vercel right after deploy: usually the Atlas free-tier cluster is still resuming. Wait 2–3 minutes, then redeploy.

## File scaffolding from v0

This project was scaffolded with v0.app (`generator: 'v0.app'` in metadata, `.v0-trash/` in `.gitignore`). Treat any `__v0_*` files as sandbox artifacts — they're gitignored and not for production.
