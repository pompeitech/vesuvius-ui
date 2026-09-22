import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '../../atoms/button/button'
import type { ControlSize } from '../../lib/control-size'
import { cn } from '../../lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../../molecules/popover/popover'
import { Calendar } from '../calendar/calendar'
import { TimeColumn } from '../date-time-picker/time-column'
import {
  convert12To24Hour,
  convert24To12Hour,
  padTime,
  setDateHours,
  setDateMinutes,
  setDateSeconds,
  type TimePeriod
} from '../time-picker/time-picker.utils'

export type DateTimeRange = DateRange

export type DateTimeRangePickerProps = {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  dateFormat?: string
  hourFormat?: '12' | '24'
  minuteStep?: number
  showSeconds?: boolean
  numberOfMonths?: number
  disabled?: boolean
  className?: string
  fromYear?: number
  toYear?: number
  confirmLabel?: string
  cancelLabel?: string
  size?: ControlSize
}

const range = (length: number, step = 1, start = 0) =>
  Array.from({ length }, (_, index) => start + index * step)

function withTime(day: Date, source: Date | undefined): Date {
  const next = new Date(day)
  if (source) {
    next.setHours(source.getHours(), source.getMinutes(), source.getSeconds(), 0)
  }
  return next
}

function TimeColumns({
  value,
  onChange,
  hourFormat,
  minuteStep,
  showSeconds
}: {
  value: Date
  onChange: (next: Date) => void
  hourFormat: '12' | '24'
  minuteStep: number
  showSeconds: boolean
}) {
  const period: TimePeriod = value.getHours() >= 12 ? 'PM' : 'AM'
  const hourValue = hourFormat === '12' ? convert24To12Hour(value.getHours()) : value.getHours()
  const hourValues = hourFormat === '12' ? range(12, 1, 1) : range(24)
  const minuteValues = range(Math.ceil(60 / minuteStep), minuteStep)
  const secondValues = range(60)

  const setHour = (hour: number) => {
    const hour24 = hourFormat === '12' ? convert12To24Hour(hour, period) : hour
    onChange(setDateHours(value, hour24))
  }

  return (
    <div className="border-border flex h-44 min-w-0 overflow-hidden rounded-md border">
      <TimeColumn
        aria-label="Hours"
        values={hourValues}
        selected={hourValue}
        onSelect={setHour}
        formatValue={item => padTime(item)}
      />
      <TimeColumn
        aria-label="Minutes"
        values={minuteValues}
        selected={value.getMinutes() - (value.getMinutes() % minuteStep)}
        onSelect={minute => onChange(setDateMinutes(value, minute))}
        formatValue={item => padTime(item)}
      />
      {showSeconds && (
        <TimeColumn
          aria-label="Seconds"
          values={secondValues}
          selected={value.getSeconds()}
          onSelect={second => onChange(setDateSeconds(value, second))}
          formatValue={item => padTime(item)}
        />
      )}
      {hourFormat === '12' && (
        <TimeColumn
          aria-label="AM/PM"
          values={['AM', 'PM'] as const}
          selected={period}
          onSelect={nextPeriod =>
            onChange(setDateHours(value, convert12To24Hour(hourValue, nextPeriod)))
          }
        />
      )}
    </div>
  )
}

export function DateTimeRangePicker({
  value,
  defaultValue,
  onChange,
  placeholder = 'Pick a date and time range',
  dateFormat,
  hourFormat = '12',
  minuteStep = 5,
  showSeconds = false,
  numberOfMonths = 2,
  disabled,
  className,
  fromYear = new Date().getFullYear() - 100,
  toYear = new Date().getFullYear() + 50,
  confirmLabel = 'Apply',
  cancelLabel = 'Cancel',
  size = 'default'
}: DateTimeRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [committed, setCommitted] = useState<DateRange | undefined>(defaultValue)
  const rangeValue = value ?? committed
  const [draft, setDraft] = useState<DateRange | undefined>(rangeValue)

  const effectiveFormat =
    dateFormat ??
    `MM/dd/yyyy ${hourFormat === '12' ? 'hh:mm' : 'HH:mm'}${showSeconds ? ':ss' : ''}${hourFormat === '12' ? ' a' : ''}`

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setDraft(rangeValue)
    setOpen(nextOpen)
  }

  const handleSelect = (next: DateRange | undefined) => {
    if (!next) {
      setDraft(undefined)
      return
    }
    setDraft({
      from: next.from ? withTime(next.from, draft?.from) : undefined,
      to: next.to ? withTime(next.to, draft?.to ?? draft?.from) : undefined
    })
  }

  const updateDate = (key: 'from' | 'to', next: Date) => {
    setDraft(current => {
      if (!current?.from) return current
      return { ...current, [key]: next }
    })
  }

  const handleConfirm = () => {
    if (!draft?.from || !draft.to) return
    setCommitted(draft)
    onChange?.(draft)
    setOpen(false)
  }

  const label = (() => {
    if (!rangeValue?.from) return placeholder
    const from = format(rangeValue.from, effectiveFormat)
    return rangeValue.to ? `${from} – ${format(rangeValue.to, effectiveFormat)}` : from
  })()

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={size}
          disabled={disabled}
          className={cn(
            'w-[320px] justify-start text-left font-normal',
            !rangeValue?.from && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[calc(100vw-2rem)] p-0" align="start">
        <div className="flex max-w-[calc(100vw-2rem)] items-start overflow-x-auto">
          <Calendar
            mode="range"
            min={1}
            selected={draft}
            onSelect={handleSelect}
            numberOfMonths={numberOfMonths}
            captionLayout="dropdown"
            startMonth={new Date(fromYear, 0)}
            endMonth={new Date(toYear, 11)}
            autoFocus
          />
          {(draft?.from || draft?.to) && (
            <div className="border-border grid shrink-0 gap-3 border-l p-3 sm:grid-cols-2">
              {draft.from && (
                <div className="min-w-0 space-y-1.5">
                  <p className="text-muted-foreground text-xs font-medium">Start time</p>
                  <TimeColumns
                    value={draft.from}
                    onChange={next => updateDate('from', next)}
                    hourFormat={hourFormat}
                    minuteStep={minuteStep}
                    showSeconds={showSeconds}
                  />
                </div>
              )}
              {draft.to && (
                <div className="min-w-0 space-y-1.5">
                  <p className="text-muted-foreground text-xs font-medium">End time</p>
                  <TimeColumns
                    value={draft.to}
                    onChange={next => updateDate('to', next)}
                    hourFormat={hourFormat}
                    minuteStep={minuteStep}
                    showSeconds={showSeconds}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="border-border flex justify-end gap-1 border-t p-3">
          <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleConfirm}
            disabled={!draft?.from || !draft.to}
          >
            {confirmLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
