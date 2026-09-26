import type { Shipment } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { ArrowRightIcon } from 'lucide-react'
import { dateFormatter, SHIPMENT_SERVICE_TIER_LABEL } from '../../_shared/format'
import { ShipmentProgressTracker } from '../../_shared/shipment-tracker'

/** Carrier/service badges, ETA, the origin→destination route with its hub path, and the 4-step progress tracker. */
export function RouteCard({ shipment }: { shipment: Shipment }) {
  return (
    <Card>
      <CardHeader className="flex flex-wrap items-center justify-between gap-2">
        <CardTitle>Route</CardTitle>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{shipment.carrier}</Badge>
          <Badge variant="secondary">{SHIPMENT_SERVICE_TIER_LABEL[shipment.serviceTier]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2 text-base font-medium">
            <span>{shipment.originCity}</span>
            <ArrowRightIcon className="size-4 text-muted-foreground" />
            <span>{shipment.destinationCity}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Estimated delivery {dateFormatter.format(new Date(shipment.estimatedDelivery))} · via{' '}
            {shipment.routeHubs.join(' → ')}
          </p>
        </div>

        <ShipmentProgressTracker status={shipment.status} />
      </CardContent>
    </Card>
  )
}
