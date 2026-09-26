import { Field } from '@admin/form'
import { Card, CardContent, Typography } from '@pompeitech/vesuvius-ui'
import { useFormContext } from 'react-hook-form'
import type { ProductWizardInput } from '../schema'

function ProfitPreview() {
  const { watch } = useFormContext<ProductWizardInput>()
  const [basePrice, unitCost] = watch(['basePrice', 'unitCost'])

  const price = Number(basePrice) || 0
  const cost = Number(unitCost) || 0
  const profit = price - cost
  const margin = price > 0 ? (profit / price) * 100 : 0

  return (
    <div className="rounded-md border p-4">
      <Typography variant="small" className="font-medium">
        Profit preview
      </Typography>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <Typography variant="muted" className="text-xs uppercase">
            Price
          </Typography>
          <p className="text-lg font-semibold tabular-nums">{price.toFixed(2)}</p>
        </div>
        <div>
          <Typography variant="muted" className="text-xs uppercase">
            Margin
          </Typography>
          <p className="text-lg font-semibold tabular-nums">{margin.toFixed(0)}%</p>
        </div>
        <div>
          <Typography variant="muted" className="text-xs uppercase">
            Profit
          </Typography>
          <p className="text-lg font-semibold tabular-nums">{profit.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

/** Step 2 — retail pricing, unit cost, and a live profit/margin preview. */
export function StepPricing() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 pt-6">
        <Typography variant="h4">Pricing Model</Typography>
        <Typography variant="muted" className="-mt-4">
          Set how this item behaves across retail pricing and cost tracking.
        </Typography>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Select
            name="currency"
            label="Currency"
            options={[
              { label: 'USD', value: 'USD' },
              { label: 'EUR', value: 'EUR' },
              { label: 'GBP', value: 'GBP' }
            ]}
          />
          <Field.Switch name="chargeTax" label="Charge tax on this product" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.NumberInput name="basePrice" label="Base price" placeholder="45.00" step="0.01" />
          <Field.NumberInput name="unitCost" label="Unit cost" placeholder="18.00" step="0.01" />
        </div>
        <Field.NumberInput
          name="discountedPrice"
          label="Discounted price"
          placeholder="39.00"
          step="0.01"
          description="Leave empty to sell at the base price."
        />

        <ProfitPreview />
      </CardContent>
    </Card>
  )
}
