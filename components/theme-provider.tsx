'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

type ThemeCtx = {
  theme: Theme
  setTheme: (t: Theme) => void
  resolvedTheme: ResolvedTheme
  systemTheme: ResolvedTheme | undefined
  themes: Theme[]
}

const ThemeContext = createContext<ThemeCtx | null>(null)

export type ThemeProviderProps = {
  children: React.ReactNode
  /** localStorage key */
  storageKey?: string
  /** Theme to use when nothing is stored */
  defaultTheme?: Theme
  /** When true, "system" is a valid theme */
  enableSystem?: boolean
  /** Attribute applied on <html> ('class' or any data-* attribute) */
  attribute?: 'class' | string
  /** Suppress CSS transitions during theme switch */
  disableTransitionOnChange?: boolean
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStored(key: string): Theme | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(key)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* localStorage may be blocked */
  }
  return null
}

function applyTheme(
  theme: ResolvedTheme,
  attribute: string,
  disableTransitionOnChange: boolean
) {
  const root = document.documentElement
  let cleanup: (() => void) | null = null

  if (disableTransitionOnChange) {
    const style = document.createElement('style')
    style.appendChild(
      document.createTextNode(
        '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
      )
    )
    document.head.appendChild(style)
    cleanup = () => {
      // force reflow, then remove
      window.getComputedStyle(document.body)
      setTimeout(() => document.head.removeChild(style), 1)
    }
  }

  if (attribute === 'class') {
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  } else {
    root.setAttribute(attribute, theme)
  }
  root.style.colorScheme = theme

  cleanup?.()
}

export function ThemeProvider({
  children,
  storageKey = 'theme',
  defaultTheme = 'light',
  enableSystem = true,
  attribute = 'class',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  // Initial value: we cannot read localStorage during SSR, so we use
  // defaultTheme. The inline `<head>` script in layout.tsx has already
  // applied the correct class to <html> before hydration, so there's no
  // visual flash even though this state lags by one tick.
  const [theme, setThemeState] = useState<Theme>(() => readStored(storageKey) ?? defaultTheme)
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme | undefined>(undefined)

  // Track system preference
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemTheme(mql.matches ? 'dark' : 'light')
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? (systemTheme ?? getSystemTheme()) : (theme as ResolvedTheme)

  // Apply to <html> whenever the resolved theme changes
  useEffect(() => {
    applyTheme(resolvedTheme, attribute, disableTransitionOnChange)
  }, [resolvedTheme, attribute, disableTransitionOnChange])

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return
      const v = e.newValue
      if (v === 'light' || v === 'dark' || v === 'system') setThemeState(v)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [storageKey])

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t)
      try {
        window.localStorage.setItem(storageKey, t)
      } catch {
        /* ignore */
      }
    },
    [storageKey]
  )

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
      themes: enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'],
    }),
    [theme, setTheme, resolvedTheme, systemTheme, enableSystem]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    // Lenient fallback so consumers don't crash if the tree forgets the provider.
    return {
      theme: 'light' as Theme,
      setTheme: () => {},
      resolvedTheme: 'light' as ResolvedTheme,
      systemTheme: undefined,
      themes: ['light', 'dark', 'system'] as Theme[],
    }
  }
  return ctx
}

/** Inline script that runs before React hydrates so the correct theme class
 *  is on <html> immediately. Render this once inside <head>. */
export function ThemeScript({
  storageKey = 'theme',
  defaultTheme = 'light',
  attribute = 'class',
}: {
  storageKey?: string
  defaultTheme?: Theme
  attribute?: string
} = {}) {
  const code = `
(function(){
  try{
    var k=${JSON.stringify(storageKey)};
    var def=${JSON.stringify(defaultTheme)};
    var attr=${JSON.stringify(attribute)};
    var t=localStorage.getItem(k)||def;
    if(t==='system'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
    var r=document.documentElement;
    if(attr==='class'){r.classList.remove('light','dark');r.classList.add(t);}
    else{r.setAttribute(attr,t);}
    r.style.colorScheme=t;
  }catch(e){}
})();`.trim()
  return (
    <script
      // suppressHydrationWarning is for SSR/CSR mismatch on the <html> attrs
      // this script writes; the script itself is rendered server-only from
      // a server component (layout.tsx), so React never re-renders it.
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  )
}
