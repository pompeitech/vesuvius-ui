import {
  getEmployees,
  getExpenseReports,
  type Employee,
  type ExpenseReport
} from '@pompeitech/mock-data'
import { DataTable, Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import { buildExpenseColumns } from './components/columns'
import { ExpensesTableToolbar } from './components/table-toolbar'

export async function loader() {
  const [expenses, employees] = await Promise.all([
    getExpenseReports({ pageSize: 500 }),
    getEmployees({ pageSize: 200 })
  ])
  return { expenses: expenses.data, employees: employees.data }
}

export function Component() {
  const { expenses, employees } = useLoaderData() as {
    expenses: ExpenseReport[]
    employees: Employee[]
  }
  const employeesById = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees])
  const columns = useMemo(() => buildExpenseColumns(employeesById), [employeesById])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Expense Reports
        </Typography>
        <Typography variant="muted">
          Every reimbursement request across the team, most recent first.
        </Typography>
      </div>

      <DataTable
        columns={columns}
        data={expenses}
        getRowId={row => row.id}
        defaultSorting={[{ id: 'date', desc: true }]}
        searchPlaceholder="Search expenses..."
        toolbar={ctx => <ExpensesTableToolbar {...ctx} />}
      />
    </div>
  )
}
