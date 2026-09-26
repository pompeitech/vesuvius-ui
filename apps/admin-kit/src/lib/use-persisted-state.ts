import { useEffect, useRef, useState } from 'react'

type Listener = (value: unknown) => void

// Every `usePersistedState(key, ...)` call anywhere in the app that shares a
// `key` registers here — see the cross-instance sync note below.
const subscribers = new Map<string, Set<Listener>>()

function notify(key: string, value: unknown, exclude: Listener | null): void {
  const set = subscribers.get(key)
  if (!set) return
  for (const listener of set) {
    if (listener !== exclude) listener(value)
  }
}

/**
 * `useState`, mirrored into `localStorage` under `key` — the app-wide "this
 * is basically a settings/config record with no real backend to own it"
 * pattern: the HR attendance pages (Time Clock's active session/history,
 * the configurable Attendance Policy), the Company pages (Company Profile,
 * Offices), and the Account Settings pages all use it so their state
 * survives a page refresh instead of silently vanishing. Read/write are
 * wrapped defensively: a private-browsing tab or storage-disabled browser
 * still gets a working page, it just won't remember state across reloads.
 *
 * Every hook instance sharing the same `key` stays in sync *within the same
 * tab*, not just across page navigations — without this, editing a
 * persisted record on one page (e.g. Account Settings > Profile) wouldn't
 * reach an always-mounted component reading the same key elsewhere (e.g.
 * the sidebar's account menu, mounted once for the whole session) until a
 * full remount. `localStorage`'s own `"storage"` event only fires in
 * *other* tabs, so it doesn't cover this same-tab case.
 */
export function usePersistedState<T>(
  key: string,
  initial: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  const listenerRef = useRef<Listener | null>(null)

  useEffect(() => {
    const set = subscribers.get(key) ?? new Set<Listener>()
    subscribers.set(key, set)
    const listener: Listener = value => setState(value as T)
    listenerRef.current = listener
    set.add(listener)
    return () => {
      set.delete(listener)
      listenerRef.current = null
    }
  }, [key])

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Ignore — see the doc comment above.
    }
    notify(key, state, listenerRef.current)
  }, [key, state])

  return [state, setState]
}
