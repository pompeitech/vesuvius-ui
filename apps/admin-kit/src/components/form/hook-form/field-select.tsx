import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  MultiSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn
} from '@pompeitech/vesuvius-ui'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form/form'
import type { MultiSelectOption } from '@pompeitech/vesuvius-ui'

type ControlSize = 'xs' | 'sm' | 'default' | 'lg'

export type FieldSelectOption = {
  label: ReactNode
  value: string
  disabled?: boolean
}

export type FieldSelectProps = {
  name: string
  label?: ReactNode
  description?: ReactNode
  placeholder?: string
  options?: FieldSelectOption[]
  children?: ReactNode
  disabled?: boolean
  size?: ControlSize
  className?: string
  required?: boolean
}

export function FieldSelect({
  name,
  label,
  description,
  placeholder,
  options,
  children,
  disabled,
  size,
  className,
  required
}: FieldSelectProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={disabled}>
            <FormControl>
              <SelectTrigger size={size} className={cn('w-full', className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {children ??
                options?.map(option => (
                  <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export type FieldMultiSelectProps = {
  name: string
  label?: ReactNode
  description?: ReactNode
  options: MultiSelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  maxDisplay?: number
  disabled?: boolean
  size?: ControlSize
  className?: string
  required?: boolean
}

export function FieldMultiSelect({
  name,
  label,
  description,
  options,
  placeholder,
  searchPlaceholder,
  maxDisplay,
  disabled,
  size,
  className,
  required
}: FieldMultiSelectProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <MultiSelect
              options={options}
              value={field.value ?? []}
              onValueChange={field.onChange}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              maxDisplay={maxDisplay}
              disabled={disabled}
              size={size}
              className={className}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
