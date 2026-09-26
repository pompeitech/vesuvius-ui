import type { Employee, Shift } from '@pompeitech/mock-data'
import { cn, UserAvatar } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { getCalendarDays } from '../../_shared/calendar-utils'
import { ShiftCell } from './shift-cell'

const NAME_COLUMN_WIDTH = 220
const DAY_COLUMN_WIDTH = 56

type ShiftGridProps = {
  employees: Employee[]
  shifts: Shift[]
  month: Date
}

/**
 * Same frozen-employee-column, horizontally-scrolling shape as the
 * Attendance Calendar's `CalendarGrid` (`sticky left-0` + `table-fixed` +
 * `colgroup`) — duplicated rather than shared because a shift cell has no
 * multi-day span or half-day split to render, just one time block a day.
 */
export function ShiftGrid({ employees, shifts, month }: ShiftGridProps) {
  const days = useMemo(() => getCalendarDays(month), [month])

  const shiftsByEmployee = useMemo(() => {
    const map = new Map<string, Map<string, Shift>>()
    for (const shift of shifts) {
      if (!map.has(shift.employeeId)) map.set(shift.employeeId, new Map())
      map.get(shift.employeeId)?.set(shift.date, shift)
    }
    return map
  }, [shifts])

  // See the identical comment in `attendance-calendar/components/calendar-grid.tsx`
  // — `table-fixed` needs the table's own width pinned, or Chrome shrinks
  // every column below its `<colgroup>` width to fit the container.
  const tableWidth = NAME_COLUMN_WIDTH + days.length * DAY_COLUMN_WIDTH

  return (
    // Both axes scroll here (see calendar-grid.tsx's identical fix) — the
    // page is height-capped now, so a roster with many employees needs its
    // own vertical scroll instead of pushing the page taller. Header row
    // is `sticky top-0` alongside the already-sticky name column.
    <div className="h-full min-h-0 overflow-auto rounded-md border">
      <table
        className="table-fixed border-collapse text-sm"
        style={{ width: tableWidth, minWidth: '100%' }}
      >
        <colgroup>
          <col style={{ width: NAME_COLUMN_WIDTH }} />
          {days.map(day => (
            <col key={day.iso} style={{ width: DAY_COLUMN_WIDTH }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th className="sticky top-0 left-0 z-20 bg-background p-3 text-left font-medium">
              Employee
            </th>
            {days.map(day => (
              <th
                key={day.iso}
                className={cn(
                  'sticky top-0 z-10 border-l p-1 text-center text-xs font-medium text-muted-foreground',
                  day.isWeekend ? 'bg-muted/40' : 'bg-background',
                  day.isToday && 'bg-primary/10 text-primary'
                )}
              >
                <div>{day.weekdayLetter}</div>
                <div className="text-sm">{day.dayOfMonth}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td
                colSpan={days.length + 1}
                className="border-t p-8 text-center text-muted-foreground"
              >
                No employees match these filters.
              </td>
            </tr>
          ) : (
            employees.map(employee => {
              const employeeShifts = shiftsByEmployee.get(employee.id)
              return (
                <tr key={employee.id}>
                  <td className="sticky left-0 z-10 border-t bg-background p-3">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={employee.name} src={employee.avatarUrl} size="sm" />
                      <span className="truncate font-medium">{employee.name}</span>
                    </div>
                  </td>
                  {days.map(day => (
                    <ShiftCell key={day.iso} shift={employeeShifts?.get(day.iso)} />
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
