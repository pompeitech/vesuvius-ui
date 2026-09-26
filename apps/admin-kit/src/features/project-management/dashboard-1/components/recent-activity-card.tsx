import type { Issue } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'
import { ISSUE_STATUS_LABEL, ISSUE_STATUS_VARIANT } from '../../_shared/format'
import { relativeTime } from '../format'

/** The most recently touched issues across every project — a quick "what's moving" pulse. */
export function RecentActivityCard({ issues }: { issues: Issue[] }) {
  const navigate = useNavigate()

  const recent = [...issues]
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.createdAt).getTime() -
        new Date(a.updatedAt ?? a.createdAt).getTime()
    )
    .slice(0, 7)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {recent.map(issue => (
          <button
            key={issue.id}
            type="button"
            onClick={() => navigate(`/project-management/issue-detail/${issue.id}`)}
            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{issue.title}</p>
              <p className="text-xs text-muted-foreground">{issue.key}</p>
            </div>
            <Badge variant={ISSUE_STATUS_VARIANT[issue.status]} className="shrink-0">
              {ISSUE_STATUS_LABEL[issue.status]}
            </Badge>
            <span className="w-14 shrink-0 text-right text-xs text-muted-foreground">
              {relativeTime(issue.updatedAt ?? issue.createdAt)}
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
