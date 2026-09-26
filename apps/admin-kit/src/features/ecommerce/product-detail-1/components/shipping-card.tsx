import type { Product } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { InfoField } from '../../_shared/info-field'

/** Shipping weight and which catalogs (retail/wholesale) carry the product. */
export function ShippingCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoField label="Weight">{product.weight} kg</InfoField>
        <InfoField label="Available in">
          <div className="flex flex-wrap gap-1.5">
            {product.channels.map(channel => (
              <Badge key={channel} variant="secondary" className="capitalize">
                {channel}
              </Badge>
            ))}
          </div>
        </InfoField>
      </CardContent>
    </Card>
  )
}
