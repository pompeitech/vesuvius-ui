import { getShipments, type Shipment } from '@pompeitech/mock-data'
import { Button, DataTable, Tabs, TabsList, TabsTrigger, Typography } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { buildShipmentColumns } from './components/columns'
import { ShipmentsTableToolbar } from './components/table-toolbar'

// Every generated shipment (derived 1:1 from shipped/delivered orders) —
// fetched once and handed to DataTable, same pattern as Order List 1.
export async function loader() {
  const result = await getShipments({ pageSize: 1000 })
  return result.data
}

// "Pending"/"Arrived"/"Exceptions" cover the 5 real `ShipmentStatus` values
// honestly (Pending = still moving, Arrived = delivered, Exceptions =
// flagged) — no new status invented just to fill out a 4th tab.
type StatusTab = 'all' | 'pending' | 'arrived' | 'exceptions'

export function Component() {
  const shipments = useLoaderData() as Shipment[]
  const navigate = useNavigate()
  const [tab, setTab] = useState<StatusTab>('all')

  const carrierOptions = useMemo(
    () =>
      Array.from(new Set(shipments.map(s => s.carrier)))
        .sort()
        .map(carrier => ({ label: carrier, value: carrier })),
    [shipments]
  )

  const tabData = useMemo(() => {
    switch (tab) {
      case 'pending':
        return shipments.filter(
          s =>
            s.status === 'label_created' ||
            s.status === 'in_transit' ||
            s.status === 'out_for_delivery'
        )
      case 'arrived':
        return shipments.filter(s => s.status === 'delivered')
      case 'exceptions':
        return shipments.filter(s => s.status === 'exception')
      default:
        return shipments
    }
  }, [shipments, tab])

  const columns = useMemo(
    () =>
      buildShipmentColumns({
        onView: shipment => navigate(`/ecommerce/shipment-detail-1/${shipment.id}`),
        onEdit: shipment => navigate(`/ecommerce/edit-shipping/${shipment.id}`)
      }),
    [navigate]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Shipments
          </Typography>
          <Typography variant="muted">
            Every shipment created from a shipped or delivered order.
          </Typography>
        </div>
        <Button onClick={() => navigate('/ecommerce/add-shipping')}>
          <PlusIcon />
          Add Shipment
        </Button>
      </div>

      <Tabs value={tab} onValueChange={value => setTab(value as StatusTab)}>
        <TabsList>
          <TabsTrigger value="all">All Shipments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="arrived">Arrived</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
        </TabsList>
      </Tabs>

      <DataTable
        columns={columns}
        data={tabData}
        getRowId={row => row.id}
        defaultSorting={[{ id: 'estimatedDelivery', desc: false }]}
        searchPlaceholder="Search shipments..."
        toolbar={ctx => <ShipmentsTableToolbar {...ctx} carrierOptions={carrierOptions} />}
      />
    </div>
  )
}
