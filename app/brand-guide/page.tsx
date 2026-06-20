'use client'

/**
 * LawShaoor Chambers — Brand & Identity Guide
 *
 * An identity / stationery kit aimed at a graphic designer working on logos,
 * letterheads and print collateral (NOT the website). It documents the
 * wordmark system, print-ready colour values (HEX / RGB / CMYK), typography
 * with licensing, brand graphic elements and application examples.
 *
 * Export:  open /brand-guide → top-right "Save as PDF" → in the print dialog
 *          set Destination = "Save as PDF" and turn ON "Background graphics".
 * Edit:    this file is the single source — values here drive the guide.
 */

import {
  CirclesInCircumference,
  HexagonalCascade,
  TesseractCube,
  StackedCubes,
  OrbitRings,
  VectorNode,
} from '@/components/illustrations'

const INK = '#1A1F2B'
const PAPER = '#FCFAF5'
const AZURE = '#22469B'
const GOLD = '#CEAC68'

type Swatch = {
  name: string
  role: string
  hex: string
  rgb: string
  cmyk: string
  on: 'light' | 'dark'
}

const CORE: Swatch[] = [
  { name: 'Azure', role: 'Primary brand colour — logo, headings, key accents', hex: '#22469B', rgb: '34 · 70 · 155', cmyk: '78 · 55 · 0 · 39', on: 'dark' },
  { name: 'Azure Light', role: 'Secondary accent / tints', hex: '#3870D4', rgb: '56 · 112 · 212', cmyk: '74 · 47 · 0 · 17', on: 'dark' },
  { name: 'Ink', role: 'Text, mono logo, dark backgrounds', hex: '#1A1F2B', rgb: '26 · 31 · 43', cmyk: '40 · 28 · 0 · 83', on: 'dark' },
  { name: 'Gold', role: 'Tiny accents only — the brand “.” mark, fine rules', hex: '#CEAC68', rgb: '206 · 172 · 104', cmyk: '0 · 17 · 50 · 19', on: 'dark' },
]

const NEUTRALS: Swatch[] = [
  { name: 'Paper', role: 'Primary background — warm off-white, not pure white', hex: '#FCFAF5', rgb: '252 · 250 · 245', cmyk: '0 · 1 · 3 · 1', on: 'light' },
  { name: 'Paper Alt', role: 'Panels, secondary fills', hex: '#F7F4EF', rgb: '247 · 244 · 239', cmyk: '0 · 1 · 3 · 3', on: 'light' },
  { name: 'Paper Deep', role: 'Quiet zones, footers', hex: '#F1EEE7', rgb: '241 · 238 · 231', cmyk: '0 · 1 · 4 · 5', on: 'light' },
]

const ELEMENTS = [
  { C: CirclesInCircumference, key: 'circles-in-circumference', label: 'Circles' },
  { C: HexagonalCascade, key: 'hexagonal-cascade', label: 'Hexagons' },
  { C: TesseractCube, key: 'tesseract-cube', label: 'Tesseract' },
  { C: StackedCubes, key: 'stacked-cubes', label: 'Stacked cubes' },
  { C: OrbitRings, key: 'orbit-rings', label: 'Orbit rings' },
  { C: VectorNode, key: 'vector-node', label: 'Vector node' },
]

/* ── Reusable wordmark, so every lockup stays identical ── */
function Wordmark({ color, dot, className = '' }: { color: string; dot: string; className?: string }) {
  return (
    <span className={`font-display font-medium tracking-[-0.02em] ${className}`} style={{ color }}>
      LawShaoor<span style={{ color: dot }}>.</span>
    </span>
  )
}

