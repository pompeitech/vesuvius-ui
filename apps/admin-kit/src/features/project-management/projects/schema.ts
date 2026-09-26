import { schemaHelper } from '@admin/form'

import { z } from 'zod'

export const projectFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().min(1, 'Description is required.'),
  ownerId: z.string().min(1, 'Select an owner.'),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: schemaHelper.date()
})

export type ProjectFormOutput = z.output<typeof projectFormSchema>

export const PROJECT_FORM_DEFAULT_VALUES = {
  name: '',
  description: '',
  ownerId: '',
  priority: 'medium' as const,
  dueDate: null
}
