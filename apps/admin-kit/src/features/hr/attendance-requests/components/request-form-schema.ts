import { schemaHelper } from '@admin/form'

import { z } from 'zod'

/** Only the types an employee can actually request — `public_holiday` is company-wide, never a personal request. */
export const REQUESTABLE_TYPE_OPTIONS = [
  { value: 'vacation', label: 'Vacation' },
  { value: 'permit', label: 'Permit' },
  { value: 'smart_working', label: 'Smart Working' },
  { value: 'sick_leave', label: 'Sick Leave' }
] as const

const requestableTypeSchema = z.enum(['vacation', 'permit', 'smart_working', 'sick_leave'])

const dayPartValueSchema = z.enum(['full', 'morning', 'afternoon'])

function isSameCalendarDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString()
}

export const requestFormSchema = z
  .object({
    employeeId: z.string().min(1, 'Select an employee.'),
    type: requestableTypeSchema,
    startDate: schemaHelper.date(),
    endDate: schemaHelper.date(),
    dayPart: dayPartValueSchema,
    note: z.string().max(500, 'Keep it under 500 characters.').optional()
  })
  .superRefine((values, ctx) => {
    if (!values.startDate || !values.endDate) return

    if (values.endDate < values.startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: "End date can't be before the start date."
      })
    }

    if (values.dayPart !== 'full') {
      if (!isSameCalendarDay(values.startDate, values.endDate)) {
        ctx.addIssue({
          code: 'custom',
          path: ['dayPart'],
          message: 'Half-day only applies to a single-day request.'
        })
      }
      if (values.type !== 'permit' && values.type !== 'smart_working') {
        ctx.addIssue({
          code: 'custom',
          path: ['dayPart'],
          message: 'Only permits and smart working can be half-day.'
        })
      }
    }
  })

export type RequestFormInput = z.input<typeof requestFormSchema>
export type RequestFormOutput = z.output<typeof requestFormSchema>

export const REQUEST_FORM_DEFAULT_VALUES: RequestFormInput = {
  employeeId: '',
  type: 'vacation',
  startDate: null,
  endDate: null,
  dayPart: 'full',
  note: ''
}
