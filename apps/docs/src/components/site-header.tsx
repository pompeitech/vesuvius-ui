'use client'

// Same reasoning as mdx-components.tsx — anything importing
// @pompeitech/vesuvius-ui directly needs to stay client-side (see that
// file's comment for why).
import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import {
  Header,
  HeaderStart,
  HeaderEnd,
  Button,
  ThemeModeToggle,
  ThemePalettePicker,
  SidebarTrigger,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@pompeitech/vesuvius-ui'
import type { Locale } from '@/lib/i18n/locales'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { SearchTrigger } from './search-dialog'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeLogo } from './theme-logo'

function navLinks(locale: Locale, dict: Dictionary) {
  return [
    { href: `/${locale}/docs/intro`, label: dict.nav.docs },
    { href: `/${locale}/themes`, label: dict.nav.themes },
    { href: `/${locale}/admin-kit`, label: dict.nav.adminKit }
  ]
}

function MobileMenu({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={dict.nav.menu}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 gap-0 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle>{dict.nav.menu}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col p-2">
          {navLinks(locale, dict).map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            {dict.nav.github}
          </a>
        </nav>
        <div className="flex flex-col gap-3 border-t p-4">
          <span className="text-muted-foreground text-xs font-medium uppercase">
            {dict.nav.theme}
          </span>
          <ThemePalettePicker className="w-full justify-start [&>svg:last-child]:ml-auto" />
          <LocaleSwitcher locale={locale} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

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
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2">
          <ThemeLogo mark width={24} height={24} className="size-6" />
          <span className="hidden font-semibold whitespace-nowrap sm:inline">Vesuvius UI</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-4 text-sm whitespace-nowrap lg:flex">
          {navLinks(locale, dict).map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </HeaderStart>
      <HeaderEnd className="gap-2">
        <SearchTrigger locale={locale} dict={dict} />
        <div className="hidden lg:flex">
          <LocaleSwitcher locale={locale} />
        </div>
        <ThemePalettePicker className="hidden lg:flex" />
        <ThemeModeToggle />
        <Button variant="ghost" size="sm" className="hidden lg:inline-flex" asChild>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            {dict.nav.github}
          </a>
        </Button>
        <MobileMenu locale={locale} dict={dict} />
      </HeaderEnd>
    </Header>
  )
}
