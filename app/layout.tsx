import type { Metadata } from 'next'
import { Questrial } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider, ThemeScript } from '@/components/theme-provider'
import { SiteTracker } from '@/components/analytics/site-tracker'
import './globals.css'

/* The site font is Century Gothic (see --font-century in globals.css). It is
   not on Google Fonts, so Questrial — the closest free match — is the fallback for
   devices without it. preload:false so it only downloads when actually used. */
const questrial = Questrial({
  subsets: ['latin'],
  variable: '--font-fallback',
  display: 'swap',
  preload: false,
  weight: '400',
})

export const metadata: Metadata = {
  title: {
    default: 'LawShaoor Chambers — Law. Strategy. Future.',
    template: '%s · LawShaoor Chambers',
  },
  description: 'LawShaoor Chambers — the law firm for Pakistan’s next economy. A specialist Islamabad law firm advising businesses, financial institutions, investors and technology companies on technology, fintech, corporate, regulatory and disputes. In strategic partnership with M.B. KEMP (ME) LLP — Abu Dhabi, Dubai, London, Milan, Hong Kong.',
  keywords: ['LawShaoor Chambers', 'Law Strategy Future', 'Islamabad law Chambers', 'Pakistan corporate law', 'M.B. KEMP (ME) LLP', 'fintech law Pakistan', 'technology law Pakistan', 'banking and finance law', 'energy law Pakistan', 'white-collar defence Pakistan', 'Pakistan GCC cross-border', 'dispute resolution Pakistan', 'DIFC ADGM advisory'],
  openGraph: {
    title: 'LawShaoor Chambers — Law. Strategy. Future.',
    description: 'The law firm for Pakistan’s next economy. A specialist Islamabad law firm, in strategic partnership with M.B. KEMP (ME) LLP — Abu Dhabi, Dubai, London, Milan, Hong Kong.',
    siteName: 'LawShaoor Chambers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LawShaoor Chambers — Law. Strategy. Future.',
    description: 'The law firm for Pakistan’s next economy. Law. Strategy. Future.',
  },
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/ls-logo-1x1.png', type: 'image/png' }],
    shortcut: '/ls-logo-1x1.png',
    apple: '/ls-logo-1x1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={questrial.variable}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript defaultTheme="light" attribute="class" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <SiteTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
