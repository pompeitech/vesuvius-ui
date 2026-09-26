import { Field } from '@admin/form'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@pompeitech/vesuvius-ui'
import { PlusIcon, XIcon } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { VARIANT_OPTIONS, type ProductFormInput } from '../schema'

/** Alternate sizes, bundles, or colors — each with its own price and quantity. */
export function VariantsSection() {
  const { control } = useFormContext<ProductFormInput>()
  const { fields, append, remove } = useFieldArray({ control, name: 'variants' })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variants</CardTitle>
        <CardDescription>
          Configure alternate sizes, bundles, or colors with their own inventory.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {fields.length > 0 && (
          <div className="hidden grid-cols-[1fr_1fr_1fr_1fr_2rem] gap-3 px-1 text-xs font-medium text-muted-foreground sm:grid">
            <span>Option</span>
            <span>Value</span>
            <span>Price</span>
            <span>Quantity</span>
            <span />
          </div>
        )}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[1fr_1fr_1fr_1fr_2rem]"
          >
            <Field.Select
              name={`variants.${index}.option`}
              placeholder="Select option"
              options={VARIANT_OPTIONS.map(option => ({ label: option, value: option }))}
            />
            <Field.Text name={`variants.${index}.value`} placeholder="50 ml" />
            <Field.NumberInput name={`variants.${index}.price`} placeholder="45.00" step="0.01" />
            <Field.NumberInput name={`variants.${index}.quantity`} placeholder="0" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mt-0.5 justify-self-start text-muted-foreground sm:justify-self-auto"
              onClick={() => remove(index)}
            >
              <XIcon />
              <span className="sr-only">Remove variant</span>
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => append({ option: '', value: '', price: '0', quantity: '0' })}
        >
          <PlusIcon />
          Add variant
        </Button>
      </CardContent>
    </Card>
  )
}
