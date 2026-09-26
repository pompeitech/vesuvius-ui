import { Field } from '@admin/form'

/** Name/street/city/state/zip/country/phone — the shape shared by shipping and billing addresses. */
export function AddressFields({ prefix }: { prefix: 'shippingAddress' | 'billingAddress' }) {
  return (
    <div className="flex flex-col gap-4">
      <Field.Text name={`${prefix}.name`} label="Full name" placeholder="Jane Doe" required />
      <Field.Text
        name={`${prefix}.line1`}
        label="Address line 1"
        placeholder="123 Main St"
        required
      />
      <Field.Text
        name={`${prefix}.line2`}
        label="Address line 2"
        placeholder="Apt, suite, unit (optional)"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field.Text name={`${prefix}.city`} label="City" placeholder="Springfield" required />
        <Field.Text name={`${prefix}.state`} label="State" placeholder="IL" required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field.Text
          name={`${prefix}.postalCode`}
          label="Postal code"
          placeholder="62704"
          required
        />
        <Field.Text name={`${prefix}.country`} label="Country" placeholder="US" required />
      </div>
      <Field.Text name={`${prefix}.phone`} label="Phone" placeholder="(555) 123-4567" />
    </div>
  )
}
