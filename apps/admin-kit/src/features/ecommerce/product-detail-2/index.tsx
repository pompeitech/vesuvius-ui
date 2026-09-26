import { PRODUCTS, type Product } from '@pompeitech/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { EmptyTab } from '../_shared/empty-tab'
import { generateProductVariants, type ProductVariantRow } from '../_shared/product-variants'
import { DetailHeader } from './components/detail-header'
import { PreviewPanel } from './components/preview-panel'
import { StatCards } from './components/stat-cards'
import { VariantLineup } from './components/variant-lineup'

export async function loader({ params }: LoaderFunctionArgs) {
  const product = PRODUCTS.find(p => p.id === params.id)
  if (!product) {
    throw new Response('Product not found', { status: 404 })
  }
  return product
}

export function Component() {
  const product = useLoaderData() as Product
  const variants = useMemo(() => generateProductVariants(product), [product])
  const [focused, setFocused] = useState<ProductVariantRow | undefined>(variants[0])

  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0)
  const lowStockCount = variants.filter(v => v.lowStock).length
  const averageStock = variants.length > 0 ? Math.round(totalStock / variants.length) : 0

  const prices = variants.map(v => v.retailPrice)
  const minPrice = prices.length > 0 ? Math.min(...prices) : product.price
  const maxPrice = prices.length > 0 ? Math.max(...prices) : product.price
  const primary = variants.find(v => v.isPrimary)

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader product={product} variantCount={variants.length} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
            <PreviewPanel
              product={product}
              focused={focused}
              primary={primary}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />

            <div className="flex flex-col gap-6">
              <StatCards
                totalStock={totalStock}
                lowStockCount={lowStockCount}
                averageStock={averageStock}
                variantCount={variants.length}
              />
              <VariantLineup
                product={product}
                variants={variants}
                focusedId={focused?.id}
                onFocus={setFocused}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="variants" className="mt-4">
          <EmptyTab
            title="Variant management coming soon"
            description="Use the lineup on the Overview tab for now."
          />
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <EmptyTab
            title="Inventory history coming soon"
            description="Warehouse-level stock movement will show up here."
          />
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <EmptyTab
            title="No activity yet"
            description="Edits to this product's variants will show up here."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
