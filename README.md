<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/vesuvius-ui-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset=".github/assets/vesuvius-ui-logo-light.svg">
  <img alt="Vesuvius UI" src=".github/assets/vesuvius-ui-logo-light.svg" width="420">
</picture>

A React + TypeScript component kit built on [Radix UI](https://www.radix-ui.com/) primitives and
[Tailwind CSS v4](https://tailwindcss.com/), designed atom-first and shipped incrementally.

[![npm version](https://img.shields.io/npm/v/@pompeitech/vesuvius-ui.svg)](https://www.npmjs.com/package/@pompeitech/vesuvius-ui)
[![CI](https://github.com/pompeitech/vesuvius-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/pompeitech/vesuvius-ui/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@pompeitech/vesuvius-ui.svg?v=1)](./LICENSE)

---

## What is Vesuvius UI

Vesuvius UI is a component kit, not a template. Every component is built on an unstyled Radix UI
primitive where one exists, styled with Tailwind CSS v4, typed strictly in TypeScript, and shipped
with its own unit tests and Storybook story — no component earns a place in the package without
all three.

The goal is a kit you can actually build a product on: accessible by default (Radix gets you
correct ARIA and keyboard behavior for free), themeable without fighting the CSS, and organized so
you always know where to look — **atoms** are the primitives (Button, Input, Badge...),
**molecules** compose a few atoms into something with its own behavior (Select, Dialog,
Combobox...), **organisms** are the complex, stateful pieces (DataTable, Kanban Board, Calendar...).
No kitchen-sink "UI kit" grab-bag, no copy-pasted component snippets to babysit — one versioned
package, one changelog, one source of truth.

It's under active, incremental development, released in public a slice at a time — see
[**Status & roadmap**](#status--roadmap) below for exactly what's shipped today.

## Status & roadmap

**Current release: `0.13.0` — atoms, forty molecules, plus the first organism.**

| Tier | Status | Components |
| --- | --- | --- |
| **Atoms** | ✅ Shipped in `0.1.0` | 20 — see the list below |
| **Molecules** | 🚧 Shipping a few at a time | `Select`, `List` shipped in `0.2.0`; `Accordion`, `Popover`, `Tabs`, `Tooltip` shipped in `0.3.0`; `Breadcrumb`, `Toggle`, `ToggleGroup` shipped in `0.4.0`; `Dialog`, `DropdownMenu`, `AlertDialog` shipped in `0.5.0`; `Command`, `Combobox`, `ConfirmDialog`, `Collapsible`, `Sheet`, `Sidebar` shipped in `0.6.0`; `ThemeSwitcher`, `NotificationCenter`, `Toast` shipped in `0.7.0`; `AvatarGroup`, `CopyButton`, `UserAvatar` shipped in `0.8.0`; `EmptyState`, `Pagination`, `Table` shipped in `0.9.0`; `Grid`, `Header`, `InputGroup`, `Stack` shipped in `0.10.0`; `FilePreview`, `FileUploader`, `FilterBar`, `FormHelperText`, `Stepper` shipped in `0.11.0`; `ContextMenu`, `NavigationMenu` shipped in `0.12.0`; `ChartCard`, `StatCard` shipped in `0.13.0`; DataTable's smaller siblings and more still to come |
| **Organisms** | 🚧 Shipping a few at a time | `Charts` (`SimpleBarChart`, `SimpleLineChart`, `SimpleAreaChart`, `SimplePieChart`, `SimpleRadarChart`, `RadialProgressChart`, `HeatmapGrid`, `Sparkline`) shipped in `0.13.0`; DataTable, Kanban Board, Calendar, Rich Text Editor, and more still to come |

This isn't a "0.1.0 because nothing's finished yet" release — it's the first of a series. Each new
`0.x` release adds a batch of components on top of the last, with its own changelog entry (see
[Releases & versioning](#releases--versioning)). Nothing in a released version goes away or breaks
in a later one without a documented, intentional major bump.

### Atoms shipped in `0.1.0`

Alert · Aspect Ratio · Avatar · Badge · Button · Card · Checkbox · Icon Button · Input · Label ·
Number Input · Password Input · Progress · Radio Group · Separator · Skeleton · Slider · Switch ·
Textarea · Typography

Plus the theming system (`ThemeProvider`, `useTheme`, 10 named color themes) and a couple of shared
utilities (`cn`, `useIsMobile`).

### Molecules shipped in `0.2.0` – `0.13.0`

`Select` (built on `@radix-ui/react-select`) and `List`/`ListItem` in `0.2.0`; `Accordion`,
`Popover`, `Tabs`, and `Tooltip` (each built on their respective Radix UI primitive) in `0.3.0`;
`Breadcrumb`, `Toggle`, and `ToggleGroup` (the latter two built on `@radix-ui/react-toggle` and
`@radix-ui/react-toggle-group`) in `0.4.0`; `Dialog`, `DropdownMenu`, and `AlertDialog` (each built
on their respective Radix UI primitive) in `0.5.0`; `Command` (built on `cmdk`), `Combobox`
(`Command` and `Popover`), `ConfirmDialog` (built on `AlertDialog`), `Collapsible` (built on
`@radix-ui/react-collapsible`), `Sheet` (built on `@radix-ui/react-dialog`), and `Sidebar` (composes
`Collapsible`, `Sheet`, `DropdownMenu`, and `Tooltip`) in `0.6.0`; `ThemeSwitcher` (composes
`DropdownMenu`, `Popover`, and `Command`), `NotificationCenter` (built on `Popover`), and `Toast`
(built on `sonner`) in `0.7.0`; `AvatarGroup`, `CopyButton`, and `UserAvatar` (each built on the
`Avatar`/`IconButton` atoms) in `0.8.0`; `EmptyState`, `Pagination`, and `Table` in `0.9.0`;
`Grid`, `Header`, `InputGroup`, and `Stack` in `0.10.0`; `FilePreview`, `FileUploader`,
`FilterBar`, `FormHelperText`, and `Stepper` in `0.11.0`; `ContextMenu` (built on
`@radix-ui/react-context-menu`) and `NavigationMenu` (built on `@radix-ui/react-navigation-menu`)
in `0.12.0`; `ChartCard` and `StatCard` (both built on the `Charts` organism) in `0.13.0`.

### Organisms shipped in `0.13.0`

`Charts` — a Recharts-based set of chart components (`SimpleBarChart`, `SimpleLineChart`,
`SimpleAreaChart`, `SimplePieChart`, `SimpleRadarChart`), plus a pure-SVG `RadialProgressChart` and
`Sparkline`, and a pure-CSS `HeatmapGrid`. `ChartContainer`, `ChartTooltip`/`ChartTooltipContent`,
and `ChartLegend`/`ChartLegendContent` are exported too, for building custom charts on the same
theming/tooltip/legend primitives.

## Installation

```bash
npm install @pompeitech/vesuvius-ui
# or
pnpm add @pompeitech/vesuvius-ui
```

Peer dependencies: `react` and `react-dom` `^19.0.0`.

Import the base styles and a color theme once, at your app's entry point:

```ts
import '@pompeitech/vesuvius-ui/base.css'
import '@pompeitech/vesuvius-ui/themes/lava.css'
```

## Quick start

```tsx
import { Button, Card, ThemeProvider } from '@pompeitech/vesuvius-ui'

function App() {
  return (
    <ThemeProvider defaultColorTheme="lava">
      <Card className="p-6">
        <Button>Let's go</Button>
      </Card>
    </ThemeProvider>
  )
}
```

Every component can also be imported from its own subpath, if you'd rather not pull in the root
barrel:

```ts
import { Button } from '@pompeitech/vesuvius-ui/atoms/button'
```

### Themes

10 named color themes ship as individual CSS subpaths, so you only pull in the ones you use:
`lava` (Vesuvius UI's own), `stripe`, `vercel`, `supabase`, `linear`, `claude`, `amber-minimal`,
`claymorphism`, `alpine`, `aubergine`. Each one supports light and dark mode out of the box via
`ThemeProvider`'s `defaultTheme` (`light` / `dark` / `system`) prop.

## Exploring the components

This release ships with a full [Storybook](https://storybook.js.org/) covering every atom — props,
variants, states, all of it. Clone the repo and run it locally:

```bash
git clone https://github.com/pompeitech/vesuvius-ui.git
cd vesuvius-ui
pnpm install
pnpm storybook
```

A hosted, always-up-to-date Storybook (and a proper docs site) is on the roadmap once there's
enough surface area to justify it.

## Development

Requirements: Node `>=24`, [pnpm](https://pnpm.io/) `10.33.0` (pinned via `packageManager`).

```bash
pnpm install        # install workspace dependencies
pnpm storybook       # run Storybook locally, with HMR against source
pnpm test            # run the unit test suite (Vitest + Testing Library)
pnpm typecheck       # tsc --noEmit across the workspace
pnpm lint            # biome lint
pnpm build           # build the publishable package (tsup + tsc)
```

This repo is a [Turborepo](https://turborepo.com/) + pnpm workspace with two members:
`packages/ui` (the `@pompeitech/vesuvius-ui` package itself) and `apps/storybook` (the Storybook
runner, pointed straight at `packages/ui/src` for instant HMR — no build step in the loop during
development).

### Testing philosophy

Every component ships with real unit tests — rendered with React Testing Library, asserted against
actual DOM output and accessibility attributes (roles, `aria-*`, `data-slot`), not shallow
snapshots. `0.13.0` ships 70 test files — one per component — all green in CI on every push and pull
request.

## Releases & versioning

Versioning, `CHANGELOG.md` and npm publishing are handled automatically by
[Changesets](https://github.com/changesets/changesets) — nobody hand-edits a version number or
writes a changelog entry by hand.

The short version, if you're contributing:

1. Make your change.
2. Run `pnpm changeset`, pick a bump type, describe the change in one line.
3. Commit the generated `.changeset/*.md` file along with your change and open a PR.

On merge to `main`, a GitHub Actions workflow either opens/updates a **"Version Packages"** PR
(bumping `package.json` and writing `packages/ui/CHANGELOG.md` from the pending changesets), or —
once that PR is merged — publishes the new version straight to npm and tags the release on GitHub.
No manual `npm publish`, ever.

See [`.changeset/README.md`](./.changeset/README.md) for details, and
[`packages/ui/CHANGELOG.md`](./packages/ui/CHANGELOG.md) for the actual release history.

While the kit is pre-1.0, expect the occasional breaking change between minor versions as the
atomic-design API surface settles — each one will be called out explicitly in the changelog.

## Contributing

Bug reports, feature requests and PRs are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for
setup, coding conventions, commit message format, and what a new component needs before it can be
merged. This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

[MIT](./LICENSE) © 2026 [Davide D'Antonio](https://github.com/davidedantonio)
