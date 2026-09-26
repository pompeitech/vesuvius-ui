import type { Issue, Project } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { CalendarIcon, CheckCircle2Icon, TrendingUpIcon, UsersIcon } from 'lucide-react'
import { dateFormatter } from '../../_shared/format'

export function StatCards({ project, issues }: { project: Project; issues: Issue[] }) {
  const closed = issues.filter(i => i.status === 'done').length

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Progress" value={`${project.progress}%`} icon={TrendingUpIcon} />
      <StatCard
        label="Due Date"
        value={dateFormatter.format(new Date(project.dueDate))}
        icon={CalendarIcon}
      />
      <StatCard
        label="Issues Closed"
        value={`${closed}/${issues.length}`}
        icon={CheckCircle2Icon}
      />
      <StatCard label="Team Size" value={project.members.length} icon={UsersIcon} />
    </div>
  )
}
