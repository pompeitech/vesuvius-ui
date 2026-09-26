import type { IssueType } from '@pompeitech/mock-data'

/** Same idea as dashboard-1's `PRIORITY_COLOR` — a CSS-var string per key for `SimplePieChart`'s `colors` prop. */
export const TYPE_COLOR: Record<IssueType, string> = {
  bug: 'var(--destructive)',
  feature: 'var(--success)',
  task: 'var(--info)',
  chore: 'var(--muted-foreground)',
  epic: 'var(--chart-5)'
}

export const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
})
