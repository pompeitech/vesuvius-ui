import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/locales'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { SiteHeader } from '@/components/site-header'
import { HomeContent } from '@/components/home-content'
import uiPackage from '../../../../../packages/ui/package.json'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <HomeContent locale={locale} dict={dict} version={uiPackage.version} />
    </>
  )
}
