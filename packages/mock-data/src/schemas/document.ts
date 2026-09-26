import { z } from 'zod'

export const documentTypeSchema = z.enum([
  'contract',
  'payslip',
  'id_document',
  'certificate',
  'other'
])
export type DocumentType = z.infer<typeof documentTypeSchema>

export const employeeDocumentSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  name: z.string(),
  type: documentTypeSchema,
  uploadedAt: z.string()
})

export type EmployeeDocument = z.infer<typeof employeeDocumentSchema>
