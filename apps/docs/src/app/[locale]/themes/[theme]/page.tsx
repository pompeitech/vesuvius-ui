import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { ThemeDetail } from '@/components/theme-showcase'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { isLocale } from '@/lib/i18n/locales'
import { getThemeCatalogEntry, THEME_CATALOG } from '@/lib/theme-catalog'

export function generateStaticParams() {
  return ['en', 'it'].flatMap(locale => THEME_CATALOG.map(theme => ({ locale, theme: theme.name })))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; theme: string }>
}): Promise<Metadata> {
  const { locale, theme } = await params
  const entry = getThemeCatalogEntry(theme)
  const dict = isLocale(locale) ? getDictionary(locale) : null
  return entry
    ? {
        title: entry.label,
        description: dict
          ? dict.themeCatalog[theme as keyof typeof dict.themeCatalog].description
          : entry.description
      }
    : { title: 'Theme' }
}

export default async function ThemeDetailPage({
  params
}: {
  params: Promise<{ locale: string; theme: string }>
}) {
  const { locale, theme: themeName } = await params
  if (!isLocale(locale)) notFound()
  const theme = getThemeCatalogEntry(themeName)
  if (!theme) notFound()

  return (
    <>
      <SiteHeader locale={locale} dict={getDictionary(locale)} />
      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <ThemeDetail theme={theme} locale={locale} dict={getDictionary(locale)} />
      </main>
    </>
  )
}
