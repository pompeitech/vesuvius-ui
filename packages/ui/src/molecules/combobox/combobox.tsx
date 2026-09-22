import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { type ControlSize, controlHeightClassNames } from '../../lib/control-size'
import { cn } from '../../lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../command/command'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover'

export type ComboboxOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  clearable?: boolean
  disabled?: boolean
  size?: ControlSize
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

/** A searchable single-value selector built on Command and Popover. */
export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  clearable = false,
  disabled,
  size = 'default',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy
}: ComboboxProps) {
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const selected = value ?? internalValue
  const selectedOption = options.find(option => option.value === selected)

  const selectValue = (next: string | undefined) => {
    if (value === undefined) setInternalValue(next)
    onValueChange?.(next)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : placeholder)}
          aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
          disabled={disabled}
          data-slot="combobox"
          data-size={size}
          className={cn(
            'border-input flex w-full items-center justify-between gap-2 rounded-md border bg-transparent shadow-xs outline-none',
            size === 'xs' && `${controlHeightClassNames.xs} px-2.5 text-xs`,
            size === 'sm' && `${controlHeightClassNames.sm} px-3 text-xs`,
            size === 'default' && `${controlHeightClassNames.default} px-3 text-sm`,
            size === 'lg' && `${controlHeightClassNames.lg} px-3.5 text-sm`,
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        >
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-left',
              !selectedOption && 'text-muted-foreground'
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList id={listboxId} role="listbox">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {clearable && selectedOption && (
                <CommandItem
                  value="__clear__"
                  onSelect={() => selectValue(undefined)}
                  className="text-muted-foreground"
                >
                  Clear selection
                </CommandItem>
              )}
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  aria-selected={option.value === selected}
                  onSelect={() => selectValue(option.value)}
                  className="items-start gap-2"
                >
                  <CheckIcon
                    className={cn(
                      'mt-0.5 size-4 shrink-0',
                      option.value === selected ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block truncate">{option.label}</span>
                    {option.description && (
                      <span className="text-muted-foreground block truncate text-xs">
                        {option.description}
                      </span>
                    )}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
