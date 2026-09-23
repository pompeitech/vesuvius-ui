import type { ComponentType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: ReactNode
  compact?: boolean
}

/** A consistent empty, filtered or first-run state for pages, cards and tables. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'gap-2 px-4 py-8' : 'gap-3 px-6 py-14',
        className
      )}
      {...props}
    >
      {Icon && (
        <span className="bg-muted text-muted-foreground flex size-11 items-center justify-center rounded-full">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      )}
      <div className="space-y-1">
        <h3 className="text-foreground font-medium">{title}</h3>
        {description && <p className="text-muted-foreground max-w-md text-sm">{description}</p>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  )
}
