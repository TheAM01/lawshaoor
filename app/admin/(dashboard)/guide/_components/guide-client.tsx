'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Tags,
  Settings as SettingsIcon,
  Search,
  Sparkles,
  Wrench,
  LogIn,
  Eye,
  Star,
  Trash2,
  HelpCircle,
} from 'lucide-react'

type Mode = 'basic' | 'advanced'

const BASIC_SECTIONS = [
  { id: 'welcome',        label: 'Welcome' },
  { id: 'signin',         label: 'Signing in & out' },
  { id: 'dashboard',      label: 'The dashboard' },
  { id: 'first-post',     label: 'Writing your first post' },
  { id: 'edit-post',      label: 'Editing a post later' },
  { id: 'thumbnail',      label: 'Adding a cover image' },
  { id: 'in-post-media',  label: 'Adding pictures or videos inside the post' },
  { id: 'category-pick',  label: 'Picking a category' },
  { id: 'publish',        label: 'Publishing (going live)' },
  { id: 'featured',       label: 'Making a post the “featured” one' },
  { id: 'manage-cats',    label: 'Adding & organizing categories' },
  { id: 'media-library',  label: 'The Media library' },
  { id: 'site-settings',  label: 'Site settings (in plain English)' },
  { id: 'deleting',       label: 'Deleting things safely' },
  { id: 'oops',           label: 'When something goes wrong' },
]

const ADVANCED_SECTIONS = [
  { id: 'overview',       label: 'Overview & layout' },
  { id: 'dashboard-adv',  label: 'Dashboard' },
  { id: 'posts-adv',      label: 'Posts (list)' },
  { id: 'editor',         label: 'Post editor' },
  { id: 'editor-blocks',  label: '— Blocks & formatting' },
  { id: 'editor-slug',    label: '— Slugs & URLs' },
  { id: 'editor-seo',     label: '— SEO & sharing' },
  { id: 'editor-media',   label: '— Embedding media' },
  { id: 'publishing-adv', label: 'Publishing flow' },
  { id: 'media-adv',      label: 'Media library' },
  { id: 'media-hosts',    label: '— ImgBB vs Vercel Blob' },
  { id: 'categories-adv', label: 'Categories' },
  { id: 'cat-illos',      label: '— Illustrations' },
  { id: 'cat-reassign',   label: '— Reassign & delete' },
  { id: 'settings-adv',   label: 'Settings' },
  { id: 'public-routes',  label: 'Public routes' },
  { id: 'tagline',        label: 'Tagline & brand' },
  { id: 'env',            label: 'Environment variables' },
  { id: 'deployment',     label: 'Deployment' },
  { id: 'troubleshooting',label: 'Troubleshooting' },
  { id: 'gotchas',        label: 'Critical gotchas' },
]

