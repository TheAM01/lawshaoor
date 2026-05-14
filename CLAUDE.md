# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # next dev — local dev server
pnpm build    # next build — production build
pnpm start    # next start — serve the production build
pnpm lint     # eslint .
```

There is no test suite. `package-lock.json` and `pnpm-lock.yaml` are both checked in — pnpm is the source of truth (use it for installs).

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`. The build will *not* fail on TS errors, so do not assume a green `pnpm build` means types are clean — run `tsc --noEmit` if you need a real type check.

## Architecture

Marketing site for "LawShaoor" (a fictional corporate law firm) built on **Next.js 16 App Router + React 19 + Tailwind CSS v4 + shadcn/ui**. No backend, no database, no API routes — pages are statically composed React with content hardcoded inline.

### Routing (App Router)
Every page lives directly under `app/<route>/page.tsx`. Pages are typically client components (`'use client'`) because of theme toggle / interactive UI:
- `app/page.tsx` — home (hero, expertise, why-us, industries, process, CTA)
- `app/services`, `app/practice-areas`, `app/about`, `app/contact`
- `app/insights/page.tsx` (listing) + `app/insights/[id]/page.tsx` (dynamic article)

`app/layout.tsx` wires fonts (Playfair Display for headings, Poppins for body — exposed via the `--font-heading` / `--font-body` CSS vars), wraps everything in `ThemeProvider` (next-themes, **defaults to dark**), and gates `@vercel/analytics` to production only.

### Theming & styling
- **Tailwind v4** with the `@theme inline` block in `app/globals.css`. There is no `tailwind.config.*`; design tokens are CSS variables defined in `:root` (light) and `.dark` (dark) — colors are authored in `oklch()`. Always reference tokens via Tailwind utilities (`bg-primary`, `text-foreground`, etc.), not hardcoded hex.
- Custom utility classes `btn-primary`, `btn-secondary`, `section-lg`, plus `texture-grain`/`texture-light`/`texture-dark`/`texture-accent` for SVG noise overlays — all defined in `globals.css`.
- Design intent (per `PROJECT_GUIDE.md`): sleek, minimal, professional + edgy. Brand voice in copy is deliberately blunt ("Law That Actually Works", "No bullshit") — match that tone when editing copy.

### Components
- `components/navbar.tsx`, `components/footer.tsx` — site chrome, imported on each page (no shared layout wrapper beyond `app/layout.tsx`).
- `components/theme-provider.tsx` — thin wrapper around `next-themes`.
- `components/ui/*` — shadcn/ui (style: `new-york`, base color: `neutral`, RSC enabled). Add new shadcn components with `npx shadcn@latest add <name>`; config is in `components.json`.

### Path aliases (from `tsconfig.json` + `components.json`)
- `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils` (the `cn()` helper), `@/hooks`
- `cn()` = `twMerge(clsx(...))` — use it whenever conditionally composing className strings.

## Conventions

- **Adding a route**: create `app/<route>/page.tsx`, import `Navbar` and `Footer` directly (no shared layout slot), follow the section / `max-w-7xl mx-auto` / `texture-grain` pattern used on existing pages.
- **CTAs**: per `PROJECT_GUIDE.md`, every page should have a primary CTA pointing to `/contact` ("Schedule Consultation").
- **Content is hardcoded** in TSX — services, team, insight articles. No CMS, no MDX, no fetch. When asked to "add a service" or "update a team member", edit the relevant `page.tsx` array directly.
- This project was scaffolded with v0.app (`generator: 'v0.app'` in metadata, `.v0-trash/` in `.gitignore`). Treat any `__v0_*` files as sandbox artifacts — they're gitignored and not for production.
