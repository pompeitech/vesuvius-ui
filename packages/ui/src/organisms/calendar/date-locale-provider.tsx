import type { Locale } from 'date-fns'
import { createContext, type ReactNode, useContext, useMemo } from 'react'

export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type DateLocaleOptions = {
  locale?: Locale
  weekStartsOn?: WeekStartsOn
}

export type DateLocaleProviderProps = DateLocaleOptions & {
  children: ReactNode
}

const DateLocaleContext = createContext<DateLocaleOptions>({})

export function DateLocaleProvider({ locale, weekStartsOn, children }: DateLocaleProviderProps) {
  const value = useMemo(() => ({ locale, weekStartsOn }), [locale, weekStartsOn])
  return <DateLocaleContext.Provider value={value}>{children}</DateLocaleContext.Provider>
}

// Props win over the nearest provider; with neither, weekStartsOn stays
// undefined so date-fns falls back to the locale's own first day.
export function useDateLocale(overrides: DateLocaleOptions = {}): DateLocaleOptions {
  const context = useContext(DateLocaleContext)
  return {
    locale: overrides.locale ?? context.locale,
    weekStartsOn: overrides.weekStartsOn ?? context.weekStartsOn
  }
}
