import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { DEFAULT_CHART_COLORS } from './chart-utils'

export type RadialProgressDatum = {
  label: string
  value: number
  color?: string
}

export type RadialProgressChartProps = {
  data: RadialProgressDatum[]
  total?: number
  totalLabel?: ReactNode
  colors?: string[]
  showLegend?: boolean
  size?: number
  valueFormatter?: (value: number) => ReactNode
  className?: string
}

const STROKE_RATIO = 0.15
const GAP_PX = 6

export function RadialProgressChart({
  data,
  total,
  totalLabel = 'Total',
  colors,
  showLegend = true,
  size = 160,
  valueFormatter = v => v,
  className
}: RadialProgressChartProps) {
  const resolvedTotal = total ?? data.reduce((sum, d) => sum + d.value, 0)
  const sum = data.reduce((s, d) => s + Math.max(0, d.value), 0)

  const resolveColor = (d: RadialProgressDatum, i: number) =>
    d.color ??
    colors?.[i % (colors.length || 1)] ??
    DEFAULT_CHART_COLORS[i % DEFAULT_CHART_COLORS.length]

  const strokeWidth = size * STROKE_RATIO
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const gapCount = data.length > 1 ? data.length : 0
  const available = Math.max(0, circumference - gapCount * GAP_PX)

  const lengths = data.map(d => (sum > 0 ? (Math.max(0, d.value) / sum) * available : 0))
  const segments = data.map((d, i) => ({
    datum: d,
    color: resolveColor(d, i),
    length: lengths[i] ?? 0,
    // Sum of every earlier segment's length + its trailing gap — an
    // immutable running-offset computation (no mutated accumulator
    // across the map, which the immutability lint rule rejects).
    offset: lengths.slice(0, i).reduce((acc, l) => acc + l + GAP_PX, 0)
  }))

  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-6',
        // No legend beside it (or nothing to show) — center the ring instead of
        // leaving it flush-left with a slab of dead space in the rest of the card.
        (!showLegend || data.length === 0) && 'justify-center',
        className
      )}
    >
      <div className="relative aspect-square shrink-0" style={{ width: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={`${totalLabel}: ${resolvedTotal}`}
        >
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {segments.map(({ datum, color, length, offset }) =>
              length > 0 ? (
                <circle
                  key={datum.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-offset}
                />
              ) : null
            )}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tabular-nums">{valueFormatter(resolvedTotal)}</span>
          <span className="text-muted-foreground text-xs">{totalLabel}</span>
        </div>
      </div>

      {showLegend && (
        <ul className="flex min-w-0 flex-1 flex-col gap-2">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-2 text-sm">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: resolveColor(d, i) }}
              />
              <span className="text-muted-foreground min-w-0 truncate">{d.label}</span>
              <span className="ml-auto shrink-0 pl-4 font-medium tabular-nums">
                {valueFormatter(d.value)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
