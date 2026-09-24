import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useId, useState, type ComponentType } from 'react'
import { Badge } from '../../atoms/badge/badge'
import { controlHeightClassNames, type ControlSize } from '../../lib/control-size'
import { cn } from '../../lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../../molecules/command/command'
import { Popover, PopoverContent, PopoverTrigger } from '../../molecules/popover/popover'

export type MultiSelectOption = {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
  disabled?: boolean
}

export type MultiSelectProps = {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (values: string[]) => void
  /** @deprecated Use `onValueChange` for consistency with Select. */
  onChange?: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  maxDisplay?: number
  size?: ControlSize
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  onChange,
  placeholder = 'Select options...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  maxDisplay = 3,
  size = 'default',
  disabled,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: MultiSelectProps) {
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const selected = value ?? internalValue

  const setSelected = (next: string[]) => {
    if (value === undefined) setInternalValue(next)
    ;(onValueChange ?? onChange)?.(next)
  }

  const toggleValue = (optionValue: string) => {
    setSelected(
      selected.includes(optionValue)
        ? selected.filter(v => v !== optionValue)
        : [...selected, optionValue]
    )
  }

  const removeValue = (optionValue: string) => {
    setSelected(selected.filter(v => v !== optionValue))
  }

  const selectedOptions = options.filter(o => selected.includes(o.value))
  const visibleChips = selectedOptions.slice(0, Math.max(0, maxDisplay))
  const overflowCount = selectedOptions.length - visibleChips.length

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        {/* A div, not a <button>: a <button> can't legally nest the chips'
            own "remove" <button>s below. */}
        <div
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
          tabIndex={disabled ? -1 : 0}
          data-slot="multi-select-trigger"
          data-size={size}
          onKeyDown={event => {
            if (event.target !== event.currentTarget) return
            // A plain div doesn't get the browser's native
            // Enter/Space-activates-click behavior a <button> gets for
            // free, so open the popover explicitly for keyboard users.
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setOpen(v => !v)
            }
          }}
          className={cn(
            'border-input flex w-full cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-md border bg-transparent shadow-xs outline-none',
            size === 'xs' && `${controlHeightClassNames.xs} px-2.5 text-xs`,
            size === 'sm' && `${controlHeightClassNames.sm} px-3 text-xs`,
            size === 'default' && `${controlHeightClassNames.default} px-3 text-sm`,
            size === 'lg' && `${controlHeightClassNames.lg} px-3.5 text-sm`,
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            className
          )}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <span className="flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden">
              {visibleChips.map(option => (
                <Badge key={option.value} variant="secondary" className="gap-1 pr-1">
                  {option.icon && <option.icon className="size-3" />}
                  {option.label}
                  <button
                    type="button"
                    aria-label={`Remove ${option.label}`}
                    onClick={event => {
                      event.stopPropagation()
                      removeValue(option.value)
                    }}
                    className="hover:bg-muted-foreground/20 focus-visible:ring-ring rounded-full outline-none focus-visible:ring-1"
                  >
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              ))}
              {overflowCount > 0 && <Badge variant="secondary">+{overflowCount} more</Badge>}
            </span>
          )}
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList id={listboxId} role="listbox" aria-multiselectable="true">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    disabled={option.disabled}
                    aria-selected={isSelected}
                    onSelect={() => toggleValue(option.value)}
                    className="gap-2"
                  >
                    <span
                      className={cn(
                        'border-primary flex size-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className="size-3" />
                    </span>
                    {option.icon && <option.icon className="text-muted-foreground size-4" />}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
