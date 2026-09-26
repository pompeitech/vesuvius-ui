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
import { Slider, type SliderProps } from '@pompeitech/vesuvius-ui'

export type FieldSliderProps = Omit<
  SliderProps,
  'name' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  name: string
  label?: ReactNode
  description?: ReactNode
}

export function FieldSlider({ name, label, description, ...props }: FieldSliderProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Slider value={field.value} onValueChange={field.onChange} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
