import { z } from 'zod'

export const issueStatusSchema = z.enum(['backlog', 'todo', 'in_progress', 'in_review', 'done'])
export type IssueStatus = z.infer<typeof issueStatusSchema>

export const issuePrioritySchema = z.enum(['low', 'medium', 'high', 'urgent'])
export type IssuePriority = z.infer<typeof issuePrioritySchema>

export const issueTypeSchema = z.enum(['bug', 'feature', 'task', 'chore', 'epic'])
export type IssueType = z.infer<typeof issueTypeSchema>

export const issueSchema = z.object({
  id: z.string(),
  /** Short human-readable key, e.g. "API-142". */
  key: z.string(),
  title: z.string(),
  /** Rich-text HTML from the task editor — unset for an issue nobody's written up yet. */
  description: z.string().optional(),
  projectId: z.string(),
  assigneeId: z.string().optional(),
  status: issueStatusSchema,
  priority: issuePrioritySchema,
  type: issueTypeSchema,
  createdAt: z.string(),
  /** Bumped on every client-side edit; falls back to `createdAt` when absent. */
  updatedAt: z.string().optional(),
  /** When work is expected to start — powers the Gantt timeline alongside `dueDate`. */
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  /** The "Principale" epic this issue belongs to — only meaningful when `type !== "epic"`, always an issue in the same `projectId`. */
  parentId: z.string().optional(),
  /** "Ticket collegati" — small cross-links to other issues in the same project. */
  linkedIssueIds: z.array(z.string()).optional(),
  /** "Etichette" — free tags drawn from a fixed pool. */
  labels: z.array(z.string()).optional()
})

export type Issue = z.infer<typeof issueSchema>
