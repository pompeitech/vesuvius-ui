import { Field } from '@admin/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { CURRENCIES } from '../schema'

/** Retail/wholesale pricing, unit cost, and the tax/availability switches. */
export function PricingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
        <CardDescription>
          Set pricing, cost, and live availability for this listing.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field.NumberInput
          name="basePrice"
          label="Base price"
          placeholder="45.00"
          step="0.01"
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.NumberInput
            name="wholesalePrice"
            label="Wholesale price"
            placeholder="28.00"
            step="0.01"
          />
          <Field.NumberInput name="cost" label="Unit cost" placeholder="18.00" step="0.01" />
        </div>
        <Field.NumberInput
          name="discountedPrice"
          label="Discounted price"
          placeholder="39.00"
          step="0.01"
          description="Leave empty to sell at the base price."
        />
        <Field.Select
          name="currency"
          label="Currency"
          options={CURRENCIES.map(currency => ({ label: currency, value: currency }))}
        />
        <Field.Switch
          name="chargeTax"
          label="Charge tax on this product"
          description="Apply the default checkout tax rules automatically."
        />
        <Field.Switch
          name="inStock"
          label="In stock"
          description="Turn this off to keep the product visible but unavailable."
        />
      </CardContent>
    </Card>
  )
}
