import { type CSSProperties, type ReactNode, useMemo } from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '../../lib/utils'
import { type ChartConfig, useChart } from './chart-container'

export const ChartTooltip = RechartsPrimitive.Tooltip

function getConfigEntry(config: ChartConfig, key: string, fallbackLabel?: ReactNode) {
  return config[key] ?? (fallbackLabel ? { label: fallbackLabel } : undefined)
}

// `<ChartTooltipContent />` with no props must type-check.
export type ChartTooltipContentProps = Partial<RechartsPrimitive.TooltipContentProps> & {
  className?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: 'line' | 'dot' | 'dashed'
  nameKey?: string
  labelKey?: string
  formatter?: (value: unknown, name: unknown, entry: unknown, index: number) => ReactNode
  // Lighter-weight than `formatter` (which replaces the whole row —
  // indicator, label, value): this only reformats the numeric value
  // shown, keeping the default row layout intact.
  valueFormatter?: (value: number) => string
}

export function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  valueFormatter,
  nameKey,
  labelKey
}: ChartTooltipContentProps) {
  const { config } = useChart()

  const resolvedLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null
    const [item] = payload
    const key = labelKey ?? String(item?.dataKey ?? item?.name ?? 'value')
    const entry = getConfigEntry(config, key, label)
    const value =
      !labelKey && typeof label === 'string'
        ? (config[label]?.label ?? label)
        : (entry?.label ?? label)
    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>
      )
    }
    if (!value) return null
    return <div className={cn('font-medium', labelClassName)}>{value}</div>
  }, [hideLabel, payload, labelKey, label, labelFormatter, labelClassName, config])

  if (!active || !payload?.length) return null

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div
      className={cn(
        'border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
    >
      {!nestLabel ? resolvedLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = nameKey ?? String(item.dataKey ?? item.name ?? 'value')
          const entry = getConfigEntry(config, key, item.name)
          const indicatorColor = (item.payload as { fill?: string } | undefined)?.fill ?? item.color

          return (
            <div
              key={typeof item.dataKey === 'function' ? index : (item.dataKey ?? index)}
              className={cn(
                '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5',
                indicator === 'dot' && 'items-center'
              )}
            >
              {formatter && item.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index)
              ) : (
                <>
                  {entry?.icon ? (
                    <entry.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                          {
                            'size-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed'
                          }
                        )}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor
                          } as CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      'flex flex-1 justify-between leading-none',
                      nestLabel ? 'items-end' : 'items-center'
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? resolvedLabel : null}
                      <span className="text-muted-foreground">{entry?.label ?? item.name}</span>
                    </div>
                    {item.value !== undefined && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {typeof item.value === 'number'
                          ? (valueFormatter?.(item.value) ?? item.value.toLocaleString())
                          : item.value}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
