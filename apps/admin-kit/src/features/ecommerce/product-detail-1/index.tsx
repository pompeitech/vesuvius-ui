import { PRODUCTS, type Product } from '@pompeitech/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { EmptyTab } from '../_shared/empty-tab'
import { BasicInfoCard } from './components/basic-info-card'
import { DetailHeader } from './components/detail-header'
import { DetailsCard } from './components/details-card'
import { PricingCard } from './components/pricing-card'
import { ShippingCard } from './components/shipping-card'
import { StockCard } from './components/stock-card'

export async function loader({ params }: LoaderFunctionArgs) {
  const product = PRODUCTS.find(p => p.id === params.id)
  if (!product) {
    throw new Response('Product not found', { status: 404 })
  }
  return product
}

export function Component() {
  const product = useLoaderData() as Product

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader product={product} />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General Information</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <BasicInfoCard product={product} />
              <PricingCard product={product} />
              <ShippingCard product={product} />
            </div>

            <div className="flex flex-col gap-6">
              <StockCard product={product} />
              <DetailsCard product={product} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <EmptyTab
            title="No history yet"
            description="Changes to this product will show up here."
          />
        </TabsContent>

        <TabsContent value="reviews" className="mt-4">
          <EmptyTab
            title="No reviews yet"
            description="Customer reviews for this product will show up here."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
