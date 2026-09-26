import { SHIPMENTS, type Shipment } from '@pompeitech/mock-data'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { ActivityCard } from './components/activity-card'
import { DetailHeader } from './components/detail-header'
import { InfoCard } from './components/info-card'
import { PackageCard } from './components/package-card'
import { RouteCard } from './components/route-card'
import { RouteMapCard } from './components/route-map-card'

export async function loader({ params }: LoaderFunctionArgs) {
  const shipment = SHIPMENTS.find(s => s.id === params.id)
  if (!shipment) {
    throw new Response('Shipment not found', { status: 404 })
  }
  return shipment
}

export function Component() {
  const shipment = useLoaderData() as Shipment

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader shipment={shipment} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RouteCard shipment={shipment} />
        </div>
        <RouteMapCard shipment={shipment} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ActivityCard shipment={shipment} />
        </div>
        <div className="flex flex-col gap-6">
          <InfoCard shipment={shipment} />
          <PackageCard shipment={shipment} />
        </div>
      </div>
    </div>
  )
}
