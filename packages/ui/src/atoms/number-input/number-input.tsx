import { MinusIcon, PlusIcon } from 'lucide-react'
import { type ChangeEvent, forwardRef, type InputHTMLAttributes, useState } from 'react'
import { type ControlSize, controlHeightClassNames } from '../../lib/control-size'
import { cn } from '../../lib/utils'

// Steppers are square, matching the control's own height at every size —
// same scale as controlHeightClassNames, expressed as widths.
const stepperWidthClassNames = {
  xs: 'w-7',
  sm: 'w-8',
  default: 'w-9',
  lg: 'w-10'
} satisfies Record<ControlSize, string>

export type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  step?: number
  size?: ControlSize
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, defaultValue = 0, step = 1, size = 'default', onChange, ...props }, ref) => {
    const controlled = value !== undefined
    const [internalValue, setInternalValue] = useState(String(defaultValue))
    const currentValue = controlled ? String(value) : internalValue
    const change = (next: number) => {
      const nextValue = String(next)
      if (!controlled) setInternalValue(nextValue)
      onChange?.({
        target: { value: nextValue }
      } as ChangeEvent<HTMLInputElement>)
    }
    return (
      <div
        data-slot="number-input"
        data-size={size}
        className={cn(
          'flex items-center overflow-hidden rounded-md border border-input bg-background',
          controlHeightClassNames[size],
          className
        )}
      >
        <button
          type="button"
          aria-label="Decrease value"
          className={cn(
            'flex h-full items-center justify-center text-muted-foreground hover:bg-muted',
            stepperWidthClassNames[size]
          )}
          onClick={() => change(Number(currentValue || 0) - step)}
        >
          <MinusIcon className="size-3.5" />
        </button>
        <input
          ref={ref}
          type="number"
          value={currentValue}
          step={step}
          onChange={event => {
            if (!controlled) setInternalValue(event.target.value)
            onChange?.(event)
          }}
          className={cn(
            'h-full min-w-0 flex-1 border-0 bg-transparent text-center outline-none',
            (size === 'xs' || size === 'sm') && 'px-1.5 text-xs',
            (size === 'default' || size === 'lg') && 'px-2 text-sm'
          )}
          {...props}
        />
        <button
          type="button"
          aria-label="Increase value"
          className={cn(
            'flex h-full items-center justify-center text-muted-foreground hover:bg-muted',
            stepperWidthClassNames[size]
          )}
          onClick={() => change(Number(currentValue || 0) + step)}
        >
          <PlusIcon className="size-3.5" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = 'NumberInput'
