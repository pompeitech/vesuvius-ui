import { Field } from '@admin/form'
import { Card, CardContent, Typography } from '@pompeitech/vesuvius-ui'

/** Step 4 — physical footprint (weight + size) for shipping and freight quotes. */
export function StepDimensions() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 pt-6">
        <Typography variant="h4">Dimensions & Units</Typography>
        <Typography variant="muted" className="-mt-4">
          Define the physical footprint so shipping and freight quotes stay accurate.
        </Typography>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.NumberInput name="weight" label="Weight" placeholder="0.5" step="0.01" />
          <Field.Select
            name="weightUnit"
            label="Weight unit"
            options={[
              { label: 'kg', value: 'kg' },
              { label: 'lb', value: 'lb' }
            ]}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field.NumberInput name="length" label="Length" placeholder="0" step="0.1" />
          <Field.NumberInput name="width" label="Width" placeholder="0" step="0.1" />
          <Field.NumberInput name="height" label="Height" placeholder="0" step="0.1" />
        </div>
        <Field.Select
          name="dimensionUnit"
          label="Dimension unit"
          options={[
            { label: 'cm', value: 'cm' },
            { label: 'in', value: 'in' }
          ]}
        />
      </CardContent>
    </Card>
  )
}
