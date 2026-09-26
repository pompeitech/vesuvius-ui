import type { Member, Team } from '@pompeitech/mock-data'
import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'

type ToolbarContext = Parameters<NonNullable<DataTableProps<Member>['toolbar']>>[0]

/** Search + density controls, plus a Team faceted filter (options built from the loaded `Team` records, not a fixed enum). */
export function MembersTableToolbar({
  table,
  density,
  setDensity,
  teams
}: ToolbarContext & { teams: Team[] }) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search members..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <DataTableFacetedFilter
          column={table.getColumn('team')}
          title="Team"
          options={teams.map(team => ({ value: team.id, label: team.name }))}
        />
      }
    />
  )
}