function SwatchCard({ s }: { s: Swatch }) {
  const label = s.on === 'dark' ? PAPER : INK
  return (
    <div className="border border-foreground/15 flex flex-col print-avoid-break">
      <div className="h-28 w-full flex items-end p-3" style={{ background: s.hex }}>
        <span className="font-display font-semibold text-lg" style={{ color: label }}>
          {s.name}
        </span>
      </div>
      <div className="p-4 space-y-2" style={{ background: PAPER }}>
        <p className="text-xs leading-snug" style={{ color: INK + 'b3' }}>{s.role}</p>
        <dl className="grid grid-cols-[3.2rem_1fr] gap-x-3 gap-y-1 font-mono text-[0.68rem]" style={{ color: INK }}>
          <dt className="opacity-50">HEX</dt><dd>{s.hex}</dd>
          <dt className="opacity-50">RGB</dt><dd>{s.rgb}</dd>
          <dt className="opacity-50">CMYK</dt><dd>{s.cmyk}</dd>
        </dl>
      </div>
    </div>
  )
}

function Section({ index, title, intro, children, breakBefore }: {
  index: string; title: string; intro?: string; children: React.ReactNode; breakBefore?: boolean
}) {
  return (
    <section className={`mb-20 ${breakBefore ? 'print-break' : ''}`}>
      <div className="flex items-baseline gap-4 mb-3">
        <span className="index-chip">{index}</span>
        <h2 className="display-sm font-display text-foreground">{title}</h2>
      </div>
      {intro && <p className="text-foreground/65 max-w-2xl mb-8 leading-relaxed">{intro}</p>}
      {!intro && <div className="mb-8" />}
      {children}
    </section>
  )
}

