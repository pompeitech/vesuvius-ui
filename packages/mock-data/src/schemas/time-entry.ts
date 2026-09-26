import { z } from 'zod'

export const timeEntryStatusSchema = z.enum(['on_time', 'late', 'missing'])
export type TimeEntryStatus = z.infer<typeof timeEntryStatusSchema>

/** Where a clock-in/out was geolocated from — captured by the browser Geolocation API on the Time Clock page. */
export const clockLocationSchema = z.object({
  label: z.string(),
  lat: z.number(),
  lng: z.number(),
  /** Within the assigned office's geofence vs. somewhere else (home, a client site, ...). */
  onSite: z.boolean(),
  /** Geolocation accuracy radius in meters, as reported by the browser — unset for a manual "I'm at the office" fallback. */
  accuracyMeters: z.number().optional()
})
export type ClockLocation = z.infer<typeof clockLocationSchema>

export const timeEntrySchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  date: z.string(),
  /** Unset when `status` is "missing" (clocked in but never out, or never clocked in at all). */
  clockIn: z.string().optional(),
  clockOut: z.string().optional(),
  totalHours: z.number().optional(),
  status: timeEntryStatusSchema,
  clockInLocation: clockLocationSchema.optional(),
  clockOutLocation: clockLocationSchema.optional()
})

export type TimeEntry = z.infer<typeof timeEntrySchema>
