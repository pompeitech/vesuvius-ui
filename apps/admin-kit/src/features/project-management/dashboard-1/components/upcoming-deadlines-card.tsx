import type { Issue, Member, Project } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'
import { ISSUE_STATUS_LABEL, ISSUE_STATUS_VARIANT } from '../../_shared/format'
import { monthDayFormatter } from '../format'

type UpcomingDeadlinesCardProps = {
  issues: Issue[]
  projectsById: Map<string, Project>
  membersById: Map<string, Member>
}

/** Open issues due within a week, soonest first — the "what needs attention before Friday" list. */
export function UpcomingDeadlinesCard({
  issues,
  projectsById,
  membersById
}: UpcomingDeadlinesCardProps) {
  const navigate = useNavigate()
  const now = new Date().getTime()
  const weekOut = now + 7 * 86_400_000

  const upcoming = issues
    .filter(
      i =>
        i.status !== 'done' &&
        i.dueDate &&
        new Date(i.dueDate).getTime() >= now &&
        new Date(i.dueDate).getTime() <= weekOut
    )
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 7)

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nothing due in the next 7 days.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcoming.map(issue => {
                const assignee = issue.assigneeId ? membersById.get(issue.assigneeId) : undefined
                return (
                  <TableRow
                    key={issue.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/project-management/issue-detail/${issue.id}`)}
                  >
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{issue.key}</span>
                      <p className="truncate font-medium">{issue.title}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {projectsById.get(issue.projectId)?.name ?? '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={ISSUE_STATUS_VARIANT[issue.status]}>
                        {ISSUE_STATUS_LABEL[issue.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {assignee ? (
                        <div className="flex items-center gap-2">
                          <UserAvatar name={assignee.name} src={assignee.avatarUrl} size="sm" />
                          <span className="truncate">{assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {monthDayFormatter.format(new Date(issue.dueDate!))}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
