import { toast } from '@pompeitech/vesuvius-ui'
import { PRODUCTS, type Product } from '@pompeitech/mock-data'
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router'
import { productToWizardValues, ProductWizardForm } from '../_shared/product-wizard'

export async function loader({ params }: LoaderFunctionArgs) {
  const product = PRODUCTS.find(p => p.id === params.id)
  if (!product) {
    throw new Response('Product not found', { status: 404 })
  }
  return product
}

export function Component() {
  const product = useLoaderData() as Product
  const navigate = useNavigate()

  return (
    <ProductWizardForm
      key={product.id}
      mode="edit"
      defaultValues={productToWizardValues(product)}
      onSaved={(values, status) => {
        // No write API on top of the static mock catalog — see add-product.
        toast.success(`"${values.name}" was updated (${status}).`)
        navigate('/ecommerce/product-list-1')
      }}
    />
  )
}
