// Builds public/search-index/<locale>.json — one entry per doc page, plain
// text extracted from the MDX body (headings/prose only, JSX/code stripped)
// via a remark-only pass, same technique as src/lib/toc.ts. Loaded and
// indexed client-side by FlexSearch in components/search-dialog.tsx — no
// server/hosted search service, matching what the Docusaurus site's local
// search plugin already did (and the user explicitly wanted kept).
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { visit } from 'unist-util-visit'
import { toString as mdastToString } from 'mdast-util-to-string'
import { LOCALES } from '../src/lib/i18n/locales'
import { getAllDocSlugs, getDocPage } from '../src/lib/content'

type SearchEntry = {
  id: string
  url: string
  title: string
  breadcrumb: string
  content: string
}

const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm)

function extractPlainText(markdown: string): string {
  const tree = parser.parse(markdown)
  const parts: string[] = []
  visit(tree, node => {
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      // Skip JSX element attributes/props; still walk into their children
      // below for plain markdown text nested inside (e.g. <Alert>text</Alert>).
      return
    }
    if (node.type === 'heading' || node.type === 'paragraph' || node.type === 'listItem') {
      const text = mdastToString(node).trim()
      if (text) parts.push(text)
    }
  })
  return parts.join(' ').replace(/\s+/g, ' ').slice(0, 4000)
}

function buildLocale(locale: (typeof LOCALES)[number]) {
  const entries: SearchEntry[] = []

  for (const slug of getAllDocSlugs()) {
    const page = getDocPage(locale, slug)
    if (!page) continue

    const url = `/${locale}/docs/${slug.join('/')}`
    const breadcrumb = slug.slice(0, -1).join(' / ')
    entries.push({
      id: url,
      url,
      title: page.frontmatter.title,
      breadcrumb,
      content: extractPlainText(page.content)
    })
  }

  const outDir = path.join(process.cwd(), 'public', 'search-index')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, `${locale}.json`), JSON.stringify(entries), 'utf-8')
  console.log(`[search-index] ${locale}: ${entries.length} pages`)
}

for (const locale of LOCALES) buildLocale(locale)
