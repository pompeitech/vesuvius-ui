import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ThemeProvider, Toaster } from '@/components/app-theme-provider'
import { LOCALES, isLocale, type Locale } from '@/lib/i18n/locales'
import '../globals.css'

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
    var colorTheme = ["lava", "stripe", "vercel", "supabase", "linear", "claude", "amber-minimal", "claymorphism", "alpine", "aubergine"].includes(storedColorTheme)
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* dangerouslySetInnerHTML: static, no user input */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-background text-foreground min-h-svh antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export type { Locale }
