import { z } from 'zod'

/**
 * A 1:1 DM between the current user and a `Member` — independent of
 * `Message`/Inbox, the same way `Event` is independent of `Issue`. Scoped
 * deliberately to direct messages only, no group chats.
 */
export const conversationSchema = z.object({
  id: z.string(),
  /** The other participant — the current user is always the implicit second side. */
  memberId: z.string(),
  createdAt: z.string()
})

export type Conversation = z.infer<typeof conversationSchema>
