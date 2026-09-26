import { SHIPMENTS, updateShipment, type Shipment } from '@pompeitech/mock-data'
import { toast } from '@pompeitech/vesuvius-ui'
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router'
import { buildShipmentFromForm, shipmentToFormValues, ShipmentForm } from '../_shared/shipment-form'

export async function loader({ params }: LoaderFunctionArgs) {
  const shipment = SHIPMENTS.find(s => s.id === params.id)
  if (!shipment) {
    throw new Response('Shipment not found', { status: 404 })
  }
  return shipment
}

export function Component() {
  const shipment = useLoaderData() as Shipment
  const navigate = useNavigate()

  return (
    <ShipmentForm
      key={shipment.id}
      mode="edit"
      defaultValues={shipmentToFormValues(shipment)}
      onSaved={values => {
        const updated = buildShipmentFromForm(values, shipment)
        updateShipment(shipment.id, updated)
        toast.success(`Shipping label ${updated.trackingNumber} was updated.`)
        navigate('/ecommerce/shipment-list-1')
      }}
    />
  )
}
