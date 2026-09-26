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
import { Input, Textarea, type InputProps, type TextareaProps } from '@pompeitech/vesuvius-ui'

export type FieldTextProps = Omit<InputProps, 'name' | 'required'> & {
  name: string
  label?: ReactNode
  description?: ReactNode
  required?: boolean
}

export function FieldText({ name, label, description, required, ...props }: FieldTextProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <Input {...field} value={field.value ?? ''} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export type FieldTextareaProps = Omit<TextareaProps, 'name' | 'required'> & {
  name: string
  label?: ReactNode
  description?: ReactNode
  required?: boolean
}

export function FieldTextarea({
  name,
  label,
  description,
  required,
  ...props
}: FieldTextareaProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} value={field.value ?? ''} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
