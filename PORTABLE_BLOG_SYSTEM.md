# Portable Blog + Admin Dashboard System

A self-contained spec of every technical aspect of the LawShaoor blog + admin CMS + analytics dashboard, written so the whole system can be replicated into another Next.js project. Drop this file into a target repo and tell Claude: "build this here, swap LawShaoor branding for the new project". Every collection, schema, route, env var, and gotcha is described — including the workarounds for BlockNote/Tiptap/Mantine peer issues that took real time to discover.

The system has four distinct surfaces, each with its own section below:

1. **Public blog** ("Academy") — `/lawshaoor-academy`, `/lawshaoor-academy/[slug]`, `/lawshaoor-academy/c/[category]`
2. **Admin CMS** — `/admin/*` (gated by middleware, single-user iron-session auth)
3. **BlockNote editor** — Notion-style block editor with right-side properties panel
4. **Cookieless analytics** — `/api/track` ingest + admin dashboard with realtime widget

---

## 1. Stack

- **Next.js 16** App Router (Turbopack in dev and build)
- **React 19** (strict mode)
- **Tailwind v4** via `@theme inline` block in `app/globals.css` — **no `tailwind.config.*` file**
- **MongoDB** via the native `mongodb` driver (no Mongoose). Driver version `^7.2.0`.
- **iron-session** for the single-admin cookie session — **not NextAuth**
- **BlockNote** (`@blocknote/core`, `react`, `mantine`, `server-util`) on top of Tiptap + ProseMirror
- **ImgBB** for image hosting (free, public URLs)
- **Vercel Blob** for non-image media (PDFs, video, audio) — served via a same-origin proxy route
- **Recharts** for analytics charts
- **zod** for all input/payload validation
- **slugify** for slug generation
- **lucide-react** for icons
- **GSAP + @gsap/react** for motion (optional, only used by the public site)

### package.json snippet

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "seed:posts": "tsx scripts/seed-posts.ts"
  },
  "dependencies": {
    "@blocknote/core": "^0.51.0",
    "@blocknote/mantine": "^0.51.0",
    "@blocknote/react": "^0.51.0",
    "@blocknote/server-util": "^0.51.0",
    "@mantine/core": "^8.3.18",
    "@mantine/hooks": "^8.3.18",
    "@vercel/blob": "^2.3.3",
    "iron-session": "^8.0.4",
    "lucide-react": "^0.564.0",
    "mongodb": "^7.2.0",
    "next": "16.2.4",
    "react": "^19",
    "react-dom": "^19",
    "recharts": "2.15.0",
    "server-only": "^0.0.1",
    "slugify": "^1.6.9",
    "sonner": "^1.7.1",
    "tailwind-merge": "^3.3.1",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.0",
    "tailwindcss": "^4.2.0",
    "tsx": "^4.22.0",
    "typescript": "5.7.3"
  },
  "pnpm": {
    "overrides": {
      "prosemirror-model": "1.24.1"
    }
  }
}
```

### next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  serverExternalPackages: ['@blocknote/server-util', 'jsdom', 'mongodb'],
}
export default nextConfig
```

`serverExternalPackages` is critical: `@blocknote/server-util`, `jsdom`, and `mongodb` use Node-only APIs and must NOT be bundled by Turbopack. Do **not** add `@blocknote/core` or `@blocknote/react` here — those run on the client and must be bundled.

---

## 2. Environment variables (`.env.local`)

```env
# Admin login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me-please

# iron-session cookie secret — MIN 32 characters
# Generate with: openssl rand -hex 32
SESSION_SECRET=replace-with-32-char-or-longer-random-string

# MongoDB connection URI (Atlas connection string; include DB in path)
MONGODB_URI=mongodb+srv://USER:PASS@HOST/DB_NAME?retryWrites=true&w=majority

# ImgBB API key for image uploads
IMGBB_API_KEY=your-imgbb-api-key

# Vercel Blob token — for non-image uploads (video, audio, files, PDFs)
# Auto-injected on Vercel; only required locally for non-image uploads.
BLOB_READ_WRITE_TOKEN=
```

On Vercel: set every one of these in Project Settings → Environment Variables and **redeploy**. Vercel does NOT auto-restart on env changes.

MongoDB Atlas: **Network Access → add `0.0.0.0/0`** because Vercel functions don't have stable IPs.

---

## 3. Critical gotchas (do NOT remove without thinking)

These were discovered the hard way. They must survive any refactor.

1. **`pnpm.overrides.prosemirror-model = "1.24.1"`** in `package.json`. Prosemirror-model 1.25.x narrowed `renderSpec` to only accept text nodes for the `{dom, contentDOM}` return form. That breaks every Tiptap/BlockNote node — the editor throws `RangeError: Invalid array passed to renderSpec` on first render. The override forces all Tiptap/BlockNote deps to resolve to 1.24.1. Verify with `readlink node_modules/.pnpm/@tiptap+pm@*/node_modules/prosemirror-model`. Commit `pnpm-lock.yaml`.

2. **Mantine peer dependencies must be explicitly installed.** `@mantine/core` and `@mantine/hooks` are peer deps of `@blocknote/mantine` and pnpm does NOT auto-install peers. Without them, BlockNote's slash menu and toolbars try to render undefined Mantine primitives and throw renderSpec. Pinned at `^8.3.18`.

3. **Editor must be client-only.** `useCreateBlockNote` accesses `window`. The editor is loaded via `editor-loader.tsx` which wraps it in `next/dynamic({ ssr: false })`. Do not import `editor-shell.tsx` directly from a server component.

4. **`serverExternalPackages` in `next.config.mjs`** — see section 1. Add `@blocknote/server-util`, `jsdom`, `mongodb`. Do NOT add `@blocknote/core` or `@blocknote/react`.

5. **No `next-themes`.** Custom `components/theme-provider.tsx` instead (React 19 fires a console error on the script tag next-themes renders). Same API.

6. **Editor block content must be sanitized on load.** When loading a post into the editor, blocks pass through `sanitizeBlocks()` from `lib/models/post.ts` before being handed to `editor.replaceBlocks`. Content is loaded in a `useEffect` (not via `initialContent`) so any failure logs and recovers instead of crashing the editor.

7. **`middleware.ts` is the chosen name.** Next 16 deprecation warning suggests `proxy.ts`. Cosmetic, ignore.

8. **`next.config.mjs` `typescript.ignoreBuildErrors: true`.** Build will not fail on TS errors. Run `tsc --noEmit` for a real type check.

---

## 4. Project layout

