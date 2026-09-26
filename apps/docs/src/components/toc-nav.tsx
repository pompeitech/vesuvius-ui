'use client'

import { useEffect, useState } from 'react'
import { cn } from '@pompeitech/vesuvius-ui'
import type { TocEntry } from '@/lib/toc'

export function TocNav({ entries, title }: { entries: TocEntry[]; title: string }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (entries.length === 0) return
    const observer = new IntersectionObserver(
      observedEntries => {
        for (const entry of observedEntries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0% -70% 0%' }
    )
    for (const { id } of entries) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav className="sticky top-20 hidden max-h-[calc(100svh-6rem)] w-56 shrink-0 overflow-y-auto xl:block">
      <p className="mb-3 text-sm font-medium">{title}</p>
      <ul className="space-y-2 border-l border-border text-sm">
        {entries.map(entry => (
          <li key={entry.id} className={cn(entry.depth === 3 && 'pl-4')}>
            <a
              href={`#${entry.id}`}
              className={cn(
                '-ml-px block border-l-2 py-0.5 pl-3 transition-colors',
                activeId === entry.id
                  ? 'border-primary font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
