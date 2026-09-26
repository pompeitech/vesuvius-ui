import { z } from 'zod'

export const aiMessageRoleSchema = z.enum(['user', 'assistant'])
export type AiMessageRole = z.infer<typeof aiMessageRoleSchema>

/** One bubble in an `AiConversation` — plain text, same as `ChatMessage`, no HTML. */
export const aiChatMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  role: aiMessageRoleSchema,
  body: z.string(),
  createdAt: z.string()
})

export type AiChatMessage = z.infer<typeof aiChatMessageSchema>
