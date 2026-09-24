import type { ComponentProps } from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '../../lib/utils'
import { useChart } from './chart-container'

export const ChartLegend = RechartsPrimitive.Legend

export type ChartLegendContentProps = ComponentProps<'div'> & {
  payload?: { value?: string; dataKey?: string | number; color?: string }[]
  hideIcon?: boolean
  nameKey?: string
  verticalAlign?: 'top' | 'bottom'
}

export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey
}: ChartLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map(item => {
        const key = nameKey ?? String(item.dataKey ?? 'value')
        const entry = config[key]

        return (
          // item.value before item.dataKey: a pie/donut's slices share one
          // dataKey, which would collide every legend entry's React key.
          <div
            key={String(item.value ?? item.dataKey)}
            className="text-muted-foreground [&>svg]:text-muted-foreground flex items-center gap-1.5 text-xs [&>svg]:size-3"
          >
            {entry?.icon && !hideIcon ? (
              <entry.icon />
            ) : (
              !hideIcon && (
                <div
                  className="size-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )
            )}
            {entry?.label ?? item.value}
          </div>
        )
      })}
    </div>
  )
}
