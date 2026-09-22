import { type ButtonHTMLAttributes, forwardRef } from 'react'
import type { ControlSize } from '../../lib/control-size'
import { cn } from '../../lib/utils'

// Square counterpart to Button's icon-* sizes (icon-xs/icon-sm/icon/icon-lg)
// — same size-7/8/9/10 scale, keyed by the shared ControlSize so it lines up
// with Input/Select/Button at every size, not just Button's own icon slots.
const iconButtonSizeClassNames = {
  xs: 'size-7',
  sm: 'size-8',
  default: 'size-9',
  lg: 'size-10'
} satisfies Record<ControlSize, string>

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ControlSize
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = 'button', size = 'default', 'aria-label': ariaLabel, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      data-slot="icon-button"
      data-size={size}
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-input bg-background text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        iconButtonSizeClassNames[size],
        className
      )}
      {...props}
    />
  )
)
IconButton.displayName = 'IconButton'
