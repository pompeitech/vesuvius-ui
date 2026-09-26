import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdminKitLanding } from '@/components/admin-kit-landing'
import { SiteHeader } from '@/components/site-header'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { isLocale } from '@/lib/i18n/locales'

export const metadata: Metadata = {
  title: 'Admin Kit',
  description: 'A production-ready React admin kit for dashboards, ecommerce and operations.'
}

export default async function AdminKitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <>
      <SiteHeader locale={locale} dict={getDictionary(locale)} />
      <AdminKitLanding locale={locale} />
    </>
  )
}
