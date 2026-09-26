import type { Issue, Member } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, SimpleBarChart } from '@pompeitech/vesuvius-ui'

type WorkloadByMemberCardProps = { issues: Issue[]; members: Member[] }

/** The 8 busiest people right now, by open issue count — where load is actually concentrated. */
export function WorkloadByMemberCard({ issues, members }: WorkloadByMemberCardProps) {
  const openByMember = new Map<string, number>()
  for (const issue of issues) {
    if (issue.status === 'done' || !issue.assigneeId) continue
    openByMember.set(issue.assigneeId, (openByMember.get(issue.assigneeId) ?? 0) + 1)
  }

  const data = members
    .map(member => ({
      member: member.name.split(' ')[0] ?? member.name,
      count: openByMember.get(member.id) ?? 0
    }))
    .filter(row => row.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Workload by Member</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No open issues assigned yet.
          </p>
        ) : (
          <SimpleBarChart
            data={data}
            categories={['count']}
            index="member"
            showLegend={false}
            className="h-64"
          />
        )}
      </CardContent>
    </Card>
  )
}
