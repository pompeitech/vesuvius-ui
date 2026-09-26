import { ISSUES, MEMBERS, type ProjectHealthSummary } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { FolderKanbanIcon, ListChecksIcon, UsersIcon } from 'lucide-react'

/** Total projects, open issues, and team size — the three headline counts. */
export function SummaryStatCards({ health }: { health: ProjectHealthSummary }) {
  const openIssueCount = ISSUES.filter(issue => issue.status !== 'done').length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Total Projects" value={health.total} icon={FolderKanbanIcon} />
      <StatCard label="Open Issues" value={openIssueCount} icon={ListChecksIcon} />
      <StatCard label="Team Members" value={MEMBERS.length} icon={UsersIcon} />
    </div>
  )
}
