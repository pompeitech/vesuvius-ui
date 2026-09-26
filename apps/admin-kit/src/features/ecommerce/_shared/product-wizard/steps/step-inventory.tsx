import { Field } from '@admin/form'
import { Card, CardContent, Typography } from '@pompeitech/vesuvius-ui'

/** Step 3 — stock on hand, the low-stock alert threshold, and launch status. */
export function StepInventory() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 pt-6">
        <Typography variant="h4">Inventory Rules</Typography>
        <Typography variant="muted" className="-mt-4">
          Set stock on hand and the status this product goes live with.
        </Typography>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.NumberInput name="stock" label="Stock quantity" placeholder="0" />
          <Field.NumberInput
            name="lowStockThreshold"
            label="Low stock threshold"
            placeholder="10"
            description="Flag the product as low stock at or below this quantity."
          />
        </div>
        <Field.Select
          name="status"
          label="Status"
          options={[
            { label: 'Draft', value: 'draft' },
            { label: 'Active', value: 'active' },
            { label: 'Archived', value: 'archived' }
          ]}
        />
      </CardContent>
    </Card>
  )
}
