import { Field } from '@admin/form'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { SHIPMENT_SERVICE_TIER_OPTIONS, SHIPMENT_STATUS_OPTIONS } from '../../format'
import { CARRIER_OPTIONS, ORDER_OPTIONS } from '../schema'

export function DeliverySetupSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Setup</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field.Select
          name="orderId"
          label="Linked order"
          placeholder="Select an order"
          options={ORDER_OPTIONS}
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Select
            name="carrier"
            label="Carrier Lane"
            placeholder="Select a carrier"
            options={CARRIER_OPTIONS}
            required
          />
          <Field.Select
            name="serviceTier"
            label="Service Speed"
            options={SHIPMENT_SERVICE_TIER_OPTIONS}
            required
          />
        </div>
        <Field.Text
          name="trackingNumber"
          label="Tracking number"
          placeholder="1Z999AA10123456784"
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Select name="status" label="Status" options={SHIPMENT_STATUS_OPTIONS} required />
          <Field.DatePicker
            name="estimatedDelivery"
            label="Estimated delivery"
            required
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
