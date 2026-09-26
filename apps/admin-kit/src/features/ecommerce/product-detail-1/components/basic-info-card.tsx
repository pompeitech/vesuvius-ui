import type { Product } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle, Separator } from '@pompeitech/vesuvius-ui'
import { InfoField } from '../../_shared/info-field'

/** Product photo plus identity fields: SKU, barcode, category, vendor, description, tags. */
export function BasicInfoCard({ product }: { product: Product }) {
  return (
    <>
      <Card className="overflow-hidden p-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-video w-full object-cover"
        />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoField label="SKU">{product.sku}</InfoField>
            <InfoField label="Barcode">{product.barcode}</InfoField>
            <InfoField label="Category">{product.category}</InfoField>
            <InfoField label="Vendor">{product.vendor}</InfoField>
          </div>
          <Separator />
          <InfoField label="Description">
            <p className="text-muted-foreground">{product.description}</p>
          </InfoField>
          {product.tags.length > 0 && (
            <>
              <Separator />
              <InfoField label="Tags">
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </InfoField>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
