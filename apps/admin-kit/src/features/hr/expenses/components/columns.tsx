import {
  Badge,
  DataTableColumnHeader,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { Employee, ExpenseReport } from '@pompeitech/mock-data'
import {
  currency,
  dateFormatter,
  EXPENSE_CATEGORY_LABEL,
  EXPENSE_STATUS_VARIANT
} from '../../_shared/format'

/** The Expense Reports column set: employee, description, category, amount, date, status. */
export function buildExpenseColumns(
  employeesById: Map<string, Employee>
): DataTableColumnDef<ExpenseReport>[] {
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
      accessorKey: 'description',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Description" />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
      size: 220
    },
    {
      accessorKey: 'category',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Category" />,
      cell: ({ getValue }) => (
        <Badge variant="outline">
          {EXPENSE_CATEGORY_LABEL[getValue<ExpenseReport['category']>()]}
        </Badge>
      ),
      filterFn: 'arrHas',
      size: 150
    },
    {
      accessorKey: 'amount',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Amount" />,
      cell: ({ getValue }) => (
        <span className="tabular-nums">{currency.format(getValue<number>())}</span>
      ),
      size: 110
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
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<ExpenseReport['status']>()
        return (
          <Badge variant={EXPENSE_STATUS_VARIANT[status]} className="capitalize">
            {status}
          </Badge>
        )
      },
      filterFn: 'arrHas',
      size: 120
    }
  ]
}
