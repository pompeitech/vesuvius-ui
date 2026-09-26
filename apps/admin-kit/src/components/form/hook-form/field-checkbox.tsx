import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { Checkbox, Switch, cn } from '@pompeitech/vesuvius-ui'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form/form'

export type FieldCheckboxProps = {
  name: string
  label?: ReactNode
  description?: ReactNode
  disabled?: boolean
  className?: string
}

export function FieldCheckbox({
  name,
  label,
  description,
  disabled,
  className
}: FieldCheckboxProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-row items-start gap-2', className)}>
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="grid gap-1 leading-none">
            {label && <FormLabel className="font-normal">{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export type FieldSwitchProps = {
  name: string
  label?: ReactNode
  description?: ReactNode
  disabled?: boolean
  className?: string
}

export function FieldSwitch({ name, label, description, disabled, className }: FieldSwitchProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-start justify-between gap-3 rounded-md border p-3',
            className
          )}
        >
          <div className="grid gap-0.5">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={!!field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
