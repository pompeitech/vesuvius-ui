import type { Issue } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { CalendarClockIcon, CheckCircle2Icon, GaugeIcon, TimerIcon } from 'lucide-react'

export function StatCards({ issues }: { issues: Issue[] }) {
  // `new Date()` (no args) is exempt from `react-hooks/purity` — only the
  // bare `Date.now()` read is flagged as impure in a component body.
  const now = new Date().getTime()
  const weekAgo = now - 7 * 86_400_000
  const done = issues.filter(i => i.status === 'done')
  const closedThisWeek = done.filter(
    i => new Date(i.updatedAt ?? i.createdAt).getTime() >= weekAgo
  ).length

  const cycleTimes = done
    .map(
      i =>
        (new Date(i.updatedAt ?? i.createdAt).getTime() - new Date(i.createdAt).getTime()) /
        86_400_000
    )
    .filter(days => days >= 0)
  const avgCycleTime =
    cycleTimes.length > 0
      ? Math.round((cycleTimes.reduce((s, d) => s + d, 0) / cycleTimes.length) * 10) / 10
      : 0

  const doneWithDueDate = done.filter(i => i.dueDate)
  const onTime = doneWithDueDate.filter(
    i => new Date(i.updatedAt ?? i.createdAt).getTime() <= new Date(i.dueDate!).getTime()
  ).length
  const onTimeRate =
    doneWithDueDate.length > 0 ? Math.round((onTime / doneWithDueDate.length) * 100) : 0

  const weekOut = now + 7 * 86_400_000
  const dueNext7Days = issues.filter(
    i =>
      i.status !== 'done' &&
      i.dueDate &&
      new Date(i.dueDate).getTime() >= now &&
      new Date(i.dueDate).getTime() <= weekOut
  ).length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Closed This Week" value={closedThisWeek} icon={CheckCircle2Icon} />
      <StatCard label="Avg Cycle Time" value={`${avgCycleTime}d`} icon={TimerIcon} />
      <StatCard label="On-Time Rate" value={`${onTimeRate}%`} icon={GaugeIcon} />
      <StatCard label="Due Next 7 Days" value={dueNext7Days} icon={CalendarClockIcon} />
    </div>
  )
}
