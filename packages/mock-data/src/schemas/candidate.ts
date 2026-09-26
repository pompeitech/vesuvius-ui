import { z } from 'zod'

/** The recruiting pipeline's stages, in order — the Recruiting Pipeline board's columns. */
export const candidateStageSchema = z.enum([
  'applied',
  'phone_screen',
  'interview',
  'offer',
  'hired',
  'rejected'
])
export type CandidateStage = z.infer<typeof candidateStageSchema>

export const candidateSchema = z.object({
  id: z.string(),
  jobOpeningId: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().optional(),
  stage: candidateStageSchema,
  appliedAt: z.string(),
  source: z.string(),
  /** 1-5 interviewer rating, set once a candidate has had at least a phone screen. */
  rating: z.number().min(1).max(5).optional()
})

export type Candidate = z.infer<typeof candidateSchema>
