import { z } from 'zod'

export const engagementTypeSchema = z.enum(['freelance', 'agency', 'consultancy'])
export type EngagementType = z.infer<typeof engagementTypeSchema>

export const externalProfessionalStatusSchema = z.enum(['active', 'inactive'])
export type ExternalProfessionalStatus = z.infer<typeof externalProfessionalStatusSchema>

export const externalProfessionalSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().optional(),
  company: z.string(),
  role: z.string(),
  engagementType: engagementTypeSchema,
  hourlyRate: z.number().optional(),
  contractStart: z.string(),
  /** Unset for an open-ended engagement. */
  contractEnd: z.string().optional(),
  status: externalProfessionalStatusSchema
})

export type ExternalProfessional = z.infer<typeof externalProfessionalSchema>
