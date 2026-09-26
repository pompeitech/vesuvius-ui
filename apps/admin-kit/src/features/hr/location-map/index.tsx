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
  ToggleGroup,
  ToggleGroupItem,
  Typography
} from '@pompeitech/vesuvius-ui'
import { SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import {
  ATTENDANCE_POLICY_STORAGE_KEY,
  DEFAULT_ATTENDANCE_POLICY,
  type AttendancePolicy
} from '../_shared/attendance-policy'
import { usePersistedState } from '../../../lib/use-persisted-state'
import { simulateEmployeeLiveState, type EmployeeLiveState } from '../team-status/simulate'
import { EmployeeListRow } from './components/employee-list-row'
import { EmployeeMap, type MappedEmployee } from './components/employee-map'
import { resolveEmployeeCoordinates } from './utils'

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

type StatusFilter = 'all' | 'on_site' | 'remote'

/**
 * Where everyone is right now, on a map — reuses Team Status's own
 * `simulateEmployeeLiveState` (same simulated-but-deterministic live
 * state, just visualized differently) and layers pin coordinates on top
 * via `resolveEmployeeCoordinates`. Purely a derived, read-only view —
 * no new mock-data entity, same principle as Team Status itself.
 */
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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selectedId, setSelectedId] = useState<string | undefined>()

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const departmentsById = useMemo(() => new Map(departments.map(d => [d.id, d])), [departments])
  const todayIso = now.toISOString().slice(0, 10)

  const shiftByEmployeeToday = useMemo(() => {
    const map = new Map<string, Shift>()
    for (const shift of shifts) {
      if (shift.date === todayIso) map.set(shift.employeeId, shift)
    }
    return map
  }, [shifts, todayIso])

  const liveStates = useMemo<EmployeeLiveState[]>(() => {
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
      .filter(
        state =>
          statusFilter === 'all' ||
          (statusFilter === 'on_site'
            ? state.status === 'checked_in_onsite'
            : state.status === 'checked_in_remote')
      )
  }, [
    employees,
    absences,
    policy,
    now,
    todayIso,
    shiftByEmployeeToday,
    departmentFilter,
    search,
    statusFilter
  ])

  const mappedEmployees = useMemo<MappedEmployee[]>(
    () =>
      liveStates.flatMap(state => {
        const coordinates = resolveEmployeeCoordinates(state)
        return coordinates ? [{ state, coordinates }] : []
      }),
    [liveStates]
  )

  const pinnedIds = useMemo(
    () => new Set(mappedEmployees.map(m => m.state.employee.id)),
    [mappedEmployees]
  )

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="flex flex-wrap items-start justify-between gap-4 lg:shrink-0">
        <div>
          <Typography as="h1" variant="h3">
            Location Map
          </Typography>
          <Typography variant="muted">
            Where the team is right now — on-site and remote check-ins, live.
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
          <ToggleGroup
            type="single"
            variant="outline"
            value={statusFilter}
            onValueChange={value => value && setStatusFilter(value as StatusFilter)}
          >
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="on_site">On-site</ToggleGroupItem>
            <ToggleGroupItem value="remote">Remote</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[360px_1fr]">
        <div className="h-[70vh] min-h-0 overflow-y-auto rounded-md border lg:h-full">
          {liveStates.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No one matches these filters.
            </p>
          ) : (
            liveStates.map(state => (
              <EmployeeListRow
                key={state.employee.id}
                state={state}
                departmentName={
                  departmentsById.get(state.employee.departmentId)?.name ?? 'Unassigned'
                }
                hasPin={pinnedIds.has(state.employee.id)}
                isSelected={state.employee.id === selectedId}
                onSelect={() => setSelectedId(state.employee.id)}
              />
            ))
          )}
        </div>
        <div className="h-[70vh] min-h-0 overflow-hidden rounded-md border lg:h-full">
          <EmployeeMap
            employees={mappedEmployees}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </div>
  )
}
