import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../molecules/popover/popover'
import { cn } from '../../lib/utils'
import { Button } from '../../atoms/button/button'
import type { ControlSize } from '../../lib/control-size'
import { Calendar } from '../calendar/calendar'

export type DatePickerProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  dateFormat?: string
  disabled?: boolean
  className?: string
  fromYear?: number
  toYear?: number
  size?: ControlSize
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = 'Pick a date',
  dateFormat = 'PPP',
  disabled,
  className,
  fromYear = new Date().getFullYear() - 100,
  toYear = new Date().getFullYear() + 50,
  size = 'default'
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue)
  const date = value ?? internalDate

  const handleSelect = (next: Date | undefined) => {
    setInternalDate(next)
    onChange?.(next)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={size}
          disabled={disabled}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, dateFormat) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          captionLayout="dropdown"
          startMonth={new Date(fromYear, 0)}
          endMonth={new Date(toYear, 11)}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