```
app/
  layout.tsx                            ← root: fonts, ThemeProvider, ThemeScript, SiteTracker
  globals.css                           ← Tailwind v4 + @theme tokens + utility classes
  lawshaoor-academy/                    ← PUBLIC blog
    page.tsx                            ← editorial listing (server)
    [slug]/page.tsx                     ← single post (server, BlockNote → HTML)
    c/[category]/page.tsx               ← category listing
  admin/
    login/                              ← public login page (sibling of (dashboard))
      page.tsx
      login-form.tsx
    (dashboard)/                        ← route group — wraps with sidebar layout
      layout.tsx
      page.tsx                          ← dashboard home
      _components/sidebar.tsx
      analytics/page.tsx                ← /admin/analytics
      analytics/posts/page.tsx          ← per-post analytics list
      analytics/posts/[slug]/page.tsx   ← per-post deep dive
      posts/
        page.tsx                        ← list (server)
        _components/posts-header.tsx
        _components/posts-table.tsx
        [id]/edit/
          page.tsx                      ← fetches post, hands off to client editor
          _components/editor-loader.tsx ← next/dynamic({ ssr:false }) wrapper
          _components/editor-shell.tsx  ← BlockNote + state orchestration
          _components/top-bar.tsx       ← Save/Publish/Unpublish/View
          _components/properties-panel.tsx ← Block + Post tabs
          _components/editor.css        ← tame BlockNote heading sizes
      categories/
        page.tsx
        _components/categories-client.tsx
      media/
        page.tsx
        _components/media-client.tsx
      settings/
        page.tsx                        ← index
        site/page.tsx + form
        general/page.tsx + form
        _components/form-atoms.tsx
      guide/...                         ← optional in-app help docs
  api/
    admin/
      login/route.ts                    ← POST creds → sets iron-session cookie
      logout/route.ts                   ← destroys session
      posts/route.ts                    ← GET list / POST create draft
      posts/[id]/route.ts               ← GET / PATCH / DELETE single post
      upload/route.ts                   ← POST multipart → ImgBB or Vercel Blob → { url }
      categories/route.ts               ← GET list / POST create
      categories/[id]/route.ts          ← PATCH / DELETE
      categories/[id]/reassign/route.ts ← POST reassign posts then optional delete
      media/route.ts                    ← GET list
      media/[id]/route.ts               ← DELETE
      settings/route.ts                 ← GET / PATCH (single doc)
      analytics/realtime/route.ts       ← GET realtime snapshot
    blob/
      [...path]/route.ts                ← server-side proxy for private Vercel Blob files
    track/route.ts                      ← PUBLIC analytics ingest (zod-validated batch)
middleware.ts                           ← gates /admin/* and /api/admin/* (skips login)

components/
  navbar.tsx, footer.tsx                ← public site chrome
  theme-provider.tsx                    ← custom (NOT next-themes), exports ThemeProvider + ThemeScript + useTheme
  share-buttons.tsx                     ← share buttons, also emits share events to /api/track
  analytics/
    tracker.tsx                         ← client tracker — view/engage/scroll/read/share/outbound
    site-tracker.tsx                    ← classifies pathname → (pageKind, slug); mounted in root layout
    charts.tsx                          ← Recharts wrappers
    format.ts                           ← compactNumber, formatSeconds, statFormat, shortDay
    range-selector.tsx
    realtime-widget.tsx
    stat-card.tsx
  illustrations/
    index.tsx                           ← SVG library (optional)
    registry.tsx                        ← key → component map for category illustrations
  motion/...                            ← GSAP primitives (optional)
  ui/*                                  ← shadcn/ui pieces, style new-york

lib/
  mongo.ts                              ← MongoClient singleton + ensureIndexes + per-collection helpers
  auth.ts                               ← iron-session: getSession(), verifyAdminCredentials()
  models/
    post.ts                             ← PostInput/Doc/ListItem zod + helpers (toSlug, estimateReadMinutes, sanitizeBlocks, defaultBlocks)
    category.ts                         ← CategoryInput/Doc/ListItem + SEED_CATEGORIES + normalizers
    media.ts                            ← MediaDoc + MIME helpers + formatBytes
    settings.ts                         ← SiteSettings zod + DEFAULT_SETTINGS + DEFAULT_MARQUEE_ITEMS
    analytics.ts                        ← EVENT_TYPES/PAGE_KINDS/DEVICE_TYPES + ClientEvent/StoredEvent + day helpers
  server/
    analytics.ts                        ← ingest pipeline (bot filter, UA parse, daily salt, hash visitor, session upsert)
    analytics-queries.ts                ← getOverview / getPostAnalytics / getAllPostsAnalytics / getDashboardSummary / getRealtime
    categories.ts                       ← getAllCategories, buildIllustrationKeyMap
    settings.ts                         ← getSiteSettings (with DEFAULT_SETTINGS fallback)
```

---

## 5. MongoDB data model

A single MongoDB database, ~8 collections. All schemas validated with zod at API ingress; nothing else enforces them.

### 5.1 `lib/mongo.ts` — connection singleton + index creation

```ts
import { MongoClient, type Db } from 'mongodb'
import { SEED_CATEGORIES, normalizeCategorySlug } from './models/category'

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient> | null = null
let indexPromise: Promise<void> | null = null

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set in the environment')
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    clientPromise = new MongoClient(uri).connect()
  }
  return clientPromise
}

async function ensureIndexes(db: Db) {
  try {
    await db.collection('posts').createIndex({ slug: 1 }, { unique: true })
    await db.collection('posts').createIndex({ status: 1, publishedAt: -1 })
    await db.collection('posts').createIndex({ category: 1, publishedAt: -1 })

    await db.collection('categories').createIndex({ slug: 1 }, { unique: true })
    await db.collection('categories').createIndex({ order: 1, name: 1 })

    await db.collection('media').createIndex({ uploadedAt: -1 })
    await db.collection('media').createIndex({ url: 1 }, { unique: true })

    // Analytics — raw events with TTL 90 days
    await db.collection('analytics_events').createIndex(
      { createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 }
    )
    await db.collection('analytics_events').createIndex({ dayUTC: 1, slug: 1 })
    await db.collection('analytics_events').createIndex({ dayUTC: 1, pageKind: 1 })
    await db.collection('analytics_events').createIndex({ slug: 1, createdAt: -1 })
    await db.collection('analytics_events').createIndex({ visitorId: 1, createdAt: -1 })
    await db.collection('analytics_events').createIndex({ sessionId: 1, createdAt: 1 })
    await db.collection('analytics_events').createIndex({ type: 1, createdAt: -1 })

    // Analytics — sessions, TTL 7 days from lastSeenAt
    await db.collection('analytics_sessions').createIndex(
      { lastSeenAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 }
    )
    await db.collection('analytics_sessions').createIndex({ sessionId: 1 }, { unique: true })
    await db.collection('analytics_sessions').createIndex({ visitorId: 1, startedAt: -1 })

    // Analytics — daily rollups (long-lived; unique on (day, kind, slug))
    await db.collection('analytics_daily').createIndex(
      { dayUTC: 1, pageKind: 1, slug: 1 }, { unique: true }
    )
    await db.collection('analytics_daily').createIndex({ slug: 1, dayUTC: 1 })

    // Analytics — daily-rotating salt for visitor hash, TTL 35 days
    await db.collection('analytics_salts').createIndex(
      { createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 35 }
    )
    await db.collection('analytics_salts').createIndex({ dayUTC: 1 }, { unique: true })
  } catch { /* indexes may already exist with different options */ }

  // Seed categories on first run
  try {
    const count = await db.collection('categories').countDocuments({})
    if (count === 0) {
      const now = new Date()
      const seeds = SEED_CATEGORIES.map((s, i) => ({
        name: s.name,
        slug: normalizeCategorySlug(s.name),
        description: '',
        order: i,
        illustrationKey: s.illustrationKey,
        createdAt: now,
        updatedAt: now,
      }))
      await db.collection('categories').insertMany(seeds as never[])
    }
  } catch { /* best-effort seed */ }
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  const db = client.db(undefined)            // db name comes from URI
  if (!indexPromise) indexPromise = ensureIndexes(db)
  await indexPromise
  return db
}

export async function postsCollection()              { return (await getDb()).collection('posts') }
export async function categoriesCollection()         { return (await getDb()).collection('categories') }
export async function mediaCollection()              { return (await getDb()).collection('media') }
export async function settingsCollection()           { return (await getDb()).collection('settings') }
export async function analyticsEventsCollection()    { return (await getDb()).collection('analytics_events') }
export async function analyticsSessionsCollection()  { return (await getDb()).collection('analytics_sessions') }
export async function analyticsDailyCollection()     { return (await getDb()).collection('analytics_daily') }
export async function analyticsSaltsCollection()     { return (await getDb()).collection('analytics_salts') }
```

