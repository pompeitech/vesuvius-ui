import { z } from 'zod'

export const companySizeSchema = z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'])
export type CompanySize = z.infer<typeof companySizeSchema>

/**
 * A single record, not a list — every workspace in this kit belongs to one
 * company, edited on the Company Profile settings page the same way a real
 * admin's "organization settings" screen would.
 */
export const companySchema = z.object({
  name: z.string(),
  legalName: z.string(),
  taxId: z.string(),
  industry: z.string(),
  size: companySizeSchema,
  foundedYear: z.number().int(),
  website: z.string(),
  email: z.string(),
  phone: z.string(),
  description: z.string()
})

export type Company = z.infer<typeof companySchema>
