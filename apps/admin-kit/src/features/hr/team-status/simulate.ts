import type { Absence, Employee, Shift } from '@pompeitech/mock-data'
import { minutesToTime, timeToMinutes, type AttendancePolicy } from '../_shared/attendance-policy'

export type LiveStatus =
  | 'checked_in_onsite'
  | 'checked_in_remote'
  | 'not_arrived'
  | 'on_leave'
  | 'checked_out'
  | 'day_off'

export type EmployeeLiveState = {
  employee: Employee
  status: LiveStatus
  arrivedAt?: string
  leftAt?: string
  late?: boolean
  locationLabel?: string
}

/**
 * A tiny deterministic string hash → a stable "random" number in [0, 1).
 * There's no live backend behind this board — someone's actual arrival
 * time isn't a fact this app has — so it's simulated instead, but
 * deterministically: the same employee gets the same simulated arrival
 * all day (stable while you watch the board), and a fresh pattern
 * tomorrow (the date is part of the seed), rather than reshuffling on
 * every render like `Math.random()` would.
 */
function seededRandom(seed: string): number {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

/** Whether an approved absence covers `dateIso` — a half-day absence still counts as out for the whole day here (a simplification; splitting the board into AM/PM would be its own feature). */
function isOnApprovedLeave(absences: Absence[], employeeId: string, dateIso: string): boolean {
  return absences.some(
    absence =>
      absence.employeeId === employeeId &&
      absence.status === 'approved' &&
      absence.startDate <= dateIso &&
      dateIso <= absence.endDate
  )
}

/**
 * Simulates one employee's live attendance state for "today" — arrival and
 * departure times are derived from their shift (or the policy's standard
 * hours, if they have none scheduled) plus a per-employee, per-day random
 * offset, then compared against the current wall-clock time.
 */
export function simulateEmployeeLiveState(
  employee: Employee,
  shiftToday: Shift | undefined,
  absences: Absence[],
  policy: AttendancePolicy,
  now: Date,
  todayIso: string
): EmployeeLiveState {
  if (isOnApprovedLeave(absences, employee.id, todayIso)) {
    return { employee, status: 'on_leave' }
  }

  const dayOfWeek = now.getDay()
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { employee, status: 'day_off' }
  }

  const expectedStart = timeToMinutes(shiftToday?.startTime ?? policy.standardStartTime)
  const expectedEnd = timeToMinutes(shiftToday?.endTime ?? policy.standardEndTime)

  // A -15..+34 minute spread around the expected start — mostly on time
  // or a little early, a believable few running late.
  const arrivalOffset = Math.floor(seededRandom(`${employee.id}:${todayIso}:in`) * 50) - 15
  const arrivalMinutes = expectedStart + arrivalOffset
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  if (nowMinutes < arrivalMinutes) {
    return { employee, status: 'not_arrived' }
  }

  const departureOffset = Math.floor(seededRandom(`${employee.id}:${todayIso}:out`) * 40) - 10
  const departureMinutes = expectedEnd + departureOffset

  if (nowMinutes >= departureMinutes) {
    return {
      employee,
      status: 'checked_out',
      arrivedAt: minutesToTime(arrivalMinutes),
      leftAt: minutesToTime(departureMinutes)
    }
  }

  const onSite =
    employee.location !== 'Remote' && seededRandom(`${employee.id}:${todayIso}:loc`) < 0.85

  return {
    employee,
    status: onSite ? 'checked_in_onsite' : 'checked_in_remote',
    arrivedAt: minutesToTime(arrivalMinutes),
    late: arrivalOffset > policy.graceMinutes,
    locationLabel: onSite ? `${employee.location} Office` : 'Remote'
  }
}
