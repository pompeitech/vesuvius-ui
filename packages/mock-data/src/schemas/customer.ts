import { z } from 'zod'

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().optional(),
  location: z.string(),
  totalOrders: z.number().int(),
  totalSpent: z.number(),
  joinedAt: z.string()
})

export type Customer = z.infer<typeof customerSchema>
