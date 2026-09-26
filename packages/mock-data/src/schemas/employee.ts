import { z } from 'zod'

export const employmentTypeSchema = z.enum(['full_time', 'part_time', 'contractor'])
export type EmploymentType = z.infer<typeof employmentTypeSchema>

export const employeeStatusSchema = z.enum(['active', 'on_leave', 'terminated'])
export type EmployeeStatus = z.infer<typeof employeeStatusSchema>

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  /** Personal address, kept separate from the work `email` above (only set for some employees, like a real HR system). */
  personalEmail: z.string().optional(),
  phone: z.string(),
  avatarUrl: z.string().optional(),
  jobTitle: z.string(),
  departmentId: z.string(),
  employmentType: employmentTypeSchema,
  status: employeeStatusSchema,
  location: z.string(),
  address: z.string(),
  hireDate: z.string(),
  birthDate: z.string(),
  /** Unset only for the one root of the org chart (the CEO) — everyone else reports to someone. */
  managerId: z.string().optional(),
  /** Short internal identifier shown on badges/payslips, e.g. "EMP-0231". */
  employeeCode: z.string(),
  /** Only set for `employmentType: "contractor"` — an ongoing full/part-time hire has none. */
  contractEndDate: z.string().optional(),
  skills: z.array(z.string()),
  emergencyContactName: z.string(),
  emergencyContactPhone: z.string(),
  /** Annual paid-vacation allowance and how many days have been used so far this year. */
  vacationDaysTotal: z.number(),
  vacationDaysUsed: z.number(),
  /** Italian "ROL" (Riduzione Orario di Lavoro) hour bank — same idea as vacation days, tracked in hours. */
  rolHoursTotal: z.number(),
  rolHoursUsed: z.number()
})

export type Employee = z.infer<typeof employeeSchema>
