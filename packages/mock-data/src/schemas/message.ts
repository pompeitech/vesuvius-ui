import { z } from 'zod'

export const messageFolderSchema = z.enum(['inbox', 'sent', 'drafts'])
export type MessageFolder = z.infer<typeof messageFolderSchema>

/**
 * A Gmail-style message — independent of `Issue`, the way a real inbox
 * isn't only ticket notifications. A message *can* reference an issue
 * (`relatedIssueId`, only ever set on system-sender messages) so the
 * useful "something changed" signal the previous ticket-derived feed had
 * isn't lost, just reframed as one message type among several genuine
 * person-to-person ones.
 */
export const messageSchema = z.object({
  id: z.string(),
  folder: messageFolderSchema,
  fromName: z.string(),
  fromEmail: z.string(),
  toName: z.string(),
  toEmail: z.string(),
  subject: z.string(),
  body: z.string(),
  snippet: z.string(),
  read: z.boolean(),
  starred: z.boolean(),
  createdAt: z.string(),
  relatedIssueId: z.string().optional()
})

export type Message = z.infer<typeof messageSchema>
