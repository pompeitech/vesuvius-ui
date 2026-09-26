import Link from 'next/link'
import { listDocsInDir } from '@/lib/content'
import type { Locale } from '@/lib/i18n/locales'

/** The Docusaurus site auto-generated one of these per component tier
 * (`{type: "generated-index"}`) instead of a hand-written file — same idea
 * here, just computed directly in the page component instead of a special
 * content-plugin feature, since we own the whole pipeline now. */
export function CategoryIndex({
  locale,
  tierSlug,
  title
}: {
  locale: Locale
  tierSlug: string
  title: string
}) {
  const items = listDocsInDir(['components', tierSlug])

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">{title}</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(item => (
          <Link
            key={item.slug.join('/')}
            href={`/${locale}/docs/${item.slug.join('/')}`}
            className="rounded-lg border border-border p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <span className="font-medium">{item.frontmatter.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
