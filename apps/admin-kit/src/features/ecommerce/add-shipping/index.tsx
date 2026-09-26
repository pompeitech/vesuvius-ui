import { addShipment } from '@pompeitech/mock-data'
import { toast } from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'
import {
  buildShipmentFromForm,
  SHIPMENT_FORM_DEFAULT_VALUES,
  ShipmentForm
} from '../_shared/shipment-form'

export function Component() {
  const navigate = useNavigate()

  return (
    <ShipmentForm
      mode="add"
      defaultValues={SHIPMENT_FORM_DEFAULT_VALUES}
      onSaved={values => {
        // Unlike Add Order (a pure simulation over the static catalog), a
        // shipping label is genuinely new data — same "real write" call as
        // the POS App's checkout: `addShipment` writes through the mutation
        // bridge so the new row is really there when we navigate back.
        const shipment = buildShipmentFromForm(values)
        addShipment(shipment)
        toast.success(`Shipping label created for order ${shipment.orderNumber}.`)
        navigate('/ecommerce/shipment-list-1')
      }}
    />
  )
}
