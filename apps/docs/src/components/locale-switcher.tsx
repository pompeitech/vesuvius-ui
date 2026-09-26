'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LOCALES, type Locale } from '@/lib/i18n/locales'
import { cn } from '@pompeitech/vesuvius-ui'

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  function hrefFor(target: Locale) {
    const rest = pathname.replace(/^\/(en|it)/, '')
    return `/${target}${rest}`
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {LOCALES.map(l => (
        <Link
          key={l}
          href={hrefFor(l)}
          className={cn(
            'rounded-md px-1.5 py-1 uppercase transition-colors',
            l === locale
              ? 'font-semibold text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  )
}
