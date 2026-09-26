import type { TimesheetStatus } from '@pompeitech/mock-data'

export function mondayOf(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  const diff = (day + 6) % 7 // days since Monday (Mon=0 ... Sun=6)
  result.setDate(result.getDate() - diff)
  result.setHours(0, 0, 0, 0)
  return result
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export const WEEK_DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function weekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
}

const weekRangeFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const weekRangeFormatterWithYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export function weekRangeLabel(weekStart: Date): string {
  const end = addDays(weekStart, 6)
  return `${weekRangeFormatter.format(weekStart)} – ${weekRangeFormatterWithYear.format(end)}`
}

/** One status for the whole week's entries — the strictest status wins, since a mixed week is still "not fully editable" the moment any entry is locked in. */
export function weekStatus(statuses: TimesheetStatus[]): TimesheetStatus | 'empty' {
  if (statuses.length === 0) return 'empty'
  if (statuses.every(s => s === 'approved')) return 'approved'
  if (statuses.some(s => s === 'submitted')) return 'submitted'
  if (statuses.some(s => s === 'rejected')) return 'rejected'
  return 'draft'
}