The HMR-safe `globalThis._mongoClientPromise` is essential in dev (Next route handlers re-import) and serverless cold starts.

### 5.2 `posts` collection

```ts
type PostDoc = {
  _id: ObjectId
  title: string
  slug: string                                  // unique
  excerpt: string
  category: string                              // matches a category.name
  thumbnailUrl: string
  blocks: unknown[]                             // BlockNote JSON
  status: 'draft' | 'published'
  seo: { title: string; description: string; ogImage: string }
  readMinutes: number                           // computed from blocks
  publishedAt: Date | null                      // set on first publish
  createdAt: Date
  updatedAt: Date
}
```

Validated on write via `PostInputSchema` (zod). Helpers in `lib/models/post.ts`:

- `toSlug(input)` → kebab-case slug via `slugify({ lower:true, strict:true, trim:true })`
- `estimateReadMinutes(blocks)` → walks BlockNote JSON, counts words, returns `Math.max(1, Math.round(words/220))`
- `defaultBlocks()` → `[{ type:'heading', props:{level:1}, content:'Untitled' }, { type:'paragraph', content:'Start writing…' }]`
- `sanitizeBlocks(blocks)` → defensive normalizer for blocks read from storage. Coerces verbose `[{type:'text',text,styles:{}}]` content into plain strings, preserves media block `props` (url, caption, name, showPreview, previewWidth, textAlignment), and coerces unknown types to paragraphs.

Why sanitize on load:
- Text blocks: preserve type, flatten content to plain string (lossy for inline formatting on load — user re-adds formatting in editor and re-saves). Conservative against renderSpec edge cases.
- Media blocks (image, file, video, audio): preserve type + props (url, caption, name, showPreview, previewWidth) so previously uploaded media reappears on reopen. Content stays empty.
- Skip media blocks that lost their URL.

### 5.3 `categories` collection

```ts
type CategoryDoc = {
  _id: ObjectId
  name: string                              // case-insensitively unique
  slug: string                              // unique
  description: string
  order: number                             // for sorting
  illustrationKey: string                   // key into ILLUSTRATIONS registry
  createdAt: Date
  updatedAt: Date
}
```

Renaming a category cascades into `posts` (the API does `posts.updateMany({ category: oldName }, { $set: { category: newName, updatedAt: now } })`).

Deletion is blocked while any post still uses the category. The `reassign` endpoint moves posts to a target category first, then optionally deletes the source.

Seed list (also used as the category list seeded on first DB connect):

```ts
const SEED_CATEGORIES = [
  { name: 'M&A',          illustrationKey: 'circles-in-circumference' },
  { name: 'Governance',   illustrationKey: 'hexagonal-cascade' },
  { name: 'Contracts',    illustrationKey: 'tesseract-cube' },
  { name: 'Capital',      illustrationKey: 'stacked-cubes' },
  { name: 'Sector Notes', illustrationKey: 'orbit-rings' },
  { name: 'Opinion',      illustrationKey: 'vector-node' },
]
```

### 5.4 `media` collection

```ts
type MediaDoc = {
  _id: ObjectId
  url: string                               // unique
  pathname?: string                         // for Vercel Blob, used for delete + proxy lookup
  name: string
  mime: string
  size: number
  source: 'imgbb' | 'vercel-blob'
  uploadedAt: Date
}
```

Helpers: `isImageMime/isVideoMime/isAudioMime(mime)`, `formatBytes(n)`. Insert is best-effort and ignores duplicate-key errors (re-uploading the same blob).

### 5.5 `settings` collection — single doc keyed `'site'`

```ts
const SETTINGS_KEY = 'site'

const SettingsSchema = z.object({
  siteTitle:       z.string().max(120).default(''),
  siteTagline:     z.string().max(140).default(''),
  metaDescription: z.string().max(280).default(''),
  featuredPostId:  z.string().max(64).default(''),     // post _id, or '' for latest
  pinnedPostId:    z.string().max(64).default(''),     // pin to top of Academy listing
  showNewsletter:  z.boolean().default(true),
  latestLimit:     z.number().int().min(0).max(50).default(5),   // 0 = unlimited
  linkedInUrl:     z.string().max(500).default(''),
  contactNote:     z.string().max(280).default(''),
  siteMarqueeItems: z.array(z.string().max(80)).max(40).default([]),
})
```

`getSiteSettings()` falls back to `DEFAULT_SETTINGS` on DB errors so public pages never 500. The PATCH route upserts with `$set` + `$setOnInsert: { createdAt: now }`.

### 5.6 `analytics_events` — TTL 90 days

Wire format from client (zod `ClientEventSchema`):

```ts
{
  type: 'view'|'engage'|'scroll'|'read'|'share'|'outbound'|'cta'|'search',
  pageKind: 'post'|'listing'|'category'|'other',
  path: string,
  slug?: string,
  sessionId: string,            // client UUID in sessionStorage
  seq?: number,                 // monotonic within session
  referrer?: string,
  utm?: { source?, medium?, campaign?, term?, content? },
  viewport?: { w, h },
  dpr?: number,
  seconds?: number,             // for type='engage'
  depth?: 25|50|75|100,         // for type='scroll'
  platform?: 'x'|'linkedin'|'facebook'|'whatsapp'|'email'|'copy'|'native',  // for type='share'
  href?: string,                // for type='outbound'
  label?: string,               // for type='cta'
}
```

