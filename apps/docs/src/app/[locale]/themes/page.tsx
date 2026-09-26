import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { ThemeCard } from '@/components/theme-showcase'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { isLocale } from '@/lib/i18n/locales'
import { THEME_CATALOG } from '@/lib/theme-catalog'

export default async function ThemesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <BadgeLine label={dict.themePages.badge} />
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            {dict.themePages.listTitle}
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-8">
            {dict.themePages.listDescription}
          </p>
        </section>
        <section className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {THEME_CATALOG.map(theme => (
            <ThemeCard key={theme.name} theme={theme} locale={locale} dict={dict} />
          ))}
        </section>
      </main>
    </>
  )
}

function BadgeLine({ label }: { label: string }) {
  return (
    <div className="border-border bg-muted/50 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium">
      <span className="bg-primary size-2 rounded-full" /> {label}
    </div>
  )
}
