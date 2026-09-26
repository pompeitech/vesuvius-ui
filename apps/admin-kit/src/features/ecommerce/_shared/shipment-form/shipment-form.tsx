import { Form, useZodForm } from '@admin/form'

import { FormHeader } from './form-header'
import { shipmentFormSchema, type ShipmentFormInput, type ShipmentFormOutput } from './schema'
import { DeliverySetupSection, NotesSection, PackageDetailsSection } from './sections'

export type ShipmentFormProps = {
  mode: 'add' | 'edit'
  defaultValues: ShipmentFormInput
  /** Called with the validated values once "Create label"/"Save changes" is pressed. */
  onSaved: (values: ShipmentFormOutput) => void
}

/**
 * The full Add/Edit Shipping Label form — one component behind both pages,
 * same approach as `OrderForm`/`ProductForm`. `mode` only changes copy; the
 * fields, validation, and layout are identical.
 */
export function ShipmentForm({ mode, defaultValues, onSaved }: ShipmentFormProps) {
  const form = useZodForm(shipmentFormSchema, { defaultValues })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSaved)} className="flex flex-col gap-6">
        <FormHeader mode={mode} onReset={() => form.reset()} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <DeliverySetupSection />
            <PackageDetailsSection />
          </div>

          <div className="flex flex-col gap-6">
            <NotesSection />
          </div>
        </div>
      </form>
    </Form>
  )
}
