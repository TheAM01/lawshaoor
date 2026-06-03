# Client Revision — 31 May 2026

Changes made in response to the client's feedback batch (see `lib/client-req.txt`).
Build verified green (`pnpm build`). Dev server confirmed running.

---

## 1. Look & feel

### Color system → white / black / one signature blue
**File:** `app/globals.css`

- Rewrote the entire `:root` (light) and `.dark` token blocks.
- Old cream + honey-lemon + warm-cocoa palette replaced with:
  - `--background` → pure white `oklch(1 0 0)`
  - `--background-alt` / `--background-deep` → light-grey steps (section segregation)
  - `--foreground` → near-black ink `oklch(0.17 0 0)`
  - `--primary` / `--accent` → one deep professional **blue** `oklch(0.48 0.17 256)`
  - Gradient anchors (`--grad-*`) collapsed to shades of the same blue, so the
    text-gradient and rules are mono-blue (no multicolor).
- Dark mode reworked to clean black / white / lighter-blue.
- Fixed two **hardcoded brown** values in the texture SVGs
  (`.bg-fixed-mist`, `.bg-fixed-lavender`) → neutral grey so they read monochrome on white.

> To change the signature colour: edit `--primary` (and the matching `--grad-*`) in `globals.css`.

### Font → Syne replaced with Archivo ("too fancy" fix)
**Files:** `app/layout.tsx`, `app/globals.css`

- Swapped the `next/font/google` import `Syne` → `Archivo` (clean corporate grotesk).
- Updated the `--font-display` variable + the `@theme inline` reference.

> To change the display font: swap the import in `layout.tsx` and the `--font-display` line.

---

## 2. Team — cards + individual profile pages

- **Removed Sifatullah** from the team.
- **New shared data module:** `app/people/team.ts` — single source of truth for both
  the grid and the profile pages. Added `slug`, `location`, `email`, optional `photo`
  per person. (Emails/locations are **placeholders** — flagged in comments.)
- **`app/people/page.tsx` rebuilt** — long-scroll bios replaced with a **card grid**.
  Each card shows illustration/photo, name, designation, location, email, and links
  through to the full profile.
- **New route `app/people/[slug]/page.tsx`** — individual profile page (server component
  with per-person SEO metadata + `generateStaticParams`). Standard template: photo,
  contact (mailto), highlights, full bio, breadcrumbs, CTA.

---

## 3. Navigation & new pages

### Navbar (`components/navbar.tsx`)
- Added a **"Knowledge" dropdown** → Academy / Magazine / Seminars
  (hover + click on desktop, nested expansion in the mobile hamburger drawer).
- Added a top-level **Careers** link.

### New pages
| Route | File | Purpose |
|---|---|---|
| `/careers` | `app/careers/page.tsx` | Join us / Careers — why join, open roles, application CTA |
| `/lawshaoor-academy/magazine` | `app/lawshaoor-academy/magazine/page.tsx` | Digital magazine/review, **Substack** subscribe CTA |
| `/lawshaoor-academy/seminars` | `app/lawshaoor-academy/seminars/page.tsx` | Events & training |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy (boilerplate) |
| `/disclaimer` | `app/disclaimer/page.tsx` | Disclaimer (boilerplate) |

### New shared components
- **`components/breadcrumbs.tsx`** — `Home > … > Current Page` trail with
  BreadcrumbList JSON-LD for SEO.
- **`components/legal-page.tsx`** — shared shell for the Privacy/Disclaimer pages.

### Breadcrumbs added to
People, Careers, Magazine, Seminars, Privacy, Disclaimer, Contact, Practice Areas,
Our Story, Academy.

---

## 4. Content & footer

### "Partnership" → "association" wording (M.B. KEMP)
Changed "strategic partnership" / "in partnership with" / "Strategic partner" to
**"strategic association" / "associated firm"** across:
- `components/footer.tsx`
- `app/layout.tsx` (metadata + OpenGraph descriptions)
- `app/_home-content.tsx` (hero meta, section heading + comment)
- `app/our-story/page.tsx` (multiple spots)
- `app/people/page.tsx`
- `app/practice-areas/page.tsx`
- `app/contact/page.tsx`

### Homepage (`app/_home-content.tsx`)
- Hero now leads with the **international alliance** (Islamabad · UAE · DIFC · ADGM),
  not just Pakistan; intro paragraph reworded to include the cross-border alliance.
- **New cross-border capability block** — Pakistan / UAE / DIFC / ADGM capability
  strip added above the M.B. KEMP offices grid.

### Footer (`components/footer.tsx`)
- **Social icons** added: LinkedIn, Substack (custom SVG), Instagram, Email.
- "Navigate" column now includes **Careers**; new **Knowledge** column
  (Academy / Magazine / Seminars).
- Bottom bar adds **Privacy** + **Disclaimer** links; copyright retained.
- Removed the unused `OrbitRings` import.

---

## ⚠️ Placeholders to replace before going live

- **Team emails & locations** — `app/people/team.ts` (currently `name@lawshaoor.com`, "Islamabad, Pakistan").
- **Team headshots** — set `photo:` per person; falls back to illustrations until then.
- **Social / contact URLs** — footer (`SOCIALS`), `info@` / `careers@` addresses.
- **Substack URL** — `https://lawshaoor.substack.com` in the Magazine page.
- **Legal text** — Privacy & Disclaimer are solid boilerplate; have counsel confirm wording.

## Decisions made (trivially reversible)
- **Signature colour = blue** — one `--primary` value in `globals.css`.
- **Display font = Archivo** — one import swap in `layout.tsx`.

---

## Client requests NOT yet actioned / needing input
- **SEO "most-searched terms"** (msg 13) — added sensible `keywords` to new pages, but
  real keyword research / sitewide title tuning still pending.
- **Magazine/Substack as a real publication** (msgs 2–6) — UI + subscribe links are in;
  whether the Substack itself exists is a business decision.
- **"Copyright everything"** (msg 7) — footer © + IP clause in Disclaimer cover this;
  no per-article notice added yet.
