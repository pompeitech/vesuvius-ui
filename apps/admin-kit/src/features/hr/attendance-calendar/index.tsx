import { getAbsences, getEmployees, type Absence, type Employee } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { CalendarGrid } from './components/calendar-grid'
import { CalendarToolbar } from './components/calendar-toolbar'
import { Legend } from './components/legend'
import type { EmployeeFilter, StatusFilter, TypeFilter } from './types'
import { addMonths, startOfMonth } from './utils'

export async function loader() {
  const [employees, absences] = await Promise.all([
    getEmployees({ pageSize: 200 }),
    getAbsences({ pageSize: 1000 })
  ])
  return { employees: employees.data, absences: absences.data }
}

export function Component() {
  const { employees, absences } = useLoaderData() as { employees: Employee[]; absences: Absence[] }

  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [employeeFilter, setEmployeeFilter] = useState<EmployeeFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredEmployees = useMemo(
    () => (employeeFilter === 'all' ? employees : employees.filter(e => e.id === employeeFilter)),
    [employees, employeeFilter]
  )

  const filteredAbsences = useMemo(
    () =>
      absences.filter(absence => {
        if (typeFilter !== 'all' && absence.type !== typeFilter) return false
        if (statusFilter !== 'all' && absence.status !== statusFilter) return false
        return true
      }),
    [absences, typeFilter, statusFilter]
  )

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          Attendance Calendar
        </Typography>
        <Typography variant="muted">
          Vacation days, permits, and every other absence, one row per employee.
        </Typography>
      </div>

      <div className="lg:shrink-0">
        <CalendarToolbar
          month={month}
          onPrevMonth={() => setMonth(m => addMonths(m, -1))}
          onNextMonth={() => setMonth(m => addMonths(m, 1))}
          onToday={() => setMonth(startOfMonth(new Date()))}
          employees={employees}
          employeeFilter={employeeFilter}
          onEmployeeFilterChange={setEmployeeFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      <div className="lg:min-h-0 lg:flex-1">
        <CalendarGrid employees={filteredEmployees} absences={filteredAbsences} month={month} />
      </div>

      <div className="lg:shrink-0">
        <Legend />
      </div>
    </div>
  )
}
