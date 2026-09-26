import type { Shipment } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { InfoField } from '../../_shared/info-field'
import { dateFormatter, dateTimeFormatter } from '../../_shared/format'

/** Carrier / current hub / last scan / ETA window — the quick-facts strip below the route card. */
export function InfoCard({ shipment }: { shipment: Shipment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment info</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <InfoField label="Carrier">{shipment.carrier}</InfoField>
        <InfoField label="Tracking number">{shipment.trackingNumber}</InfoField>
        <InfoField label="Current hub">{shipment.currentHub}</InfoField>
        <InfoField label="Last scan">
          {dateTimeFormatter.format(new Date(shipment.lastScanAt))}
        </InfoField>
        <InfoField label="Origin">
          {shipment.originCity}, {shipment.originCountry}
        </InfoField>
        <InfoField label="Destination">
          {shipment.destinationCity}, {shipment.destinationCountry}
        </InfoField>
        <InfoField label="ETA window">
          {dateFormatter.format(new Date(shipment.estimatedDelivery))}
        </InfoField>
      </CardContent>
    </Card>
  )
}
