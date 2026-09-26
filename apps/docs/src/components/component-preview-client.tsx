'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@pompeitech/vesuvius-ui'
import { CheckIcon, CopyIcon } from 'lucide-react'

export function ComponentPreviewClient({
  children,
  highlightedCode,
  language,
  className,
  allowOverflow = false
}: {
  children: ReactNode
  /** Pre-rendered HTML from shiki (server-side, see component-preview.tsx) —
   * never highlighted client-side, so this component ships no highlighter. */
  highlightedCode: string
  language: string
  className?: string
  allowOverflow?: boolean
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    const element = document.createElement('div')
    element.innerHTML = highlightedCode
    const text = element.textContent ?? ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={cn(
        'not-prose my-6 rounded-lg border border-border',
        allowOverflow ? 'overflow-visible' : 'overflow-hidden'
      )}
    >
      <div className="flex items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
        {(['preview', 'code'] as const).map(value => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={cn(
              'rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors',
              tab === value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {value}
          </button>
        ))}
      </div>
      {tab === 'preview' ? (
        <div
          className={cn(
            'flex min-h-[140px] flex-wrap items-center justify-center gap-4 bg-background p-10',
            className
          )}
        >
          {children}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between border-b border-border bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
            <span className="font-mono uppercase">{language}</span>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-1.5 rounded px-2 py-1 hover:bg-muted hover:text-foreground"
              aria-label="Copy code"
            >
              {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div
            data-component-preview-code
            className="overflow-x-auto bg-muted/20 text-sm [&_pre]:m-0 [&_pre]:min-w-full [&_pre]:bg-transparent! [&_pre]:p-4"
            // dangerouslySetInnerHTML: pre-rendered by shiki server-side, never user input
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </>
      )}
    </div>
  )
}
