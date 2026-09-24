import { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'

export type TimeColumnProps<T extends number | string> = {
  values: readonly T[]
  selected: T
  onSelect: (value: T) => void
  formatValue?: (value: T) => string
  'aria-label': string
}

export function TimeColumn<T extends number | string>({
  values,
  selected,
  onSelect,
  formatValue,
  'aria-label': ariaLabel
}: TimeColumnProps<T>) {
  const selectedRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Only on mount (popover open) — not on every selection change, or the
    // list would keep re-centering itself under the user's cursor.
    selectedRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      className="flex h-full w-16 flex-col overflow-y-auto py-1"
    >
      {values.map(value => {
        const isSelected = value === selected
        return (
          <button
            key={value}
            ref={isSelected ? selectedRef : undefined}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(value)}
            className={cn(
              'mx-1 flex h-9 shrink-0 items-center justify-center rounded-md text-sm tabular-nums outline-none',
              'focus-visible:ring-ring focus-visible:ring-2',
              isSelected
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {formatValue ? formatValue(value) : value}
          </button>
        )
      })}
    </div>
  )
}
