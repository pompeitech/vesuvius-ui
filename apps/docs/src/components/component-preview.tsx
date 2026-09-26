import type { ReactNode } from 'react'
import { highlightCode } from '@/lib/shiki'
import { ComponentPreviewClient } from './component-preview-client'

export type ComponentPreviewProps = {
  children: ReactNode
  code: string
  language?: string
  className?: string
  allowOverflow?: boolean
}

/** Async Server Component — the syntax highlighting (shiki) runs once at
 * render/build time on the server, so the "Code" tab ships as plain
 * pre-rendered HTML; ComponentPreviewClient only carries the tiny
 * Preview/Code tab-toggle state, not a highlighter. */
export default async function ComponentPreview({
  children,
  code,
  language = 'tsx',
  className,
  allowOverflow
}: ComponentPreviewProps) {
  const highlightedCode = await highlightCode(code, language)
  return (
    <ComponentPreviewClient
      highlightedCode={highlightedCode}
      language={language}
      className={className}
      allowOverflow={allowOverflow}
    >
      {children}
    </ComponentPreviewClient>
  )
}
