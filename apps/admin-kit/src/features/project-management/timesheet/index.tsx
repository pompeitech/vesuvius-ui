import {
  getEmployees,
  getProjects,
  getTimesheetEntries,
  type Employee,
  type Project,
  type TimesheetEntry
} from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
  toast
} from '@pompeitech/vesuvius-ui'
import { ChevronLeftIcon, ChevronRightIcon, SendIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { TIMESHEET_STATUS_LABEL, TIMESHEET_STATUS_VARIANT } from '../_shared/format'
import { WeekGrid } from './components/week-grid'
import { addDays, isoDate, mondayOf, weekDays, weekRangeLabel, weekStatus } from './utils'

export async function loader() {
  const [employees, projects, entries] = await Promise.all([
    getEmployees({ pageSize: 200 }),
    getProjects({ pageSize: 200 }),
    getTimesheetEntries({ pageSize: 5000 })
  ])
  return {
    employees: employees.data.filter(e => e.status === 'active'),
    projects: projects.data,
    entries: entries.data
  }
}

export function Component() {
  const {
    employees,
    projects,
    entries: initialEntries
  } = useLoaderData() as {
    employees: Employee[]
    projects: Project[]
    entries: TimesheetEntry[]
  }
  const [entries, setEntries] = useState(initialEntries)
  const [employeeId, setEmployeeId] = useState(() => employees[0]?.id ?? '')
  const [weekStart, setWeekStart] = useState(() => mondayOf(new Date()))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Timesheet
          </Typography>
          <Typography variant="muted">
            Log hours against a project for the week, then submit for approval.
          </Typography>
        </div>
        <Select value={employeeId} onValueChange={setEmployeeId}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {employees.map(employee => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setWeekStart(w => addDays(w, -7))}>
          <ChevronLeftIcon />
          <span className="sr-only">Previous week</span>
        </Button>
        <span className="w-48 text-center font-medium">{weekRangeLabel(weekStart)}</span>
        <Button variant="outline" size="icon" onClick={() => setWeekStart(w => addDays(w, 7))}>
          <ChevronRightIcon />
          <span className="sr-only">Next week</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => setWeekStart(mondayOf(new Date()))}>
          This week
        </Button>
      </div>

      {employeeId && (
        <TimesheetWeek
          key={`${employeeId}-${isoDate(weekStart)}`}
          employeeId={employeeId}
          weekStart={weekStart}
          projects={projects}
          allEntries={entries}
          onEntriesChange={setEntries}
        />
      )}
    </div>
  )
}

function TimesheetWeek({
  employeeId,
  weekStart,
  projects,
  allEntries,
  onEntriesChange
}: {
  employeeId: string
  weekStart: Date
  projects: Project[]
  allEntries: TimesheetEntry[]
  onEntriesChange: (updater: (prev: TimesheetEntry[]) => TimesheetEntry[]) => void
}) {
  const weekDates = useMemo(() => weekDays(weekStart).map(isoDate), [weekStart])
  const weekEntries = allEntries.filter(
    e => e.employeeId === employeeId && weekDates.includes(e.date)
  )
  const [rowProjectIds, setRowProjectIds] = useState<string[]>(() => [
    ...new Set(weekEntries.map(e => e.projectId))
  ])

  const status = weekStatus(weekEntries.map(e => e.status))
  const readonly = status === 'submitted' || status === 'approved'

  function handleHoursChange(projectId: string, date: string, hours: number) {
    onEntriesChange(prev => {
      const index = prev.findIndex(
        e => e.employeeId === employeeId && e.projectId === projectId && e.date === date
      )
      if (hours <= 0) {
        return index === -1 ? prev : prev.filter((_, i) => i !== index)
      }
      if (index === -1) {
        return [
          ...prev,
          { id: crypto.randomUUID(), employeeId, projectId, date, hours, status: 'draft' }
        ]
      }
      return prev.map((e, i) =>
        i === index ? { ...e, hours, status: e.status === 'rejected' ? 'draft' : e.status } : e
      )
    })
  }

  function handleSubmit() {
    onEntriesChange(prev =>
      prev.map(e =>
        e.employeeId === employeeId &&
        weekDates.includes(e.date) &&
        (e.status === 'draft' || e.status === 'rejected')
          ? { ...e, status: 'submitted' }
          : e
      )
    )
    toast.success('Timesheet submitted for approval.')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Badge variant={status === 'empty' ? 'secondary' : TIMESHEET_STATUS_VARIANT[status]}>
          {status === 'empty' ? 'No hours logged' : TIMESHEET_STATUS_LABEL[status]}
        </Badge>
        {!readonly && weekEntries.length > 0 && (
          <Button size="sm" onClick={handleSubmit}>
            <SendIcon />
            Submit for approval
          </Button>
        )}
      </div>

      <WeekGrid
        weekStart={weekStart}
        rowProjectIds={rowProjectIds}
        allProjects={projects}
        entries={weekEntries}
        readonly={readonly}
        onHoursChange={handleHoursChange}
        onAddProjectRow={projectId => setRowProjectIds(prev => [...prev, projectId])}
        onRemoveProjectRow={projectId => {
          setRowProjectIds(prev => prev.filter(id => id !== projectId))
          onEntriesChange(prev =>
            prev.filter(
              e =>
                !(
                  e.employeeId === employeeId &&
                  e.projectId === projectId &&
                  weekDates.includes(e.date)
                )
            )
          )
        }}
      />
    </div>
  )
}
