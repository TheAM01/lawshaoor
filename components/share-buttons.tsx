'use client'

import { useEffect, useState } from 'react'
import { Linkedin, Facebook, Mail, Share2, Link2, Check } from 'lucide-react'

type Props = {
  title: string
  /** Optional override; if not provided, uses window.location.href on mount. */
  url?: string
  excerpt?: string
}

export function ShareButtons({ title, url, excerpt }: Props) {
  const [resolvedUrl, setResolvedUrl] = useState<string>(url ?? '')
  const [canNativeShare, setCanNativeShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!url && typeof window !== 'undefined') {
      setResolvedUrl(window.location.href)
    }
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true)
    }
  }, [url])

  const enc = encodeURIComponent
  const encTitle = enc(title)
  const encUrl = enc(resolvedUrl)
  const encExcerpt = enc(excerpt ?? '')

  const links = {
    x:        `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
    whatsapp: `https://wa.me/?text=${encTitle}%20${encUrl}`,
    email:    `mailto:?subject=${encTitle}&body=${encExcerpt ? encExcerpt + '%0A%0A' : ''}${encUrl}`,
  }

  async function onNativeShare() {
    if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return
    try {
      await navigator.share({ title, text: excerpt, url: resolvedUrl })
    } catch {
      /* User cancelled or share unsupported. */
    }
  }

  async function onCopy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(resolvedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-foreground/55">
        Share
      </span>
      <span className="block w-6 h-px bg-foreground/25" />

      <div className="flex items-center gap-1">
        <ShareIcon href={links.x} label="Share on X">
          <XIcon className="w-4 h-4" />
        </ShareIcon>
        <ShareIcon href={links.linkedin} label="Share on LinkedIn">
          <Linkedin className="w-4 h-4" />
        </ShareIcon>
        <ShareIcon href={links.facebook} label="Share on Facebook">
          <Facebook className="w-4 h-4" />
        </ShareIcon>
        <ShareIcon href={links.whatsapp} label="Share on WhatsApp">
          <WhatsAppIcon className="w-4 h-4" />
        </ShareIcon>
        <ShareIcon href={links.email} label="Share via email" external={false}>
          <Mail className="w-4 h-4" />
        </ShareIcon>

        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy link"
          title={copied ? 'Copied!' : 'Copy link'}
          className="inline-flex items-center justify-center w-9 h-9 border border-foreground/15 hover:border-primary hover:text-primary text-foreground/70 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
        </button>

        {canNativeShare && (
          <button
            type="button"
            onClick={onNativeShare}
            aria-label="Open share menu"
            title="Open share menu"
            className="inline-flex items-center gap-2 px-3 h-9 border border-foreground/15 hover:border-primary hover:text-primary text-foreground/80 transition-colors text-[10px] font-mono tracking-[0.22em] uppercase ml-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  )
}

function ShareIcon({
  href,
  label,
  external = true,
  children,
}: {
  href: string
  label: string
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-9 h-9 border border-foreground/15 hover:border-primary hover:text-primary text-foreground/70 transition-colors"
    >
      {children}
    </a>
  )
}

/* X (formerly Twitter) and WhatsApp aren't in lucide-react. Inline SVGs sized
 *  to match lucide's 24-viewbox 1.5-stroke convention. */

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.665l-5.222-6.823-5.97 6.823H1.66l7.732-8.835L1.25 2.25h6.832l4.72 6.231 5.442-6.231Zm-1.166 17.52h1.833L7.084 4.126H5.117L17.078 19.77Z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3.5 20.5l1.353-4.487a8.5 8.5 0 1 1 3.125 3.135L3.5 20.5Z" />
      <path d="M8.5 9.5c0 4 3 7 7 7" />
      <path d="M8.5 9.5c0-.83.67-1.5 1.5-1.5h.5l1 2-1 1c.4 1 1.5 2.1 2.5 2.5l1-1 2 1v.5c0 .83-.67 1.5-1.5 1.5" />
    </svg>
  )
}
