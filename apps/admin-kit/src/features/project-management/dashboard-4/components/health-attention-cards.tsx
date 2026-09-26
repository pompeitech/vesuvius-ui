import type { ProjectHealthSummary } from '@pompeitech/mock-data'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  RadialProgressChart
} from '@pompeitech/vesuvius-ui'
import { ChevronRightIcon } from 'lucide-react'
import { HEALTH_COLOR } from '../format'

/** Project-health radial chart next to the "needs attention" callout (or an all-clear message). */
export function HealthAttentionCards({ health }: { health: ProjectHealthSummary }) {
  const onTrackCount = health.byHealth.find(h => h.health === 'on_track')?.count ?? 0

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Project Health</CardTitle>
        </CardHeader>
        <CardContent>
          <RadialProgressChart
            total={onTrackCount}
            totalLabel="On Track"
            data={health.byHealth.map(h => ({
              label: h.label,
              value: h.count,
              color: HEALTH_COLOR[h.health]
            }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Needs Attention</CardTitle>
        </CardHeader>
        <CardContent>
          {health.needsAttention ? (
            <Alert variant="destructive" appearance="soft">
              <AlertTitle>{health.needsAttention.project.name} is blocked</AlertTitle>
              <AlertDescription>
                {health.needsAttention.openIssueCount} open issues are delaying this project's next
                milestone.
              </AlertDescription>
              <a
                href={`/project-management/projects/${health.needsAttention.project.id}`}
                className="col-start-2 mt-1 inline-flex items-center gap-0.5 text-sm font-medium text-destructive hover:underline"
              >
                View details
                <ChevronRightIcon className="size-3.5" />
              </a>
            </Alert>
          ) : (
            <p className="text-sm text-muted-foreground">Every project is on track. 🎉</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
