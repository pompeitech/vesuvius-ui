import * as ProgressPrimitive from '@radix-ui/react-progress'
import { type ComponentProps, type ComponentRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root>

export const Progress = forwardRef<ComponentRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      data-slot="progress"
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-transform"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
)
Progress.displayName = 'Progress'
