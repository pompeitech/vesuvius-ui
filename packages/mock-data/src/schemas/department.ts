import { z } from 'zod'

export const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  /** The employee who leads this department — set once `EMPLOYEES` exists (see the generator). */
  headEmployeeId: z.string().optional()
})

export type Department = z.infer<typeof departmentSchema>