Batch wrapper: `{ events: ClientEvent[] }` (1–50 items).

Server enriches each event into `StoredEvent`:

```ts
type StoredEvent = ClientEvent & {
  visitorId: string,              // 32-hex from sha256(daily_salt|ip|ua), bounded to one UTC day
  fingerprint: string,            // 24-hex from sha256(ip|ua), day-independent
  dayUTC: string,                 // 'yyyy-mm-dd'
  device: 'mobile'|'tablet'|'desktop'|'bot'|'unknown',
  browser: string,                // 'Chrome', 'Safari', 'Edge', ...
  os: string,                     // 'Windows', 'macOS', 'iOS', 'Android', ...
  country: string,                // from X-Vercel-IP-Country / CF-IPCountry
  region: string,
  refHost: string,                // referrer host, '' for direct
  refSource: 'search'|'social'|'direct'|'internal'|'other',
  createdAt: Date,
}
```

### 5.7 `analytics_sessions` — TTL 7 days from lastSeenAt

```ts
type SessionDoc = {
  sessionId: string,              // unique
  visitorId: string,
  fingerprint: string,
  startedAt: Date,
  lastSeenAt: Date,
  pageViews: number,
  reads: number,
  shares: number,
  device, browser, os, country: string,
  entryPath: string,              // first 'view' path
  entryRefHost: string,
  entryRefSource: StoredEvent['refSource'],
  utm?: ClientEvent['utm'],
  lastPath: string,
}
```

Bounce rate = sessions with `pageViews <= 1` / total sessions.

### 5.8 `analytics_daily` — long-lived rollup target

Reserved for an aggregator we don't run yet. The compound unique key `(dayUTC, pageKind, slug)` is in place so the migration can drop in later without changing any query callsites. With 90-day TTL on events and the indexes, the live aggregations stay sub-100ms at blog volumes.

### 5.9 `analytics_salts` — TTL 35 days

One doc per UTC day, holds `{ dayUTC, salt: hex(32), createdAt }`. Visitor hash is `sha256(salt|ip|ua).slice(0,32)`. Salt rotates every UTC day, so visitor IDs reset every 24 hours — cookieless and consent-banner-free.

Concurrency: `findOneAndUpdate({ dayUTC: day }, { $setOnInsert: { salt: fresh } }, { upsert: true, returnDocument: 'after' })` — whoever writes first wins, the loser reads back the winner's salt.

---

## 6. Auth: `lib/auth.ts` + middleware

Single-admin login. No NextAuth, no users table — just env vars + iron-session cookie.

```ts
// lib/auth.ts
import { cookies } from 'next/headers'
import { getIronSession, type SessionOptions } from 'iron-session'

export type AdminSession = { user?: { name: string } }

export function getSessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET
  if (!password || password.length < 32) {
    throw new Error('SESSION_SECRET must be set and at least 32 characters long')
  }
  return {
    password,
    cookieName: 'lawshaoor_admin',    // pick a project-specific name
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    },
  }
}

export async function getSession() {
  const store = await cookies()
  return getIronSession<AdminSession>(store, getSessionOptions())
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME
  const p = process.env.ADMIN_PASSWORD
  if (!u || !p) return false
  return u === username && p === password
}
```

### `middleware.ts`

Gates everything under `/admin/*` and `/api/admin/*` except the login pair. Returns 401 JSON for API paths, 302 to `/admin/login?next=…` for pages.

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'

const PUBLIC_PATHS = new Set<string>(['/admin/login', '/api/admin/login'])

