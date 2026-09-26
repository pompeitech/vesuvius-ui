import type { ProjectHealthSummary } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { HEALTH_COLOR } from '../format'

/** A vertical timeline of the milestones standing between now and the critical path's completion. */
export function CriticalPathCard({ health }: { health: ProjectHealthSummary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Critical Path</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-4">
          {health.criticalPath.map((item, i) => (
            <li key={item.project.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className="mt-1 size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: HEALTH_COLOR[item.project.health] }}
                />
                {i < health.criticalPath.length - 1 && <span className="w-px flex-1 bg-border" />}
              </div>
              <div className="flex flex-col gap-0.5 pb-4">
                <span className="text-sm font-medium">{item.project.name}</span>
                <span className="text-xs text-muted-foreground">{item.milestone}</span>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
