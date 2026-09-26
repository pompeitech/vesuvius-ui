import { schemaHelper } from '@admin/form'

import { z } from 'zod'

/** Sentinel for "no manager" in the manager `Select` — Radix `Select.Item` can't take an empty-string value. */
export const NO_MANAGER_VALUE = 'none'

export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'contractor', label: 'Contractor' }
] as const

export const employeeFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.email('Enter a valid email.'),
  jobTitle: z.string().min(1, 'Job title is required.'),
  departmentId: z.string().min(1, 'Select a department.'),
  managerId: z.string(),
  employmentType: z.enum(['full_time', 'part_time', 'contractor']),
  location: z.string().min(1, 'Select a location.'),
  hireDate: schemaHelper.date()
})

export type EmployeeFormInput = z.input<typeof employeeFormSchema>
export type EmployeeFormOutput = z.output<typeof employeeFormSchema>

export const EMPLOYEE_FORM_DEFAULT_VALUES: EmployeeFormInput = {
  name: '',
  email: '',
  jobTitle: '',
  departmentId: '',
  managerId: NO_MANAGER_VALUE,
  employmentType: 'full_time',
  location: '',
  hireDate: new Date()
}
