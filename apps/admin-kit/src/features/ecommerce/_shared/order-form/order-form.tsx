import { Form, useZodForm } from '@admin/form'

import { FormHeader } from './form-header'
import { orderFormSchema, type OrderFormInput, type OrderFormOutput } from './schema'
import {
  BillingSection,
  CustomerSection,
  ItemsSection,
  NotesSection,
  PaymentSection,
  ShippingSection
} from './sections'

export type OrderFormProps = {
  mode: 'add' | 'edit'
  defaultValues: OrderFormInput
  /** Called with the validated values once "Create order"/"Update order" is pressed. */
  onSaved: (values: OrderFormOutput) => void
}

/**
 * The full Add/Edit Order form — one component behind both pages, same
 * approach as `ProductForm`. `mode` only changes copy; the fields,
 * validation, and layout are identical. Each card is its own component
 * under `./sections`; this file only lays them out and wires up submit.
 */
export function OrderForm({ mode, defaultValues, onSaved }: OrderFormProps) {
  const form = useZodForm(orderFormSchema, { defaultValues })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSaved)} className="flex flex-col gap-6">
        <FormHeader mode={mode} onReset={() => form.reset()} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <ItemsSection />
            <ShippingSection />
            <BillingSection />
          </div>

          <div className="flex flex-col gap-6">
            <CustomerSection />
            <PaymentSection />
            <NotesSection />
          </div>
        </div>
      </form>
    </Form>
  )
}
