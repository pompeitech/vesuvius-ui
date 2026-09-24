import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type TimelineStatus = 'default' | 'active' | 'success' | 'warning' | 'destructive' | 'muted'

export type TimelineItem = {
  id: string
  title: string
  description?: ReactNode
  date?: ReactNode
  meta?: ReactNode
  icon?: ReactNode
  status?: TimelineStatus
  onClick?: () => void
}

export type TimelineProps = {
  items: TimelineItem[]
  className?: string
  variant?: 'default' | 'roadmap'
  'aria-label'?: string
}

const markerClasses: Record<TimelineStatus, string> = {
  default: 'border-primary/40 bg-background text-primary',
  active:
    'border-primary bg-primary text-primary-foreground shadow-[0_0_0_5px_color-mix(in_srgb,var(--primary)_16%,transparent)]',
  success: 'border-success bg-success text-success-foreground',
  warning: 'border-warning bg-warning text-warning-foreground',
  destructive: 'border-destructive bg-destructive text-destructive-foreground',
  muted: 'border-border bg-muted text-muted-foreground'
}

export function Timeline({
  items,
  className,
  variant = 'default',
  'aria-label': ariaLabel = 'Timeline'
}: TimelineProps) {
  return (
    <ol
      aria-label={ariaLabel}
      data-slot="timeline"
      data-variant={variant}
      className={cn('relative', variant === 'roadmap' ? 'space-y-3' : 'space-y-0', className)}
    >
      {items.map((item, index) => {
        const status = item.status ?? 'default'
        const isLast = index === items.length - 1
        const content = (
          <>
            <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="truncate text-sm font-semibold tracking-[-.01em]">{item.title}</p>
              {variant !== 'roadmap' && item.date && (
                <time className="shrink-0 text-xs text-muted-foreground">{item.date}</time>
              )}
            </div>
            {item.description && (
              <div className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</div>
            )}
            {item.meta && <div className="mt-3 text-xs text-muted-foreground">{item.meta}</div>}
          </>
        )

        return (
          <li
            key={item.id}
            data-slot="timeline-item"
            data-status={status}
            className={cn(
              'group relative grid min-w-0 grid-cols-[auto_1fr] gap-4',
              variant === 'roadmap' &&
                'grid-cols-[4.5rem_auto_1fr] gap-4 sm:grid-cols-[5rem_auto_1fr] sm:gap-5'
            )}
          >
            {variant === 'roadmap' && (
              <div className="pt-3 text-right text-xs font-bold tabular-nums text-muted-foreground">
                {item.date}
              </div>
            )}
            <div className={cn('relative flex justify-center', variant === 'roadmap' && 'pt-2')}>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-8 bottom-[-0.75rem] w-px bg-border transition-colors group-hover:bg-primary/40"
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 bg-background text-[11px] font-bold ring-8 ring-background transition-transform group-hover:scale-110',
                  markerClasses[status]
                )}
              >
                {item.icon ?? (variant === 'roadmap' ? index + 1 : null)}
              </span>
            </div>
            {item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className={cn(
                  'min-w-0 rounded-xl text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                  variant === 'roadmap'
                    ? 'border border-border bg-card p-4 shadow-sm hover:border-primary/50 hover:bg-accent/40'
                    : 'pb-6 last:pb-0 hover:text-foreground'
                )}
              >
                {content}
              </button>
            ) : (
              <div
                className={cn(
                  'min-w-0',
                  variant === 'roadmap'
                    ? 'border border-border bg-card p-4 shadow-sm transition-colors group-hover:border-primary/50 group-hover:bg-accent/40'
                    : 'pb-6 last:pb-0'
                )}
              >
                {content}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
