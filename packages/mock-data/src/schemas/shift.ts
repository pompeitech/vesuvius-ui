import { z } from 'zod'

export const shiftStatusSchema = z.enum(['scheduled', 'completed', 'cancelled'])
export type ShiftStatus = z.infer<typeof shiftStatusSchema>

export const shiftSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  status: shiftStatusSchema
})

export type Shift = z.infer<typeof shiftSchema>