export function GuideClient() {
  const [mode, setMode] = useState<Mode>('basic')

  const sections = mode === 'basic' ? BASIC_SECTIONS : ADVANCED_SECTIONS

  return (
    <div className="flex-1 flex flex-col">
      <div className="section-pad py-8 md:py-10 border-b border-foreground/15 bg-background-alt/50">
        <span className="index-chip">Guide</span>
        <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
          <div>
            <h1 className="font-display text-3xl md:text-4xl tracking-[-0.02em] flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-primary" />
              Admin guide
            </h1>
            <p className="text-sm text-foreground/65 font-heading mt-2 max-w-2xl">
              {mode === 'basic'
                ? 'A friendly walk-through of how to use this admin. No jargon. Read top to bottom or jump to what you need.'
                : 'The full technical reference — internals, conventions, gotchas. For developers and maintainers.'}
            </p>
          </div>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>
      </div>

      <div className="flex-1 section-pad py-8 md:py-10">
        <div className="grid grid-cols-12 gap-8 max-w-6xl">
          {/* Sticky TOC */}
          <aside className="hidden lg:block col-span-3">
            <nav className="sticky top-8 space-y-1">
              <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55 mb-3">
                On this page
              </p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-xs font-heading transition-colors py-1 ${
                    s.label.startsWith('—')
                      ? 'pl-4 text-foreground/55 hover:text-primary'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {s.label.replace(/^— /, '')}
                </a>
              ))}
            </nav>
          </aside>

          {/* Body */}
          <article className="col-span-12 lg:col-span-9 space-y-16 admin-guide">
            {mode === 'basic' ? <BasicGuide /> : <AdvancedGuide />}

            <div className="pt-10 border-t border-foreground/15">
              <Link href="/admin" className="btn-ghost">
                <span>Back to dashboard</span>
                <span className="arrow-magnet">→</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   Tab toggle
   ─────────────────────────────────────────────── */

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex border border-foreground/20 bg-background overflow-hidden">
      <button
        onClick={() => onChange('basic')}
        className={`inline-flex items-center gap-2 px-4 py-2.5 text-[10px] font-mono tracking-[0.22em] uppercase transition-colors ${
          mode === 'basic'
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        Basics
      </button>
      <button
        onClick={() => onChange('advanced')}
        className={`inline-flex items-center gap-2 px-4 py-2.5 text-[10px] font-mono tracking-[0.22em] uppercase transition-colors border-l border-foreground/20 ${
          mode === 'advanced'
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
        }`}
      >
        <Wrench className="w-3.5 h-3.5" />
        Technical
      </button>
    </div>
  )
}

/* ───────────────────────────────────────────────
   BASIC GUIDE — for non-technical users
   Friendly, step-by-step, no jargon.
   ─────────────────────────────────────────────── */

function BasicGuide() {
  return (
    <>
      <Section id="welcome" Icon={Sparkles} title="Welcome">
        <p>
          This is the admin area for the LawShaoor website. It&apos;s where you write blog posts (called &ldquo;pieces&rdquo; on the public site), upload pictures and files, and tweak how the website looks.
        </p>
        <p>
          You don&apos;t need to know how websites work to use this. If you can use Microsoft Word or Google Docs, you can use this. Read this guide top to bottom once and you&apos;ll be set.
        </p>
        <p>The five main screens, on the left sidebar:</p>
        <ul>
          <li><strong>Dashboard</strong> — a quick summary of everything.</li>
          <li><strong>Posts</strong> — all your blog posts (drafts and published ones).</li>
          <li><strong>Media</strong> — every picture, video, and file you&apos;ve uploaded.</li>
          <li><strong>Categories</strong> — the topic buckets your posts go into.</li>
          <li><strong>Settings</strong> — site-wide options like which post is &ldquo;featured&rdquo;.</li>
        </ul>
        <Tip>
          Try clicking each one in the sidebar now to see what they look like. Don&apos;t worry — looking around doesn&apos;t change anything.
        </Tip>
      </Section>

      <Section id="signin" Icon={LogIn} title="Signing in & out">
        <p>
          You sign in at <code>/admin/login</code> with the username and password your developer set up for you. Once you&apos;re in, you stay signed in until you click <strong>Sign out</strong> at the bottom of the left sidebar.
        </p>
        <p>
          If you forget your password, you can&apos;t reset it yourself from the website — ask your developer to change it for you.
        </p>
        <Tip>
          If you close the browser tab without signing out, you usually stay signed in next time. If you&apos;re using someone else&apos;s computer, click <strong>Sign out</strong> first.
        </Tip>
      </Section>

      <Section id="dashboard" Icon={LayoutDashboard} title="The dashboard">
        <p>
          When you sign in, you land on the dashboard. It shows you:
        </p>
        <ul>
          <li>How many posts, categories, and media files exist right now.</li>
          <li>The last 5 posts you edited — click any of them to keep working.</li>
          <li>A summary of your current site settings, like which post is featured.</li>
          <li>Big shortcut buttons for the most common things: write a new post, upload media, edit categories, change settings.</li>
        </ul>
        <p>
          You don&apos;t <em>do</em> anything on the dashboard — it&apos;s just for looking at what&apos;s going on. Click the boxes to jump to the relevant screen.
        </p>
      </Section>

      <Section id="first-post" Icon={FileText} title="Writing your first post">
        <p>Here&apos;s the simplest path from blank screen to published post:</p>
        <ol>
          <li>Click <strong>Posts</strong> in the sidebar.</li>
          <li>Click the blue <strong>New post</strong> button (top right).</li>
          <li>You&apos;ll land in the editor. The title at the top says &ldquo;Untitled&rdquo;.</li>
          <li>Look at the panel on the right — under the <strong>Post</strong> tab, there&apos;s a <strong>Title</strong> box. Type your real title there.</li>
          <li>Click into the main writing area (the big middle column) and start typing your post.</li>
          <li>When you&apos;re happy with it, click <strong>Save draft</strong> at the top to save your work.</li>
          <li>When the post is ready for the world, click <strong>Publish</strong>.</li>
        </ol>
        <p>That&apos;s the whole flow. Everything below is just polish.</p>
        <Tip>
          <strong>Save often.</strong> The editor does <em>not</em> save automatically. Click <strong>Save draft</strong> every few minutes so you don&apos;t lose work if your browser crashes.
        </Tip>
      </Section>

      <Section id="edit-post" Icon={FileText} title="Editing a post later">
        <p>To change something on a post you already wrote:</p>
        <ol>
          <li>Click <strong>Posts</strong> in the sidebar.</li>
          <li>Find the post in the list (newest is at the top).</li>
          <li>Click the post&apos;s title <em>or</em> the pencil icon on the right.</li>
          <li>Make your changes.</li>
          <li>Click <strong>Save draft</strong> if you want to test, or <strong>Publish</strong> to push the changes live right away.</li>
        </ol>
        <p>
          If the post is already published and you click <strong>Save draft</strong>, the public site keeps showing the previously-published version — your edits only go live when you click <strong>Publish</strong> again.
        </p>
        <p>
          If you want to take a post <em>off</em> the public site without deleting it, click <strong>Unpublish</strong> at the top of the editor. It becomes a draft again. You can republish later whenever you like.
        </p>
      </Section>

      <Section id="thumbnail" Icon={ImageIcon} title="Adding a cover image">
        <p>
          The cover image (called the &ldquo;thumbnail&rdquo;) is what people see in the post list before they click in. It&apos;s also what shows up if someone shares the post on social media.
        </p>
        <ol>
          <li>While editing a post, look at the right panel and click the <strong>Post</strong> tab.</li>
          <li>Scroll down to the <strong>Thumbnail</strong> section.</li>
          <li>Click the dashed box that says <em>Click to upload</em>.</li>
          <li>Pick a picture from your computer.</li>
          <li>Wait a moment — when the upload finishes, the picture appears.</li>
          <li>If you don&apos;t like it, click the small <strong>×</strong> in the corner of the preview to remove it. Then upload another.</li>
        </ol>
        <Tip>
          <strong>Good cover images are landscape (wider than tall) and roughly 1200×630 pixels.</strong> Anything you upload works, but really big images take longer to load for visitors.
        </Tip>
      </Section>

      <Section id="in-post-media" Icon={ImageIcon} title="Adding pictures or videos inside the post">
        <p>To put a picture, video, audio, or file <em>inside</em> the body of a post:</p>
        <ol>
          <li>Click in the post body where you want the picture to appear.</li>
          <li>Type <code>/</code> (just a slash). A small menu pops up.</li>
          <li>Type a word for what you want — <code>image</code>, <code>video</code>, <code>audio</code>, or <code>file</code>.</li>
          <li>Press <strong>Enter</strong>. An empty block appears.</li>
          <li>Click the block&apos;s upload button and pick a file from your computer.</li>
        </ol>
        <p>
          You can also just <strong>drag and drop</strong> a picture from your desktop straight into the post body. The website figures out it&apos;s an image and creates the block for you.
        </p>
        <Tip>
          Pictures upload almost instantly. Videos and PDFs take longer because they&apos;re bigger files — be patient and don&apos;t click away while it&apos;s uploading.
        </Tip>
      </Section>

      <Section id="category-pick" Icon={Tags} title="Picking a category">
        <p>
          Every post belongs to one category, like a folder. The category controls which list the post shows up in on the public website (like &ldquo;Governance&rdquo; or &ldquo;Contracts&rdquo;).
        </p>
        <ol>
          <li>In the editor, open the <strong>Post</strong> tab on the right.</li>
          <li>Find the <strong>Category</strong> dropdown.</li>
          <li>Click it and pick one.</li>
        </ol>
        <p>
          That&apos;s it — when you save, the post is in the new category. If the category you want doesn&apos;t exist yet, you&apos;ll need to create it first on the <strong>Categories</strong> page (see below).
        </p>
      </Section>

      <Section id="publish" Icon={Eye} title="Publishing (going live)">
        <p>Posts have two states:</p>
        <ul>
          <li><strong>Draft</strong> — only you can see it. Visitors to the website cannot.</li>
          <li><strong>Published (Live)</strong> — visitors can read it on the public website.</li>
        </ul>
        <p>The buttons at the top of the editor control which state the post is in:</p>
        <ul>
          <li><strong>Save draft</strong> — saves your work but keeps it private.</li>
          <li><strong>Publish</strong> — saves and makes the post public.</li>
          <li><strong>Unpublish</strong> — appears once a post is live; clicking it hides the post from the public again (it becomes a draft).</li>
        </ul>
        <p>
          You can always tell what state a post is in: in the Posts list, look at the <strong>Status</strong> column. Green <em>Live</em> means it&apos;s public. Grey <em>Draft</em> means it&apos;s private.
        </p>
        <Tip>
          When you publish a post for the very first time, the website remembers that date as the post&apos;s publish date. If you unpublish and republish later, the publish date <em>doesn&apos;t</em> change — so the post doesn&apos;t jump to the top of the list again. This is on purpose.
        </Tip>
      </Section>

      <Section id="featured" Icon={Star} title='Making a post the "featured" one'>
        <p>
          The featured post is the big lead piece at the top of the Academy page on the public website. By default, the most recently published post is automatically featured.
        </p>
        <p>To pick a specific post to feature instead:</p>
        <ol>
          <li>Click <strong>Settings</strong> in the sidebar.</li>
          <li>The first section is called <strong>Featured &amp; display</strong>.</li>
          <li>Click the <strong>Featured post</strong> dropdown and pick the post you want.</li>
          <li>Click <strong>Save settings</strong> at the bottom right.</li>
        </ol>
        <p>
          The change is instant — refresh the Academy page on the public site and you&apos;ll see the new featured post at the top.
        </p>
        <p>
          To go back to &ldquo;automatically use the most recent post&rdquo;, change the dropdown back to <em>— Most recent published —</em> and save again.
        </p>
        <p>
          There&apos;s also a <strong>Pinned post</strong> dropdown right below. That puts a second post in a guaranteed spot just under the featured one. Useful if you have two important posts to highlight at the same time.
        </p>
      </Section>

      <Section id="manage-cats" Icon={Tags} title="Adding & organizing categories">
        <p>To create a new category:</p>
        <ol>
          <li>Click <strong>Categories</strong> in the sidebar.</li>
          <li>Click the blue <strong>New category</strong> button.</li>
          <li>Type a name (like &ldquo;Tax&rdquo; or &ldquo;Real Estate&rdquo;).</li>
          <li>Optionally add a one-line description.</li>
          <li>Pick an illustration from the row of tiles — this is the little graphic that represents the category on the public site.</li>
          <li>Click <strong>Create</strong>.</li>
        </ol>
        <p>To rename, change the illustration, or edit a category:</p>
        <ol>
          <li>On the Categories page, find the row you want to change.</li>
          <li>Click the pencil icon on the right.</li>
          <li>The row turns into a form — edit whatever you need to.</li>
          <li>Click the check mark to save, or the X to cancel.</li>
        </ol>
        <Tip>
          When you rename a category, every post that was in it gets automatically moved to the new name. You don&apos;t need to update each post one by one.
        </Tip>
        <p>
          The <strong>Order</strong> column controls the order categories appear in on the public site&apos;s &ldquo;Browse by category&rdquo; grid. Lower numbers come first. If two categories have the same number, they&apos;re sorted alphabetically.
        </p>
      </Section>

      <Section id="media-library" Icon={ImageIcon} title="The Media library">
        <p>
          Every time you upload a picture (cover image or inside a post) or any other file, the website remembers it and adds it to the Media library at <strong>Media</strong> in the sidebar.
        </p>
        <p>What you can do there:</p>
        <ul>
          <li><strong>See everything you&apos;ve uploaded</strong> — pictures show as little previews, videos show a frame, files show an icon.</li>
          <li><strong>Filter</strong> — the buttons at the top (<em>all / images / video / audio / files</em>) narrow the list.</li>
          <li><strong>Copy URL</strong> — gives you the web address of a file so you can paste it elsewhere.</li>
          <li><strong>Open</strong> — opens the file in a new tab.</li>
          <li><strong>Delete</strong> — removes the file (with a confirmation pop-up first).</li>
          <li><strong>Upload media</strong> — the button at the top right lets you upload files without writing a post. Useful for staging things ahead of time.</li>
        </ul>
        <Warn>
          If you delete a picture or file here and a published post is using it, the post will show a broken image where that picture used to be. Be careful — when in doubt, leave it alone.
        </Warn>
      </Section>

      <Section id="site-settings" Icon={SettingsIcon} title="Site settings (in plain English)">
        <p>The Settings page has several sections. Here&apos;s what each option does:</p>

        <p><strong>Featured &amp; display:</strong></p>
        <ul>
          <li><strong>Featured post</strong> — the lead post at the top of the Academy page. Leave empty for &ldquo;use the most recent one automatically&rdquo;.</li>
          <li><strong>Pinned post</strong> — a second post that appears in a guaranteed spot just below the featured one. Leave empty for no pinned post.</li>
          <li><strong>Latest rail size</strong> — how many posts to show in the recent-pieces strip on the Academy. 5 is normal. Setting it to 0 means &ldquo;show everything&rdquo;.</li>
          <li><strong>Newsletter section</strong> — turns the &ldquo;Get the next piece in your inbox&rdquo; signup form at the bottom of the Academy page on or off.</li>
        </ul>

        <p><strong>SEO defaults</strong> (search engines &amp; social shares):</p>
        <ul>
          <li><strong>Site title</strong> — the text in the browser tab and Google search results. If empty, a sensible default is used.</li>
          <li><strong>Tagline</strong> — appears under the site name in social-media share previews.</li>
          <li><strong>Meta description</strong> — the short paragraph that appears under the site name in Google search results.</li>
        </ul>

        <p><strong>Public links:</strong></p>
        <ul>
          <li><strong>LinkedIn URL</strong> — the address of your LinkedIn company page. Used for the slim LinkedIn icon on the edge of every public page.</li>
          <li><strong>Contact note</strong> — an optional short message shown on the contact page (e.g. &ldquo;Out of office until 25 Dec&rdquo;).</li>
        </ul>

        <p>
          After changing anything, click <strong>Save settings</strong> at the bottom right. You&apos;ll see a small green ✓ Saved confirmation.
        </p>
        <Tip>
          The <strong>Reset to defaults</strong> link at the bottom-left clears every field in this form back to its default. It doesn&apos;t apply until you click <strong>Save settings</strong> — so feel free to experiment.
        </Tip>
      </Section>

      <Section id="deleting" Icon={Trash2} title="Deleting things safely">
        <p>Three kinds of things can be deleted, with different rules:</p>
        <ul>
          <li>
            <strong>Posts</strong> — click the trash icon on a post row in the Posts list. You&apos;ll get a confirmation pop-up. Once you confirm, the post is <strong>gone forever</strong> — there&apos;s no recycle bin.
          </li>
          <li>
            <strong>Media files</strong> — click the trash icon on any item in the Media library. Same thing: a confirmation, then it&apos;s gone. If a published post was using that file, the post will show a broken image where the file was.
          </li>
          <li>
            <strong>Categories</strong> — categories that have posts in them <em>can&apos;t</em> be deleted directly. If you click the trash icon on a category that has posts, you&apos;ll get a popup asking you to <strong>reassign</strong> those posts to another category first. Pick the target, tick the &ldquo;delete after&rdquo; box, and click <em>Move posts</em>.
          </li>
        </ul>
        <Warn>
          There is no undo for any deletion. When in doubt, just unpublish the post instead of deleting it — that hides it from the public but keeps it as a draft you can come back to.
        </Warn>
      </Section>

      <Section id="oops" Icon={HelpCircle} title="When something goes wrong">
        <p>Most problems are small. Try these in order:</p>
        <ol>
          <li><strong>Refresh the page.</strong> Ctrl+R on Windows, Cmd+R on Mac. This fixes most weirdness.</li>
          <li><strong>Did you save?</strong> If you made changes but they aren&apos;t showing up, you might have forgotten to click Save draft or Publish.</li>
          <li><strong>Hard refresh.</strong> Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac. This clears the browser&apos;s cache and forces a fresh load.</li>
          <li><strong>Sign out and back in.</strong> Bottom of the left sidebar. Sometimes a stale session is the culprit.</li>
        </ol>
        <p>Common things that aren&apos;t actually problems:</p>
        <ul>
          <li>
            <strong>&ldquo;My post isn&apos;t on the public website!&rdquo;</strong> — it&apos;s probably still a Draft. Go to Posts list and check the Status column. If it says Draft, click into the post and hit Publish.
          </li>
          <li>
            <strong>&ldquo;I uploaded a video but it&apos;s slow to play.&rdquo;</strong> — videos are large files; the first time someone watches it, it has to download. Subsequent views are faster.
          </li>
          <li>
            <strong>&ldquo;Why is the URL of my post looking weird?&rdquo;</strong> — the URL (slug) is built from the title. Spaces become hyphens, special characters get removed. That&apos;s normal. You can change it manually in the editor under the slug field (click the lock to unlock).
          </li>
        </ul>
        <p>
          If something more serious is happening — error messages, things not saving, blank screens — your developer is the next stop. Take a screenshot of the error if you can, it helps them figure out what&apos;s up.
        </p>
        <Tip>
          You can&apos;t break the website by clicking around. The worst thing you can do is delete something permanently. If you stay out of the trash icons until you&apos;re sure, you&apos;re safe.
        </Tip>
      </Section>
    </>
  )
}

/* ───────────────────────────────────────────────
   ADVANCED GUIDE — for developers / maintainers
   The full technical reference.
   ─────────────────────────────────────────────── */

function AdvancedGuide() {
  return (
    <>
      <Section id="overview" Icon={LayoutDashboard} title="Overview & layout">
        <p>
          The admin is split into six screens, each accessible from the left sidebar:
        </p>
        <ul>
          <li><strong>Dashboard</strong> — at-a-glance numbers, recent activity, current site config, and quick actions.</li>
          <li><strong>Posts</strong> — the list of every post (draft and published). Click a row to open the editor.</li>
          <li><strong>Media</strong> — every file ever uploaded through the editor or thumbnail picker.</li>
          <li><strong>Categories</strong> — the canonical list of post categories with illustrations, slugs, descriptions, and post counts.</li>
          <li><strong>Settings</strong> — the singleton site config: featured/pinned post, latest-rail size, newsletter toggle, SEO defaults, public links.</li>
          <li><strong>Guide</strong> — this page.</li>
        </ul>
        <p>
          Authentication is a single admin account, stored in <code>ADMIN_USERNAME</code> / <code>ADMIN_PASSWORD</code> env vars. The session cookie is <code>lawshaoor_admin</code> (httpOnly, signed by <code>SESSION_SECRET</code>). Middleware at <code>middleware.ts</code> gates <code>/admin/*</code> and <code>/api/admin/*</code> (excluding <code>/admin/login</code> and <code>/api/admin/login</code>).
        </p>
        <Tip>
          The session cookie is not rotated automatically — if you suspect a credential leak, change <code>SESSION_SECRET</code> in your environment (forces every existing session to invalidate) and redeploy.
        </Tip>
      </Section>

      <Section id="dashboard-adv" Icon={LayoutDashboard} title="Dashboard">
        <p>The dashboard shows three blocks:</p>
        <ol>
          <li>
            <strong>Numbers strip</strong> — clickable counters for total posts, drafts, published, categories, and media files. Each tile jumps to the relevant list.
          </li>
          <li>
            <strong>Recently updated</strong> — the last 5 posts you touched. Click the title to open the editor.
          </li>
          <li>
            <strong>Site config snapshot</strong> — pulled from <code>/admin/settings</code> so you can verify what the public Academy is currently doing without leaving the dashboard.
          </li>
        </ol>
        <p>
          All counts are computed on every page load (server-side, against MongoDB) — no caching. A brand-new post appears here the moment you click <em>New post</em>.
        </p>
      </Section>

      <Section id="posts-adv" Icon={FileText} title="Posts (list)">
        <p>
          <code>/admin/posts</code> is a flat table of every post sorted by last-updated descending. Each row:
        </p>
        <ul>
          <li><strong>Title</strong> + slug — clicking opens the editor.</li>
          <li><strong>Category</strong> — current bucket.</li>
          <li><strong>Status</strong> — <code>Live</code> or <code>Draft</code>.</li>
          <li><strong>Updated</strong> — relative date.</li>
          <li>
            <strong>Actions</strong> —
            <code>↗</code> opens the post on the public Academy (live posts only),
            <code>✎</code> opens the editor,
            <code>🗑</code> permanently deletes the post (with a confirm dialog).
          </li>
        </ul>
        <p>
          Clicking <strong>New post</strong> in the header POSTs to <code>/api/admin/posts</code>, which picks a unique slug suffix (<code>untitled-&lt;timestamp36&gt;</code>) so the new draft never collides with existing posts, then redirects you to the editor.
        </p>
        <Warn>
          Delete is permanent. No soft-delete, no trash. The MongoDB record is removed and any media URLs embedded in the post become orphaned (still served by their host, but unreferenced).
        </Warn>
      </Section>

      <Section id="editor" Icon={FileText} title="Post editor">
        <p>
          The editor at <code>/admin/posts/[id]/edit</code> has three regions:
        </p>
        <ol>
          <li><strong>Top bar</strong> — title status (saving / saved at), Save draft, Publish, and Unpublish.</li>
          <li><strong>Canvas (left, wide)</strong> — the BlockNote document body.</li>
          <li><strong>Right panel</strong> — two tabs: <em>Block</em> properties for whatever is currently focused, and <em>Post</em> properties (title, slug, excerpt, category, thumbnail, SEO).</li>
        </ol>
        <p>
          Saving is manual (Save draft / Publish buttons). No auto-save — failed saves surface as a clear feedback line.
        </p>
        <Tip>
          Publishing for the first time sets <code>publishedAt</code> to <em>now</em>. Republishing after Unpublish keeps the original <code>publishedAt</code> so the post doesn&apos;t jump to the top of the Academy each time.
        </Tip>
      </Section>

      <Section id="editor-blocks" title="— Blocks & formatting">
        <p>
          BlockNote (Notion-style) editor on TipTap + ProseMirror. Type <code>/</code> for the slash menu. Available:
        </p>
        <ul>
          <li>Paragraph, Heading (H1–H3), Bulleted list, Numbered list, Check list, Quote</li>
          <li>Image, File, Video, Audio — see <a href="#editor-media" className="link-line">embedding media</a></li>
          <li>Tables (basic — type <code>/table</code>)</li>
        </ul>
        <p>
          Inline formatting (bold, italic, underline, code, color, link) via the floating toolbar that appears on text selection.
        </p>
        <p>
          The right-panel <strong>Block tab</strong> exposes finer controls: heading level, alignment, text/background color.
        </p>
        <Warn>
          When you re-open a post, blocks pass through <code>sanitizeBlocks()</code> (in <code>lib/models/post.ts</code>). Known block types are preserved verbatim including media URLs. Unknown types get coerced to plain paragraphs. <strong>Inline formatting (bold/italic/links) is stripped on load</strong> and must be re-added before re-save — intentional defensive normalization to dodge renderSpec edge cases.
        </Warn>
      </Section>

      <Section id="editor-slug" title="— Slugs & URLs">
        <p>The slug field has two modes:</p>
        <ul>
          <li>
            <strong>🔒 Auto (default for new posts)</strong> — slug follows the title in real time. Typing in the title updates the slug instantly with normalization (lowercase, spaces → hyphens, non-alphanumeric stripped, collapsed dashes).
          </li>
          <li>
            <strong>🔓 Manual</strong> — toggled by clicking the lock chip or by typing directly in the slug field. Title edits no longer affect the slug. Click the lock to re-sync.
          </li>
        </ul>
        <p>
          Slugs are globally unique (DB-indexed). Saving a slug already in use returns HTTP 409 and the editor surfaces <em>&ldquo;Slug is already in use&rdquo;</em>.
        </p>
        <p>
          Public URL: <code>/lawshaoor-academy/&lt;slug&gt;</code>. Once published, that&apos;s the permalink — be intentional before changing it later (old links will 404).
        </p>
      </Section>

      <Section id="editor-seo" title="— SEO & sharing">
        <p>
          The <strong>SEO</strong> block on the Post tab governs how the post looks in search results and on social shares. All three fields fall back to the post&apos;s title / excerpt / thumbnail if empty.
        </p>
        <ul>
          <li><strong>Meta title</strong> — overrides post title for &lt;title&gt; and OpenGraph.</li>
          <li><strong>Meta description</strong> — search-result snippet. ~155 chars sweet spot.</li>
          <li><strong>OG image</strong> — share-card image. 1200×630 canonical. Uploaded through ImgBB.</li>
        </ul>
        <p>
          Final title format: <code>&lt;meta or post title&gt; · LawShaoor Academy — Law. Strategy. Future.</code> — tagline appended automatically.
        </p>
      </Section>

      <Section id="editor-media" title="— Embedding media">
        <p>To embed media inline:</p>
        <ol>
          <li>Type <code>/image</code>, <code>/file</code>, <code>/video</code>, or <code>/audio</code></li>
          <li>Click the upload affordance in the inserted block</li>
          <li>Pick a file</li>
        </ol>
        <p>
          Mime-type routing: <strong>image/*</strong> → ImgBB, <strong>everything else</strong> → Vercel Blob (private, served through <code>/api/blob/*</code> proxy).
        </p>
        <p>
          The block auto-updates with the returned URL on upload completion. Captions and width settings live on the right Block tab.
        </p>
        <Tip>
          The post-level <strong>Thumbnail</strong> picker (Post tab) is image-only via ImgBB. OG image is the same. Separate from in-body media.
        </Tip>
      </Section>

      <Section id="publishing-adv" title="Publishing flow">
        <p>Header buttons:</p>
        <ul>
          <li><strong>Save draft</strong> — persists in <code>status: 'draft'</code>. Not on public Academy.</li>
          <li><strong>Publish</strong> — persists with <code>status: 'published'</code> and sets <code>publishedAt</code> if not already set. Public Academy is <code>force-dynamic</code> — no rebuild needed.</li>
          <li><strong>Unpublish</strong> — flips status back to <code>draft</code>. <code>publishedAt</code> preserved.</li>
        </ul>
        <p>
          The Academy listing shows only published posts. Settings → Featured post selector lets you pin any post (selecting a draft falls back to most-recent-published since drafts aren&apos;t loaded into the listing).
        </p>
      </Section>

      <Section id="media-adv" Icon={ImageIcon} title="Media library">
        <p>
          <code>/admin/media</code> is a record of every successful upload. Auto-tracked in the <code>media</code> Mongo collection when the upload route succeeds.
        </p>
        <p>Each row shows thumbnail (image / video frame / file icon), filename, MIME type, size, host (ImgBB or Blob), with three actions:</p>
        <ul>
          <li><strong>Copy URL</strong></li>
          <li><strong>Open</strong></li>
          <li><strong>Delete</strong> — removes tracking row + for Vercel Blob, calls <code>del()</code> to remove the underlying blob.</li>
        </ul>
        <p>
          Filter chips: <em>all / images / video / audio / files</em>. The page also supports direct upload via the top-right button.
        </p>
      </Section>

      <Section id="media-hosts" title="— ImgBB vs Vercel Blob">
        <table>
          <thead><tr><th>Aspect</th><th>ImgBB (images)</th><th>Vercel Blob (everything else)</th></tr></thead>
          <tbody>
            <tr><td>Max size</td><td>32 MB</td><td>500 MB</td></tr>
            <tr><td>URL shape</td><td><code>https://i.ibb.co/...</code></td><td><code>/api/blob/posts/...</code></td></tr>
            <tr><td>Access</td><td>Public (URL = key)</td><td>Private — proxied through your server with the token</td></tr>
            <tr><td>Delete from admin</td><td>Tracking row only (ImgBB has no remote delete API)</td><td>Origin file + tracking row</td></tr>
            <tr><td>Required env</td><td><code>IMGBB_API_KEY</code></td><td><code>BLOB_READ_WRITE_TOKEN</code></td></tr>
          </tbody>
        </table>
        <p>
          Blob reads flow through <code>/api/blob/[...path]</code>, which streams bytes back with <code>Content-Type</code>, <code>Content-Length</code>, <code>ETag</code>, and <code>Cache-Control: immutable</code> headers. Aggressive caching is safe because pathnames include a timestamp + random suffix and are never reused.
        </p>
      </Section>

      <Section id="categories-adv" Icon={Tags} title="Categories">
        <p>
          Categories live in their own collection (<code>categories</code>) and are seeded on first connect with six defaults: M&amp;A, Governance, Contracts, Capital, Sector Notes, Opinion.
        </p>
        <p>
          Each row in <code>/admin/categories</code> shows: illustration thumbnail, name, slug, description, post count, display order, actions. Click the pencil to switch to inline-edit.
        </p>
        <ul>
          <li><strong>Name</strong> — uniqueness enforced (case-insensitive, trimmed). Renaming cascades via <code>posts.updateMany</code>.</li>
          <li><strong>Slug</strong> — editable. Defaults to <code>toSlug(name)</code>. Globally unique. Changes the public URL.</li>
          <li><strong>Description</strong> — shown on the public category page.</li>
          <li><strong>Order</strong> — sort order in admin lists and the public &ldquo;Browse by category&rdquo; grid.</li>
          <li><strong>Illustration</strong> — picked from a curated set of 12 atomic primitives.</li>
        </ul>
        <p>
          <strong>Posts reference categories by name string</strong>, not <code>_id</code>. Deliberate tradeoff — queries stay simple, but renaming requires the server-side cascade.
        </p>
      </Section>

      <Section id="cat-illos" title="— Illustrations">
        <p>
          The illustration grid in the edit panel lets you pick a visual identity. Selection stored as a short key (e.g. <code>circles-in-circumference</code>) on the category doc.
        </p>
        <p>Source of truth: <code>components/illustrations/registry.tsx</code>. Exports:</p>
        <ul>
          <li><code>ILLUSTRATIONS</code> — array of <code>{`{ key, label, Component }`}</code> entries.</li>
          <li><code>getIllustration(key)</code> — used by the public Academy. Falls back to <code>CirclesInCircumference</code> on unknown/missing.</li>
        </ul>
        <p>
          The public Academy reads <code>illustrationKey</code> from MongoDB at render and passes it through to the relevant card. Adding a new illustration is one entry in <code>ILLUSTRATIONS</code> — no other wiring required.
        </p>
      </Section>

      <Section id="cat-reassign" title="— Reassign & delete">
        <p>
          You can&apos;t delete a category that has posts. Delete on a row with <code>postCount &gt; 0</code> opens the <strong>Reassign</strong> dialog instead.
        </p>
        <ol>
          <li>Pick a target category (dropdown of all others with current post counts).</li>
          <li>Tick or untick <em>Delete the source category after the move</em>. Default: ticked.</li>
          <li>Hit <strong>Move posts</strong>. Server runs <code>posts.updateMany</code>, then deletes source if asked.</li>
        </ol>
        <p>
          Untick the box to merge without deleting. The arrows icon on a row with posts always opens the reassign dialog directly.
        </p>
        <Warn>
          No undo. Re-tagging is atomic at the DB level but the original association is gone. Snapshot affected posts before clicking <em>Move posts</em> if you&apos;re nervous.
        </Warn>
      </Section>

      <Section id="settings-adv" Icon={SettingsIcon} title="Settings">
        <p>
          <code>/admin/settings</code> writes to a single document (<code>_id: 'site'</code>). Public routes that need config call <code>getSiteSettings()</code> from <code>lib/server/settings.ts</code> — falls back to <code>DEFAULT_SETTINGS</code> on DB failure so public never 500s.
        </p>
        <p><strong>Featured &amp; display:</strong></p>
        <ul>
          <li><code>featuredPostId</code> — overrides the &ldquo;first published&rdquo; pick.</li>
          <li><code>pinnedPostId</code> — top of the editorial rail.</li>
          <li><code>latestLimit</code> — editorial rail size. 0 = unlimited.</li>
          <li><code>showNewsletter</code> — toggle the newsletter block.</li>
        </ul>
        <p><strong>SEO defaults:</strong> <code>siteTitle</code>, <code>siteTagline</code>, <code>metaDescription</code>.</p>
        <p><strong>Public links:</strong> <code>linkedInUrl</code>, <code>contactNote</code>.</p>
        <p>
          <em>Reset to defaults</em> re-sets every field to <code>DEFAULT_SETTINGS</code> in the form. Doesn&apos;t persist until save.
        </p>
      </Section>

      <Section id="public-routes" Icon={Search} title="Public routes">
        <ul>
          <li><code>/</code> — homepage</li>
          <li><code>/our-story</code> — about the firm</li>
          <li><code>/practice-areas</code> — twelve practice areas, anchor-jumpable</li>
          <li><code>/people</code> — team bios</li>
          <li><code>/contact</code> — contact form (form submit is a stub — wire up if you need email)</li>
          <li><code>/lawshaoor-academy</code> — Academy listing</li>
          <li><code>/lawshaoor-academy/&lt;slug&gt;</code> — individual post</li>
          <li><code>/lawshaoor-academy/c/&lt;category-slug&gt;</code> — category landing</li>
        </ul>
        <p>
          Every public Academy route is <code>dynamic = 'force-dynamic'</code> — admin changes show up immediately, no rebuild required.
        </p>
      </Section>

      <Section id="tagline" title="Tagline &amp; brand">
        <p>The firm&apos;s tagline <strong>&ldquo;Law. Strategy. Future.&rdquo;</strong> appears in four places by design:</p>
        <ol>
          <li><strong>SEO metadata</strong> — site title and OpenGraph/Twitter cards.</li>
          <li><strong>Footer</strong> — caps line directly under the LAWSHAOOR wordmark.</li>
          <li><strong>Home page manifesto</strong> — closing pinned word.</li>
          <li><strong>Blog post signature</strong> — under the &ldquo;LS&rdquo; mark at the end of every Academy post.</li>
        </ol>
        <p>
          If you change the tagline, update those four places. Search the codebase for &ldquo;Law. Strategy. Future.&rdquo;.
        </p>
      </Section>

      <Section id="env" title="Environment variables">
        <table>
          <thead><tr><th>Variable</th><th>Required</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code>ADMIN_USERNAME</code></td><td>yes</td><td>Username for <code>/admin/login</code></td></tr>
            <tr><td><code>ADMIN_PASSWORD</code></td><td>yes</td><td>Password for <code>/admin/login</code></td></tr>
            <tr><td><code>SESSION_SECRET</code></td><td>yes</td><td>iron-session cookie secret — <strong>min 32 chars</strong>. Generate with <code>openssl rand -hex 32</code>.</td></tr>
            <tr><td><code>MONGODB_URI</code></td><td>yes</td><td>Atlas connection string. Include the DB name in the path.</td></tr>
            <tr><td><code>IMGBB_API_KEY</code></td><td>yes</td><td>Image uploads. <a href="https://api.imgbb.com/" target="_blank" rel="noopener">api.imgbb.com</a>.</td></tr>
            <tr><td><code>BLOB_READ_WRITE_TOKEN</code></td><td>recommended</td><td>Non-image uploads. Auto-injected on Vercel when you connect a Blob store.</td></tr>
          </tbody>
        </table>
        <Warn>
          On Vercel, env-var changes don&apos;t trigger a restart. After editing env vars, redeploy.
        </Warn>
      </Section>

      <Section id="deployment" title="Deployment">
        <p>First-deploy checklist (Vercel):</p>
        <ol>
          <li>Push to GitHub. Connect the repo in Vercel.</li>
          <li>Add all env vars from <code>.env.example</code> (Production + Preview).</li>
          <li><strong>MongoDB Atlas → Network Access → add <code>0.0.0.0/0</code>.</strong> Vercel functions don&apos;t have stable IPs.</li>
          <li>Verify <code>pnpm-lock.yaml</code> committed so the <code>prosemirror-model</code> override resolves identically.</li>
          <li>Vercel → Storage → Create a Blob store → Connect to project. Auto-injects <code>BLOB_READ_WRITE_TOKEN</code>.</li>
          <li>If you need seed posts, run <code>pnpm seed:posts</code> locally with prod <code>MONGODB_URI</code>.</li>
        </ol>
        <p>
          SSL alert 80 from Mongo right after deploy: Atlas free-tier cluster still resuming. Wait 2–3 minutes, redeploy.
        </p>
      </Section>

      <Section id="troubleshooting" title="Troubleshooting">
        <Trouble q="The editor crashes on first load with “renderSpec” error">
          <code>prosemirror-model</code> 1.25.x got installed instead of 1.24.1. Verify the <code>pnpm.overrides</code> block in <code>package.json</code> is intact and <code>pnpm-lock.yaml</code> is committed.
        </Trouble>
        <Trouble q="Image blocks don't reappear when I re-open a saved post">
          Already fixed — <code>sanitizeBlocks()</code> in <code>lib/models/post.ts</code> preserves <code>image</code>/<code>file</code>/<code>video</code>/<code>audio</code> blocks with their props.
        </Trouble>
        <Trouble q="Video / file upload fails with “ImgBB rejected upload”">
          BlockNote&apos;s <code>uploadFile</code> is hitting the route but <code>BLOB_READ_WRITE_TOKEN</code> is missing. Add it and restart.
        </Trouble>
        <Trouble q="Admin /admin redirects me to /admin/login over and over">
          <code>SESSION_SECRET</code> is &lt;32 chars or different between requests. Set a stable value ≥32 chars.
        </Trouble>
        <Trouble q='Editing a category name doesn"t update the public page right away'>
          The Academy is <code>force-dynamic</code> so it should be instant — but the CDN may be holding the response. Hard refresh.
        </Trouble>
        <Trouble q="Settings page errors with “Module not found: server-only”">
          Run <code>pnpm install</code> — the <code>server-only</code> package needs to be in <code>node_modules</code>.
        </Trouble>
      </Section>

      <Section id="gotchas" title="Critical gotchas">
        <p>The things most likely to bite if you start refactoring:</p>
        <ol>
          <li>
            <strong><code>pnpm.overrides.prosemirror-model = "1.24.1"</code></strong> in <code>package.json</code>. 1.25.x breaks every TipTap/BlockNote node. Don&apos;t remove.
          </li>
          <li>
            <strong>Mantine peer deps must be explicit.</strong> <code>@mantine/core</code> and <code>@mantine/hooks</code> are direct deps because pnpm doesn&apos;t auto-install peers.
          </li>
          <li>
            <strong>Editor must stay client-only.</strong> <code>useCreateBlockNote</code> touches <code>window</code>. Editor is loaded via <code>editor-loader.tsx</code> with <code>next/dynamic({`{ ssr: false }`})</code>.
          </li>
          <li>
            <strong><code>serverExternalPackages</code> in <code>next.config.mjs</code></strong> — <code>@blocknote/server-util</code>, <code>jsdom</code>, <code>mongodb</code> must not be bundled for server components.
          </li>
          <li>
            <strong>Don&apos;t put DB code in <code>lib/models/*</code>.</strong> Those files are pure types/schemas and may be imported by client components. DB-touching helpers go in <code>lib/server/*</code> with <code>import 'server-only'</code>.
          </li>
          <li>
            <strong>Posts reference categories by name string</strong>, not <code>_id</code>. Be aware when writing queries or admin scripts.
          </li>
        </ol>
        <Tip>
          There&apos;s a parallel reference at the repo root in <code>CLAUDE.md</code> meant for AI agents — keep it in sync with this guide if you change architectural conventions.
        </Tip>
      </Section>
    </>
  )
}

/* ───────────────────────────────────────────────
   Shared rendering helpers
   ─────────────────────────────────────────────── */

function Section({
  id,
  title,
  Icon,
  children,
}: {
  id: string
  title: string
  Icon?: typeof FileText
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-12 space-y-4">
      <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] flex items-center gap-3 pb-2 border-b border-foreground/15">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        <span>{title}</span>
      </h2>
      <div className="space-y-4 font-heading text-foreground/85 leading-relaxed tracking-[-0.005em]">
        {children}
      </div>
    </section>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm">
      <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-primary mb-1">Tip</p>
      <div>{children}</div>
    </div>
  )
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm">
      <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-destructive mb-1">Heads up</p>
      <div>{children}</div>
    </div>
  )
}

function Trouble({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="border border-foreground/15 bg-background-alt/30 p-4 space-y-2">
      <p className="font-display text-base tracking-[-0.015em] flex gap-2">
        <span className="text-primary">Q.</span>
        <span>{q}</span>
      </p>
      <div className="text-sm pl-5">{children}</div>
    </div>
  )
}
