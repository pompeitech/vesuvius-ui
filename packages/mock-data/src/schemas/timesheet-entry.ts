import { z } from 'zod'

export const timesheetStatusSchema = z.enum(['draft', 'submitted', 'approved', 'rejected'])
export type TimesheetStatus = z.infer<typeof timesheetStatusSchema>

/**
 * One employee's logged hours against one project on one day — the atomic
 * unit a weekly timesheet view aggregates into rows (project) × columns
 * (day). Deliberately keyed by the HR `Employee` roster, not the Project
 * Management `Member` roster (see `packages/mock-data`'s own note on those
 * being separate on purpose) — any active employee can log time against
 * any project, not just its formally assigned `Project.memberIds`.
 */
export const timesheetEntrySchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  projectId: z.string(),
  /** "YYYY-MM-DD" — a single calendar day. */
  date: z.string(),
  hours: z.number().min(0).max(24),
  note: z.string().optional(),
  status: timesheetStatusSchema
})

export type TimesheetEntry = z.infer<typeof timesheetEntrySchema>
