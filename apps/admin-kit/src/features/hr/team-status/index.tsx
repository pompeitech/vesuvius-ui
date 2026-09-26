import {
  getAbsences,
  getDepartments,
  getEmployees,
  getShifts,
  type Absence,
  type Department,
  type Employee,
  type Shift
} from '@pompeitech/mock-data'
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StatCard,
  Typography
} from '@pompeitech/vesuvius-ui'
import { Building2Icon, HomeIcon, HourglassIcon, LogOutIcon, SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import {
  ATTENDANCE_POLICY_STORAGE_KEY,
  DEFAULT_ATTENDANCE_POLICY,
  type AttendancePolicy
} from '../_shared/attendance-policy'
import { usePersistedState } from '../../../lib/use-persisted-state'
import { StatusColumn } from './components/status-column'
import { simulateEmployeeLiveState } from './simulate'

export async function loader() {
  const [employees, departments, absences, shifts] = await Promise.all([
    getEmployees({ pageSize: 200 }),
    getDepartments({ pageSize: 50 }),
    getAbsences({ pageSize: 1000 }),
    getShifts({ pageSize: 2000 })
  ])
  return {
    employees: employees.data,
    departments: departments.data,
    absences: absences.data,
    shifts: shifts.data
  }
}

const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' })

export function Component() {
  const { employees, departments, absences, shifts } = useLoaderData() as {
    employees: Employee[]
    departments: Department[]
    absences: Absence[]
    shifts: Shift[]
  }
  const [policy] = usePersistedState<AttendancePolicy>(
    ATTENDANCE_POLICY_STORAGE_KEY,
    DEFAULT_ATTENDANCE_POLICY
  )
  const [now, setNow] = useState(() => new Date())
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  // The board is "live" without a socket behind it — re-simulating against
  // a refreshed clock every 30s is enough for people to visibly cross from
  // "Not Arrived Yet" into "In Office" while the page is just sitting open.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const departmentsById = useMemo(() => new Map(departments.map(d => [d.id, d])), [departments])
  const todayIso = now.toISOString().slice(0, 10)
  const isWeekend = now.getDay() === 0 || now.getDay() === 6

  const shiftByEmployeeToday = useMemo(() => {
    const map = new Map<string, Shift>()
    for (const shift of shifts) {
      if (shift.date === todayIso) map.set(shift.employeeId, shift)
    }
    return map
  }, [shifts, todayIso])

  const liveStates = useMemo(() => {
    const query = search.trim().toLowerCase()
    return employees
      .filter(employee => employee.status === 'active')
      .filter(employee => departmentFilter === 'all' || employee.departmentId === departmentFilter)
      .filter(employee => !query || employee.name.toLowerCase().includes(query))
      .map(employee =>
        simulateEmployeeLiveState(
          employee,
          shiftByEmployeeToday.get(employee.id),
          absences,
          policy,
          now,
          todayIso
        )
      )
  }, [employees, absences, policy, now, todayIso, shiftByEmployeeToday, departmentFilter, search])

  const onSite = liveStates.filter(s => s.status === 'checked_in_onsite')
  const remote = liveStates.filter(s => s.status === 'checked_in_remote')
  const notArrived = liveStates.filter(s => s.status === 'not_arrived')
  const away = liveStates.filter(s => s.status === 'on_leave' || s.status === 'checked_out')

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="flex flex-wrap items-start justify-between gap-4 lg:shrink-0">
        <div>
          <Typography as="h1" variant="h3">
            Team Status
          </Typography>
          <Typography variant="muted">
            Who's in, who's remote, and who hasn't arrived yet — as of {timeFormatter.format(now)}.
          </Typography>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search people..."
              value={search}
              onChange={event => setSearch(event.target.value)}
              className="w-56 pl-8"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map(department => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isWeekend ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
          <HomeIcon className="size-8 text-muted-foreground" />
          <Typography variant="large">It's the weekend</Typography>
          <Typography variant="muted">Nobody's expected in today — check back Monday.</Typography>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-6 lg:min-h-0">
          <div className="grid shrink-0 grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="In Office" value={onSite.length} icon={Building2Icon} />
            <StatCard label="Remote" value={remote.length} icon={HomeIcon} />
            <StatCard label="Not Arrived Yet" value={notArrived.length} icon={HourglassIcon} />
            <StatCard label="Away Today" value={away.length} icon={LogOutIcon} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-4">
            <StatusColumn
              title="In Office"
              icon={Building2Icon}
              states={onSite}
              departmentsById={departmentsById}
              emptyLabel="No one on-site yet."
            />
            <StatusColumn
              title="Remote"
              icon={HomeIcon}
              states={remote}
              departmentsById={departmentsById}
              emptyLabel="No one checked in remotely."
            />
            <StatusColumn
              title="Not Arrived Yet"
              icon={HourglassIcon}
              states={notArrived}
              departmentsById={departmentsById}
              emptyLabel="Everyone expected today is already in."
            />
            <StatusColumn
              title="Away Today"
              icon={LogOutIcon}
              states={away}
              departmentsById={departmentsById}
              emptyLabel="No one on leave or checked out yet."
            />
          </div>
        </div>
      )}
    </div>
  )
}
