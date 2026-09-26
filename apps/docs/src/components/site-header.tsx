'use client'

// Same reasoning as mdx-components.tsx — anything importing
// @pompeitech/vesuvius-ui directly needs to stay client-side (see that
// file's comment for why).
import Link from 'next/link'
import {
  Header,
  HeaderStart,
  HeaderEnd,
  Button,
  ThemeModeToggle,
  ThemePalettePicker,
  SidebarTrigger
} from '@pompeitech/vesuvius-ui'
import type { Locale } from '@/lib/i18n/locales'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { SearchTrigger } from './search-dialog'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeLogo } from './theme-logo'

export function SiteHeader({
  locale,
  dict,
  showSidebarTrigger = false
}: {
  locale: Locale
  dict: Dictionary
  /** Only the docs section has a Sidebar/SidebarProvider mounted — the
   * marketing homepage doesn't, so SidebarTrigger (which needs that
   * context) would crash there. */
  showSidebarTrigger?: boolean
}) {
  return (
    <Header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <HeaderStart>
        {showSidebarTrigger && <SidebarTrigger className="md:hidden" />}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <ThemeLogo mark width={24} height={24} className="size-6" />
          <span className="hidden font-semibold sm:inline">Vesuvius UI</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-4 text-sm md:flex">
          <Link
            href={`/${locale}/docs/intro`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.nav.docs}
          </Link>
          <Link
            href={`/${locale}/themes`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.nav.themes}
          </Link>
          <Link
            href={`/${locale}/admin-kit`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin Kit
          </Link>
        </nav>
      </HeaderStart>
      <HeaderEnd className="gap-2">
        <SearchTrigger locale={locale} dict={dict} />
        <LocaleSwitcher locale={locale} />
        <ThemePalettePicker className="hidden sm:flex" />
        <ThemeModeToggle />
        <Button variant="ghost" size="sm" asChild>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            {dict.nav.github}
          </a>
        </Button>
      </HeaderEnd>
    </Header>
  )
}
