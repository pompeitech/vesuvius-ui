import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '../../atoms/card/card'
import { cn } from '../../lib/utils'
import { TrendIndicator } from './trend-indicator'

export type StatCardProps = {
  label: string
  value: ReactNode
  icon?: LucideIcon
  changePct?: number
  changeLabel?: string
  trend?: ReactNode
  className?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  changePct,
  changeLabel = 'vs last month',
  trend,
  className
}: StatCardProps) {
  const isPositive = (changePct ?? 0) >= 0

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center gap-2.5 space-y-0 pb-2">
        {Icon ? (
          <span className="bg-muted/40 flex size-8 shrink-0 items-center justify-center rounded-md border">
            <Icon className="text-muted-foreground size-4" aria-hidden="true" />
          </span>
        ) : null}
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-3">
          <div className="text-3xl font-bold tabular-nums">{value}</div>
          {trend && (
            <div
              className={cn(
                'h-10 w-24 shrink-0',
                isPositive ? 'text-success-emphasis' : 'text-destructive'
              )}
            >
              {trend}
            </div>
          )}
        </div>
        {changePct !== undefined && (
          <div className="mt-1.5">
            <TrendIndicator changePct={changePct} label={changeLabel} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
