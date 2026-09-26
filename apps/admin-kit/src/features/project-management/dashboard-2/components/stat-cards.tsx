import type { Issue, Member } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { AlertOctagonIcon, ScaleIcon, UserXIcon, UsersIcon } from 'lucide-react'

/** Above this many open issues, a person counts as "over capacity" — a fixed demo threshold, not a real staffing policy. */
const CAPACITY_THRESHOLD = 6

type StatCardsProps = { issues: Issue[]; members: Member[] }

export function StatCards({ issues, members }: StatCardsProps) {
  const openIssues = issues.filter(i => i.status !== 'done')
  const unassigned = issues.filter(i => !i.assigneeId).length

  const openByMember = new Map<string, number>()
  for (const issue of openIssues) {
    if (!issue.assigneeId) continue
    openByMember.set(issue.assigneeId, (openByMember.get(issue.assigneeId) ?? 0) + 1)
  }

  const avgOpenPerMember =
    members.length > 0 ? Math.round((openIssues.length / members.length) * 10) / 10 : 0
  const overCapacity = [...openByMember.values()].filter(count => count > CAPACITY_THRESHOLD).length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Team Members" value={members.length} icon={UsersIcon} />
      <StatCard label="Unassigned Issues" value={unassigned} icon={UserXIcon} />
      <StatCard label="Avg Open Issues / Member" value={avgOpenPerMember} icon={ScaleIcon} />
      <StatCard label="Over Capacity" value={overCapacity} icon={AlertOctagonIcon} />
    </div>
  )
}
