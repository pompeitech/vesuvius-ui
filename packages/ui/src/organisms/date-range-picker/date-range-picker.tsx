import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '../../molecules/popover/popover'
import { cn } from '../../lib/utils'
import { Button } from '../../atoms/button/button'
import type { ControlSize } from '../../lib/control-size'
import { Calendar } from '../calendar/calendar'

export type { DateRange }

export type DateRangePickerProps = {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  dateFormat?: string
  numberOfMonths?: number
  disabled?: boolean
  className?: string
  fromYear?: number
  toYear?: number
  confirmLabel?: string
  size?: ControlSize
}

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  placeholder = 'Pick a date range',
  dateFormat = 'LLL d, y',
  numberOfMonths = 2,
  disabled,
  className,
  fromYear = new Date().getFullYear() - 100,
  toYear = new Date().getFullYear() + 50,
  confirmLabel = 'Apply',
  size = 'default'
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [internalRange, setInternalRange] = useState<DateRange | undefined>(defaultValue)
  const range = value ?? internalRange
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(range)

  const handleSelect = (next: DateRange | undefined) => {
    setDraftRange(next)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setDraftRange(range)
    setOpen(nextOpen)
  }

  const handleConfirm = () => {
    if (!draftRange?.from || !draftRange.to) return
    setInternalRange(draftRange)
    onChange?.(draftRange)
    setOpen(false)
  }

  const label = (() => {
    if (!range?.from) return placeholder
    if (!range.to) return format(range.from, dateFormat)
    return `${format(range.from, dateFormat)} – ${format(range.to, dateFormat)}`
  })()

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={size}
          disabled={disabled}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !range?.from && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          // Without `min`, react-day-picker's own addToRange() completes the
          // range on the first click (from === to), which closes the
          // popover before a second day can be picked — a real upstream
          // gotcha, not a Popover bug. `min={1}` forces `to: undefined`
          // until a distinct second day is clicked.
          min={1}
          selected={draftRange}
          onSelect={handleSelect}
          numberOfMonths={numberOfMonths}
          captionLayout="dropdown"
          startMonth={new Date(fromYear, 0)}
          endMonth={new Date(toYear, 11)}
          autoFocus
        />
        <div className="border-border flex justify-end border-t p-3">
          <Button
            type="button"
            size="sm"
            onClick={handleConfirm}
            disabled={!draftRange?.from || !draftRange.to}
          >
            {confirmLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
