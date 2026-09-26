import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/locales'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getSidebarSections } from '@/lib/sidebar-tree'
import { DocsShell } from '@/components/docs-shell'

export default async function DocsLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const sections = getSidebarSections(locale, dict)

  return (
    <DocsShell locale={locale} dict={dict} sections={sections}>
      {children}
    </DocsShell>
  )
}
