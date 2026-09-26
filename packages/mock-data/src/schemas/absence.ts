import { z } from 'zod'

/** Matches the icon set on the Attendance Calendar: vacation/permit/smart-working/sick/public holiday. */
export const absenceTypeSchema = z.enum([
  'vacation',
  'permit',
  'smart_working',
  'sick_leave',
  'public_holiday'
])
export type AbsenceType = z.infer<typeof absenceTypeSchema>

export const absenceStatusSchema = z.enum(['pending', 'approved', 'rejected'])
export type AbsenceStatus = z.infer<typeof absenceStatusSchema>

/** Only meaningful when `startDate === endDate` — a multi-day span is always "full". */
export const dayPartSchema = z.enum(['full', 'morning', 'afternoon'])
export type DayPart = z.infer<typeof dayPartSchema>

export const absenceSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  type: absenceTypeSchema,
  /** Inclusive date range — a single day off has `startDate === endDate`. */
  startDate: z.string(),
  endDate: z.string(),
  /** Set only for hourly permits (e.g. "09:00"/"10:00"); all-day types leave these unset. */
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  /** Lets two half-day absences (e.g. morning smart working + afternoon permit) share one calendar day. */
  dayPart: dayPartSchema,
  status: absenceStatusSchema,
  note: z.string().optional(),
  requestedAt: z.string(),
  /** Set once a manager acts on the request — required in practice for a rejection, optional context on an approval. */
  reviewNote: z.string().optional(),
  reviewedBy: z.string().optional(),
  reviewedAt: z.string().optional()
})

export type Absence = z.infer<typeof absenceSchema>
