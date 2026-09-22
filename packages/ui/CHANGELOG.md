# @pompeitech/vesuvius-ui

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