export default function BrandGuide() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .print-break { break-before: page; }
          .print-avoid-break { break-inside: avoid; }
          @media print {
            .no-print { display: none !important; }
            main { background: ${PAPER} !important; }
            @page { margin: 14mm; }
          }
        `,
        }}
      />

      {/* Sticky toolbar — hidden in the exported PDF */}
      <div className="no-print sticky top-0 z-50 border-b border-foreground/12 bg-background/85 backdrop-blur">
        <div className="section-pad max-w-[1100px] mx-auto flex items-center justify-between gap-4 py-3">
          <span className="font-display text-sm text-foreground">
            LawShaoor<span className="text-gold">.</span>{' '}
            <span className="text-foreground/55">Identity Guide</span>
          </span>
          <button onClick={() => window.print()} className="btn-primary">
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      <div className="section-pad max-w-[1100px] mx-auto py-16 md:py-24">
        {/* ── COVER ── */}
        <header className="mb-20 pb-16 border-b border-foreground/15">
          <span className="eyebrow text-foreground/55">Brand &amp; Identity Guide · v1.0</span>
          <h1 className="display-xl font-display mt-5 text-foreground">
            LawShaoor<span className="text-gold">.</span>
          </h1>
          <p className="font-heading text-xs md:text-sm tracking-[0.28em] uppercase text-foreground/65 mt-4">
            Law<span className="text-gold">.</span> Strategy<span className="text-gold">.</span> Future<span className="text-gold">.</span>
          </p>
          <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/70">
            A reference for designers producing the logo, letterheads, business cards and other
            printed and digital collateral for LawShaoor Chambers — a corporate law chambers based in
            Islamabad. Colours are given in HEX, RGB and CMYK; type and licensing are specified for
            production.
          </p>
        </header>

        {/* ── 01 — POSITIONING & VOICE ── */}
        <Section index="01" title="Positioning & voice"
          intro="LawShaoor is a modern, commercially-minded corporate law chambers. The identity should feel sharp, editorial and confident — never ornate or traditional-stuffy.">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { k: 'Personality', v: 'Sharp · editorial · confident · commercial' },
              { k: 'Looks like', v: 'Clean warm paper, deep azure, fine geometric line art, generous white space, squared corners.' },
              { k: 'Avoid', v: 'Gradients, drop shadows, textures, gold bars, ornate crests, rounded bubbly shapes.' },
            ].map((x) => (
              <div key={x.k} className="border border-foreground/15 p-6">
                <span className="eyebrow text-primary">{x.k}</span>
                <p className="text-sm text-foreground/75 mt-3 leading-relaxed">{x.v}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 02 — LOGO / WORDMARK ── */}
        <Section index="02" title="The wordmark" breakBefore
          intro="The identity is a wordmark — “LawShaoor” set as one word in Poppins Medium, with an optional gold full-stop. The full legal name is “LawShaoor Chambers”.">
          {/* Primary + reversed */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-foreground/15 flex items-center justify-center p-12 md:col-span-2" style={{ background: PAPER }}>
              <Wordmark color={AZURE} dot={GOLD} className="text-4xl md:text-5xl" />
            </div>
            <div className="border border-foreground/15 flex items-center justify-center p-12" style={{ background: AZURE }}>
              <Wordmark color={PAPER} dot={GOLD} className="text-3xl md:text-4xl" />
            </div>
          </div>

          {/* Mono variants */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="border border-foreground/15 flex flex-col items-center justify-center gap-3 p-10" style={{ background: PAPER }}>
              <Wordmark color={INK} dot={INK} className="text-3xl" />
              <span className="eyebrow text-foreground/45">Mono — ink</span>
            </div>
            <div className="border border-foreground/15 flex flex-col items-center justify-center gap-3 p-10" style={{ background: INK }}>
              <Wordmark color={PAPER} dot={PAPER} className="text-3xl" />
              <span className="eyebrow" style={{ color: PAPER + '73' }}>Mono — reversed</span>
            </div>
            <div className="border border-foreground/15 flex flex-col items-center justify-center gap-3 p-10" style={{ background: PAPER }}>
              <Wordmark color={AZURE} dot={AZURE} className="text-3xl" />
              <span className="eyebrow text-foreground/45">Single-colour azure</span>
            </div>
          </div>

          {/* Rules */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="border border-foreground/15 p-6">
              <span className="eyebrow text-primary">Clear space</span>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                Keep clear space on all sides equal to the cap-height of the “L”. Nothing —
                text, rules, edges, photos — enters this zone.
              </p>
            </div>
            <div className="border border-foreground/15 p-6">
              <span className="eyebrow text-primary">Minimum size</span>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                Print: <strong className="text-foreground">22&nbsp;mm</strong> wide minimum.
                Screen: <strong className="text-foreground">120&nbsp;px</strong> wide minimum.
                Below this, drop the gold dot for legibility.
              </p>
            </div>
            <div className="border border-foreground/15 p-6">
              <span className="eyebrow text-primary">Construction</span>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                Poppins Medium (500), one word, no space, tight tracking (−2%). Capital “L” and
                “S”. The gold dot is optional and used on hero lockups only.
              </p>
            </div>
          </div>

          {/* Misuse */}
          <div className="border border-foreground/15 p-6 mt-6">
            <span className="eyebrow text-foreground/55">Do not</span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 mt-4 text-sm text-foreground/55">
              {[
                'Stretch, condense or rotate the wordmark.',
                'Recolour outside azure / ink / paper.',
                'Add shadows, outlines, bevels or gradients.',
                'Re-letter in another typeface.',
                'Place on a busy photo without enough contrast.',
                'Box it or add a tagline lock-up without approval.',
              ].map((t) => (
                <p key={t} className="flex gap-2"><span className="text-destructive">✕</span>{t}</p>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 03 — COLOUR ── */}
        <Section index="03" title="Colour" breakBefore
          intro="Warm-paper backgrounds, deep azure as the lead, near-black navy ink for text, and gold used very sparingly. Use CMYK for offset/stationery print and HEX/RGB for screen. Pantone (PMS) to be matched on press by the printer.">
          <span className="eyebrow text-primary">Brand colours</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 mb-10">
            {CORE.map((s) => <SwatchCard key={s.name} s={s} />)}
          </div>
          <span className="eyebrow text-primary">Neutrals — warm paper</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {NEUTRALS.map((s) => <SwatchCard key={s.name} s={s} />)}
          </div>
          <p className="text-xs text-foreground/55 mt-6 max-w-2xl leading-relaxed">
            Note: CMYK values are a sRGB-derived starting point. For critical stationery, ask the
            printer for a press proof and a Pantone match (one solid azure + the warm gold).
          </p>
        </Section>

        {/* ── 04 — TYPOGRAPHY ── */}
        <Section index="04" title="Typography" breakBefore
          intro="Two open-source typefaces. Both are free for commercial print and digital use under the SIL Open Font License — install from Google Fonts.">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-foreground/15 p-6" style={{ background: PAPER }}>
              <span className="eyebrow text-primary">Primary — Poppins</span>
              <p className="font-display text-6xl text-foreground mt-3 leading-none">Aa</p>
              <p className="font-display text-2xl text-foreground mt-4">Poppins Medium &amp; SemiBold</p>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                Headlines, the wordmark, titles and short body. Geometric and modern. Weights
                400 / 500 / 600 / 700.
              </p>
              <p className="font-mono text-[0.65rem] text-muted-foreground mt-3">
                fonts.google.com/specimen/Poppins · SIL OFL
              </p>
            </div>
            <div className="border border-foreground/15 p-6" style={{ background: PAPER }}>
              <span className="eyebrow text-primary">Secondary — Jost</span>
              <p className="font-heading text-6xl text-foreground mt-3 leading-none">Aa</p>
              <p className="font-heading text-2xl text-foreground mt-4">Jost — labels &amp; meta</p>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                Small uppercase labels, eyebrows, addresses and fine print. Always wide-tracked
                when set in caps. Weights 300–700.
              </p>
              <p className="font-mono text-[0.65rem] text-muted-foreground mt-3">
                fonts.google.com/specimen/Jost · SIL OFL
              </p>
            </div>
          </div>

          <div className="border border-foreground/15 divide-y divide-foreground/10 mt-6">
            {[
              { l: 'Heading', n: 'Poppins · 500 · −2% tracking', el: <p className="display-md font-display text-foreground">Law. Strategy. Future.</p> },
              { l: 'Subhead', n: 'Poppins · 500', el: <p className="display-sm font-display text-foreground">Corporate &amp; commercial counsel</p> },
              { l: 'Body', n: 'Poppins · 400 · 1.6 line', el: <p className="text-foreground/80 max-w-xl leading-relaxed">Clear, practical and reliable legal services that meet the commercial needs of our clients.</p> },
              { l: 'Label', n: 'Jost · 500 · caps · 0.2em', el: <span className="eyebrow text-foreground">Practice Areas</span> },
            ].map((r) => (
              <div key={r.l} className="p-5 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 print-avoid-break">
                <div className="md:w-40 shrink-0">
                  <p className="font-mono text-xs text-primary">{r.l}</p>
                  <p className="font-mono text-[0.6rem] text-muted-foreground">{r.n}</p>
                </div>
                {r.el}
              </div>
            ))}
          </div>
        </Section>

        {/* ── 05 — GRAPHIC ELEMENTS ── */}
        <Section index="05" title="Graphic elements" breakBefore
          intro="A set of fine-line azure geometric marks used as supporting devices on covers, dividers and stationery accents. Keep them as thin outlines in azure or ink — never filled, never as busy patterns.">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {ELEMENTS.map(({ C, key, label }) => (
              <div key={key} className="border border-foreground/15 p-5 flex flex-col items-center gap-3 print-avoid-break" style={{ background: PAPER }}>
                <div className="w-20 h-20 flex items-center justify-center text-primary">
                  <C className="w-full h-full" uid={`bg-${key}`} />
                </div>
                <p className="font-mono text-[0.6rem] text-muted-foreground text-center">{label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 06 — APPLICATIONS ── */}
        <Section index="06" title="Applications" breakBefore
          intro="Reference proportions for the core stationery. Final artwork should be set up at correct trim sizes with bleed by the designer.">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Letterhead */}
            <div className="print-avoid-break">
              <span className="eyebrow text-primary">Letterhead — A4</span>
              <div className="border border-foreground/15 aspect-[1/1.414] mt-3 p-8 flex flex-col" style={{ background: PAPER }}>
                <div className="flex items-start justify-between">
                  <Wordmark color={AZURE} dot={GOLD} className="text-xl" />
                  <div className="text-right font-heading text-[0.55rem] tracking-[0.18em] uppercase leading-relaxed" style={{ color: INK + '99' }}>
                    Islamabad · Pakistan<br />lawshaoor.com
                  </div>
                </div>
                <div className="h-px w-full mt-4" style={{ background: AZURE }} />
                <div className="mt-8 space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1.5 rounded-full" style={{ background: INK + '14', width: `${[92, 88, 95, 70, 90, 60][i]}%` }} />
                  ))}
                </div>
                <div className="mt-auto pt-6 flex items-center justify-between font-heading text-[0.5rem] tracking-[0.18em] uppercase" style={{ color: INK + '80' }}>
                  <span>LawShaoor Chambers</span>
                  <span>Law · Strategy · Future</span>
                </div>
              </div>
            </div>

            {/* Business cards */}
            <div className="space-y-6">
              <div className="print-avoid-break">
                <span className="eyebrow text-primary">Business card — front (85 × 55 mm)</span>
                <div className="border border-foreground/15 aspect-[85/55] mt-3 p-6 flex items-center justify-center" style={{ background: AZURE }}>
                  <Wordmark color={PAPER} dot={GOLD} className="text-2xl" />
                </div>
              </div>
              <div className="print-avoid-break">
                <span className="eyebrow text-primary">Business card — back</span>
                <div className="border border-foreground/15 aspect-[85/55] mt-3 p-6 flex flex-col justify-between" style={{ background: PAPER }}>
                  <Wordmark color={AZURE} dot={GOLD} className="text-lg" />
                  <div className="font-heading text-[0.6rem] tracking-[0.14em] uppercase leading-relaxed" style={{ color: INK + 'b3' }}>
                    Advocate Name<br />
                    <span style={{ color: AZURE }}>name@lawshaoor.com</span><br />
                    +92 00 0000000 · Islamabad
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email signature */}
          <div className="print-avoid-break mt-6">
            <span className="eyebrow text-primary">Email signature</span>
            <div className="border border-foreground/15 p-6 mt-3 flex items-center gap-5" style={{ background: PAPER }}>
              <Wordmark color={AZURE} dot={GOLD} className="text-2xl" />
              <div className="pl-5 border-l" style={{ borderColor: INK + '22' }}>
                <p className="font-display text-sm" style={{ color: INK }}>Advocate Name — <span style={{ color: INK + '99' }}>Title</span></p>
                <p className="font-heading text-xs" style={{ color: INK + '99' }}>
                  <span style={{ color: AZURE }}>lawshaoor.com</span> · Islamabad, Pakistan
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 07 — ASSETS TO PRODUCE ── */}
        <Section index="07" title="Asset checklist"
          intro="Deliverables to build from this guide and hand back as the master asset pack.">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-foreground/15 p-6">
              <span className="eyebrow text-primary">Logo files</span>
              <ul className="text-sm text-foreground/75 mt-3 space-y-1.5 leading-relaxed">
                <li>· Vector master — <strong className="text-foreground">.AI / .SVG / .PDF / .EPS</strong></li>
                <li>· Variants — full-colour, mono ink, reversed (white)</li>
                <li>· Raster — <strong className="text-foreground">.PNG</strong> transparent @1×/2×/3×</li>
                <li>· Favicon / app icon — 512px + .ICO</li>
                <li>· Type outlined in vector masters (no font dependency)</li>
              </ul>
            </div>
            <div className="border border-foreground/15 p-6">
              <span className="eyebrow text-primary">Stationery & templates</span>
              <ul className="text-sm text-foreground/75 mt-3 space-y-1.5 leading-relaxed">
                <li>· Letterhead — A4, print (CMYK, bleed) + Word/Docs</li>
                <li>· Business card — 85×55mm, print-ready w/ bleed</li>
                <li>· Email signature — HTML block</li>
                <li>· Compliment slip / envelope (optional)</li>
                <li>· Editable source files (.AI / .INDD / Figma)</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <footer className="pt-12 border-t border-foreground/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Wordmark color={INK} dot={GOLD} className="text-base" /> <span className="text-foreground/55 text-sm">Chambers</span>
            <p className="text-xs text-foreground/55 mt-1">
              Brand &amp; Identity Guide · Islamabad, Pakistan
            </p>
          </div>
          <p className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">
            Law · Strategy · Future
          </p>
        </footer>
      </div>
    </main>
  )
}
