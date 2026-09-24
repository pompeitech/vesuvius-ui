/* This file intentionally pairs ChartContainer with its useChart() hook,
   mirroring the ThemeProvider/useTheme and Form/useFormField pattern. */
import {
  createContext,
  useContext,
  useId,
  useMemo,
  type ComponentProps,
  type ComponentType,
  type ReactNode
} from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '../../lib/utils'

const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode
    icon?: ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextValue = { config: ChartConfig }

const ChartContext = createContext<ChartContextValue | undefined>(undefined)

export function useChart(): ChartContextValue {
  const context = useContext(ChartContext)
  if (!context) throw new Error('useChart must be used within a <ChartContainer>')
  return context
}

export type ChartContainerProps = ComponentProps<'div'> & {
  config: ChartConfig
  children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children']
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  const uid = useId()
  const chartId = `chart-${uid.replace(/:/g, '')}`
  const value = useMemo(() => ({ config }), [config])

  return (
    <ChartContext.Provider value={value}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          'flex aspect-video w-full min-w-0 justify-center text-xs',
          '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground',
          '[&_.recharts-cartesian-grid_line]:stroke-border/50',
          '[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border',
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          '[&_.recharts-layer]:outline-none',
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
          '[&_.recharts-radial-bar-background-sector]:fill-muted',
          '[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted',
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          '[&_.recharts-sector]:outline-none',
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          '[&_.recharts-surface]:outline-none',
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {/* debounce: re-measuring on every intermediate width during a CSS
            resize transition can trip React's "Maximum update depth" guard. */}
        <RechartsPrimitive.ResponsiveContainer debounce={200}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const entries = Object.entries(config).filter(([, cfg]) => cfg.color ?? cfg.theme)
  if (entries.length === 0) return null

  const css = Object.entries(THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${entries
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof THEMES] ?? itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join('\n')}
}
`
    )
    .join('\n')

  // Generated CSS text only (theme colors from `config`), no user input.
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
