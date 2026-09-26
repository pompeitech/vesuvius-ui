import { z } from 'zod'

export const salaryTypeSchema = z.enum(['annual', 'monthly'])
export type SalaryType = z.infer<typeof salaryTypeSchema>

export const payslipSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  /** "YYYY-MM" — one payslip per employee per payroll run. */
  period: z.string(),
  grossSalary: z.number(),
  salaryType: salaryTypeSchema,
  daysWorked: z.number().int(),
  expenseReimbursement: z.number(),
  /** Bonuses, benefits, or other one-off additions on top of base pay. */
  extraItems: z.number(),
  netPay: z.number(),
  /** Same employee's `netPay` the prior period — powers the "Var. netto" month-over-month comparison. */
  previousNetPay: z.number().optional()
})

export type Payslip = z.infer<typeof payslipSchema>
