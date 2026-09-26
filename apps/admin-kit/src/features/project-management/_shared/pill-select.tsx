import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  badgeVariants,
  cn,
  type BadgeProps
} from '@pompeitech/vesuvius-ui'

export type PillSelectOption<T extends string> = {
  value: T
  label: string
  variant: BadgeProps['variant']
}

type PillSelectProps<T extends string> = {
  value: T
  options: PillSelectOption<T>[]
  onValueChange: (value: T) => void
  className?: string
}

/**
 * A `Select` whose trigger looks like a colored `Badge` pill (e.g. "In
 * Progress ⌄") instead of a normal bordered input — used for Status
 * everywhere in Project Management. `SelectTrigger`'s own base classes
 * (border/height/padding) are overridden by these, since `cn` merges the
 * caller's className last; `SelectContent`/`SelectItem` stay the plain
 * default dropdown — only the trigger becomes a pill.
 */
export function PillSelect<T extends string>({
  value,
  options,
  onValueChange,
  className
}: PillSelectProps<T>) {
  const current = options.find(option => option.value === value)

  return (
    <Select value={value} onValueChange={next => onValueChange(next as T)}>
      <SelectTrigger
        size="sm"
        className={cn(
          badgeVariants({ variant: current?.variant }),
          'h-auto gap-1 border-0 px-2 py-0.5 shadow-none data-[size=sm]:h-auto',
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
