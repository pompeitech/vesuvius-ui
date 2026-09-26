import type { Issue, Member } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  UserAvatar
} from '@pompeitech/vesuvius-ui'

type TopContributorsCardProps = { issues: Issue[]; members: Member[] }

/** Who closed the most issues in the last 30 days — a lightweight "who's shipping" ranking. */
export function TopContributorsCard({ issues, members }: TopContributorsCardProps) {
  const monthAgo = new Date().getTime() - 30 * 86_400_000
  const closedByMember = new Map<string, number>()
  for (const issue of issues) {
    if (issue.status !== 'done' || !issue.assigneeId) continue
    if (new Date(issue.updatedAt ?? issue.createdAt).getTime() < monthAgo) continue
    closedByMember.set(issue.assigneeId, (closedByMember.get(issue.assigneeId) ?? 0) + 1)
  }

  const ranked = members
    .map(member => ({ member, count: closedByMember.get(member.id) ?? 0 }))
    .filter(row => row.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Contributors (30d)</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {ranked.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No issues closed in the last 30 days.
          </p>
        ) : (
          ranked.map(({ member, count }, index) => (
            <div key={member.id} className="flex items-center gap-3 px-2 py-1.5">
              <span className="w-4 shrink-0 text-sm text-muted-foreground">{index + 1}</span>
              <UserAvatar name={member.name} src={member.avatarUrl} size="sm" />
              <span className="min-w-0 flex-1 truncate text-sm">{member.name}</span>
              <Badge variant="secondary" className="shrink-0">
                {count} closed
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
