import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ThemeProvider, Toaster } from '@/components/app-theme-provider'
import { SiteFooter } from '@/components/site-footer'
import { LOCALES, isLocale, type Locale } from '@/lib/i18n/locales'
import '../globals.css'

// Brand typography for the docs site (pompeitech.com uses the same trio).
// Exposed as CSS variables and wired to Vesuvius's --font-sans /
// --font-heading / --font-mono tokens in globals.css.
const fontSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const fontHeading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap'
})
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: { default: 'Vesuvius UI', template: '%s | Vesuvius UI' },
  description: 'A personal design system and component library.'
}

// Runs before hydration (blocking, in <head>) so the very first paint
// already has the right theme — without this, ThemeProvider only applies
// data-theme/.dark client-side on mount, one frame after an unstyled/wrong-
// theme flash. Mirrors ThemeProvider's own storage keys/defaults exactly
// (packages/ui/src/theme/theme-provider.tsx) — keep both in sync if either
// changes.
const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("vesuvius-ui-theme") || "system";
    var resolved = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;
    var storedColorTheme = localStorage.getItem("vesuvius-ui-color-theme");
    var colorTheme = ["lava", "stripe", "vercel", "supabase", "linear", "claude", "amber-minimal", "claymorphism", "alpine", "aubergine", "plinio"].includes(storedColorTheme)
      ? storedColorTheme
      : "lava";
    var root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.dataset.theme = colorTheme;
  } catch (e) {}
})();
`

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable}`}
    >
      <head>
        {/* dangerouslySetInnerHTML: static, no user input */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-background text-foreground min-h-svh antialiased">
        <ThemeProvider>
          {children}
          <SiteFooter locale={locale} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export type { Locale }
