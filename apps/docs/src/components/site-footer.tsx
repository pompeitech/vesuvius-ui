import Link from 'next/link'
import { Heart } from 'lucide-react'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Locale } from '@/lib/i18n/locales'
import { ThemeLogo } from './theme-logo'

const repositoryUrl = 'https://github.com/pompeitech/vesuvius-ui'

const linkClass = 'text-muted-foreground hover:text-foreground w-fit text-sm transition-colors'

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)

  return (
    // The docs sidebar is `position: fixed` (z-10) and runs to the bottom of
    // the viewport, so the footer sits above it on an opaque surface instead
    // of being covered by it once the page is scrolled to the end.
    <footer className="border-border/70 bg-background relative z-20 border-t">
      <div className="bg-muted/20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:px-10">
        <div className="flex max-w-sm flex-col gap-3">
          <Link href={`/${locale}`} className="flex w-fit items-center gap-2">
            <ThemeLogo mark width={24} height={24} className="size-6" />
            <span className="font-heading font-bold tracking-tight">
              Vesuvius <span className="text-primary">UI</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-6">{dict.footer.tagline}</p>
        </div>
        <nav aria-label={dict.footer.explore} className="flex flex-col gap-2.5">
          <p className="mb-1 font-mono text-xs font-medium tracking-[0.12em] uppercase">
            {dict.footer.explore}
          </p>
          <Link href={`/${locale}/docs/intro`} className={linkClass}>
            {dict.nav.docs}
          </Link>
          <Link href={`/${locale}/themes`} className={linkClass}>
            {dict.nav.themes}
          </Link>
          <Link href={`/${locale}/admin-kit`} className={linkClass}>
            {dict.nav.adminKit}
          </Link>
        </nav>
        <nav aria-label={dict.footer.project} className="flex flex-col gap-2.5">
          <p className="mb-1 font-mono text-xs font-medium tracking-[0.12em] uppercase">
            {dict.footer.project}
          </p>
          <a href={repositoryUrl} target="_blank" rel="noreferrer" className={linkClass}>
            {dict.nav.github}
          </a>
          <a href="https://pompeitech.com" target="_blank" rel="noreferrer" className={linkClass}>
            Pompei Tech
          </a>
        </nav>
      </div>
      <div className="border-border/70 border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-7xl items-center justify-center gap-1.5 px-6 py-5 text-center text-sm lg:px-10">
          <span>{dict.footer.craftedWith}</span>
          <Heart
            aria-label={dict.footer.love}
            className="text-primary size-4 fill-current"
            strokeWidth={1.75}
          />
          <span>{dict.footer.by}</span>
          <a
            href="https://pompeitech.com"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-primary font-medium underline-offset-4 transition-colors hover:underline"
          >
            PompeiTech
          </a>
        </div>
      </div>
      </div>
    </footer>
  )
}
