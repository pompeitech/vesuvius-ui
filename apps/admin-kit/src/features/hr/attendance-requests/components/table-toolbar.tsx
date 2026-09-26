import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import type { Absence } from '@pompeitech/mock-data'
import { ABSENCE_STATUS_OPTIONS, ABSENCE_TYPE_OPTIONS } from '../../_shared/format'

type ToolbarContext = Parameters<NonNullable<DataTableProps<Absence>['toolbar']>>[0]

/** Search + density controls, plus the type/status faceted filters. */
export function RequestsTableToolbar({ table, density, setDensity }: ToolbarContext) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search requests..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title="Type"
            options={ABSENCE_TYPE_OPTIONS}
          />
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={ABSENCE_STATUS_OPTIONS}
          />
        </>
      }
    />
  )
}
