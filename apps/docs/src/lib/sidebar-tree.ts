import { getDocPage, listDocsInDir } from './content'
import type { Locale } from './i18n/locales'
import type { Dictionary } from './i18n/get-dictionary'

export type SidebarLeaf = { type: 'leaf'; slug: string[]; title: string }
export type SidebarCategory = {
  type: 'category'
  label: string
  slug?: string[]
  items: SidebarNode[]
}
export type SidebarNode = SidebarLeaf | SidebarCategory
export type SidebarSection = { label: string; items: SidebarNode[]; collapsible: boolean }

const GETTING_STARTED_SLUGS = ['intro', 'installation', 'theming', 'layout', 'creating-components']

function leaf(locale: Locale, slug: string[]): SidebarLeaf | null {
  const page = getDocPage(locale, slug)
  if (!page) return null
  return { type: 'leaf', slug, title: page.frontmatter.title }
}

function tierCategory(
  locale: Locale,
  dict: Dictionary,
  tierSlug: 'atoms' | 'molecules' | 'organisms'
): SidebarCategory {
  const items = listDocsInDir(['components', tierSlug])
    .map(({ slug }) => leaf(locale, slug))
    .filter((item): item is SidebarLeaf => item !== null)
  return {
    type: 'category',
    label: dict.sidebar[tierSlug],
    slug: ['components', tierSlug],
    items
  }
}

export function getSidebarSections(locale: Locale, dict: Dictionary): SidebarSection[] {
  const gettingStarted: SidebarSection = {
    label: dict.sidebar.gettingStarted,
    collapsible: false,
    items: GETTING_STARTED_SLUGS.map(slug => leaf(locale, [slug])).filter(
      (item): item is SidebarLeaf => item !== null
    )
  }

  const components: SidebarSection = {
    label: dict.sidebar.components,
    collapsible: false,
    items: [
      tierCategory(locale, dict, 'atoms'),
      tierCategory(locale, dict, 'molecules'),
      tierCategory(locale, dict, 'organisms')
    ]
  }

  return [gettingStarted, components]
}

/** Flattened leaf order, for computing prev/next links on a doc page —
 * same left-to-right, top-to-bottom order the sidebar itself renders in. */
export function flattenLeaves(sections: SidebarSection[]): SidebarLeaf[] {
  const out: SidebarLeaf[] = []
  function walk(nodes: SidebarNode[]) {
    for (const node of nodes) {
      if (node.type === 'leaf') out.push(node)
      else walk(node.items)
    }
  }
  for (const section of sections) walk(section.items)
  return out
}
