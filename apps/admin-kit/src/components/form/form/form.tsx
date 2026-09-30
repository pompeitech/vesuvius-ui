import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  type FieldProps
} from '@pompeitech/vesuvius-ui'
import { createContext, type HTMLAttributes, useContext } from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState
} from 'react-hook-form'

// react-hook-form adapter over the design system's library-agnostic Field components.

export const Form = FormProvider

const FormFieldContext = createContext<{ name: string } | undefined>(undefined)

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext?.name })

  if (!fieldContext) throw new Error('useFormField should be used within <FormField>')

  return { name: fieldContext.name, ...getFieldState(fieldContext.name, formState) }
}

export function FormItem(props: Omit<FieldProps, 'invalid'>) {
  const { error } = useFormField()
  return <Field invalid={!!error} {...props} />
}

export const FormLabel = FieldLabel
export const FormControl = FieldControl
export const FormDescription = FieldDescription

export function FormMessage({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const { error } = useFormField()
  return <FieldError {...props}>{error ? String(error.message ?? '') : children}</FieldError>
}
