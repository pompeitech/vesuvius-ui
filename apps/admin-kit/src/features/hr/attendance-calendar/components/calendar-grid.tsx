import type { Absence, Employee } from '@pompeitech/mock-data'
import { cn, UserAvatar } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { absencesOnDay, getCalendarDays } from '../utils'
import { DayCell } from './day-cell'

const NAME_COLUMN_WIDTH = 220
const DAY_COLUMN_WIDTH = 56

type CalendarGridProps = {
  employees: Employee[]
  absences: Absence[]
  month: Date
}

/**
 * The calendar itself: employee rows × day-of-month columns, the employee
 * column frozen (`sticky left-0`) so it stays visible while the rest of
 * the month scrolls horizontally underneath — a plain HTML table with
 * `table-fixed` + an explicit `<colgroup>` rather than `DataTable`'s
 * TanStack column-pinning, because this grid isn't tabular record data
 * with typed columns; it's employee×day cells with multi-day spans and
 * per-cell tooltips (see `DayCell`).
 */
export function CalendarGrid({ employees, absences, month }: CalendarGridProps) {
  const days = useMemo(() => getCalendarDays(month), [month])

  const absencesByEmployee = useMemo(() => {
    const map = new Map<string, Absence[]>()
    for (const absence of absences) {
      map.set(absence.employeeId, [...(map.get(absence.employeeId) ?? []), absence])
    }
    return map
  }, [absences])

  // `table-fixed` only holds each column to its `<colgroup>` width once the
  // table's OWN width is pinned — left at "auto", Chrome sizes the table
  // from its (mostly empty, icon-only) cell content instead of the column
  // widths and shrinks every column well below 56px, which is what was
  // splitting the half-day pills apart. An explicit pixel width fixes that;
  // `overflow-x-auto` on the wrapper still scrolls it when it's wider than
  // the card.
  const tableWidth = NAME_COLUMN_WIDTH + days.length * DAY_COLUMN_WIDTH

  return (
    // Both axes scroll here (not just `overflow-x-auto` as before) — with
    // the page itself now height-capped, a roster with many employees
    // needs its own vertical scroll instead of pushing the page taller.
    // The header row picks up `sticky top-0` to match the already-sticky
    // name column, so both stay pinned as the body scrolls in either
    // direction — the corner cell needs the higher z-index of the two.
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
              const employeeAbsences = absencesByEmployee.get(employee.id) ?? []
              return (
                <tr key={employee.id}>
                  <td className="sticky left-0 z-10 border-t bg-background p-3">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={employee.name} src={employee.avatarUrl} size="sm" />
                      <span className="truncate font-medium">{employee.name}</span>
                    </div>
                  </td>
                  {days.map(day => (
                    <DayCell
                      key={day.iso}
                      day={day.iso}
                      absences={absencesOnDay(employeeAbsences, day.iso)}
                    />
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
