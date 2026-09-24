import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useId, useState } from 'react'
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
import { UserAvatar } from '../../molecules/user-avatar/user-avatar'

export type PeopleSelectOption = {
  value: string
  label: string
  description?: string
  avatarSrc?: string
}

export type PeopleSelectProps = {
  options: PeopleSelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string | undefined) => void
  placeholder?: string
  clearable?: boolean
  unassignedLabel?: string
  searchPlaceholder?: string
  emptyText?: string
  size?: ControlSize
  disabled?: boolean
  className?: string
}

export function PeopleSelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select person...',
  clearable = false,
  unassignedLabel = 'Unassigned',
  searchPlaceholder = 'Search people...',
  emptyText = 'No results found.',
  size = 'default',
  disabled,
  className
}: PeopleSelectProps) {
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
  const selected = value ?? internalValue

  const setSelected = (next: string | undefined) => {
    setInternalValue(next)
    onChange?.(next)
  }

  const selectedOption = options.find(option => option.value === selected)

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          disabled={disabled}
          data-slot="people-select-trigger"
          className={cn(
            'border-input flex w-full items-center justify-between gap-2 rounded-md border bg-transparent text-sm shadow-xs outline-none',
            size === 'xs' && `${controlHeightClassNames.xs} px-2.5 text-xs`,
            size === 'sm' && `${controlHeightClassNames.sm} px-3 text-xs`,
            size === 'default' && `${controlHeightClassNames.default} px-3`,
            size === 'lg' && `${controlHeightClassNames.lg} px-3.5`,
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        >
          {selectedOption ? (
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <UserAvatar name={selectedOption.label} src={selectedOption.avatarSrc} size="sm" />
              <span className="truncate">{selectedOption.label}</span>
            </span>
          ) : (
            <span className="text-muted-foreground flex flex-1 items-center gap-2">
              <span className="size-6 shrink-0 rounded-full border border-dashed" />
              {placeholder}
            </span>
          )}
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList id={listboxId} role="listbox">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {clearable && (
                <CommandItem
                  value={unassignedLabel}
                  onSelect={() => {
                    setSelected(undefined)
                    setOpen(false)
                  }}
                  className="gap-2"
                >
                  <span className="text-muted-foreground flex size-6 items-center justify-center rounded-full border border-dashed">
                    <CheckIcon className={cn('size-3.5', selected !== undefined && 'invisible')} />
                  </span>
                  <span className="text-muted-foreground">{unassignedLabel}</span>
                </CommandItem>
              )}
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    setSelected(option.value)
                    setOpen(false)
                  }}
                  className="gap-2"
                >
                  <UserAvatar name={option.label} src={option.avatarSrc} size="sm" />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-muted-foreground truncate text-xs">
                        {option.description}
                      </span>
                    )}
                  </span>
                  <CheckIcon
                    className={cn(
                      'ml-auto size-4 shrink-0',
                      option.value !== selected && 'invisible'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
