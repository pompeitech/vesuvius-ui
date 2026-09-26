import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import type { TimeEntry } from '@pompeitech/mock-data'
import { TIME_ENTRY_STATUS_OPTIONS } from '../../_shared/format'

type ToolbarContext = Parameters<NonNullable<DataTableProps<TimeEntry>['toolbar']>>[0]

const LOCATION_OPTIONS = [
  { label: 'On-site', value: 'on_site' },
  { label: 'Off-site', value: 'off_site' }
]

/** Search + density controls, plus the status/location faceted filters. */
export function TimeEntriesTableToolbar({ table, density, setDensity }: ToolbarContext) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search time entries..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={TIME_ENTRY_STATUS_OPTIONS}
          />
          <DataTableFacetedFilter
            column={table.getColumn('location')}
            title="Location"
            options={LOCATION_OPTIONS}
          />
        </>
      }
    />
  )
}
