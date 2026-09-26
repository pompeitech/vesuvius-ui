export type MonthGridDay = {
  iso: string
  date: Date
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
}

const MS_PER_DAY = 86_400_000

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY)
}

/** Monday of the week containing `date`, at local midnight. */
export function startOfWeek(date: Date): Date {
  const midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const weekday = (midnight.getDay() + 6) % 7 // Mon=0 .. Sun=6
  return addDays(midnight, -weekday)
}

/**
 * "YYYY-MM-DD" built from the date's own *local* components — deliberately
 * not `date.toISOString().slice(0, 10)`, which converts to UTC first and
 * silently shifts the day in any timezone that isn't UTC itself (e.g. a
 * local-midnight cell in a UTC+ zone serializes as the *previous* UTC day —
 * reproduced live: a dropped chip rendered under one day's cell while its
 * toast, built from that same mis-keyed value, announced the day before).
 * Every date this tab hands out or accepts (`day.iso`, a dropped issue's
 * new `dueDate`) goes through this one function so the grid, the grouping,
 * and the confirmation toast can never disagree.
 */
export function isoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Inverse of `isoDate` — parsed as local components, not through `Date`'s UTC-parsing `"YYYY-MM-DD"` shorthand. */
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1)
}

/**
 * Monday-start month grid: leading days from the previous month and
 * trailing days from the next, chunked into 7-day weeks (5 or 6 rows
 * depending on the month) — nothing in this kit builds this shape today
 * (`hr/_shared/calendar-utils.ts`'s `getCalendarDays` only returns a flat,
 * unpadded list of the month's own days), so it's new, feature-local math.
 */
export function buildMonthGrid(month: Date): MonthGridDay[][] {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstOfMonth = new Date(year, monthIndex, 1)
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7 // Mon=0 .. Sun=6
  const gridStart = addDays(firstOfMonth, -firstWeekday)

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const lastOfMonth = new Date(year, monthIndex, daysInMonth)
  const trailing = 6 - ((lastOfMonth.getDay() + 6) % 7)
  const gridEnd = addDays(lastOfMonth, trailing)
  const totalDays = Math.round((gridEnd.getTime() - gridStart.getTime()) / MS_PER_DAY) + 1

  const todayIso = isoDate(new Date())
  const days: MonthGridDay[] = Array.from({ length: totalDays }, (_, i) => {
    const date = addDays(gridStart, i)
    const iso = isoDate(date)
    return {
      iso,
      date,
      dayOfMonth: date.getDate(),
      isCurrentMonth: date.getMonth() === monthIndex,
      isToday: iso === todayIso
    }
  })

  const weeks: MonthGridDay[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

export function addMonths(month: Date, delta: number): Date {
  return new Date(month.getFullYear(), month.getMonth() + delta, 1)
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function monthLabel(month: Date): string {
  return month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
