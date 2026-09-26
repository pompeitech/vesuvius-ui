import { toast } from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'
import { PRODUCT_FORM_DEFAULT_VALUES, ProductForm } from '../_shared/product-form'

export function Component() {
  const navigate = useNavigate()

  return (
    <ProductForm
      mode="add"
      defaultValues={PRODUCT_FORM_DEFAULT_VALUES}
      onSaved={(values, status) => {
        // No write API on top of the static mock catalog (see packages/mock-data)
        // — this simulates a save and returns to the list, same as every other
        // ephemeral interaction in this kit (nothing here persists across a
        // reload/navigation).
        toast.success(`"${values.name}" was saved as ${status}.`)
        navigate('/ecommerce/product-list-1')
      }}
    />
  )
}
