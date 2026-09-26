import { z } from 'zod'

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  memberIds: z.array(z.string())
})

export type Team = z.infer<typeof teamSchema>
