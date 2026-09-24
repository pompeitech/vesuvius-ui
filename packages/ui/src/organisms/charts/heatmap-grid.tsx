import { cn } from '../../lib/utils'

export type HeatmapGridProps = {
  rows: string[]
  columns: string[]
  cells: number[][]
  color?: string
  legend?: { label: string; value: number }[]
  className?: string
}

export function HeatmapGrid({
  rows,
  columns,
  cells,
  color = 'var(--primary)',
  legend,
  className
}: HeatmapGridProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `auto repeat(${columns.length}, 1fr)` }}
      >
        <div />
        {columns.map(col => (
          <div key={col} className="text-muted-foreground text-center text-xs">
            {col}
          </div>
        ))}
        {rows.map((row, r) => (
          <div key={row} className="contents">
            <div className="text-muted-foreground pr-2 text-right text-xs whitespace-nowrap">
              {row}
            </div>
            {columns.map((col, c) => (
              <div
                key={col}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor: color,
                  opacity: Math.max(0.08, cells[r]?.[c] ?? 0)
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {legend && (
        <div className="flex items-center gap-4">
          {legend.map(item => (
            <span
              key={item.label}
              className="text-muted-foreground flex items-center gap-1.5 text-xs"
            >
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: color,
                  opacity: Math.max(0.08, item.value)
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
