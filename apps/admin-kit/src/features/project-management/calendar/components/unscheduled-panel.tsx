import type { Issue } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, Input } from '@pompeitech/vesuvius-ui'
import { IssueChip } from '../../_shared/calendar/issue-chip'

type UnscheduledPanelProps = {
  issues: Issue[]
  search: string
  onSearchChange: (value: string) => void
  onOpenIssue: (issue: Issue) => void
  getProjectName: (issue: Issue) => string
}

/** Same as the per-project Calendar's panel, plus a project label per row — spanning every project here, it's not obvious otherwise which one a ticket belongs to. */
export function UnscheduledPanel({
  issues,
  search,
  onSearchChange,
  onOpenIssue,
  getProjectName
}: UnscheduledPanelProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-sm">Unscheduled tickets</CardTitle>
        <p className="text-xs text-muted-foreground">
          Drag a ticket onto the calendar to set its due date.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Input
          value={search}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="Search unscheduled..."
        />
        {issues.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">Nothing unscheduled.</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {issues.map(issue => (
              <IssueChip
                key={issue.id}
                issue={issue}
                onClick={() => onOpenIssue(issue)}
                projectName={getProjectName(issue)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
