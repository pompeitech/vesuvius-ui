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
import { ISSUE_PRIORITY_LABEL } from '../../_shared/format'
import { ISSUE_PRIORITY_VARIANT } from '../format'

type UnassignedIssuesCardProps = { issues: Issue[]; projectsById: Map<string, Project> }

/** Issues nobody owns yet — the most actionable list on this page. */
export function UnassignedIssuesCard({ issues, projectsById }: UnassignedIssuesCardProps) {
  const navigate = useNavigate()
  const unassigned = issues.filter(i => !i.assigneeId && i.status !== 'done').slice(0, 8)

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Unassigned Issues</CardTitle>
      </CardHeader>
      <CardContent>
        {unassigned.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Everything open has an owner. 🎉
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unassigned.map(issue => (
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
                    <Badge variant={ISSUE_PRIORITY_VARIANT[issue.priority]} className="capitalize">
                      {ISSUE_PRIORITY_LABEL[issue.priority]}
                    </Badge>
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
