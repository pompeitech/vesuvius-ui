import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import type { Order } from '@pompeitech/mock-data'
import { ORDER_CHANNEL_OPTIONS, ORDER_STATUS_OPTIONS } from '../../_shared/format'

// Same `DataTable`'s own toolbar render-prop context reused here as in
// Product List 1's toolbar — see that file's comment for why.
type ToolbarContext = Parameters<NonNullable<DataTableProps<Order>['toolbar']>>[0]

/** Search + density controls, plus the status/channel faceted filters. */
export function OrdersTableToolbar({ table, density, setDensity }: ToolbarContext) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search orders..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={ORDER_STATUS_OPTIONS}
          />
          <DataTableFacetedFilter
            column={table.getColumn('channel')}
            title="Channel"
            options={ORDER_CHANNEL_OPTIONS}
          />
        </>
      }
    />
  )
}
