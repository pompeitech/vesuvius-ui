import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import type { Product } from '@pompeitech/mock-data'
import { STOCK_LEVEL_OPTIONS } from '../../_shared/stock-level'

// `DataTable`'s own `toolbar` render-prop context — reused here instead of
// re-declaring `{ table, density, setDensity }` (and fighting the package's
// `Table` component/type name collision) by hand.
type ToolbarContext = Parameters<NonNullable<DataTableProps<Product>['toolbar']>>[0]

type ProductTableToolbarProps = ToolbarContext & {
  categoryOptions: { label: string; value: string }[]
}

/** Search + density controls, plus the category/stock-level faceted filters. */
export function ProductTableToolbar({
  table,
  density,
  setDensity,
  categoryOptions
}: ProductTableToolbarProps) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search products..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title="Category"
            options={categoryOptions}
          />
          <DataTableFacetedFilter
            column={table.getColumn('stockLevel')}
            title="Stock level"
            options={STOCK_LEVEL_OPTIONS}
          />
        </>
      }
    />
  )
}
