---
"@pompeitech/vesuvius-ui": minor
---

Add the first organism, `Charts` — a Recharts-based set of chart components:
`SimpleBarChart`, `SimpleLineChart`, `SimpleAreaChart`, `SimplePieChart`, `SimpleRadarChart`, a
pure-SVG `RadialProgressChart` and `Sparkline`, and a pure-CSS `HeatmapGrid`. `ChartContainer`,
`ChartTooltip`/`ChartTooltipContent`, and `ChartLegend`/`ChartLegendContent` are exported too, for
building custom charts on the same theming/tooltip/legend primitives.

This also unblocks two molecules that depend on it: `ChartCard` and `StatCard`. All ten new
components ship with full unit test coverage and a Storybook story, same as every other component
in the kit.
