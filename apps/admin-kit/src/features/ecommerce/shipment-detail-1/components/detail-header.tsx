import type { Shipment } from '@pompeitech/mock-data'
import { Badge, Button, toast, Typography } from '@pompeitech/vesuvius-ui'
import { MessageCircleIcon, XIcon } from 'lucide-react'
import { SHIPMENT_STATUS_LABEL, SHIPMENT_STATUS_VARIANT } from '../../_shared/format'

/** Tracking #, status(+delay) badges, and the Cancel/Notify actions — same "toast only, no real effect" convention as Order Detail's header. */
export function DetailHeader({ shipment }: { shipment: Shipment }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          Shipment {shipment.trackingNumber}
        </Typography>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant={SHIPMENT_STATUS_VARIANT[shipment.status]}>
            {SHIPMENT_STATUS_LABEL[shipment.status]}
          </Badge>
          {shipment.delayed && <Badge variant="destructive">Delay</Badge>}
          <span className="text-sm text-muted-foreground">Order {shipment.orderNumber}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            toast.info(`A message to the customer about ${shipment.trackingNumber} would go here.`)
          }
        >
          <MessageCircleIcon />
          <span className="sr-only">Message customer</span>
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success(`Customer notified about ${shipment.trackingNumber} (not persisted).`)
          }
        >
          Notify Customer
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info(`${shipment.trackingNumber} marked as cancelled (not persisted).`)
          }
        >
          <XIcon />
          Cancel shipment
        </Button>
      </div>
    </div>
  )
}
