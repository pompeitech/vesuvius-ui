import {
  Badge,
  Button,
  DataTableColumnHeader,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { Department, Employee } from '@pompeitech/mock-data'
import { EyeIcon } from 'lucide-react'
import { dateFormatter, EMPLOYEE_STATUS_LABEL, EMPLOYEE_STATUS_VARIANT } from '../../_shared/format'

type BuildColumnsOptions = {
  departmentsById: Map<string, Department>
  onView: (employee: Employee) => void
  /** Set to `false` on Department Detail, where the department is implicit. @default true */
  showDepartment?: boolean
}

/** The Employees directory column set: identity, role, department, status, hire date, vacation balance. */
export function buildEmployeeColumns({
  departmentsById,
  onView,
  showDepartment = true
}: BuildColumnsOptions): DataTableColumnDef<Employee>[] {
  const departmentColumn: DataTableColumnDef<Employee> = {
    id: 'department',
    accessorFn: row => departmentsById.get(row.departmentId)?.name ?? '',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Department" />,
    cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>,
    filterFn: 'arrHas',
    size: 140
  }

  return [
    {
      accessorKey: 'name',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Employee" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.original.name} src={row.original.avatarUrl} />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.original.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
      size: 260
    },
    {
      accessorKey: 'jobTitle',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Job Title" />,
      size: 190
    },
    ...(showDepartment ? [departmentColumn] : []),
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<Employee['status']>()
        return (
          <Badge variant={EMPLOYEE_STATUS_VARIANT[status]}>{EMPLOYEE_STATUS_LABEL[status]}</Badge>
        )
      },
      filterFn: 'arrHas',
      size: 110
    },
    {
      accessorKey: 'hireDate',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Hire Date" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {dateFormatter.format(new Date(getValue<string>()))}
        </span>
      ),
      size: 120
    },
    {
      id: 'vacationDaysLeft',
      accessorFn: row => row.vacationDaysTotal - row.vacationDaysUsed,
      header: ({ header }) => <DataTableColumnHeader header={header} title="Vacation Left" />,
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()} days</span>,
      size: 130
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" className="size-8" onClick={() => onView(row.original)}>
          <EyeIcon />
          <span className="sr-only">View {row.original.name}</span>
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      size: 56
    }
  ]
}
