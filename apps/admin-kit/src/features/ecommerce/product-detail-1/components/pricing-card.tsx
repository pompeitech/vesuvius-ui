import type { Product } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { InfoField } from '../../_shared/info-field'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/** Retail/wholesale price, unit cost, and the computed margin. */
export function PricingCard({ product }: { product: Product }) {
  const margin =
    product.price > 0 ? Math.round(((product.price - product.cost) / product.price) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoField label="Retail price">{currency.format(product.price)}</InfoField>
        <InfoField label="Wholesale price">{currency.format(product.wholesalePrice)}</InfoField>
        <InfoField label="Unit cost">{currency.format(product.cost)}</InfoField>
        <InfoField label="Margin">{margin}%</InfoField>
      </CardContent>
    </Card>
  )
}
