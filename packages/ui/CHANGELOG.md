# @pompeitech/vesuvius-ui

## 0.20.0

### Minor Changes

- 725d490: Add the `DataTable` organism, the last component in the roadmap — built on `@tanstack/react-table`
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

## 0.19.0

### Minor Changes

- 78c7e6b: Add the `RichTextEditor` and `RichTextViewer` organisms. `RichTextEditor` is built on
  Tiptap/ProseMirror with a formatting toolbar (bold, italic, strikethrough, a level-2 heading,
  bullet/numbered lists, blockquotes, undo/redo) and a placeholder for empty content; external
  `value` updates are synced into the editor without fighting the user's own typing. `RichTextViewer`
  renders the editor's saved HTML read-only, sharing the same content styles.
  
  New dependencies: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-placeholder`. Ship
  with unit test coverage and a Storybook story, same as every other component in the kit.

## 0.18.0

### Minor Changes

- 23d056b: Add the `KanbanBoard` organism — drag cards between columns, built on `@dnd-kit/core`. Shows a
  live drop placeholder at the target position while dragging and a `DragOverlay` for the card being
  moved; columns render their own count badge and an empty state when they have no cards.
  
  New dependency: `@dnd-kit/core`. Ships with unit test coverage and a Storybook story, same as
  every other component in the kit.

## 0.17.0

### Minor Changes

- bd1ab41: Add three more organisms: `Timeline` (activity-feed and roadmap variants, with per-item status
  colors and optional click handlers), `TreeView` (a keyboard-navigable file-tree pattern with
  single/multi-select, expand/collapse, and full arrow-key navigation), and `Wizard` (a multi-step
  flow built on `Stepper`, with per-step async `validate()` gating advancement and step-click
  navigation limited to already-visited steps).
  
  All three compose only already-shipped molecules/atoms — no new dependencies. Ship with full unit
  test coverage and a Storybook story, same as every other component in the kit.

## 0.16.0

### Minor Changes

- 570b6a8: Add two more organisms: `MultiSelect` (a `Command`/`Popover` combobox with removable chips per
  selected value and overflow collapsing into a "+N more" badge) and `PeopleSelect` (the same
  combobox pattern for a single value, pairing each option with `UserAvatar` and an optional
  "Unassigned" clear option).
  
  Both compose only already-shipped molecules/atoms — no new dependencies. Ship with full unit test
  coverage and a Storybook story, same as every other component in the kit.

## 0.15.0

### Minor Changes

- 1ef5cda: Add the `TimePicker` organism — a segmented hour/minute/(optional) second/period input, built on
  `TimePickerInput`. Supports 12- and 24-hour formats, full keyboard control (arrow keys to
  step/switch AM/PM, digit typing with auto-advance between segments, left/right arrow navigation
  between segments), and a disabled state across every segment.
  
  This reuses the pure conversion/formatting helpers in `time-picker.utils.ts` that
  `DateTimePicker` and `DateTimeRangePicker` already shipped internally in `0.14.0` — no new
  dependencies. Ships with full unit test coverage and a Storybook story, same as every other
  component in the kit.

## 0.14.0

### Minor Changes

- d4ba80c: Add five more organisms: `Calendar` (built on `react-day-picker`), and four date pickers that
  compose it — `DatePicker`, `DateRangePicker`, `DateTimePicker`, and `DateTimeRangePicker` (using
  `date-fns` for formatting). `DateRangePicker` and `DateTimeRangePicker` require a full `from`/`to`
  range before their Apply button enables; `DateTimePicker` and `DateTimeRangePicker` add hour/minute
  (and optional seconds) columns alongside the calendar, in 12- or 24-hour format.
  
  All five ship with full unit test coverage and a Storybook story, same as every other component in
  the kit.

## 0.13.0

### Minor Changes

- db27053: Add the first organism, `Charts` — a Recharts-based set of chart components:
  `SimpleBarChart`, `SimpleLineChart`, `SimpleAreaChart`, `SimplePieChart`, `SimpleRadarChart`, a
  pure-SVG `RadialProgressChart` and `Sparkline`, and a pure-CSS `HeatmapGrid`. `ChartContainer`,
  `ChartTooltip`/`ChartTooltipContent`, and `ChartLegend`/`ChartLegendContent` are exported too, for
  building custom charts on the same theming/tooltip/legend primitives.
  
  This also unblocks two molecules that depend on it: `ChartCard` and `StatCard`. All ten new
  components ship with full unit test coverage and a Storybook story, same as every other component
  in the kit.

## 0.12.0

### Minor Changes

- 14e3ce3: Add two more molecules: `ContextMenu` (built on `@radix-ui/react-context-menu`) and
  `NavigationMenu` (built on `@radix-ui/react-navigation-menu`). Each ships with full unit test
  coverage and a Storybook story, same as every other component in the kit. Only `ChartCard` and
  `StatCard` remain unshipped among molecules — both blocked on the unshipped `charts` organism.

## 0.11.0

### Minor Changes

- 51fc478: Add five more molecules: `FilePreview`, `FileUploader`, `FilterBar`, `FormHelperText`, and
  `Stepper` — each self-contained, no dependency on any other not-yet-shipped molecule, and no new
  runtime dependencies. Each ships with full unit test coverage and a Storybook story, same as every
  other component in the kit. This clears the entire backlog of molecules that were ready without
  needing new dependencies — the remaining ones (`ContextMenu`, `NavigationMenu`, `ChartCard`,
  `StatCard`) need either new Radix packages or an unshipped organism first.

## 0.10.0

### Minor Changes

- 27c4f04: Add four more molecules: `Grid`, `Header`, `InputGroup`, and `Stack` — a layout-and-structure
  batch, each self-contained with no new runtime dependencies. Each ships with full unit test
  coverage and a Storybook story, same as every other component in the kit.

## 0.9.0

### Minor Changes

- f9aa95b: Add three more molecules: `EmptyState`, `Pagination`, and `Table` — each self-contained, no
  dependency on any other not-yet-shipped molecule. Each ships with full unit test coverage and a
  Storybook story, same as every other component in the kit.

## 0.8.0

### Minor Changes

- f5abded: Add three more molecules: `AvatarGroup`, `CopyButton`, and `UserAvatar` — each built directly on
  the `Avatar`/`IconButton` atoms, with no dependency on any other not-yet-shipped molecule. Each
  ships with full unit test coverage and a Storybook story, same as every other component in the kit.

## 0.7.0

### Minor Changes

- 9544f44: Add three more molecules: `ThemeSwitcher`/`ThemePalettePicker`/`ThemeModeToggle` (composes
  `DropdownMenu`, `Popover`, and `Command`, all shipped in earlier batches — this one was blocked
  until they landed), `NotificationCenter` (built on `Popover`), and `Toast` (built on `sonner`).
  Each ships with full unit test coverage and a Storybook story, same as every other component in
  the kit. Together with `Sidebar` (shipped last batch), this rounds out the app-shell trio: nav +
  theme switching + notifications/feedback.

### Patch Changes

- e90759f: Fix size alignment across single-line form controls, so every control of
  the same size shares the exact same height and horizontal padding:
  
  - `Button`'s `default`/`lg` sizes now use the same horizontal padding as
    `Input`/`Select`/`Combobox`/`MultiSelect`/`PeopleSelect` (previously
    wider at those two sizes only — `xs`/`sm` already matched).
  - `IconButton` gains a `size` prop (`xs`/`sm`/`default`/`lg`), matching
    `Button`'s `icon-*` sizes and every other control's height scale.
    Previously fixed at a single `size-9`.
  - `NumberInput` gains a `size` prop. Previously fixed at `h-9` regardless
    of what size the controls around it used.
  - `PasswordInput`'s show/hide toggle button now scales with the input's
    own `size` instead of a hardcoded `size-7`. Also fixes a pre-existing
    type error in `PasswordInputProps` (the native HTML `size` attribute
    wasn't omitted before merging with the custom `size` prop, so passing
    a `ControlSize` string literal didn't type-check).
  - `Toggle`/`ToggleGroup` now use the shared height/padding scale (was a
    separate, narrower scale with no `xs` size).

## 0.6.0

### Minor Changes

- 6349425: Add three more molecules: `Collapsible` (built on `@radix-ui/react-collapsible`), `Sheet` (built on
  `@radix-ui/react-dialog`), and `Sidebar` (composes `Collapsible`, `Sheet`, `DropdownMenu`, and
  `Tooltip` into a full app-shell navigation sidebar with a `SidebarProvider`/`SidebarNav`). Each
  ships with full unit test coverage and a Storybook story, same as every other component in the
  kit. Shipped together since Sidebar depends on both Collapsible and Sheet.
- aaf830f: Add three more molecules: `Command` (built on `cmdk`), `Combobox` (built on top of `Command` and
  `Popover`), and `ConfirmDialog` (built on top of `AlertDialog`). Each ships with full unit test
  coverage and a Storybook story, same as every other component in the kit. Command and Combobox
  ship together since Combobox composes Command; ConfirmDialog was already fully test-and-story
  ready, just waiting on AlertDialog to ship first.

## 0.5.0

### Minor Changes

- 0a41587: Add three more molecules: `Dialog` (built on `@radix-ui/react-dialog`), `DropdownMenu` (built on
  `@radix-ui/react-dropdown-menu`), and `AlertDialog` (built on `@radix-ui/react-alert-dialog`). Each
  ships with full unit test coverage and a Storybook story, same as every other component in the
  kit. These three unblock several other molecules already on disk that build on top of them
  (Command, Combobox, Sidebar, ThemeSwitcher, ConfirmDialog), which will follow in later batches.

## 0.4.0

### Minor Changes

- f5f2290: Add three more molecules: `Breadcrumb`, `Toggle` (built on `@radix-ui/react-toggle`), and
  `ToggleGroup` (built on `@radix-ui/react-toggle-group`). Each ships with full unit test coverage
  and a Storybook story, same as every other component in the kit.

## 0.3.0

### Minor Changes

- 5ff2bb0: Add four more molecules: `Accordion` (built on `@radix-ui/react-accordion`), `Popover` (built on
  `@radix-ui/react-popover`), `Tabs` (built on `@radix-ui/react-tabs`), and `Tooltip` (built on
  `@radix-ui/react-tooltip`). Each ships with full unit test coverage and a Storybook story, same as
  every other component in the kit.

## 0.2.0

### Minor Changes

- 37b04b7: Add the first two molecules: `Select` (built on `@radix-ui/react-select`) and `List`/`ListItem`.
  Each ships with full unit test coverage and a Storybook story, same as every atom in `0.1.0`.

## 0.1.0 — 2026-09-20

### Added

Initial public release — the **atoms** tier of Vesuvius UI: 20 primitive components, each with full
unit test coverage and a Storybook story.

- `Alert`, `AspectRatio`, `Avatar`, `Badge`, `Button`, `Card`, `Checkbox`, `IconButton`, `Input`,
  `Label`, `NumberInput`, `PasswordInput`, `Progress`, `RadioGroup`, `Separator`, `Skeleton`,
  `Slider`, `Switch`, `Textarea`, `Typography`
- Theming: `ThemeProvider`, `useTheme`, 10 named color themes shipped as CSS subpath exports
  (`@pompeitech/vesuvius-ui/themes/*`)
- Shared utilities: `cn`, `useIsMobile`

Molecules and organisms are on the roadmap and will ship in upcoming `0.x` releases — see the
[README](../../README.md#roadmap) for the plan.

---

_From here on, every release of this package gets an entry above, generated automatically by
[Changesets](https://github.com/changesets/changesets) from the changeset files merged since the
last release — see [`.changeset/README.md`](../../.changeset/README.md)._
