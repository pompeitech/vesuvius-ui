import { z } from 'zod'

/**
 * One bubble in a `Conversation` — plain text, not the HTML `Message.body`
 * uses, since a chat bubble isn't a document. `senderId` is either "me"
 * (the current user) or the conversation's `memberId` — there's always
 * exactly one of each in a DM.
 */
export const chatMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  body: z.string(),
  createdAt: z.string(),
  /** Only meaningful for messages from the other participant — "mine" are always read. */
  read: z.boolean()
})

export type ChatMessage = z.infer<typeof chatMessageSchema>
