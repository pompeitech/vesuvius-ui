import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import type { LucideIcon } from 'lucide-react'
import type { Department } from '@pompeitech/mock-data'
import type { EmployeeLiveState } from '../simulate'
import { LiveEmployeeRow } from './live-employee-row'

type StatusColumnProps = {
  title: string
  icon: LucideIcon
  states: EmployeeLiveState[]
  departmentsById: Map<string, Department>
  emptyLabel: string
}

/** One swim-lane of the board — a title/count header over a scrollable, divided list of people. */
export function StatusColumn({
  title,
  icon: Icon,
  states,
  departmentsById,
  emptyLabel
}: StatusColumnProps) {
  return (
    <Card className="flex h-full min-h-0 flex-col">
      <CardHeader className="shrink-0 flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="size-4 text-muted-foreground" />
          {title}
        </CardTitle>
        <Badge variant="secondary">{states.length}</Badge>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 divide-y overflow-y-auto">
        {states.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">{emptyLabel}</p>
        ) : (
          states.map(state => (
            <LiveEmployeeRow
              key={state.employee.id}
              state={state}
              departmentName={
                departmentsById.get(state.employee.departmentId)?.name ?? 'Unassigned'
              }
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}
