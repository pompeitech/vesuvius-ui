import type { Order, OrderLineItem } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { ORDER_CHANNEL_LABEL, PAYMENT_METHOD_LABEL } from '../../_shared/format'

type PreviewPanelProps = {
  order: Order
  focused: OrderLineItem | undefined
}

/** Left column: the focused line item's photo plus a shipping/payment summary card. */
export function PreviewPanel({ order, focused }: PreviewPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <div className="relative">
          {focused && <Badge className="absolute top-3 left-3 z-10">{focused.quantity}x</Badge>}
          <img
            src={focused?.imageUrl}
            alt={focused?.name ?? 'Order item'}
            className="aspect-square w-full object-cover"
          />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fulfillment summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Ship to
            </p>
            <p className="mt-1 text-sm font-medium">{order.shippingAddress.name}</p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Channel
            </p>
            <p className="mt-1 text-sm font-medium">{ORDER_CHANNEL_LABEL[order.channel]}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Payment method
            </p>
            <p className="mt-1 text-sm font-medium">{PAYMENT_METHOD_LABEL[order.paymentMethod]}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Order number
            </p>
            <p className="mt-1 text-sm font-medium">{order.orderNumber}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
