import type { Order } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { InfoField } from '../../_shared/info-field'
import {
  ORDER_CHANNEL_LABEL,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_VARIANT
} from '../../_shared/format'

/** How this order was placed and paid for. */
export function PaymentCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <InfoField label="Status">
          <Badge variant={PAYMENT_STATUS_VARIANT[order.paymentStatus]} className="capitalize">
            {order.paymentStatus}
          </Badge>
        </InfoField>
        <InfoField label="Method">{PAYMENT_METHOD_LABEL[order.paymentMethod]}</InfoField>
        <InfoField label="Channel">{ORDER_CHANNEL_LABEL[order.channel]}</InfoField>
      </CardContent>
    </Card>
  )
}
