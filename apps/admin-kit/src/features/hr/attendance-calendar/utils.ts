import type { Absence } from '@pompeitech/mock-data'

export {
  type CalendarDay,
  addMonths,
  getCalendarDays,
  monthLabel,
  startOfMonth
} from '../_shared/calendar-utils'

/** Every absence in `absences` whose [startDate, endDate] range includes `day`. */
export function absencesOnDay(absences: Absence[], day: string): Absence[] {
  return absences.filter(absence => absence.startDate <= day && absence.endDate >= day)
}
