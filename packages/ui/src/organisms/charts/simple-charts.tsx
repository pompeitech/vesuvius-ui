import { useMemo } from 'react'
import * as RechartsPrimitive from 'recharts'
import { type ChartConfig, ChartContainer } from './chart-container'
import { ChartLegend, ChartLegendContent } from './chart-legend'
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip'
import { DEFAULT_CHART_COLORS, slugifyChartKey } from './chart-utils'

export type ChartDatum = Record<string, any>

type SharedProps = {
  data: ChartDatum[]
  categories: string[]
  index: string
  colors?: string[]
  showLegend?: boolean
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  className?: string
  valueFormatter?: (value: number) => string
}

function useChartConfig(categories: string[], colors?: string[]): ChartConfig {
  return useMemo(
    () =>
      Object.fromEntries(
        categories.map((key, i) => [
          slugifyChartKey(key),
          {
            label: key,
            color:
              colors?.[i % (colors.length || 1)] ??
              DEFAULT_CHART_COLORS[i % DEFAULT_CHART_COLORS.length]
          }
        ])
      ),
    [categories, colors]
  )
}

export type SimpleBarChartProps = SharedProps & { stacked?: boolean }

export function SimpleBarChart({
  data,
  categories,
  index,
  colors,
  showLegend = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  stacked = false,
  valueFormatter,
  className = 'h-72'
}: SimpleBarChartProps) {
  const config = useChartConfig(categories, colors)

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPrimitive.BarChart data={data}>
        {showGrid && <RechartsPrimitive.CartesianGrid vertical={false} />}
        {showXAxis && (
          <RechartsPrimitive.XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {showYAxis && (
          <RechartsPrimitive.YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={valueFormatter}
          />
        )}
        <ChartTooltip content={<ChartTooltipContent valueFormatter={valueFormatter} />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {categories.map(key => (
          <RechartsPrimitive.Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${slugifyChartKey(key)})`}
            radius={4}
            stackId={stacked ? 'stack' : undefined}
            isAnimationActive={false}
          />
        ))}
      </RechartsPrimitive.BarChart>
    </ChartContainer>
  )
}

export type SimpleLineChartProps = SharedProps

export function SimpleLineChart({
  data,
  categories,
  index,
  colors,
  showLegend = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  valueFormatter,
  className = 'h-72'
}: SimpleLineChartProps) {
  const config = useChartConfig(categories, colors)

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPrimitive.LineChart data={data}>
        {showGrid && <RechartsPrimitive.CartesianGrid vertical={false} />}
        {showXAxis && (
          <RechartsPrimitive.XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {showYAxis && (
          <RechartsPrimitive.YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={valueFormatter}
          />
        )}
        <ChartTooltip content={<ChartTooltipContent valueFormatter={valueFormatter} />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {categories.map(key => (
          <RechartsPrimitive.Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={`var(--color-${slugifyChartKey(key)})`}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        ))}
      </RechartsPrimitive.LineChart>
    </ChartContainer>
  )
}

export type SimpleAreaChartProps = SharedProps & { stacked?: boolean }

export function SimpleAreaChart({
  data,
  categories,
  index,
  colors,
  showLegend = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  stacked = false,
  valueFormatter,
  className = 'h-72'
}: SimpleAreaChartProps) {
  const config = useChartConfig(categories, colors)

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPrimitive.AreaChart data={data}>
        <defs>
          {categories.map(key => (
            <linearGradient
              key={key}
              id={`fill-${slugifyChartKey(key)}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--color-${slugifyChartKey(key)})`}
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${slugifyChartKey(key)})`}
                stopOpacity={0.05}
              />
            </linearGradient>
          ))}
        </defs>
        {showGrid && <RechartsPrimitive.CartesianGrid vertical={false} />}
        {showXAxis && (
          <RechartsPrimitive.XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {showYAxis && (
          <RechartsPrimitive.YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={valueFormatter}
          />
        )}
        <ChartTooltip content={<ChartTooltipContent valueFormatter={valueFormatter} />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {categories.map(key => (
          <RechartsPrimitive.Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={`var(--color-${slugifyChartKey(key)})`}
            fill={`url(#fill-${slugifyChartKey(key)})`}
            strokeWidth={2}
            stackId={stacked ? 'stack' : undefined}
            isAnimationActive={false}
          />
        ))}
      </RechartsPrimitive.AreaChart>
    </ChartContainer>
  )
}

export type SimplePieChartProps = {
  data: ChartDatum[]
  category: string
  index: string
  colors?: string[]
  showLegend?: boolean
  innerRadius?: number | string
  className?: string
}

export function SimplePieChart({
  data,
  category,
  index,
  colors,
  showLegend = true,
  innerRadius = 0,
  className = 'h-72'
}: SimplePieChartProps) {
  const categories = useMemo(() => data.map(d => String(d[index])), [data, index])
  const config = useChartConfig(categories, colors)

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPrimitive.PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey={index} />} />
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey={index} />} />}
        <RechartsPrimitive.Pie
          data={data}
          dataKey={category}
          nameKey={index}
          innerRadius={innerRadius}
          outerRadius="80%"
          strokeWidth={2}
          isAnimationActive={false}
        >
          {data.map(entry => (
            <RechartsPrimitive.Cell
              key={String(entry[index])}
              fill={`var(--color-${slugifyChartKey(String(entry[index]))})`}
            />
          ))}
        </RechartsPrimitive.Pie>
      </RechartsPrimitive.PieChart>
    </ChartContainer>
  )
}
