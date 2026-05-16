/**
 * Seed sample Academy posts into MongoDB.
 *
 * Run with:           pnpm seed:posts
 * Force-reseed:       RESEED=1 pnpm seed:posts
 *
 * Default behaviour is idempotent — posts whose slug already exists are
 * left alone (so manual edits in the admin panel are safe). Pass RESEED=1
 * to overwrite all of them with the current seed content.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MongoClient } from 'mongodb'
import slugify from 'slugify'

// ─── Tiny .env.local loader (no extra dep) ─────────────────────
function loadEnv(file: string) {
  try {
    const content = readFileSync(resolve(process.cwd(), file), 'utf8')
    for (const raw of content.split('\n')) {
      const line = raw.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq === -1) continue
      const key = line.slice(0, eq).trim()
      const val = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    /* file optional */
  }
}
loadEnv('.env.local')
loadEnv('.env')

// ─── Helpers ───────────────────────────────────────────────────
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`

type Block =
  | { type: 'heading'; props: { level: number }; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'quote'; content: string }
  | { type: 'bulletListItem'; content: string }

const h2 = (s: string): Block => ({ type: 'heading', props: { level: 2 }, content: s })
const p = (s: string): Block => ({ type: 'paragraph', content: s })
const q = (s: string): Block => ({ type: 'quote', content: s })
const li = (s: string): Block => ({ type: 'bulletListItem', content: s })

// ─── Source data ───────────────────────────────────────────────
type Seed = {
  category: string
  date: string // "Month YYYY"
  read: number // minutes
  title: string
  excerpt: string
  thumbnailUrl: string
  blocks: Block[]
}

const SEEDS: Seed[] = [
  {
    category: 'M&A',
    date: 'April 2026',
    read: 12,
    title: 'The earnout clauses that quietly kill deals',
    excerpt:
      'Earnouts are sold as a bridge between buyer and seller. In practice they are the most-litigated clause in the modern transaction. Here is what the post-close fights actually look like.',
    thumbnailUrl: UNSPLASH('photo-1486325212027-8081e485255e'),
    blocks: [
      p(
        'Earnouts are sold as a bridge between buyer and seller. In practice they are the most-litigated clause in the modern transaction. Every senior partner here has, at some point, told a client that a one-page earnout schedule produced four years of litigation. We have stopped being surprised by it.'
      ),
      h2('The trap is the mechanic, not the concept'),
      p(
        'Most lawyers draft earnouts as if the post-close world will be cooperative. It will not. The seller leaves; the buyer integrates; the metrics drift; the counterparty either rationalises rebooking or actively games the targets. The clause that read like a clever financing solution becomes the clause that runs for three years of disputes.'
      ),
      p(
        'The mistake is treating the earnout as a deal point, when in practice it is a control point. Whoever holds the operational levers in the earn-out period controls the outcome — and rights drafted on paper rarely beat operational control.'
      ),
      q(
        'The earnout is a control point dressed up as a deal point. Negotiate it as such.'
      ),
      h2('What actually litigates'),
      p(
        'Sixty percent of post-closing earnout disputes turn on three things: revenue recognition, allocation of shared expenses, and changes in product or pricing strategy. These are not random fights — they are predictable, and they show up in the same order, again and again.'
      ),
      p(
        'If the draft does not address all three with operational specificity, the earnout is going to court. The seller will spot it in due diligence the second time around.'
      ),
      h2('Seven drafting choices that change the outcome'),
      p(
        'Define the financial metric in operational terms, not GAAP terms. GAAP is interpretable; "monthly recurring revenue from contracts signed before December 31" is not. Lock the chart of accounts and the allocation methodology in an exhibit, not in the body. Give the seller real audit rights, on a real timeline.'
      ),
      p(
        'Address the integration question head-on: if the buyer shutters the seller’s product line within twelve months, what happens? Build in a cure period and a cap on disputes. Agree on the arbitrator now, not later. And add an acceleration trigger — change-of-control of the buyer, certain financial events, departure of named operators.'
      ),
      p(
        'None of these are exotic. They are simply the seven things that experienced sellers know to demand, and inexperienced sellers do not. If the buyer’s draft is missing four of them, the sell-side is about to negotiate a very expensive lesson.'
      ),
    ],
  },
  {
    category: 'Governance',
    date: 'April 2026',
    read: 8,
    title: 'What boards get wrong about "oversight"',
    excerpt:
      'The Delaware Caremark line has shifted again. A practical update on what directors actually have to do now — and where the safe-harbour conversation belongs.',
    thumbnailUrl: UNSPLASH('photo-1497366754035-f200968a6e72'),
    blocks: [
      p(
        'Oversight is the most-named and least-defined director duty in American corporate law. The post-Marchand decisions have done two things: they have raised the floor on what counts as a credible monitoring system, and they have moved the conversation from "did the board care?" to "did the board build the wiring?"'
      ),
      h2('The new floor'),
      p(
        'Courts now expect three concrete artefacts: a written, board-approved compliance framework for mission-critical risks; recurring management reports against that framework on a defined cadence; and minuted board engagement with those reports — not approval, engagement. If any of the three is missing, the plaintiffs’ bar has a viable Caremark claim and a strong settlement demand.'
      ),
      h2('Where boards still get it wrong'),
      p(
        'Most boards confuse oversight with management. They review dashboards, ask sharp questions, and feel like they have done the work. They have not — they have not built the system that produces the dashboards. The plaintiffs’ bar looks at the wiring, not the questions.'
      ),
      q(
        'You do not get Caremark credit for asking sharp questions. You get credit for building the system that surfaces them.'
      ),
      h2('Three moves we run with every board'),
      p(
        'First, identify the mission-critical risks in writing, with the board signing off on the list annually. This document is the centre of gravity in every Caremark case — and most boards do not have one.'
      ),
      p(
        'Second, name a single accountable executive per risk, with a defined reporting line to the board or committee. Anonymous oversight is no oversight.'
      ),
      p(
        'Third, instrument the minutes. Most board minutes are too thin to defend a Caremark claim. The fix is a one-paragraph summary of each substantive discussion, written contemporaneously, reviewed by counsel before the next meeting.'
      ),
      p(
        'These three moves are mechanical, not heroic. They are the difference between a system that survives a stress event and a system that produces a press release after one.'
      ),
    ],
  },
  {
    category: 'Capital',
    date: 'March 2026',
    read: 6,
    title: 'Convertible notes, ten years on',
    excerpt:
      'The instrument that ate venture finance. What the cap-table math really looks like at conversion — and the three terms founders consistently underestimate.',
    thumbnailUrl: UNSPLASH('photo-1554224155-6726b3ff858f'),
    blocks: [
      p(
        'Convertible notes were sold to founders as the simple, founder-friendly alternative to a priced round. A decade in, the data is in: the median company that closed multiple note rounds before its Series A gave up more equity than it would have through a priced seed. The mechanic is invisible until it converts.'
      ),
      h2('The cap goes both ways'),
      p(
        'A valuation cap looks like a ceiling. In practice it is a floor — the floor for how diluted the common will be at conversion. Stacked caps from multiple note rounds compound, often producing a Series A cap table where the founders own less than they would have at a clean priced seed.'
      ),
      h2('Three terms founders consistently underestimate'),
      p(
        'The discount-and-cap interaction. Founders read "20% discount or $8M cap, whichever is more favourable" and assume the favourable case rarely matters. By Series A, the favourable case is usually the cap, and the cap is producing the dilution.'
      ),
      p(
        'The MFN clause. A most-favoured-nation provision in an early note quietly upgrades every later concession back into the early note. Founders who give modest terms to later investors find them retroactively applied.'
      ),
      p(
        'The conversion mechanic at exit. Most notes convert on a "qualified financing" — but the same notes have a different conversion treatment at acquisition, often at a multiple. Founders run the conversion math for the financing scenario and miss the acquisition math entirely.'
      ),
      q(
        'A convertible note is a priced round with the price written in invisible ink. The ink is visible only at conversion.'
      ),
      h2('What we tell founders now'),
      p(
        'Two convertible note rounds is one too many. By the second round, the cap-table math is more complex than a priced seed, and the optionality the notes were sold on has become a tax on Series A. Most founders are better off with a SAFE-then-priced-seed sequence, even if the first round is small.'
      ),
    ],
  },
  {
    category: 'Contracts',
    date: 'March 2026',
    read: 11,
    title: 'Reading an MSA in twenty minutes',
    excerpt:
      'A senior-counsel reading order: the seven sections that matter, in the order you should hit them — and the three you can safely skim.',
    thumbnailUrl: UNSPLASH('photo-1521791136064-7986c2920216'),
    blocks: [
      p(
        'A Master Services Agreement is a long document with a short list of clauses that matter. Senior counsel does not read MSAs front-to-back; they hit seven sections in a specific order, looking for specific things. The order itself is the discipline — it is what separates a twenty-minute reading from a two-hour rabbit hole.'
      ),
      h2('The reading order'),
      p(
        'Start with the parties block and the recitals, but only to verify which entity is actually signing. The number of MSAs that bind the wrong subsidiary is alarming, and the fix at signing is trivial. Move next to the termination clause — termination tells you what kind of relationship the drafter thought this was.'
      ),
      p(
        'Then go to the indemnification and limitation of liability sections, in that order. These two together form the risk-allocation skeleton of the deal. Everything else hangs off them.'
      ),
      p(
        'Then payment terms. Late-payment interest, expense reimbursement, and currency-of-payment provisions are quietly material in cross-border deals. Then the IP clauses, with attention to background IP definitions and license-back provisions. Then the dispute mechanism — venue, governing law, and arbitration.'
      ),
      h2('What to skim'),
      p(
        'Force majeure clauses are mostly templated post-2020 and rarely repay close reading. Notices provisions are administrative — verify the addresses, move on. Boilerplate "entire agreement / amendments in writing / no third-party beneficiaries" reads identically across most MSAs; spot-check it.'
      ),
      q(
        'The MSA is not the deal. The Statement of Work is the deal. The MSA is the operating system on which the deal runs.'
      ),
      h2('The most common drafter sins'),
      p(
        'A limitation-of-liability cap expressed as a multiple of "fees paid in the preceding twelve months" with no SOW-defined floor. A indemnification carve-out that does not actually carve-out — i.e., the carve-out is itself capped. An IP assignment that assigns work product but reserves background IP without a license-back. A termination-for-convenience clause with a notice period that is operationally impossible.'
      ),
      p(
        'These four pattern errors are common enough that a quick scan against this checklist catches half the issues in any draft you receive.'
      ),
    ],
  },
  {
    category: 'M&A',
    date: 'March 2026',
    read: 9,
    title: 'Diligence for the AI-era target',
    excerpt:
      'Model rights, data provenance, and the new representations that should be in every tech-stack acquisition. A 2026 update to the diligence checklist.',
    thumbnailUrl: UNSPLASH('photo-1518186285589-2f7649de83e0'),
    blocks: [
      p(
        'Three years ago a tech-stack acquisition checked for open-source license compliance and called it a day. That was sufficient because the legal risk in software was, by and large, copyright-shaped. It is not anymore. AI workflows produce a new set of legal facts that classical IP diligence does not capture, and the gap is where the post-close surprises are happening.'
      ),
      h2('The new questions'),
      p(
        'What models is the target using, and on what terms? Many off-the-shelf model licenses prohibit use in regulated industries or restrict downstream training. The target may be inadvertently breaching a license that is enforceable against the acquirer.'
      ),
      p(
        'What data was used to train, and what data is used at inference? Provenance is the new chain-of-title question. If the target trained a model on data it did not have the rights to, the model itself is a contingent liability — one that scales with how integral the model is to the product.'
      ),
      p(
        'Are there hidden indemnities running to customers? Some target companies have offered "AI output indemnities" to large customers — a contractual promise to defend the customer against IP claims arising from model output. These are often buried in side letters and do not appear in the standard contracts schedule.'
      ),
      q(
        'Model rights are the chain-of-title of 2026. The diligence question is no longer "what code did you write?" but "what model are you using, what did you train it on, and what did you promise about its outputs?"'
      ),
      h2('Three representations every AI-era acquisition should add'),
      p(
        'A representation that the target has documented the provenance of all material training data, with sample documentation in the disclosure schedule. A representation that the target has identified all customer-facing AI indemnities and has scheduled them. A representation that no model in the target’s production stack is subject to a use restriction that the acquirer’s industry would breach.'
      ),
      p(
        'These three are inexpensive to give if the target has done its work, and impossible to give if it has not. The reaction to the request is itself diligence.'
      ),
    ],
  },
  {
    category: 'Governance',
    date: 'February 2026',
    read: 8,
    title: 'When the founder is the problem',
    excerpt:
      'A field guide for boards navigating high-conflict founder transitions without litigation. Five tactics from the last decade of clean exits — and one that has stopped working.',
    thumbnailUrl: UNSPLASH('photo-1551434678-e076c223a692'),
    blocks: [
      p(
        'There is a category of governance problem that no board wants to talk about and every board eventually faces: the founder who is no longer the right operator for the company they built. The legal mechanics of the transition are well-rehearsed; the political and psychological mechanics are where boards repeatedly come undone.'
      ),
      h2('The mistake is treating it as a personnel matter'),
      p(
        'A founder transition is a corporate event. It will be analysed by employees, investors, customers, and counterparties as a corporate event. Boards that treat it as an HR matter — quiet conversations, individual coaching, soft-landing offers — produce drawn-out transitions, leaks, and litigation. Boards that treat it as a corporate event, on a calendar, produce clean ones.'
      ),
      h2('Five tactics that work'),
      p(
        'Run the transition on a decision-window. The board commits, before any conversation with the founder, to a date by which the outcome will be set. Open-ended discussions favour the founder; structured ones favour the board.'
      ),
      p(
        'Separate the role change from the equity question. Founders agree to step back from operations far more often than they agree to surrender founder stock. Conflating the two issues stalls both.'
      ),
      p(
        'Bring the founder a written proposal, not a conversation. Verbal proposals invite counter-narratives. A written term sheet — title, scope, equity, vesting, board seat, public framing — collapses the discussion onto specific points.'
      ),
      p(
        'Plan the public framing before the private conversation. The market story is decided by the press release and the all-hands script. If those are not drafted before the founder conversation, the post-conversation chaos will draft them.'
      ),
      p(
        'Indemnify the directors. The founder may not litigate, but they may sue the directors individually for breach of duty. A properly funded D&O policy with founder-dispute coverage is no longer optional.'
      ),
      q(
        'The clean founder transitions are short. The long ones are the litigated ones.'
      ),
      h2('And one that has stopped working'),
      p(
        'The "founder-coach" transition — keeping the founder as a non-executive chair while a new CEO operates — used to work and now mostly does not. In the current market, founder-chairs tend to undermine new CEOs within twelve months, and the second transition is harder than the first. Boards that ran this play in 2018 are running it for the second time in 2026, and they have stopped recommending it.'
      ),
    ],
  },
  {
    category: 'Contracts',
    date: 'February 2026',
    read: 6,
    title: 'Indemnity caps: where the real negotiation lives',
    excerpt:
      'A walkthrough of the four cap structures, when each one is appropriate, and the fights they predict. The under-loved clause that decides who pays when the deal goes wrong.',
    thumbnailUrl: UNSPLASH('photo-1454165804606-c3d57bc86b40'),
    blocks: [
      p(
        'Indemnification provisions get negotiated like the substantive risk lives in the indemnity scope. It does not. The risk lives in the cap structure — and the cap structure is where the under-negotiated mistakes are made on both sides of every commercial deal.'
      ),
      h2('Four structures'),
      p(
        'Flat cap. A fixed dollar amount, full stop. Predictable, easy to manage, and almost always too low or too high — rarely calibrated to the actual risk distribution of the deal. Common in low-stakes SaaS.'
      ),
      p(
        'Multiplier cap. A multiple of fees paid, usually in a defined trailing window. The default for commercial services contracts. The fights here are about the multiplier and the window — both of which are quietly worth more than people negotiate them as.'
      ),
      p(
        'Tiered cap. Different caps for different categories of breach — confidentiality, IP infringement, data breach, everything else. The right structure for deals where the risk distribution is genuinely asymmetric. Underused.'
      ),
      p(
        'Uncapped categories. Specific carve-outs that have no cap — typically gross negligence, wilful misconduct, IP indemnification, and (increasingly) data breach. These are where the real money lives in any large dispute.'
      ),
      h2('The pattern errors'),
      p(
        'A cap that resets every twelve months without an aggregate ceiling — produces unbounded long-tail exposure. A cap denominated in fees with no SOW-defined floor — produces zero recoverable damages on a small SOW. A carve-out for "fraud" without defining fraud — produces a fight about whether the breach was fraudulent enough to escape the cap. A multiplier expressed as "two times annual fees" without saying which year — produces a fight about which year.'
      ),
      q(
        'The cap is where the deal happens. The scope is where the optics happen. Negotiate accordingly.'
      ),
      h2('A heuristic'),
      p(
        'If the indemnity scope took three pages of redlines and the cap took one paragraph, the negotiation went badly. The reverse pattern — one paragraph of scope, three pages of cap mechanics — is what experienced commercial counsel actually produce.'
      ),
    ],
  },
]

// ─── Helpers ───────────────────────────────────────────────────
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

function parseMonthYear(s: string): Date {
  const [monthName, yearStr] = s.split(/\s+/)
  const month = MONTHS.indexOf(monthName)
  const year = parseInt(yearStr, 10)
  if (month === -1 || Number.isNaN(year)) return new Date()
  return new Date(Date.UTC(year, month, 15, 12, 0, 0))
}

function toSlug(input: string) {
  return slugify(input, { lower: true, strict: true, trim: true })
}

// ─── Main ──────────────────────────────────────────────────────
async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to .env.local before running this script.')
    process.exit(1)
  }

  const force = process.env.RESEED === '1' || process.argv.includes('--reseed')

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db()
  const posts = db.collection('posts')

  await posts.createIndex({ slug: 1 }, { unique: true }).catch(() => {})

  let inserted = 0
  let replaced = 0
  let skipped = 0

  for (const seed of SEEDS) {
    const slug = toSlug(seed.title)
    const existing = await posts.findOne({ slug })

    if (existing && !force) {
      console.log(`  [skip]     ${slug}`)
      skipped++
      continue
    }

    const publishedAt = parseMonthYear(seed.date)
    const now = new Date()
    const doc = {
      title: seed.title,
      slug,
      excerpt: seed.excerpt,
      category: seed.category,
      thumbnailUrl: seed.thumbnailUrl,
      blocks: seed.blocks,
      status: 'published',
      seo: { title: '', description: '', ogImage: '' },
      readMinutes: seed.read,
      publishedAt,
      createdAt: existing?.createdAt ?? publishedAt,
      updatedAt: now,
    }

    if (existing && force) {
      await posts.updateOne({ slug }, { $set: doc })
      console.log(`  [replace]  ${slug}`)
      replaced++
    } else {
      await posts.insertOne(doc)
      console.log(`  [insert]   ${slug}`)
      inserted++
    }
  }

  console.log('')
  console.log(`Done. Inserted ${inserted}, replaced ${replaced}, skipped ${skipped}.`)
  if (!force && skipped > 0) {
    console.log(`Hint: run with RESEED=1 to overwrite existing posts with the latest content.`)
  }
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
