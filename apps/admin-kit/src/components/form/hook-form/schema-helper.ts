import { z } from 'zod'

type MessageMap = {
  required?: string
  invalid?: string
}

export const schemaHelper = {
  date: (message?: MessageMap) =>
    z
      .union([z.date(), z.string(), z.number()])
      .nullable()
      .refine(value => value !== null && value !== undefined && value !== '', {
        message: message?.required ?? 'Date is required.'
      })
      .refine(
        value =>
          value === null || !Number.isNaN(new Date(value as string | number | Date).getTime()),
        {
          message: message?.invalid ?? 'Enter a valid date.'
        }
      )
      .transform(value => (value === null ? null : new Date(value as string | number | Date))),

  optionalDate: () =>
    z
      .union([z.date(), z.string(), z.number(), z.null(), z.undefined()])
      .refine(
        value =>
          value === null ||
          value === undefined ||
          value === '' ||
          !Number.isNaN(new Date(value).getTime()),
        { message: 'Enter a valid date.' }
      )
      .transform(value =>
        value === null || value === undefined || value === '' ? null : new Date(value)
      ),

  booleanRequired: (message?: string) =>
    z.boolean().refine(value => value === true, {
      message: message ?? 'This field is required.'
    }),

  sliderRange: ({ min, max, message }: { min: number; max: number; message?: string }) =>
    z.tuple([z.number(), z.number()]).refine(value => value[0] >= min && value[1] <= max, {
      message: message ?? `Range must be between ${min} and ${max}.`
    }),

  file: (props?: { message?: string; required?: boolean }) =>
    z.custom<File | string | null | undefined>().refine(
      value => {
        const hasFile = value instanceof File || (typeof value === 'string' && value.length > 0)
        return props?.required ? hasFile : true
      },
      { message: props?.message ?? 'Select a file.' }
    ),

  files: (props?: { message?: string; minFiles?: number }) =>
    z.array(z.custom<File | string>()).refine(value => value.length >= (props?.minFiles ?? 1), {
      message: props?.message ?? `Add at least ${props?.minFiles ?? 1} file(s).`
    })
}
