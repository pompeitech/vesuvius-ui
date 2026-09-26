import { toast } from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'
import { PRODUCT_WIZARD_DEFAULT_VALUES, ProductWizardForm } from '../_shared/product-wizard'

export function Component() {
  const navigate = useNavigate()

  return (
    <ProductWizardForm
      mode="add"
      defaultValues={PRODUCT_WIZARD_DEFAULT_VALUES}
      onSaved={(values, status) => {
        // Same as Add Product — there's no write API on the static mock catalog,
        // so this simulates a save and returns to the list.
        toast.success(`"${values.name}" was created as ${status}.`)
        navigate('/ecommerce/product-list-1')
      }}
    />
  )
}
