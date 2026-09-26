import type { IssuePriority } from '@pompeitech/mock-data'

/** Same idea as dashboard-4's `HEALTH_COLOR` — a plain CSS-var string per key, ready for `SimplePieChart`'s `colors` prop (not a Tailwind class, which those don't accept). Only the priority donut needs per-slice color here — `SimpleBarChart`'s `colors` are per-series, not per-bar, so "Issues by Status" can't use the equivalent map (see that component's own comment). */
export const PRIORITY_COLOR: Record<IssuePriority, string> = {
  low: 'var(--muted-foreground)',
  medium: 'var(--info)',
  high: 'var(--warning)',
  urgent: 'var(--destructive)'
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})
export const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
})

/** A short "2h ago" / "3d ago" formatter for the activity feed — same shape as the one this kit already has in Chats/Inbox, kept as its own small copy per this codebase's convention. */
export function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.max(1, Math.round(diffMs / 60_000))
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  return dateFormatter.format(new Date(iso))
}
