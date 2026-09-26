import { z } from 'zod'

/**
 * The company-wide rules the Time Clock and Team Status pages are judged
 * against — when a check-in counts as on time vs. late, what window
 * check-in/check-out are expected to fall in, and how tight the
 * geolocation geofence around an office is. Configured on the Attendance
 * Settings page, persisted the same way the Time Clock's own session is
 * (see `use-persisted-state.ts`) — there's no backend to own this in a
 * real HR system's sense, but every page that cares reads the same value.
 */
export const attendancePolicySchema = z
  .object({
    checkInWindowStart: z.string(),
    checkInWindowEnd: z.string(),
    standardStartTime: z.string(),
    graceMinutes: z.coerce.number().int().min(0).max(120),
    checkOutWindowStart: z.string(),
    checkOutWindowEnd: z.string(),
    standardEndTime: z.string(),
    geofenceMeters: z.coerce.number().int().min(10).max(5000)
  })
  .superRefine((policy, ctx) => {
    if (policy.checkInWindowEnd <= policy.checkInWindowStart) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkInWindowEnd'],
        message: 'Must be after the check-in window start.'
      })
    }
    if (policy.checkOutWindowEnd <= policy.checkOutWindowStart) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutWindowEnd'],
        message: 'Must be after the check-out window start.'
      })
    }
    if (
      policy.standardStartTime < policy.checkInWindowStart ||
      policy.standardStartTime > policy.checkInWindowEnd
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['standardStartTime'],
        message: 'Should fall inside the check-in window.'
      })
    }
    if (
      policy.standardEndTime < policy.checkOutWindowStart ||
      policy.standardEndTime > policy.checkOutWindowEnd
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['standardEndTime'],
        message: 'Should fall inside the check-out window.'
      })
    }
  })

export type AttendancePolicy = z.infer<typeof attendancePolicySchema>

export const DEFAULT_ATTENDANCE_POLICY: AttendancePolicy = {
  checkInWindowStart: '08:00',
  checkInWindowEnd: '10:00',
  standardStartTime: '09:00',
  graceMinutes: 10,
  checkOutWindowStart: '16:00',
  checkOutWindowEnd: '20:00',
  standardEndTime: '17:30',
  geofenceMeters: 300
}

export const ATTENDANCE_POLICY_STORAGE_KEY = 'vesuvius-attendance:policy'

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours ?? 0) * 60 + (minutes ?? 0)
}

export function minutesToTime(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440
  const hours = Math.floor(normalized / 60)
  const minutes = Math.floor(normalized % 60)
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
