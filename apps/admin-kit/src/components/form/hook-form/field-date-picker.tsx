import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form/form'
import { DatePicker, type DatePickerProps } from '@pompeitech/vesuvius-ui'

export type FieldDatePickerProps = Omit<
  DatePickerProps,
  'name' | 'value' | 'defaultValue' | 'onChange'
> & {
  name: string
  label?: ReactNode
  description?: ReactNode
  required?: boolean
}

export function FieldDatePicker({
  name,
  label,
  description,
  required,
  ...props
}: FieldDatePickerProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <DatePicker
              value={field.value ?? undefined}
              onChange={date => field.onChange(date ?? null)}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
