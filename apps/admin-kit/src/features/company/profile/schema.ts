import { z } from 'zod'

export const COMPANY_SIZE_OPTIONS = [
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-500', label: '201–500 employees' },
  { value: '501-1000', label: '501–1,000 employees' },
  { value: '1000+', label: '1,000+ employees' }
] as const

export const companyProfileFormSchema = z.object({
  name: z.string().min(1, 'Company name is required.'),
  legalName: z.string().min(1, 'Legal name is required.'),
  taxId: z.string().min(1, 'Tax ID is required.'),
  industry: z.string().min(1, 'Industry is required.'),
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
  foundedYear: z.coerce.number().int().min(1800).max(new Date().getFullYear()),
  website: z.string().min(1, 'Website is required.'),
  email: z.email('Enter a valid email.'),
  phone: z.string().min(1, 'Phone number is required.'),
  description: z.string().max(1000, 'Keep it under 1000 characters.').optional()
})

export type CompanyProfileFormOutput = z.output<typeof companyProfileFormSchema>
