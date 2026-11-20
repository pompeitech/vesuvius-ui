import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
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
      <h1 className="font-heading border-border mb-10 border-b pb-8 text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
        {title}
      </h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(item => (
          <Link
            key={item.slug.join('/')}
            href={`/${locale}/docs/${item.slug.join('/')}`}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary"
          >
            <span className="font-heading font-semibold">{item.frontmatter.title}</span>
            <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  )
}
