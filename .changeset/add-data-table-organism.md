---
"@pompeitech/vesuvius-ui": minor
---

Add the `DataTable` organism, the last component in the roadmap — built on `@tanstack/react-table`
v9's legacy hook API. Supports sorting, per-column and global filtering, column
visibility/pinning/resizing, drag-to-reorder columns (`@dnd-kit/core` + `@dnd-kit/sortable`), row
selection, pagination (client-side or server-side via `manualPagination`/`rowCount`), row density,
loading skeleton rows, CSV export, and a bulk-actions bar shown while rows are selected.

Ships with its own toolbar, column header menu, faceted filter, pagination bar, view-options menu,
and density toggle (`DataTableToolbar`, `DataTableColumnHeader`, `DataTableFacetedFilter`,
`DataTablePagination`, `DataTableViewOptions`, `DataTableDensityToggle`), each usable standalone.
`useDataTable` and the underlying `@tanstack/react-table` primitives (`useReactTable`,
`createColumnHelper`, `flexRender`, row/column/table types) are exported too, all re-exported from
the root of the package with a `DataTable`-prefixed name where the generic name would otherwise
collide with an existing export (e.g. `Table` → `DataTableInstance`, to not collide with the
`Table` molecule).

New dependencies: `@tanstack/react-table`, `@dnd-kit/modifiers`, `@dnd-kit/sortable`,
`@dnd-kit/utilities` (`@dnd-kit/core` already shipped with `KanbanBoard`). Ships with full unit
test coverage and a Storybook story, same as every other component in the kit.
