import {
  Badge,
  DataTableColumnHeader,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { Employee, TimeEntry, TimeEntryStatus } from '@pompeitech/mock-data'
import { dateFormatter, TIME_ENTRY_STATUS_VARIANT } from '../../_shared/format'
import { LocationCell } from './location-cell'

/** The Time Tracking column set: employee, date, clock in/out, total hours, status. */
export function buildTimeEntryColumns(
  employeesById: Map<string, Employee>
): DataTableColumnDef<TimeEntry>[] {
  return [
    {
      id: 'employee',
      accessorFn: row => employeesById.get(row.employeeId)?.name ?? '',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Employee" />,
      cell: ({ row }) => {
        const employee = employeesById.get(row.original.employeeId)
        return (
          <div className="flex items-center gap-2">
            <UserAvatar name={employee?.name ?? '?'} src={employee?.avatarUrl} size="sm" />
            <span className="truncate font-medium">{employee?.name ?? 'Unknown'}</span>
          </div>
        )
      },
      size: 200
    },
    {
      accessorKey: 'date',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Date" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {dateFormatter.format(new Date(getValue<string>()))}
        </span>
      ),
      size: 120
    },
    {
      accessorKey: 'clockIn',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Clock In" />,
      cell: ({ getValue }) => getValue<string | undefined>() ?? '-',
      size: 100
    },
    {
      accessorKey: 'clockOut',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Clock Out" />,
      cell: ({ getValue }) => getValue<string | undefined>() ?? '-',
      size: 100
    },
    {
      id: 'location',
      accessorFn: row =>
        row.clockInLocation?.onSite ? 'on_site' : row.clockInLocation ? 'off_site' : '',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Location" />,
      cell: ({ row }) => <LocationCell location={row.original.clockInLocation} />,
      filterFn: 'arrHas',
      size: 190
    },
    {
      accessorKey: 'totalHours',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Total Hours" />,
      cell: ({ getValue }) => {
        const hours = getValue<number | undefined>()
        return <span className="tabular-nums">{hours !== undefined ? `${hours}h` : '-'}</span>
      },
      size: 110
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<TimeEntryStatus>()
        return (
          <Badge variant={TIME_ENTRY_STATUS_VARIANT[status]} className="capitalize">
            {status.replace('_', ' ')}
          </Badge>
        )
      },
      filterFn: 'arrHas',
      size: 110
    }
  ]
}
