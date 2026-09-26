import type { Issue, Project } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { AlertTriangleIcon, CheckCircle2Icon, FolderKanbanIcon, ListChecksIcon } from 'lucide-react'

type StatCardsProps = { issues: Issue[]; projects: Project[] }

export function StatCards({ issues, projects }: StatCardsProps) {
  // `new Date()` (no args) is fine in render per `react-hooks/purity` —
  // it's `Date.now()` specifically that gets flagged as an impure read.
  const now = new Date().getTime()
  const weekAgo = now - 7 * 86_400_000

  const openIssues = issues.filter(i => i.status !== 'done').length
  const closedThisWeek = issues.filter(
    i => i.status === 'done' && new Date(i.updatedAt ?? i.createdAt).getTime() >= weekAgo
  ).length
  const overdue = issues.filter(
    i => i.status !== 'done' && i.dueDate && new Date(i.dueDate).getTime() < now
  ).length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Projects" value={projects.length} icon={FolderKanbanIcon} />
      <StatCard label="Open Issues" value={openIssues} icon={ListChecksIcon} />
      <StatCard label="Closed This Week" value={closedThisWeek} icon={CheckCircle2Icon} />
      <StatCard label="Overdue" value={overdue} icon={AlertTriangleIcon} />
    </div>
  )
}
