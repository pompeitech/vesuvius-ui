import type { Shipment } from '@pompeitech/mock-data'
import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import { SHIPMENT_STATUS_OPTIONS } from '../../_shared/format'

type ToolbarContext = Parameters<NonNullable<DataTableProps<Shipment>['toolbar']>>[0]

type ShipmentsTableToolbarProps = ToolbarContext & {
  carrierOptions: { label: string; value: string }[]
}

/** Search + density controls, plus the status/carrier faceted filters. */
export function ShipmentsTableToolbar({
  table,
  density,
  setDensity,
  carrierOptions
}: ShipmentsTableToolbarProps) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search shipments..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={SHIPMENT_STATUS_OPTIONS}
          />
          <DataTableFacetedFilter
            column={table.getColumn('carrier')}
            title="Carrier"
            options={carrierOptions}
          />
        </>
      }
    />
  )
}
