import { createHighlighter, type Highlighter } from 'shiki'

// One shared highlighter instance per server process (module-scope
// singleton) — shiki's own docs recommend this over creating one per call,
// since loading the grammar/theme data isn't free. Used both by
// rehype-pretty-code (fenced ```tsx blocks, via its own internal shiki) and
// directly here for ComponentPreview's "Code" tab (a raw string prop, not
// part of the markdown source rehype-pretty-code already processed).
let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['tsx', 'ts', 'jsx', 'js', 'bash', 'css', 'json']
  })
  return highlighterPromise
}

export async function highlightCode(code: string, lang = 'tsx'): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false
  })
}
