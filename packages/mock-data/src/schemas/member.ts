import { z } from 'zod'

export const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().optional(),
  role: z.string(),
  teamId: z.string()
})

export type Member = z.infer<typeof memberSchema>
