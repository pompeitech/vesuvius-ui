# @pompeitech/vesuvius-ui

The Vesuvius UI component kit: React 19 + TypeScript, built on Radix UI primitives and Tailwind
CSS v4. Ships as a real, versioned, publishable package — compiled ESM + full `.d.ts` type
declarations (see [`tsup.config.ts`](./tsup.config.ts)), not raw source. Design tokens and 10
named color themes ship as part of the same package, each individually importable.

> **This is `0.13.0`** — all 20 atoms plus forty molecules (`Select`, `List`, `Accordion`,
> `Popover`, `Tabs`, `Tooltip`, `Breadcrumb`, `Toggle`, `ToggleGroup`, `Dialog`, `DropdownMenu`,
> `AlertDialog`, `Command`, `Combobox`, `ConfirmDialog`, `Collapsible`, `Sheet`, `Sidebar`,
> `ThemeSwitcher`, `NotificationCenter`, `Toast`, `AvatarGroup`, `CopyButton`, `UserAvatar`,
> `EmptyState`, `Pagination`, `Table`, `Grid`, `Header`, `InputGroup`, `Stack`, `FilePreview`,
> `FileUploader`, `FilterBar`, `FormHelperText`, `Stepper`, `ContextMenu`, `NavigationMenu`,
> `ChartCard`, `StatCard`), plus the first organism, `Charts` (`SimpleBarChart`, `SimpleLineChart`,
> `SimpleAreaChart`, `SimplePieChart`, `SimpleRadarChart`, `RadialProgressChart`, `Sparkline`,
> `HeatmapGrid`), each fully tested and documented in Storybook. The rest of the molecules
> (DataTable's smaller siblings...) and organisms (DataTable, Kanban Board, Calendar, Rich Text
> Editor, and more) ship incrementally in later `0.x` releases — see the
> [repo README](https://github.com/pompeitech/vesuvius-ui#status--roadmap) for the roadmap and
> [`CHANGELOG.md`](./CHANGELOG.md) for release history.

## Install

```sh
pnpm add @pompeitech/vesuvius-ui react react-dom
```

`react`/`react-dom` (`^19.0.0`) are peer dependencies — install them yourself if your app doesn't
already have them.

## Setup

This kit is **Tailwind-authored and packaged**: components render Tailwind utility classes, so the
host app must process the stylesheet with Tailwind CSS v4. The package registers its compiled
component output as a Tailwind source automatically; consumers do not need a package-relative
`@source` rule.

**1. Enable Tailwind CSS v4** using the integration for your framework (`@tailwindcss/vite`,
`@tailwindcss/postcss`, or the Tailwind CLI).

**2. Import styles once**, in your app's global CSS entry — pick one:

```css
/* Everything: tokens + all 10 named color themes. Simplest default. */
@import "@pompeitech/vesuvius-ui/styles.css";
```

```css
@import "@pompeitech/vesuvius-ui/base.css";
@import "@pompeitech/vesuvius-ui/themes/lava.css";
```

Every theme lives at its own `./themes/<name>.css` subpath — see
[`src/styles/themes`](./src/styles/themes) for the full list: `lava` (Vesuvius UI's own), `stripe`,
`vercel`, `supabase`, `linear`, `claude`, `amber-minimal`, `claymorphism`, `alpine`, `aubergine`.
`./themes.css` bundles all of them in one import, same as `./styles.css` minus the base tokens.

**3. Wrap your app in `ThemeProvider`**:

```tsx
import { ThemeProvider } from "@pompeitech/vesuvius-ui";

export function App() {
  return (
    // Default: every built-in theme is selectable, "lava" applied first.
    <ThemeProvider>{/* ... */}</ThemeProvider>
  );
}
```

Only imported a subset of themes in step 2? Tell `ThemeProvider` to match, so it never applies a
`data-theme` with no matching CSS loaded:

```tsx
<ThemeProvider colorThemes={["lava", "vercel"]} defaultColorTheme="lava">
```

## Usage

Every component, hook, and prop type is exported from the package root:

```tsx
import { Button, Card, useTheme } from "@pompeitech/vesuvius-ui";
```

For the smallest possible JavaScript bundle, atoms are also available by their own subpath:

```tsx
import { Button } from "@pompeitech/vesuvius-ui/atoms/button";
import { ThemeProvider } from "@pompeitech/vesuvius-ui/theme";
```

Types are always shipped (`dist/index.d.ts`, generated from source, not hand-maintained) — editor
autocomplete and `tsc` both just work, no separate `@types/pompeitech__vesuvius-ui` package needed.

## Local development (this monorepo)

Storybook consumes this package straight from `src/` via a Vite alias (see
`apps/storybook/.storybook/main.ts`), not the built `dist/` — so there's no build step in the local
dev loop. Run `pnpm build` only when you actually need the compiled output (e.g. before
`pnpm publish`, or to sanity-check what a real consumer gets — `pnpm pack` and inspect the
resulting tarball).
