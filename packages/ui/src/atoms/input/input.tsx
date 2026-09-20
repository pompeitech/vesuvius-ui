import { forwardRef, type InputHTMLAttributes } from 'react'
import { type ControlSize, controlHeightClassNames } from '../../lib/control-size'
import { cn } from '../../lib/utils'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: ControlSize
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'default', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        data-size={size}
        className={cn(
          'border-input file:text-foreground placeholder:text-muted-foreground flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-full file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          size === 'xs' && `${controlHeightClassNames.xs} px-2.5 text-base file:text-xs md:text-xs`,
          size === 'sm' && `${controlHeightClassNames.sm} px-3 text-base file:text-xs md:text-xs`,
          size === 'default' &&
            `${controlHeightClassNames.default} px-3 text-base file:text-sm md:text-sm`,
          size === 'lg' && `${controlHeightClassNames.lg} px-3.5 text-base file:text-sm md:text-sm`,
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
