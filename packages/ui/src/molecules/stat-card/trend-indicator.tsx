import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

export type TrendIndicatorProps = {
  changePct: number
  label?: string
  className?: string
}

export function TrendIndicator({ changePct, label, className }: TrendIndicatorProps) {
  const isPositive = changePct >= 0

  return (
    <span className={cn('text-muted-foreground inline-flex items-center gap-1 text-sm', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-0.5 font-medium',
          isPositive ? 'text-success-emphasis' : 'text-destructive'
        )}
      >
        {isPositive ? (
          <TrendingUpIcon className="size-3.5" aria-hidden="true" />
        ) : (
          <TrendingDownIcon className="size-3.5" aria-hidden="true" />
        )}
        {isPositive ? '+' : ''}
        {changePct}%
      </span>
      {label}
    </span>
  )
}
