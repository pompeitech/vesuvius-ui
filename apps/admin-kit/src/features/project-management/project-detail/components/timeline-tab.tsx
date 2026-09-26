import '@svar-ui/react-gantt/style.css'
import { Gantt, Willow, WillowDark } from '@svar-ui/react-gantt'
import type { Issue } from '@pompeitech/mock-data'
import { Card, CardContent, useTheme } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { buildGanttTasks } from '../utils'

const SCALES = [
  { unit: 'month' as const, step: 1, format: '%F %Y' },
  { unit: 'day' as const, step: 1, format: '%j' }
]

/**
 * The project's schedule as a Gantt chart — SVAR's open-source (MIT)
 * `@svar-ui/react-gantt`, the library the user pointed at (svar.dev).
 * Read-only here (`readonly`): dragging bars around would imply this kit
 * writes the new dates back to a backend, which it doesn't have.
 */
export function TimelineTab({ issues }: { issues: Issue[] }) {
  const { resolvedTheme } = useTheme()
  const tasks = useMemo(() => buildGanttTasks(issues), [issues])
  const Theme = resolvedTheme === 'dark' ? WillowDark : Willow

  return (
    <Card>
      <CardContent className="p-0">
        {tasks.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No issues have dates yet — add a due date to one to see it on the timeline.
          </p>
        ) : (
          <div className="h-[520px] overflow-hidden rounded-md">
            <Theme>
              <Gantt tasks={tasks} scales={SCALES} readonly cellWidth={40} />
            </Theme>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
