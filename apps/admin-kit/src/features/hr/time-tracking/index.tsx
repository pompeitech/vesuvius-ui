import { getEmployees, getTimeEntries, type Employee, type TimeEntry } from '@pompeitech/mock-data'
import { DataTable, Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import { buildTimeEntryColumns } from './components/columns'
import { TimeEntriesTableToolbar } from './components/table-toolbar'

export async function loader() {
  const [employees, timeEntries] = await Promise.all([
    getEmployees({ pageSize: 200 }),
    getTimeEntries({ pageSize: 2000 })
  ])
  return { employees: employees.data, timeEntries: timeEntries.data }
}

export function Component() {
  const { employees, timeEntries } = useLoaderData() as {
    employees: Employee[]
    timeEntries: TimeEntry[]
  }
  const employeesById = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees])
  const columns = useMemo(() => buildTimeEntryColumns(employeesById), [employeesById])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Time Tracking
        </Typography>
        <Typography variant="muted">
          Clock-in and clock-out records for every completed shift.
        </Typography>
      </div>

      <DataTable
        columns={columns}
        data={timeEntries}
        getRowId={row => row.id}
        defaultSorting={[{ id: 'date', desc: true }]}
        searchPlaceholder="Search time entries..."
        toolbar={ctx => <TimeEntriesTableToolbar {...ctx} />}
      />
    </div>
  )
}
