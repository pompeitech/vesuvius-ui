import { CalendarIcon } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export type DateFieldProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  value: string
  placeholder?: string
}

export const DateField = forwardRef<HTMLButtonElement, DateFieldProps>(
  ({ label, value, placeholder, className, disabled, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <span className="bg-background text-muted-foreground peer-focus:text-ring absolute -top-2 left-2.5 z-10 px-1 text-xs font-medium">
            {label}
          </span>
        )}
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={cn(
            'peer border-input flex h-12 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3.5 text-left text-sm shadow-xs transition-colors outline-none',
            'hover:border-foreground/50',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'disabled:pointer-events-none disabled:opacity-50',
            className
          )}
          {...props}
        >
          <span className={cn(!value && 'text-muted-foreground')}>{value || placeholder}</span>
          <CalendarIcon className="text-muted-foreground size-4 shrink-0" />
        </button>
      </div>
    )
  }
)
DateField.displayName = 'DateField'
