import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/locales'

// Redirects `/` and any locale-less path to `/<default-locale>/...`, and
// `/it`→`/it/` normalization. Doesn't try to sniff Accept-Language — a docs
// site's locale is a deliberate reader choice (the site itself offers an
// EN/IT switcher), not something to guess and silently redirect on.
//
// Named (and filed) `proxy`, not `middleware` — Next.js 16 renamed the
// convention; the old name still half-works but logs a deprecation warning
// on every request.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = LOCALES.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (pathnameHasLocale) return

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Skip static assets, images, the search index, and Next internals.
    '/((?!_next|api|search-index|.*\\..*).*)'
  ]
}
