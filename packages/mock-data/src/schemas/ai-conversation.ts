import { z } from 'zod'

/** One thread with the simulated assistant — titled after its first user message, the way real chatbot history panels do. */
export const aiConversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string()
})

export type AiConversation = z.infer<typeof aiConversationSchema>
