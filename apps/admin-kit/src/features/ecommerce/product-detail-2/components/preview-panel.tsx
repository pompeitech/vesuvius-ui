import type { Product } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import type { ProductVariantRow } from '../../_shared/product-variants'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

type PreviewPanelProps = {
  product: Product
  focused: ProductVariantRow | undefined
  primary: ProductVariantRow | undefined
  minPrice: number
  maxPrice: number
}

/** Left column: the focused variant's photo plus a "family profile" summary card. */
export function PreviewPanel({ product, focused, primary, minPrice, maxPrice }: PreviewPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <div className="relative">
          {focused?.isPrimary && <Badge className="absolute top-3 left-3 z-10">Primary</Badge>}
          <img
            src={product.imageUrl}
            alt={focused?.name ?? product.name}
            className="aspect-square w-full object-cover"
          />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product family profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Primary variant
            </p>
            <p className="mt-1 text-sm font-medium">
              {primary ? `${primary.name} / ${primary.option}` : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Retail price band
            </p>
            <p className="mt-1 text-sm font-medium">
              {currency.format(minPrice)} - {currency.format(maxPrice)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Category
            </p>
            <p className="mt-1 text-sm font-medium">{product.category}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Vendor
            </p>
            <p className="mt-1 text-sm font-medium">{product.vendor}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