type SessionPayload = { user?: { name: string } }

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next()

  const password = process.env.SESSION_SECRET
  if (!password || password.length < 32) {
    if (pathname.startsWith('/api/'))
      return NextResponse.json({ error: 'Server not configured' }, { status: 503 })
    return NextResponse.redirect(new URL('/admin/login?err=server', req.url))
  }

  const res = NextResponse.next()
  const session = await getIronSession<SessionPayload>(req, res, {
    password,
    cookieName: 'lawshaoor_admin',
  })

  if (!session.user) {
    if (pathname.startsWith('/api/'))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const url = new URL('/admin/login', req.url)
    if (pathname !== '/admin') url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }
  return res
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
```

The `/api/track` ingest is deliberately **outside** `/api/admin/*` so it isn't middleware-gated.

The track endpoint also self-skips the admin via cookie sniff: `/(^|;\s*)lawshaoor_admin=/.test(req.headers.get('cookie') ?? '')`. So previewing the live site while signed in doesn't pollute analytics. (Use your real cookie name.)

### Login flow

- `/admin/login` renders `LoginForm` (client). POSTs `{ username, password }` to `/api/admin/login`.
- On 200, redirects to `next` query param (default `/admin/posts`).
- Server route does `verifyAdminCredentials`, then `session.user = { name }`, then `session.save()`.
- Logout: POST `/api/admin/logout` → `session.destroy()`.

---

## 7. Admin API routes

All under `/api/admin/*`. All gated by middleware. All use `runtime = 'nodejs'` and `dynamic = 'force-dynamic'`.

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/admin/login` | Verify credentials, set session |
| POST | `/api/admin/logout` | Destroy session |
| GET | `/api/admin/posts` | List all posts |
| POST | `/api/admin/posts` | Create draft (body: `{title?}`) — slug = `toSlug(title) + '-' + Date.now().toString(36)` to avoid collisions |
| GET | `/api/admin/posts/[id]` | Get single post |
| PATCH | `/api/admin/posts/[id]` | Update (partial). Recomputes `readMinutes` when `blocks` present. Sets `publishedAt = now` on first publish. Returns 409 on slug collision (Mongo error code 11000). |
| DELETE | `/api/admin/posts/[id]` | Delete |
| GET | `/api/admin/categories` | List with `postCount` aggregation |
| POST | `/api/admin/categories` | Create. Case-insensitive name uniqueness via `$regex: ^name$, $options: i`. Returns `{ id, slug }` |
| PATCH | `/api/admin/categories/[id]` | Update. Renaming cascades into posts. Re-derives slug on rename unless explicit slug supplied |
| DELETE | `/api/admin/categories/[id]` | Blocks if any posts reference it (`{ category: name }` count > 0) |
| POST | `/api/admin/categories/[id]/reassign` | Body: `{ toId?, toName?, deleteSource? }`. `updateMany` posts then optionally delete source |
| GET | `/api/admin/media?filter=all\|images\|video\|audio\|files&limit=N` | List media, sorted by `uploadedAt: -1` |
| DELETE | `/api/admin/media/[id]` | Delete. For Vercel Blob, also calls `del(pathname, { token })`. ImgBB has no delete API — leaves URL orphaned. |
| POST | `/api/admin/upload` | Multipart upload (`file` or `image` field). Images → ImgBB. Non-images → Vercel Blob (private, served via `/api/blob/`). Returns `{ url }` |
| GET | `/api/admin/settings` | Get site settings (merged with defaults) |
| PATCH | `/api/admin/settings` | Partial update, upserts a single `_id: 'site'` doc |
| GET | `/api/admin/analytics/realtime` | Realtime snapshot (active visitors, sessions, per-minute views, top live paths) |

### `/api/admin/upload/route.ts` — dual hosting (image to ImgBB, else Vercel Blob)

```ts
const MAX_IMAGE_BYTES = 32 * 1024 * 1024
const MAX_BLOB_BYTES  = 500 * 1024 * 1024

export async function POST(req: Request) {
  const form = await req.formData()
  const raw = form.get('file') ?? form.get('image')
  if (!(raw instanceof Blob)) return NextResponse.json({ error: 'A "file" or "image" field is required' }, { status: 400 })
  const file = raw as File
  const mime = file.type || 'application/octet-stream'
  if (mime.startsWith('image/')) return uploadImageToImgBB(file, mime)
  return uploadToVercelBlob(file, mime)
}
```

Image path: POST `image` to `https://api.imgbb.com/1/upload?key=…`, extract `data.url ?? data.display_url ?? data.image.url`. Tracked in `media` with `source: 'imgbb'`.

Vercel Blob path: `put(\`posts/\${Date.now()}-\${randomId()}-\${safeName}\`, file, { access: 'private', contentType: mime, token, addRandomSuffix: false })`. Returns `{ url: '/api/blob/' + blob.pathname }`. Tracked in `media` with `source: 'vercel-blob'` and `pathname`.

`sanitizeFilename`: `normalize('NFKD').replace(/[^\w.\-]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').slice(0,120)`.

### `/api/blob/[...path]/route.ts` — same-origin proxy for private Vercel Blob

Streams from Vercel Blob with the token, forwards `If-None-Match` for ETag-based caching, returns `Cache-Control: public, max-age=31536000, immutable`. This keeps Blob files private (token never reaches the browser) while still letting `<img>`, `<video>`, `<a download>` etc. resolve via same-origin URLs.

```ts
const result = await get(pathname, { access: 'private', token, ifNoneMatch })
if (result.statusCode === 304) return new NextResponse(null, { status: 304 })
// stream result.stream with content-type/length/disposition/etag headers
```

---

## 8. BlockNote editor (admin)

### 8.1 Loader (`editor-loader.tsx`)

```tsx
'use client'
import dynamic from 'next/dynamic'
import type { EditorInitial } from './editor-shell'

const EditorShell = dynamic(
  () => import('./editor-shell').then((m) => m.EditorShell),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center text-foreground/55">
        Loading editor…
      </div>
    ),
  }
)

export function EditorLoader(props: { id: string; initial: EditorInitial }) {
  return <EditorShell {...props} />
}
```

### 8.2 Server page (`posts/[id]/edit/page.tsx`)

```tsx
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[0-9a-fA-F]{24}$/.test(id)) notFound()

  const col = await postsCollection()
  const doc = await col.findOne({ _id: new ObjectId(id) })
  if (!doc) notFound()

  const initial = {
    _id: id,
    title: doc.title ?? '',
    slug: doc.slug ?? '',
    excerpt: doc.excerpt ?? '',
    category: doc.category ?? 'Opinion',
    thumbnailUrl: doc.thumbnailUrl ?? '',
    blocks: Array.isArray(doc.blocks) && doc.blocks.length > 0 ? doc.blocks : defaultBlocks(),
    status: doc.status ?? 'draft',
    seo: doc.seo ?? { title: '', description: '', ogImage: '' },
  }
  return <EditorLoader id={id} initial={initial} />
}
```

### 8.3 Editor shell — key patterns

- CSS imports at the top: `'@blocknote/core/fonts/inter.css'`, `'@blocknote/mantine/style.css'`, `'./editor.css'`.
- Sanitize the stored blocks BEFORE handing to BlockNote: `const safeInitial = useMemo(() => sanitizeBlocks(initial.blocks) as PartialBlock[], [initial.blocks])`.
- Create the editor with `useCreateBlockNote({ uploadFile })` — do NOT pass `initialContent`. Load content in a `useEffect` with try/catch so malformed blocks don't crash the editor:

```ts
const editor = useCreateBlockNote({
  uploadFile: async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    if (!res.ok) throw new Error((await res.json())?.error || `Upload failed (${res.status})`)
    const data = await res.json() as { url: string }
    return data.url
  },
})

const loadedRef = useRef(false)
useEffect(() => {
  if (!editor || loadedRef.current) return
  loadedRef.current = true
  if (safeInitial.length === 0) return
  try { editor.replaceBlocks(editor.document, safeInitial) }
  catch (err) { console.error('[editor] Failed to load blocks; starting empty.', err) }
}, [editor, safeInitial])
```

- Track the focused block to drive the right-side properties panel:

```ts
const [focusedBlock, setFocusedBlock] = useState<Block | null>(null)
useEffect(() => {
  if (!editor) return
  const sync = () => { try { setFocusedBlock(editor.getTextCursorPosition().block as Block) } catch {} }
  sync()
  const offSelect = (editor as any).onSelectionChange?.(sync)
  const offChange = editor.onChange(sync)
  return () => { offSelect?.(); offChange?.() }
}, [editor])
```

- Update focused block props: merge with existing props, call `editor.updateBlock(focusedBlock, { props: merged })`, then re-read cursor position to refresh the panel.

- Render: wrap `<BlockNoteView editor={editor} theme={theme} />` in `max-w-3xl mx-auto py-10 px-6`. Sync theme via `useTheme().resolvedTheme`.

- Save handler PATCHes `/api/admin/posts/{id}` with `{ title, slug, excerpt, category, thumbnailUrl, blocks: editor.document, seo, status }`. Uses an AbortController to cancel in-flight saves when a new save starts. On 200, calls `router.refresh()`.

### 8.4 `editor.css` — tame BlockNote heading sizes

```css
.bn-container .bn-editor { padding-inline: 0 !important; }
.bn-container .bn-block-content[data-content-type='heading'] h1 { font-size: 2.25rem; letter-spacing: -0.02em; line-height: 1.1; }
.bn-container .bn-block-content[data-content-type='heading'] h2 { font-size: 1.75rem; letter-spacing: -0.015em; line-height: 1.15; }
.bn-container .bn-block-content[data-content-type='heading'] h3 { font-size: 1.35rem; letter-spacing: -0.01em; line-height: 1.2; }
```

### 8.5 Top bar (`top-bar.tsx`)

- Back link to `/admin/posts`
- Status pill: "Live" if published (with `dot-live` indicator), "Draft" otherwise
- Title preview
- Save indicator (`Saved 14:32` or error text)
- "View" link (opens public post in new tab) when published
- Save draft button
- Publish / Unpublish button (toggle on `meta.status === 'published'`)

### 8.6 Properties panel (`properties-panel.tsx`)

Right column. Two tabs: **Block** (selected block's properties) and **Post** (post-level metadata).

**Block tab** — shown depending on focused block type:
- "Block type" (read-only)
- Heading level (1/2/3) — for `heading`
- Alignment (left/center/right/justify) — for paragraph/heading/lists/quote
- Text color + Background color — color grid (default, gray, brown, red, orange, yellow, green, blue, purple, pink) — not for media blocks
- For media blocks, show a small helper: "Captions and resizing are managed inside the editor canvas itself."

**Post tab** — fields:
- Title
- Slug — auto-generated from title, with a lock/unlock toggle. `liveSlug(raw)` strips non-`[a-z0-9-]`, collapses whitespace to `-`, dedupes runs. `slugAuto` starts true if `meta.slug === toSlug(meta.title)`.
- Excerpt (1–2 sentences; default SEO description fallback)
- Category — `<select>` populated from `/api/admin/categories`, with the current category always included even if it was deleted
- Thumbnail — `ImagePicker` that POSTs to `/api/admin/upload` and pastes URL inline
- SEO meta title, meta description, OG image (1200×630)

Each field has a help blurb so writers know what the field does. The `Field` component is a label + content + help-text wrapper.

---

## 9. Public blog ("Academy")

### 9.1 Listing — `app/lawshaoor-academy/page.tsx`

- Server component. `dynamic = 'force-dynamic'`.
- Fetches `posts.find({ status: 'published' }).sort({ publishedAt: -1, updatedAt: -1 }).limit(50)`.
- Reads `settings.featuredPostId` and `settings.pinnedPostId` to control the featured / pinned slots.
- Resolves category illustration via `getAllCategories()` → `buildIllustrationKeyMap()` → `getIllustration(key)`.
- Editorial mixed-size grid layout.

### 9.2 Single post — `app/lawshaoor-academy/[slug]/page.tsx`

- Server component.
- `getPostBySlug` does `posts.findOne({ slug, status: 'published' })`. 404 if not found.
- Renders BlockNote JSON to HTML server-side:

  ```ts
  import { ServerBlockNoteEditor } from '@blocknote/server-util'
  const editor = ServerBlockNoteEditor.create()
  const html = await editor.blocksToHTMLLossy(post.blocks as never)
  // dangerouslySetInnerHTML into <article className="bn-rendered">
  ```

- "Related" section: 3 posts from the same category, then fall back to most-recent published.
- `generateMetadata` builds OpenGraph + Twitter cards from `post.seo.title || post.title`, `post.seo.description || post.excerpt`, `post.seo.ogImage || post.thumbnailUrl`.
- Uses `<ShareButtons title={post.title} excerpt={post.excerpt} />` twice (hero + end of article).
- The `bn-rendered` CSS class in `globals.css` is what styles the rendered HTML (long-form prose).

### 9.3 Category page — `app/lawshaoor-academy/c/[category]/page.tsx`

- Server component.
- `getCategoryBySlug(slug)` then `getPostsInCategory(category.name)` (`posts.find({ status:'published', category: name }).sort({ publishedAt:-1 }).limit(200)`).
- 404 if category doesn't exist.

### 9.4 BlockNote → HTML rendering & `.bn-rendered` styles

The post page renders the editor's JSON server-side into HTML, then injects via `dangerouslySetInnerHTML`. All of the long-form prose styling (headings, paragraphs, blockquotes, lists, images, code, tables) is keyed off `.bn-rendered` in `globals.css`.

---

## 10. Analytics

### 10.1 Tracker mount (root layout)

```tsx
// app/layout.tsx
<body>
  <ThemeProvider ...>{children}</ThemeProvider>
  <SiteTracker />
</body>
```

`SiteTracker` classifies the pathname (`/lawshaoor-academy/c/{slug}` → category, `/lawshaoor-academy/{slug}` → post, `/lawshaoor-academy` → listing, `/admin/*` → skipped, anything else → 'other') and mounts `<Tracker key={pathname} pageKind=… slug=… />`. The `key` forces re-mount on route change so the inner `viewFiredFor` guard reruns.

### 10.2 Client tracker (`components/analytics/tracker.tsx`)

Renders nothing. On mount:
- Reads / creates a `sessionId` from `sessionStorage['ls_sess']` (UUID).
- Emits a `view` event with referrer + parsed UTM params + viewport + DPR.
- Sets up an activity loop: any mouse/key/touch/scroll event refreshes `lastActivity`. A 1-second ticker increments `activeSeconds` while `visibilityState === 'visible'` and `Date.now() - lastActivity < 30s`. A 15-second `engage` heartbeat emits `{ seconds: activeSeconds }` and resets.
- Scroll-depth: emits 25/50/75/100 milestones once each.
- Read event: fires once when `scrollPct >= 95` OR `totalActiveSeconds >= max(30, readMinutes*60)`.
- Outbound link clicks: capture `click` events on the document, look for the nearest `<a>` with a host different from `window.location.host`, emit `{ type:'outbound', href }`.
- Flush triggers:
  - Queue ≥ 8 events → immediate flush
  - 5-second timer when queue non-empty
  - `visibilitychange → hidden` → `sendBeacon`
  - `pagehide` → `sendBeacon`
  - Component unmount → `fetch` with `keepalive: true`

`sendBeacon` is preferred for terminal events because it survives navigation. Fall through to `fetch({ keepalive: true })` if the beacon is refused (>~64KB or queue full).

Public side-channel `track(type, ctx)` is exported from the same file. ShareButtons, CTAs, etc. import it to push events into the same queue.

### 10.3 Ingest (`/api/track/route.ts` + `lib/server/analytics.ts`)

Pipeline on POST:
1. Parse JSON; reject silently with 204 if not JSON (covers `sendBeacon` with text/plain).
2. `ClientBatchSchema.safeParse` — drop the whole batch on schema mismatch.
3. UA-based bot check via a curated regex (`bot|crawl|spider|slurp|mediapartners|preview|monitor|headless|chrome-lighthouse|googleweblight|pingdom|...|ahrefs|semrush|...`). Reject batch if matched.
4. Admin self-skip: if `Cookie` header contains the session cookie name, drop.
5. Extract IP from `x-forwarded-for` first hop (then `cf-connecting-ip`, `x-real-ip`, `x-vercel-forwarded-for`).
6. Extract country from `x-vercel-ip-country` / `cf-ipcountry` / `x-country`.
7. Parse device (regex-based: iPad/tablet first, Android+!Mobile = tablet, Mobi/iPhone = mobile, else desktop), browser (Edge before Chrome, Safari needs `Version/`), OS.
8. Hash visitor: `getDailySalt()` (find-or-create per UTC day in `analytics_salts`), then `sha256(salt|ip|ua).slice(0,32)`.
9. Day-independent fingerprint: `sha256(ip|ua).slice(0,24)` — useful for bot floods that span midnight.
10. Classify referrer: parse the URL, compare host to a SEARCH_HOSTS / SOCIAL_HOSTS set (plus a regex for google.tld variations), 'internal' if equal to selfHost.
11. Build `StoredEvent[]` and `insertMany`.
12. Upsert session ledger: find first `view` (or first event) for entry metadata; `$setOnInsert` the start-of-session fields, `$set: { lastSeenAt, lastPath }`, `$inc: { pageViews, reads, shares }`.

Return `204 No Content` whether accepted or not — the client never reads the response.

### 10.4 Queries (`lib/server/analytics-queries.ts`)

All read-only, all `'server-only'`. Take a `rangeDays` number (1/7/30/90), return JSON-serializable shapes for React server components.

- `getOverview(days)` — totals, time series, top posts (joined with `posts` for titles), top paths (with friendly labels: `/` → 'Home', known marketing routes hand-mapped, post-paths resolved via the `posts` collection, generic paths titlecased from last segment), top categories, referrer hosts, referrer source, device, country, region, browser, OS, plus a retention pass (new vs returning) classified from `(fingerprint, day)` deduped rows.

- `getPostAnalytics(slug, days)` — single-post analytics with scroll funnel and session-based bounce/pages-per-session via `entryPath` regex match.

- `getAllPostsAnalytics(days)` — list every post (so zero-traffic ones still show) with view/uniques/reads/shares/engagedSeconds joined in.

- `getDashboardSummary()` — small `getOverview(7)` projection for the dashboard home.

- `getRealtime()` — last 30 minutes. Pulls a tail of `find({ createdAt: { $gte: since } })`, builds active visitor/session sets, top paths. Aggregates per-minute view counts via `$dateTrunc: { unit: 'minute' }`. Returns a 30-slot bar array ending at the current minute (zero-fill).

All run aggregations in parallel via `Promise.all` and pass `{ allowDiskUse: true }`.

`parseRange(s)` sanitizes the `?range=` query param into one of `[1, 7, 30, 90]` (default 30).

### 10.5 Charts (`components/analytics/charts.tsx`)

Recharts wrappers, themed via CSS custom properties (`var(--primary)`, `var(--chart-2)`, etc.). Components: `TrendChart`, `Sparkline`, `BarList`, `DonutBreakdown`, `RetentionChart`, `RealtimeBars`.

### 10.6 Realtime widget (`components/analytics/realtime-widget.tsx`)

Polls `/api/admin/analytics/realtime` every 15s while tab is foregrounded (`document.visibilityState === 'visible'`), otherwise every 60s. Refreshes immediately on visibility change. Renders active visitors / sessions / views-last-30-min, the per-minute bars, and top live pages.

### 10.7 Page kind classification

`SiteTracker` uses these regexes (substitute your own blog base path):

```ts
if (clean === '/lawshaoor-academy' || clean === '/lawshaoor-academy/') return { kind: 'listing' }
const cat  = clean.match(/^\/lawshaoor-academy\/c\/([^\/]+)\/?$/)
if (cat)  return { kind: 'category', slug: cat[1] }
const post = clean.match(/^\/lawshaoor-academy\/([^\/]+)\/?$/)
if (post) return { kind: 'post', slug: post[1] }
return { kind: 'other' }
```

When porting, swap `lawshaoor-academy` for the new project's blog path.

---

## 11. Admin sidebar layout

```
Overview
  Dashboard      /admin                (exact match)
  Analytics      /admin/analytics
Content
  Posts          /admin/posts
  Media          /admin/media
  Categories     /admin/categories
Configuration
  Site settings  /admin/settings/site
  General settings /admin/settings/general
Help
  Guide          /admin/guide          (optional in-app docs)
```

The `(dashboard)` route group does NOT show up in URLs (`/admin/posts` still serves at `/admin/posts`). The dashboard layout reads `getSession().user.name` and passes it to `<Sidebar user={name} />`. Logout button POSTs `/api/admin/logout` then `router.push('/admin/login')` + `router.refresh()`.

Active link styling: exact match for the dashboard root, prefix match (`pathname.startsWith(href + '/')`) for others. Active state uses `bg-primary/15` + `border-l-2 border-primary`.

---

## 12. Theming (port these design tokens or replace)

Tailwind v4 with `@theme inline` block in `app/globals.css`. All colors authored in `oklch()`. Always use semantic classes (`bg-primary`, `text-foreground`, `border-foreground/15`) — not hex.

Custom utility classes to keep (used by the admin and editor):

- `display-xl/lg/md/sm/hero` — display headings
- `font-display`, `font-heading`
- `eyebrow`, `eyebrow-sm` — small uppercase tracked labels
- `index-chip` — small primary-tinted chip
- `tag`, `tag-primary` — pills
- `btn-primary`, `btn-ghost` — button styles
- `link-line` — underlined link
- `surface`, `lift-card` — card surfaces with hover lift
- `field` — login form input wrapper
- `dot-live` — pulsing live indicator
- `bn-rendered` — long-form prose styles for the rendered post HTML

Custom theme provider (`components/theme-provider.tsx`) exports:
- `<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>` — wraps app
- `<ThemeScript defaultTheme="light" attribute="class" />` — render in `<head>` before hydration to set the class without a flash
- `useTheme()` returns `{ theme, setTheme, resolvedTheme, systemTheme, themes }`

Fonts via `next/font` (in `app/layout.tsx`):
- Display: any geometric grotesk (project uses Syne) → `--font-display`
- Heading/body: Space Grotesk → `--font-heading`
- Sans: Geist → `--font-sans`
- Mono: Geist Mono → `--font-mono` (eyebrows, chips, metadata)

---

## 13. Illustrations registry (optional but recommended)

`components/illustrations/index.tsx` is a library of SVG primitives (CirclesInCircumference, OrbitRings, GridDots, SquareCascade, VectorNode, HexagonalCascade, TesseractCube, StackedCubes, WaveBars, PulseRings, BigCircles, SegmentedRing). Each accepts `{ className, uid }` and renders an SVG.

`components/illustrations/registry.tsx` exports `ILLUSTRATIONS`, `getIllustration(key)`, `illustrationLabel(key)`. The registry is what the category UI uses — admins pick an `illustrationKey` from this set when editing a category, and the public Academy renders the matching SVG next to category posts.

`DEFAULT_ILLUSTRATION = CirclesInCircumference` — fallback when a key is unknown.

If you don't need illustrations, skip the whole registry and remove the `illustrationKey` field from `CategoryDoc`.

---

## 14. Public ShareButtons component

Renders X / LinkedIn / Facebook / WhatsApp / Email / Copy buttons, plus a "Open share menu" button on browsers that support `navigator.share`. Every click also calls `track('share', { pageKind, slug, platform })` so shares show up in the analytics dashboard. The pageKind/slug are inferred from `usePathname()` with the same regex used in `SiteTracker`.

The "Copy" button shows a 1.8s "Copied!" confirmation. X and WhatsApp icons are inline SVGs because lucide-react doesn't carry them.

---

## 15. Step-by-step port checklist

When dropping this system into a new Next.js 16 project:

1. **Install deps.** Use pnpm. Copy the `pnpm.overrides.prosemirror-model = "1.24.1"` block into the new `package.json`. Install Mantine peers explicitly.

2. **Add `next.config.mjs`** with `serverExternalPackages: ['@blocknote/server-util','jsdom','mongodb']`. Keep `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`.

3. **Set env vars** in `.env.local`: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET` (≥32 chars), `MONGODB_URI`, `IMGBB_API_KEY`, optionally `BLOB_READ_WRITE_TOKEN`.

4. **Create the lib layer**: copy `lib/mongo.ts`, `lib/auth.ts`, `lib/models/{post,category,media,settings,analytics}.ts`, `lib/server/{analytics,analytics-queries,categories,settings}.ts`. Rename `cookieName: 'lawshaoor_admin'` and the admin self-skip regex to a project-specific cookie name.

5. **Add middleware.ts** at the project root with the matcher `['/admin/:path*', '/api/admin/:path*']`. Update the cookie name.

6. **Build the admin API routes** under `app/api/admin/*` exactly as listed in section 7. All Node runtime, all `dynamic = 'force-dynamic'`.

7. **Build `/api/track`** (public ingest) and `/api/blob/[...path]` (private Blob proxy). Both Node runtime.

8. **Custom theme provider**: copy `components/theme-provider.tsx` and the `ThemeScript` to `<head>` in `app/layout.tsx`. Do NOT install `next-themes`.

9. **Tailwind v4 globals**: copy `app/globals.css` (the `@theme inline` block, semantic CSS variables, utility classes, `.bn-rendered` prose styles) and tailor the OKLCH values to the new project's brand.

10. **Admin shell**: create `app/admin/(dashboard)/layout.tsx` + `_components/sidebar.tsx`. Adjust nav items to match the routes you ship.

11. **Editor**: copy `app/admin/(dashboard)/posts/[id]/edit/_components/{editor-loader,editor-shell,top-bar,properties-panel,editor.css}.tsx`. Wire `useCreateBlockNote({ uploadFile })` to your `/api/admin/upload` route. **Always** sanitize via `sanitizeBlocks` before `editor.replaceBlocks`.

12. **Public blog pages**: `app/<blog-path>/page.tsx` (listing), `app/<blog-path>/[slug]/page.tsx` (post with `ServerBlockNoteEditor.blocksToHTMLLossy` → `bn-rendered`), `app/<blog-path>/c/[category]/page.tsx` (category listing). Update SiteTracker regexes to match the new blog path.

13. **Analytics tracker**: copy `components/analytics/{tracker,site-tracker,charts,format,range-selector,stat-card,realtime-widget}.tsx`. Mount `<SiteTracker />` once in the root layout. Update the admin self-skip cookie name in `tracker.tsx` regex (if it has one) and in `/api/track`.

14. **Share buttons**: copy `components/share-buttons.tsx`. Update the pathname regexes for the new blog base path.

15. **MongoDB Atlas**: whitelist `0.0.0.0/0` for network access. Include DB name in the URI path. Indexes auto-create on first connection.

16. **Deploy**: set env vars on Vercel for Production AND Preview. Redeploy after any env change.

---

## 16. Code idioms used throughout

- **ObjectId validation**: `/^[0-9a-fA-F]{24}$/.test(id)` — used in every `[id]` route before constructing `new ObjectId(id)`.
- **Validated PATCH**: `Schema.partial().safeParse(body)` so any subset of fields can be updated.
- **Duplicate-key handling**: `try { await col.updateOne(...) } catch (err) { if (err.code === 11000) return 409 'Slug is already in use'; throw }`.
- **Publish-once semantics**: on PATCH with `status: 'published'`, only set `publishedAt = now` if the existing doc doesn't already have one.
- **Force-dynamic everywhere** under `/admin` and the public blog — these read live from Mongo and have no useful cache key.
- **Server-side import guards**: `import 'server-only'` at the top of every server-only module in `lib/server/`.
- **Hover-to-load**: long fetches happen in server components (`page.tsx`), and the data passes to a `'use client'` panel for interactivity. The "client component receives `initial` prop, optionally re-fetches" pattern is everywhere (posts table, categories, media).
- **Field component**: every admin form uses the `Field` wrapper with `label` + content + `help` text. Help text is one-sentence and explains where the field shows up on the public site.

---

## 17. What this system deliberately does NOT have

- No NextAuth / OAuth — single admin via env vars is enough.
- No user comments, ratings, likes, or reactions on posts.
- No tags (only categories — one per post).
- No drafts-with-history or revisions.
- No multi-author / authorship metadata.
- No scheduled publishing.
- No RSS feed (easy to add — read `posts.find({ status: 'published' })`).
- No sitemap (also easy — same query).
- No real-time WebSocket realtime — the dashboard polls.
- No A/B testing, no feature flags, no consent banner.
- No Mongoose / ORM — direct driver, validated by zod at the API boundary.
- No analytics pre-aggregator — the live queries hit indexes and stay sub-100ms at blog volumes. `analytics_daily` is reserved for when this stops being true.

These are intentional limits — the system is built for a single-admin editorial site that wants a polished writing experience and honest analytics. Don't add the missing features unless someone actually needs them.

---

## 18. Files to study when porting

The single most important files, in priority order:

1. `lib/mongo.ts` — the connection + index + seed strategy is the load-bearing foundation.
2. `lib/models/post.ts` — `sanitizeBlocks` and `defaultBlocks` are why the editor doesn't crash on weird stored data.
3. `app/admin/(dashboard)/posts/[id]/edit/_components/editor-shell.tsx` — the orchestration glue.
4. `app/admin/(dashboard)/posts/[id]/edit/_components/properties-panel.tsx` — the per-block + per-post field model.
5. `lib/server/analytics.ts` — bot filter, daily salt, visitor hashing, session ledger.
6. `lib/server/analytics-queries.ts` — every aggregation that powers the dashboard.
7. `app/api/admin/upload/route.ts` — ImgBB-or-Blob routing pattern.
8. `components/analytics/tracker.tsx` — client-side instrumentation, beacon flush, activity loop.
9. `middleware.ts` — auth gating.
10. `next.config.mjs` + `package.json` (pnpm overrides) — the build won't work without these.

When something breaks, the answer is almost always in one of those ten files.
