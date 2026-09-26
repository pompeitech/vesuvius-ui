import { Form, useZodForm } from '@admin/form'
import type { ProductStatus } from '@pompeitech/mock-data'

import { FormHeader } from './form-header'
import { productFormSchema, type ProductFormInput, type ProductFormOutput } from './schema'
import {
  MediaSection,
  OrganizationSection,
  PricingSection,
  ProductInfoSection,
  StatusSection,
  VariantsSection
} from './sections'

export type ProductFormProps = {
  mode: 'add' | 'edit'
  defaultValues: ProductFormInput
  /** Called with the validated values once "Save draft"/"Save Product" (or "Update product") is pressed. */
  onSaved: (values: ProductFormOutput, status: ProductStatus) => void
}

/**
 * The full Add/Edit Product form — one component behind both pages so a
 * field added here (or fixed) doesn't have to be repeated. `mode` only
 * changes copy/labels; the fields, validation, and layout are identical.
 * Each card is its own component under `./sections`; this file only lays
 * them out in the two-column grid and wires up submit/draft/reset.
 */
export function ProductForm({ mode, defaultValues, onSaved }: ProductFormProps) {
  const form = useZodForm(productFormSchema, { defaultValues })

  function onSubmit(values: ProductFormOutput, status: ProductStatus = values.status) {
    onSaved(values, status)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(values => onSubmit(values))}
        className="flex flex-col gap-6"
      >
        <FormHeader
          mode={mode}
          onReset={() => form.reset()}
          onSaveDraft={form.handleSubmit(values => onSubmit(values, 'draft'))}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <ProductInfoSection />
            <MediaSection />
            <VariantsSection />
          </div>

          <div className="flex flex-col gap-6">
            <PricingSection />
            <StatusSection />
            <OrganizationSection />
          </div>
        </div>
      </form>
    </Form>
  )
}
