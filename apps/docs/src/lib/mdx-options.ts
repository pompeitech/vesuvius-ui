import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import type { SerializeOptions } from 'next-mdx-remote-client/serialize'

// Shiki themes for light/dark, matching the lava theme's own light/dark
// split — rehype-pretty-code emits both and toggles via CSS (data-theme /
// prefers-color-scheme), no client JS needed to re-highlight on toggle.
const prettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark' },
  keepBackground: false
}

export const mdxOptions: SerializeOptions['mdxOptions'] = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: { className: ['no-underline', 'group'] }
      }
    ],
    [rehypePrettyCode, prettyCodeOptions]
  ]
}
