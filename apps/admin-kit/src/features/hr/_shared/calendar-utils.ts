// Shared by every HR page that renders a "frozen employee column, one day
// per column" grid (the Attendance Calendar and the Shifts schedule) — the
// month/day bookkeeping is identical, only what each cell draws differs.
const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

export type CalendarDay = {
  /** "YYYY-MM-DD". */
  iso: string
  dayOfMonth: number
  weekdayLetter: string
  isToday: boolean
  isWeekend: boolean
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Every day in `month`'s calendar month, in order, flagged for "today" and weekends. */
export function getCalendarDays(month: Date): CalendarDay[] {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const todayIso = toIsoDate(new Date())

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1)
    const iso = toIsoDate(date)
    const weekday = date.getDay()
    return {
      iso,
      dayOfMonth: i + 1,
      weekdayLetter: WEEKDAY_LETTERS[weekday] ?? '?',
      isToday: iso === todayIso,
      isWeekend: weekday === 0 || weekday === 6
    }
  })
}

export function monthLabel(month: Date): string {
  return month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function addMonths(month: Date, delta: number): Date {
  return new Date(month.getFullYear(), month.getMonth() + delta, 1)
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}
