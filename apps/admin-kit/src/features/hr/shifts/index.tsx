import { getEmployees, getShifts, type Employee, type Shift } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { addMonths, startOfMonth } from '../_shared/calendar-utils'
import { ShiftGrid } from './components/shift-grid'
import { ShiftsToolbar } from './components/shifts-toolbar'

export async function loader() {
  const [employees, shifts] = await Promise.all([
    getEmployees({ pageSize: 200 }),
    getShifts({ pageSize: 2000 })
  ])
  return { employees: employees.data, shifts: shifts.data }
}

export function Component() {
  const { employees, shifts } = useLoaderData() as { employees: Employee[]; shifts: Shift[] }
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [employeeFilter, setEmployeeFilter] = useState('all')

  const filteredEmployees = useMemo(
    () => (employeeFilter === 'all' ? employees : employees.filter(e => e.id === employeeFilter)),
    [employees, employeeFilter]
  )

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          Shifts
        </Typography>
        <Typography variant="muted">Who's scheduled when, one row per employee.</Typography>
      </div>

      <div className="lg:shrink-0">
        <ShiftsToolbar
          month={month}
          onPrevMonth={() => setMonth(m => addMonths(m, -1))}
          onNextMonth={() => setMonth(m => addMonths(m, 1))}
          onToday={() => setMonth(startOfMonth(new Date()))}
          employees={employees}
          employeeFilter={employeeFilter}
          onEmployeeFilterChange={setEmployeeFilter}
        />
      </div>

      <div className="lg:min-h-0 lg:flex-1">
        <ShiftGrid employees={filteredEmployees} shifts={shifts} month={month} />
      </div>
    </div>
  )
}
