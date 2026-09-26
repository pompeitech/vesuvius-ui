import type { Issue, Project } from '@pompeitech/mock-data'
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
  TableRow
} from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'

const DAY_MS = 86_400_000

type OverdueIssuesCardProps = { issues: Issue[]; projectsById: Map<string, Project> }

/** Open issues whose due date has already passed, worst offenders first. */
export function OverdueIssuesCard({ issues, projectsById }: OverdueIssuesCardProps) {
  const navigate = useNavigate()
  const now = new Date().getTime()

  const overdue = issues
    .filter(i => i.status !== 'done' && i.dueDate && new Date(i.dueDate).getTime() < now)
    .map(issue => ({
      issue,
      daysLate: Math.floor((now - new Date(issue.dueDate!).getTime()) / DAY_MS)
    }))
    .sort((a, b) => b.daysLate - a.daysLate)
    .slice(0, 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overdue</CardTitle>
      </CardHeader>
      <CardContent>
        {overdue.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Nothing overdue. 🎉</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Late by</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdue.map(({ issue, daysLate }) => (
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
                  <TableCell className="text-right">
                    <Badge variant="destructive">{daysLate}d</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
