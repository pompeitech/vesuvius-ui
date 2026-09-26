'use client'

import Link from 'next/link'
import { Button } from '@pompeitech/vesuvius-ui'
import { DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { getDictionary } from '@/lib/i18n/get-dictionary'

// Segment-level not-found can't read the [locale] param reliably in every
// Next.js version, so this falls back to the default locale's strings —
// acceptable for a 404 page.
export default function NotFound() {
  const dict = getDictionary(DEFAULT_LOCALE)
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg font-medium">{dict.notFound.title}</p>
      <p className="text-muted-foreground">{dict.notFound.description}</p>
      <Button asChild>
        <Link href={`/${DEFAULT_LOCALE}/docs`}>{dict.notFound.backHome}</Link>
      </Button>
    </main>
  )
}
