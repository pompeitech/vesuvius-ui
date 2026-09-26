import type { Product } from '@pompeitech/mock-data'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { StarIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { InfoField } from '../../_shared/info-field'

/** Rating, channels, variant count, and a shortcut into the variant-centric Product Detail 2. */
export function DetailsCard({ product }: { product: Product }) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InfoField label="Rating">
          <span className="inline-flex items-center gap-1">
            <StarIcon className="size-3.5 fill-warning text-warning" />
            {product.rating.toFixed(1)}
          </span>
        </InfoField>
        <InfoField label="Channels">
          <span className="capitalize">{product.channels.join(', ')}</span>
        </InfoField>
        <InfoField label="Variants">{product.variantCount}</InfoField>
        {product.variantCount > 0 && (
          <Button
            variant="outline"
            onClick={() => navigate(`/ecommerce/product-detail-2/${product.id}`)}
          >
            View variant breakdown
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
