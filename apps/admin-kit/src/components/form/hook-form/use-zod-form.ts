import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm,
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn
} from 'react-hook-form'
import type { z, ZodType } from 'zod'

export function useZodForm<Schema extends ZodType<FieldValues, FieldValues>>(
  schema: Schema,
  options?: Omit<UseFormProps<z.input<Schema>, unknown, z.output<Schema>>, 'resolver'>
): UseFormReturn<z.input<Schema>, unknown, z.output<Schema>> {
  // zodResolver's generics don't infer through a generic Schema param;
  // the cast states what's already true at runtime.
  const resolver = zodResolver(schema) as unknown as Resolver<
    z.input<Schema>,
    unknown,
    z.output<Schema>
  >

  return useForm<z.input<Schema>, unknown, z.output<Schema>>({
    resolver,
    mode: 'onTouched',
    ...options
  })
}
