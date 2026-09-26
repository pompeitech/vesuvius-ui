import type { Shipment } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, Typography } from '@pompeitech/vesuvius-ui'
import { InfoField } from '../../_shared/info-field'

const PACKAGE_TYPE_LABEL: Record<Shipment['packageType'], string> = {
  box: 'Box',
  envelope: 'Envelope',
  pallet: 'Pallet',
  tube: 'Tube',
  crate: 'Crate'
}

/** What's inside — package name/type, weight, and dimensions. */
export function PackageCard({ shipment }: { shipment: Shipment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Package details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoField label="Package">{shipment.packageName}</InfoField>
          <InfoField label="Type">{PACKAGE_TYPE_LABEL[shipment.packageType]}</InfoField>
          <InfoField label="Item weight">{shipment.itemWeightKg} kg</InfoField>
          <InfoField label="Total weight">{shipment.totalWeightKg} kg</InfoField>
          <InfoField label="Dimensions">
            {shipment.lengthCm} × {shipment.widthCm} × {shipment.heightCm} cm
          </InfoField>
        </div>
        {shipment.notes && (
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Notes
            </p>
            <Typography variant="muted" className="mt-1">
              {shipment.notes}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
