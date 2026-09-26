import { Badge, UserAvatar } from '@pompeitech/vesuvius-ui'
import type { EmployeeLiveState } from '../simulate'

/** One person on the board — avatar, name, department, and whatever's relevant to their current status on the right. */
export function LiveEmployeeRow({
  state,
  departmentName
}: {
  state: EmployeeLiveState
  departmentName: string
}) {
  const { employee, status, arrivedAt, leftAt, late } = state

  return (
    <div className="flex items-center gap-3 py-2.5">
      <UserAvatar name={employee.name} src={employee.avatarUrl} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{employee.name}</p>
        <p className="truncate text-xs text-muted-foreground">{departmentName}</p>
      </div>
      <div className="shrink-0 text-right">
        {(status === 'checked_in_onsite' || status === 'checked_in_remote') && (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs text-muted-foreground">Since {arrivedAt}</span>
            {late && (
              <Badge variant="warning" className="text-[10px]">
                Late
              </Badge>
            )}
          </div>
        )}
        {status === 'on_leave' && <Badge variant="secondary">On leave</Badge>}
        {status === 'checked_out' && (
          <span className="text-xs text-muted-foreground">Left {leftAt}</span>
        )}
      </div>
    </div>
  )
}
