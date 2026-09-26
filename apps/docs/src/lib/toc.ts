import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import { toString as mdastToString } from 'mdast-util-to-string'
import GithubSlugger from 'github-slugger'
import type { Root, Heading } from 'mdast'

export type TocEntry = {
  id: string
  text: string
  depth: 2 | 3
}

const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm)

/** Independent of the main MDX→JSX render pipeline on purpose — this only
 * needs heading text/depth, not the compiled component tree, so it runs its
 * own tiny remark-only pass over the raw markdown. Uses the same slugger
 * (github-slugger) that rehype-slug uses internally, so ids match exactly
 * what ends up in the rendered heading's real `id` attribute. */
export function extractToc(markdown: string): TocEntry[] {
  const tree = parser.parse(markdown) as Root
  const slugger = new GithubSlugger()
  const entries: TocEntry[] = []

  visit(tree, 'heading', (node: Heading) => {
    if (node.depth !== 2 && node.depth !== 3) return
    const text = mdastToString(node)
    if (!text) return
    entries.push({ id: slugger.slug(text), text, depth: node.depth })
  })

  return entries
}
