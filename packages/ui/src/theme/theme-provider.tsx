import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

export type Theme = 'light' | 'dark' | 'system'

export const COLOR_THEMES = [
  'lava',
  'stripe',
  'vercel',
  'supabase',
  'linear',
  'claude',
  'amber-minimal',
  'claymorphism',
  'alpine',
  'aubergine'
] as const

export type ColorTheme = (typeof COLOR_THEMES)[number] | (string & {})

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  defaultColorTheme?: ColorTheme
  colorThemes?: readonly ColorTheme[]
  storageKey?: string
  colorThemeStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  colorThemes: readonly ColorTheme[]
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStored<T extends string>(
  storageKey: string,
  fallback: T,
  isValid: (value: string) => boolean
): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = window.localStorage.getItem(storageKey)
    if (stored && isValid(stored)) return stored as T
  } catch {
    // localStorage unavailable — fall back silently.
  }
  return fallback
}

function writeStored(storageKey: string, value: string) {
  try {
    window.localStorage.setItem(storageKey, value)
  } catch {
    // Ignore write failures.
  }
}

const isTheme = (value: string): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system'

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColorTheme = 'lava',
  colorThemes = COLOR_THEMES,
  storageKey = 'vesuvius-ui-theme',
  colorThemeStorageKey = 'vesuvius-ui-color-theme'
}: ThemeProviderProps) {
  const isKnownColorTheme = useCallback(
    (value: string) => colorThemes.includes(value),
    [colorThemes]
  )

  // Keep the first render identical on the server and in the browser. Browser
  // state is hydrated in the effect below; reading localStorage/matchMedia in
  // a state initializer causes an SSR hydration mismatch.
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(defaultColorTheme)

  useEffect(() => {
    setThemeState(readStored(storageKey, defaultTheme, isTheme))
    setSystemTheme(getSystemTheme())
    setColorThemeState(readStored(colorThemeStorageKey, defaultColorTheme, isKnownColorTheme))
  }, [colorThemeStorageKey, defaultColorTheme, defaultTheme, isKnownColorTheme, storageKey])

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  useEffect(() => {
    document.documentElement.dataset.theme = colorTheme
  }, [colorTheme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const setTheme = useCallback(
    (next: Theme) => {
      writeStored(storageKey, next)
      setThemeState(next)
    },
    [storageKey]
  )

  const setColorTheme = useCallback(
    (next: ColorTheme) => {
      writeStored(colorThemeStorageKey, next)
      setColorThemeState(next)
    },
    [colorThemeStorageKey]
  )

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      colorTheme,
      setColorTheme,
      colorThemes
    }),
    [theme, resolvedTheme, setTheme, colorTheme, setColorTheme, colorThemes]
  )

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
