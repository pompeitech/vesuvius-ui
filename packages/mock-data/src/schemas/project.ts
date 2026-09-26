import { z } from 'zod'

export const projectStatusSchema = z.enum(['planning', 'active', 'on_hold', 'completed'])
export type ProjectStatus = z.infer<typeof projectStatusSchema>

/** Matches the RadialProgressChart "Project Health" widget segments. */
export const projectHealthSchema = z.enum(['on_track', 'at_risk', 'blocked', 'dependency'])
export type ProjectHealth = z.infer<typeof projectHealthSchema>

export const projectPrioritySchema = z.enum(['low', 'medium', 'high'])
export type ProjectPriority = z.infer<typeof projectPrioritySchema>

/** Whether a project member has actually joined ("active") or has just been invited and hasn't started participating yet. */
export const projectMemberStatusSchema = z.enum(['active', 'invited'])
export type ProjectMemberStatus = z.infer<typeof projectMemberStatusSchema>

export const projectMemberSchema = z.object({
  memberId: z.string(),
  status: projectMemberStatusSchema
})
export type ProjectMember = z.infer<typeof projectMemberSchema>

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: projectStatusSchema,
  health: projectHealthSchema,
  priority: projectPrioritySchema,
  progress: z.number().min(0).max(100),
  ownerId: z.string(),
  members: z.array(projectMemberSchema),
  dueDate: z.string()
})

export type Project = z.infer<typeof projectSchema>
