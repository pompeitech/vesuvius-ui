import { Badge, UserAvatar, cn } from '@pompeitech/vesuvius-ui'
import { MapPinOffIcon } from 'lucide-react'
import type { EmployeeLiveState } from '../../team-status/simulate'

const STATUS_LABEL: Record<EmployeeLiveState['status'], string> = {
  checked_in_onsite: 'On-site',
  checked_in_remote: 'Remote',
  not_arrived: 'Not arrived',
  checked_out: 'Checked out',
  on_leave: 'On leave',
  day_off: 'Day off'
}

const STATUS_BADGE_VARIANT: Record<EmployeeLiveState['status'], 'success' | 'info' | 'secondary'> =
  {
    checked_in_onsite: 'success',
    checked_in_remote: 'info',
    not_arrived: 'secondary',
    checked_out: 'secondary',
    on_leave: 'secondary',
    day_off: 'secondary'
  }

type EmployeeListRowProps = {
  state: EmployeeLiveState
  departmentName: string
  hasPin: boolean
  isSelected: boolean
  onSelect: () => void
}

/** One row in the Location Map sidebar — a `team-status/live-employee-row.tsx` sibling, but clickable (to fly the map to that person's pin) and aware of whether it actually has one. */
export function EmployeeListRow({
  state,
  departmentName,
  hasPin,
  isSelected,
  onSelect
}: EmployeeListRowProps) {
  const { employee, status, locationLabel } = state

  return (
    <button
      type="button"
      disabled={!hasPin}
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 border-b px-3 py-2.5 text-left last:border-b-0',
        hasPin ? 'cursor-pointer hover:bg-accent' : 'cursor-default opacity-60',
        isSelected && 'bg-accent'
      )}
    >
      <UserAvatar name={employee.name} src={employee.avatarUrl} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{employee.name}</p>
        <p className="truncate text-xs text-muted-foreground">{departmentName}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <Badge variant={STATUS_BADGE_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
        {hasPin ? (
          locationLabel && <span className="text-xs text-muted-foreground">{locationLabel}</span>
        ) : (
          <MapPinOffIcon className="size-3.5 text-muted-foreground" />
        )}
      </div>
    </button>
  )
}
