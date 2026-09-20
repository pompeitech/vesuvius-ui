export const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl'] as const
export type Breakpoint = (typeof BREAKPOINTS)[number]

export type Responsive<T extends string | number> = T | Partial<Record<Breakpoint, T>>

export function resolveResponsive<T extends string | number>(
  value: Responsive<T> | undefined,
  classMap: Record<Breakpoint, Partial<Record<T, string>>>
): string[] {
  if (value === undefined) return []
  if (typeof value !== 'object') {
    return [classMap.base[value]].filter((c): c is string => Boolean(c))
  }
  return BREAKPOINTS.map(bp => {
    const v = value[bp]
    return v !== undefined ? classMap[bp][v] : undefined
  }).filter((c): c is string => Boolean(c))
}

export function numberScaleClasses(classes: readonly string[]): Record<number, string> {
  return Object.fromEntries(classes.map((cls, i) => [i + 1, cls]))
}

export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

export const GAP_CLASSES: Record<Breakpoint, Record<Gap, string>> = {
  base: {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16'
  },
  sm: {
    0: 'sm:gap-0',
    1: 'sm:gap-1',
    2: 'sm:gap-2',
    3: 'sm:gap-3',
    4: 'sm:gap-4',
    5: 'sm:gap-5',
    6: 'sm:gap-6',
    8: 'sm:gap-8',
    10: 'sm:gap-10',
    12: 'sm:gap-12',
    16: 'sm:gap-16'
  },
  md: {
    0: 'md:gap-0',
    1: 'md:gap-1',
    2: 'md:gap-2',
    3: 'md:gap-3',
    4: 'md:gap-4',
    5: 'md:gap-5',
    6: 'md:gap-6',
    8: 'md:gap-8',
    10: 'md:gap-10',
    12: 'md:gap-12',
    16: 'md:gap-16'
  },
  lg: {
    0: 'lg:gap-0',
    1: 'lg:gap-1',
    2: 'lg:gap-2',
    3: 'lg:gap-3',
    4: 'lg:gap-4',
    5: 'lg:gap-5',
    6: 'lg:gap-6',
    8: 'lg:gap-8',
    10: 'lg:gap-10',
    12: 'lg:gap-12',
    16: 'lg:gap-16'
  },
  xl: {
    0: 'xl:gap-0',
    1: 'xl:gap-1',
    2: 'xl:gap-2',
    3: 'xl:gap-3',
    4: 'xl:gap-4',
    5: 'xl:gap-5',
    6: 'xl:gap-6',
    8: 'xl:gap-8',
    10: 'xl:gap-10',
    12: 'xl:gap-12',
    16: 'xl:gap-16'
  }
}
