import { MinusIcon, PlusIcon } from 'lucide-react'
import { type ChangeEvent, forwardRef, type InputHTMLAttributes, useState } from 'react'
import { cn } from '../../lib/utils'

export type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  step?: number
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, defaultValue = 0, step = 1, onChange, ...props }, ref) => {
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
        className={cn(
          'flex h-9 items-center overflow-hidden rounded-md border border-input bg-background',
          className
        )}
      >
        <button
          type="button"
          aria-label="Decrease value"
          className="flex h-full w-9 items-center justify-center text-muted-foreground hover:bg-muted"
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
          className="h-full min-w-0 flex-1 border-0 bg-transparent px-2 text-center text-sm outline-none"
          {...props}
        />
        <button
          type="button"
          aria-label="Increase value"
          className="flex h-full w-9 items-center justify-center text-muted-foreground hover:bg-muted"
          onClick={() => change(Number(currentValue || 0) + step)}
        >
          <PlusIcon className="size-3.5" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = 'NumberInput'
