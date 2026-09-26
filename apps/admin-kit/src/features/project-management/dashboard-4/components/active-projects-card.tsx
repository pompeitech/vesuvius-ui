import type { ProjectHealthSummary } from '@pompeitech/mock-data'
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
import {
  dateFormatter,
  HEALTH_BADGE_VARIANT,
  HEALTH_LABEL,
  PRIORITY_BADGE_VARIANT
} from '../format'

/** Every active project: health, priority, owner, and due date. */
export function ActiveProjectsCard({ health }: { health: ProjectHealthSummary }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Due date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {health.activeProjects.map(project => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge variant={HEALTH_BADGE_VARIANT[project.health]}>
                    {HEALTH_LABEL[project.health]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={PRIORITY_BADGE_VARIANT[project.priority]} className="capitalize">
                    {project.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserAvatar name={project.ownerName} src={project.ownerAvatarUrl} size="sm" />
                    <span className="truncate">{project.ownerName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {dateFormatter.format(new Date(project.dueDate))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
