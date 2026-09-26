import { z } from 'zod'
import { employmentTypeSchema } from './employee'

export const jobOpeningStatusSchema = z.enum(['open', 'on_hold', 'closed'])
export type JobOpeningStatus = z.infer<typeof jobOpeningStatusSchema>

export const jobOpeningSchema = z.object({
  id: z.string(),
  title: z.string(),
  departmentId: z.string(),
  location: z.string(),
  employmentType: employmentTypeSchema,
  status: jobOpeningStatusSchema,
  openedAt: z.string(),
  targetHires: z.number().int()
})

export type JobOpening = z.infer<typeof jobOpeningSchema>
