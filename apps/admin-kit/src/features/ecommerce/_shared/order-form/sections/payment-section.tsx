import { Field } from '@admin/form'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { ORDER_CHANNEL_OPTIONS, PAYMENT_METHOD_LABEL } from '../../format'

const PAYMENT_METHOD_OPTIONS = Object.entries(PAYMENT_METHOD_LABEL).map(([value, label]) => ({
  label,
  value
}))

const PAYMENT_STATUS_OPTIONS = [
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Failed', value: 'failed' }
]

export function PaymentSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field.Select name="channel" label="Sales channel" options={ORDER_CHANNEL_OPTIONS} />
        <Field.Select
          name="paymentMethod"
          label="Payment method"
          options={PAYMENT_METHOD_OPTIONS}
        />
        <Field.Select
          name="paymentStatus"
          label="Payment status"
          options={PAYMENT_STATUS_OPTIONS}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.NumberInput
            name="shippingCost"
            label="Shipping cost"
            placeholder="0.00"
            step="0.01"
            min={0}
          />
          <Field.NumberInput
            name="discount"
            label="Discount"
            placeholder="0.00"
            step="0.01"
            min={0}
          />
        </div>
      </CardContent>
    </Card>
  )
}
