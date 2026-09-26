// Fails the build (non-zero exit) if any content file links to a
// `/docs/...` path that doesn't resolve to a real page — same safety net
// `onBrokenLinks: "throw"` gave on the Docusaurus site, which caught real
// authoring mistakes there (a missing import, a stale link after a rename).
// Scans raw markdown link syntax `](...)` and JSX `href="..."` attributes
// across every locale's content; anchors (`#section`) are stripped before
// checking — verifying the anchor itself exists would need rendering every
// page's headings, out of scope for this pass (Docusaurus's own checker
// treats broken anchors as a non-fatal warning for the same reason).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { LOCALES } from '../src/lib/i18n/locales'
import { getAllDocSlugs } from '../src/lib/content'

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')

const validPaths = new Set(getAllDocSlugs().map(slug => '/docs/' + slug.join('/')))
validPaths.add('/docs')
// Virtual, generated category-index pages (see the [[...slug]] page
// component's `tierFromSlug` special-case) — no physical .mdx file, so
// they wouldn't otherwise show up in getAllDocSlugs().
for (const tier of ['atoms', 'molecules', 'organisms']) {
  validPaths.add(`/docs/components/${tier}`)
}

const LINK_PATTERNS = [/\]\((\/docs[^)#\s]*)/g, /href=["'](\/docs[^"'#\s]*)["']/g]

function walkFiles(dir: string, onFile: (filePath: string) => void) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) walkFiles(full, onFile)
    else if (entry.endsWith('.mdx') || entry.endsWith('.md')) onFile(full)
  }
}

let brokenCount = 0

for (const locale of LOCALES) {
  const localeDir = path.join(CONTENT_ROOT, locale)
  walkFiles(localeDir, filePath => {
    const text = readFileSync(filePath, 'utf-8')
    const relPath = path.relative(CONTENT_ROOT, filePath)
    for (const pattern of LINK_PATTERNS) {
      for (const match of text.matchAll(pattern)) {
        const target = match[1]
        if (target && !validPaths.has(target)) {
          console.error(`[check-links] BROKEN: ${relPath} -> ${target}`)
          brokenCount++
        }
      }
    }
  })
}

if (brokenCount > 0) {
  console.error(`\n[check-links] ${brokenCount} broken internal link(s) found.`)
  process.exit(1)
}

console.log(`[check-links] OK — ${validPaths.size} valid doc paths, no broken links found.`)
