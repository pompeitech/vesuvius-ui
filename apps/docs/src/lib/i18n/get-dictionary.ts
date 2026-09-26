import type { Locale } from './locales'
import en from './dictionaries/en.json'
import it from './dictionaries/it.json'

const dictionaries = { en, it } satisfies Record<Locale, typeof en>

export type Dictionary = typeof en

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
