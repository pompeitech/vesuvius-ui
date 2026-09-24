import { useMemo } from 'react'
import * as RechartsPrimitive from 'recharts'
import { ChartContainer, type ChartConfig } from './chart-container'
import { ChartLegend, ChartLegendContent } from './chart-legend'
import { ChartTooltip, ChartTooltipContent } from './chart-tooltip'
import { DEFAULT_CHART_COLORS, slugifyChartKey } from './chart-utils'
import type { ChartDatum } from './simple-charts'

export type SimpleRadarChartProps = {
  data: ChartDatum[]
  categories: string[]
  index: string
  colors?: string[]
  showLegend?: boolean
  className?: string
}

export function SimpleRadarChart({
  data,
  categories,
  index,
  colors,
  showLegend = true,
  className = 'h-72'
}: SimpleRadarChartProps) {
  const config = useMemo<ChartConfig>(
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

  return (
    <ChartContainer config={config} className={className}>
      {/* Wider left/right margin: Recharts' default clips long spoke labels. */}
      <RechartsPrimitive.RadarChart
        data={data}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
      >
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        <RechartsPrimitive.PolarGrid />
        <RechartsPrimitive.PolarAngleAxis dataKey={index} />
        {categories.map(key => (
          <RechartsPrimitive.Radar
            key={key}
            dataKey={key}
            stroke={`var(--color-${slugifyChartKey(key)})`}
            fill={`var(--color-${slugifyChartKey(key)})`}
            fillOpacity={0.25}
            strokeWidth={2}
            isAnimationActive={false}
          />
        ))}
      </RechartsPrimitive.RadarChart>
    </ChartContainer>
  )
}
