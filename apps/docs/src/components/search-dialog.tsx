'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Index as FlexSearchIndex } from 'flexsearch'
import { SearchIcon } from 'lucide-react'
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@pompeitech/vesuvius-ui'
import type { Locale } from '@/lib/i18n/locales'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

type SearchEntry = {
  id: string
  url: string
  title: string
  breadcrumb: string
  content: string
}

export function SearchTrigger({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen(v => !v)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="hidden w-64 justify-start gap-2 text-muted-foreground sm:flex"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span className="flex-1 text-left">{dict.search.trigger}</span>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden"
        onClick={() => setOpen(true)}
        aria-label={dict.search.trigger}
      >
        <SearchIcon />
      </Button>
      <SearchPalette locale={locale} dict={dict} open={open} onOpenChange={setOpen} />
    </>
  )
}

function SearchPalette({
  locale,
  dict,
  open,
  onOpenChange
}: {
  locale: Locale
  dict: Dictionary
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [entries, setEntries] = useState<SearchEntry[] | null>(null)
  const [query, setQuery] = useState('')
  // Index lives in state, not a ref: reading a ref's `.current` inside
  // useMemo's computation isn't safe under React's rules (a ref mutation
  // doesn't schedule a re-render, so `results` could silently go stale) —
  // state guarantees `results` recomputes once the index is ready.
  const [index, setIndex] = useState<FlexSearchIndex | null>(null)

  useEffect(() => {
    if (!open || entries) return
    fetch(`/search-index/${locale}.json`)
      .then(res => res.json())
      .then((data: SearchEntry[]) => {
        const builtIndex = new FlexSearchIndex({ tokenize: 'forward' })
        data.forEach((entry, i) => {
          builtIndex.add(i, `${entry.title} ${entry.breadcrumb} ${entry.content}`)
        })
        setIndex(builtIndex)
        setEntries(data)
      })
      .catch(() => setEntries([]))
  }, [open, entries, locale])

  const results = useMemo(() => {
    if (!entries || !index || query.trim().length === 0) return entries?.slice(0, 8) ?? []
    const ids = index.search(query, { limit: 20 }) as number[]
    return ids.map(i => entries[i]).filter((e): e is SearchEntry => Boolean(e))
  }, [entries, index, query])

  const go = useCallback(
    (url: string) => {
      onOpenChange(false)
      setQuery('')
      router.push(url)
    },
    [onOpenChange, router]
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={dict.search.trigger}
      description={dict.search.placeholder}
    >
      <CommandInput placeholder={dict.search.placeholder} value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>{dict.search.empty}</CommandEmpty>
        <CommandGroup>
          {results.map(entry => (
            <CommandItem key={entry.id} value={entry.id} onSelect={() => go(entry.url)}>
              <div className="flex flex-col">
                <span>{entry.title}</span>
                {entry.breadcrumb && (
                  <span className="text-xs text-muted-foreground">{entry.breadcrumb}</span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
