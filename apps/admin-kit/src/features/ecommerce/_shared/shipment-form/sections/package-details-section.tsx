import { Field } from '@admin/form'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

const PACKAGE_TYPE_OPTIONS = [
  { label: 'Box', value: 'box' },
  { label: 'Envelope', value: 'envelope' },
  { label: 'Pallet', value: 'pallet' },
  { label: 'Tube', value: 'tube' },
  { label: 'Crate', value: 'crate' }
]

export function PackageDetailsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Package Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Text
            name="packageName"
            label="Package name"
            placeholder="Retail carton"
            required
          />
          <Field.Select
            name="packageType"
            label="Package type"
            options={PACKAGE_TYPE_OPTIONS}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.NumberInput
            name="itemWeightKg"
            label="Item weight (kg)"
            placeholder="1.0"
            step="0.1"
            min={0}
            required
          />
          <Field.NumberInput
            name="totalWeightKg"
            label="Total weight (kg)"
            placeholder="1.2"
            step="0.1"
            min={0}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field.NumberInput
            name="lengthCm"
            label="Length (cm)"
            placeholder="30"
            min={0}
            required
          />
          <Field.NumberInput name="widthCm" label="Width (cm)" placeholder="20" min={0} required />
          <Field.NumberInput
            name="heightCm"
            label="Height (cm)"
            placeholder="15"
            min={0}
            required
          />
        </div>
        <Field.Switch
          name="savePackage"
          label="Save this package for future use"
          description="Reuse these dimensions next time you create a label (not persisted in this demo)."
        />
      </CardContent>
    </Card>
  )
}
