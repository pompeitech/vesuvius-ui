# @pompeitech/vesuvius-ui

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
