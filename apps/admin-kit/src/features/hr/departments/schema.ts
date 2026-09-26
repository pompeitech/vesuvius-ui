import { z } from 'zod'

export const NO_HEAD_VALUE = 'none'

export const departmentFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().min(1, 'Description is required.'),
  headEmployeeId: z.string()
})

export type DepartmentFormOutput = z.output<typeof departmentFormSchema>

export const DEPARTMENT_FORM_DEFAULT_VALUES = {
  name: '',
  description: '',
  headEmployeeId: NO_HEAD_VALUE
}
