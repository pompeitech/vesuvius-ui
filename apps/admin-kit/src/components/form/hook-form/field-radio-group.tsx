import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { RadioGroup, RadioGroupItem, cn } from '@pompeitech/vesuvius-ui'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form/form'

export type FieldRadioGroupOption = {
  label: ReactNode
  value: string
  disabled?: boolean
}

export type FieldRadioGroupProps = {
  name: string
  label?: ReactNode
  description?: ReactNode
  options: FieldRadioGroupOption[]
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  className?: string
  required?: boolean
}

export function FieldRadioGroup({
  name,
  label,
  description,
  options,
  orientation = 'vertical',
  disabled,
  className,
  required
}: FieldRadioGroupProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
              className={cn(
                orientation === 'horizontal'
                  ? 'flex flex-row flex-wrap gap-4'
                  : 'flex flex-col gap-2'
              )}
            >
              {options.map(option => (
                <FormItem key={option.value} className="flex flex-row items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value={option.value} disabled={option.disabled} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
