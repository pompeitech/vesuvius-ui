import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { getAllDocSlugs, getDocPage } from '@/lib/content'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n/locales'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getSidebarSections, flattenLeaves } from '@/lib/sidebar-tree'
import { extractToc } from '@/lib/toc'
import type { MDXComponents } from 'mdx/types'
import { mdxOptions } from '@/lib/mdx-options'
import ComponentPreview from '@/components/component-preview'
import { ThemePalette } from '@/components/theme-palette'
import { MdxTabs, TabItem } from '@/components/mdx-tabs'
import * as VesuviusClient from '@/components/vesuvius-client'
import * as VesuviusServerSafe from '@/lib/vesuvius-server-safe'
import { Demo } from '@/components/mdx-demos'
import { TocNav } from '@/components/toc-nav'
import { CategoryIndex } from '@/components/category-index'

// Assembled here, at the actual MDXRemote call site (a Server Component) —
// see vesuvius-client.ts's own comment for why this can't be pre-built as
// an object inside a "use client" file and imported as data instead. Cast
// through `unknown`: the merged object also carries VesuviusClient's
// non-component exports (cva variant fns, `cn`, the `COLOR_THEMES` array,
// …), which MDXComponents' type doesn't allow mixed in — harmless at
// runtime (MDX only ever looks up the tag names it actually encounters).
const mdxComponents = {
  ...LucideIcons,
  ...VesuviusClient,
  ThemePalette,
  Tabs: MdxTabs,
  TabItem,
  ComponentPreview,
  Demo
} as unknown as MDXComponents
const mdxScope = { ...LucideIcons, ...VesuviusClient, ...VesuviusServerSafe }

const TIER_SLUGS = ['atoms', 'molecules', 'organisms'] as const

function tierFromSlug(slug: string[]): (typeof TIER_SLUGS)[number] | null {
  if (slug.length === 2 && slug[0] === 'components') {
    return (TIER_SLUGS as readonly string[]).includes(slug[1]!)
      ? (slug[1] as (typeof TIER_SLUGS)[number])
      : null
  }
  return null
}

export function generateStaticParams() {
  const slugs = getAllDocSlugs()
  const tierSlugs = TIER_SLUGS.map(tier => ['components', tier])
  return LOCALES.flatMap(locale => [...slugs, ...tierSlugs].map(slug => ({ locale, slug })))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}) {
  const { locale, slug = [] } = await params
  if (!isLocale(locale)) return {}
  const tier = tierFromSlug(slug)
  if (tier) {
    const dict = getDictionary(locale)
    return { title: dict.sidebar[tier] }
  }
  const page = getDocPage(locale, slug)
  if (!page) return {}
  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description
  }
}

export default async function DocPage({
  params
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}) {
  const { locale, slug = [] } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)

  const tier = tierFromSlug(slug)
  if (tier) {
    return <CategoryIndex locale={locale} tierSlug={tier} title={dict.sidebar[tier]} />
  }

  const page = getDocPage(locale, slug)
  if (!page) notFound()
  const toc = extractToc(page.content)
  const sections = getSidebarSections(locale, dict)
  const leaves = flattenLeaves(sections)
  const currentIndex = leaves.findIndex(leaf => leaf.slug.join('/') === slug.join('/'))
  const prev = currentIndex > 0 ? leaves[currentIndex - 1] : undefined
  const next =
    currentIndex >= 0 && currentIndex < leaves.length - 1 ? leaves[currentIndex + 1] : undefined

  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1">
        {page.isFallback && (
          <div className="border-warning/40 bg-warning/10 text-warning-foreground mb-6 rounded-md border px-4 py-3 text-sm">
            {dict.fallback.notice}
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{page.frontmatter.title}</h1>
          {page.frontmatter.description && (
            <p className="text-muted-foreground mt-2 text-lg">{page.frontmatter.description}</p>
          )}
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote
            source={page.content}
            components={mdxComponents}
            options={{
              mdxOptions,
              disableImports: true,
              disableExports: false,
              scope: mdxScope
            }}
          />
        </div>
        {(prev || next) && (
          <div className="border-border mt-12 flex items-center justify-between border-t pt-6 text-sm">
            {prev ? (
              <Link
                href={`/${locale}/docs/${prev.slug.join('/')}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <ArrowLeftIcon className="size-4" />
                <span>
                  <span className="block text-xs">{dict.page.previous}</span>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/${locale}/docs/${next.slug.join('/')}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-right transition-colors"
              >
                <span>
                  <span className="block text-xs">{dict.page.next}</span>
                  {next.title}
                </span>
                <ArrowRightIcon className="size-4" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </article>
      <TocNav entries={toc} title={dict.toc.onThisPage} />
    </div>
  )
}

export type { Locale }
