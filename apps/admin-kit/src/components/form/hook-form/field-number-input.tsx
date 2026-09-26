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
import { Input, type InputProps } from '@pompeitech/vesuvius-ui'

export type FieldNumberInputProps = Omit<InputProps, 'name' | 'type' | 'required'> & {
  name: string
  label?: ReactNode
  description?: ReactNode
  required?: boolean
}

export function FieldNumberInput({
  name,
  label,
  description,
  required,
  ...props
}: FieldNumberInputProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <Input
              type="number"
              inputMode="decimal"
              {...props}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              value={field.value ?? ''}
              onChange={event => field.onChange(event.target.value)}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
