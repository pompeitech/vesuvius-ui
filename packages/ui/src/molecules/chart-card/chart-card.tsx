import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '../../atoms/card/card'
import { cn } from '../../lib/utils'
import { TrendIndicator } from '../stat-card/trend-indicator'

export type ChartCardProps = {
  icon?: LucideIcon
  label: string
  value: ReactNode
  changePct?: number
  changeLabel?: string
  caption?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function ChartCard({
  icon: Icon,
  label,
  value,
  changePct,
  changeLabel,
  caption,
  action,
  children,
  className
}: ChartCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {Icon ? (
            <span className="bg-muted/40 flex size-8 shrink-0 items-center justify-center rounded-md border">
              <Icon className="text-muted-foreground size-4" aria-hidden="true" />
            </span>
          ) : null}
          <span className="text-muted-foreground text-sm font-medium">{label}</span>
        </div>
        {action}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-3xl font-bold tabular-nums">{value}</span>
          {changePct !== undefined && <TrendIndicator changePct={changePct} label={changeLabel} />}
        </div>
        {caption && (
          <p className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">{caption}</p>
        )}
        <div className="mt-4">{children}</div>
      </CardContent>
    </Card>
  )
}
