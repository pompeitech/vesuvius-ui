import { z } from 'zod'

export const expenseCategorySchema = z.enum([
  'travel',
  'meals',
  'software',
  'office_supplies',
  'training',
  'other'
])
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>

export const expenseStatusSchema = z.enum(['pending', 'approved', 'reimbursed', 'rejected'])
export type ExpenseStatus = z.infer<typeof expenseStatusSchema>

export const expenseReportSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  description: z.string(),
  category: expenseCategorySchema,
  amount: z.number(),
  date: z.string(),
  status: expenseStatusSchema
})

export type ExpenseReport = z.infer<typeof expenseReportSchema>
