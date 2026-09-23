import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes
} from 'react'
import { cn } from '../../lib/utils'

export type InputGroupProps = HTMLAttributes<HTMLDivElement>

/** A bordered input composition for prefixes, suffixes, units and actions. */
export function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        'border-input bg-background has-[:focus-visible]:border-ring has-[:focus-visible]:ring-ring/50 flex min-w-0 items-center overflow-hidden rounded-md border shadow-xs transition-[color,box-shadow] has-[:focus-visible]:ring-[3px]',
        className
      )}
      {...props}
    />
  )
}

export function InputGroupAddon({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="input-group-addon"
      className={cn(
        'text-muted-foreground flex shrink-0 items-center gap-1 px-3 text-sm',
        className
      )}
      {...props}
    />
  )
}

export const InputGroupInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      data-slot="input-group-input"
      className={cn(
        'text-foreground placeholder:text-muted-foreground h-9 min-w-0 flex-1 border-0 bg-transparent px-3 text-sm outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
InputGroupInput.displayName = 'InputGroupInput'

export const InputGroupButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    data-slot="input-group-button"
    className={cn(
      'text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 flex h-9 shrink-0 items-center justify-center px-3 text-sm outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))
InputGroupButton.displayName = 'InputGroupButton'
