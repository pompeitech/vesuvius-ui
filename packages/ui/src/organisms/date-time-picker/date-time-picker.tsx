import { format } from 'date-fns'
import { useCallback, useRef, useState } from 'react'
import { Button } from '../../atoms/button/button'
import { Separator } from '../../atoms/separator/separator'
import { Popover, PopoverContent, PopoverTrigger } from '../../molecules/popover/popover'
import { Calendar } from '../calendar/calendar'
import { DateField } from './date-field'
import { TimeColumn } from './time-column'
import {
  convert12To24Hour,
  convert24To12Hour,
  padTime,
  setDateHours,
  setDateMinutes,
  setDateSeconds,
  type TimePeriod
} from '../time-picker/time-picker.utils'

export type DateTimePickerProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
  placeholder?: string
  dateFormat?: string
  hourFormat?: '12' | '24'
  minuteStep?: number
  showSeconds?: boolean
  disabled?: boolean
  className?: string
  fromYear?: number
  toYear?: number
}

const range = (length: number, step = 1, start = 0) =>
  Array.from({ length }, (_, i) => start + i * step)

export function DateTimePicker({
  value,
  defaultValue,
  onChange,
  label,
  placeholder = 'Pick a date and time',
  dateFormat,
  hourFormat = '12',
  minuteStep = 5,
  showSeconds = false,
  disabled,
  className,
  fromYear = new Date().getFullYear() - 100,
  toYear = new Date().getFullYear() + 50
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false)
  const [committed, setCommitted] = useState<Date | undefined>(defaultValue)
  const date = value ?? committed

  // Time columns must scroll within the calendar's own height, never grow
  // taller than it — but CSS has no "match this sibling's natural height"
  // primitive, and `h-full` needs a *definite* ancestor height to resolve
  // against, which nothing here otherwise provides. Measure the calendar
  // and feed it back as an explicit pixel height. A callback ref (not a
  // useEffect keyed on `open`) is required: PopoverContent mounts inside a
  // Radix Portal/Presence a tick after `open` flips, so an effect tied to
  // `open` would run before the node exists and observe nothing.
  const calendarObserverRef = useRef<ResizeObserver | null>(null)
  const [calendarHeight, setCalendarHeight] = useState<number>()
  const calendarRef = useCallback((el: HTMLDivElement | null) => {
    calendarObserverRef.current?.disconnect()
    if (!el) return
    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) setCalendarHeight(entry.contentRect.height)
    })
    observer.observe(el)
    calendarObserverRef.current = observer
  }, [])

  const [draft, setDraft] = useState<Date>(() => date ?? new Date())

  // Re-seed the draft on open (not via a useEffect on `open`) so Cancel
  // reverts cleanly, without an extra render pass.
  const handleOpenChange = (next: boolean) => {
    if (next) setDraft(date ?? new Date())
    setOpen(next)
  }

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return
    const next = new Date(day)
    next.setHours(draft.getHours(), draft.getMinutes(), draft.getSeconds())
    setDraft(next)
  }

  const period: TimePeriod = draft.getHours() >= 12 ? 'PM' : 'AM'
  const hourValue = hourFormat === '12' ? convert24To12Hour(draft.getHours()) : draft.getHours()

  const hourValues = hourFormat === '12' ? range(12, 1, 1) : range(24, 1, 0)
  const minuteValues = range(Math.ceil(60 / minuteStep), minuteStep)
  const secondValues = range(60)

  const setHour = (next: number) => {
    const hour24 = hourFormat === '12' ? convert12To24Hour(next, period) : next
    setDraft(prev => setDateHours(prev, hour24))
  }
  const setMinute = (next: number) => setDraft(prev => setDateMinutes(prev, next))
  const setSecond = (next: number) => setDraft(prev => setDateSeconds(prev, next))
  const setPeriod = (next: TimePeriod) => {
    const hour24 = convert12To24Hour(hourValue, next)
    setDraft(prev => setDateHours(prev, hour24))
  }

  const handleCancel = () => setOpen(false)

  const handleOk = () => {
    setCommitted(draft)
    onChange?.(draft)
    setOpen(false)
  }

  const effectiveFormat =
    dateFormat ??
    `MM/dd/yyyy ${hourFormat === '12' ? 'hh:mm' : 'HH:mm'}${showSeconds ? ':ss' : ''}${
      hourFormat === '12' ? ' a' : ''
    }`

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : handleOpenChange}>
      <PopoverTrigger asChild>
        <DateField
          label={label}
          value={date ? format(date, effectiveFormat) : ''}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* self-start: without it, the row's default align-items:stretch
              grows this div to match the (currently taller) time panel,
              so ResizeObserver would measure that stretched height back —
              a feedback loop settling on the tallest side instead of the
              calendar's own true content height. */}
          <div ref={calendarRef} className="shrink-0 self-start">
            <Calendar
              mode="single"
              selected={draft}
              onSelect={handleDaySelect}
              captionLayout="dropdown"
              startMonth={new Date(fromYear, 0)}
              endMonth={new Date(toYear, 11)}
              // See DatePicker for the rationale (Radix Popover already
              // manages focus in/out; this only picks the initial target).
              autoFocus
            />
          </div>
          <Separator orientation="vertical" />
          {/* Capped to the calendar's own measured height (see
              calendarHeight above) so each TimeColumn's h-full + overflow-
              y-auto actually clamps and scrolls instead of growing past it. */}
          <div className="flex" style={calendarHeight ? { height: calendarHeight } : undefined}>
            <TimeColumn
              aria-label="Hours"
              values={hourValues}
              selected={hourValue}
              onSelect={setHour}
              formatValue={v => padTime(v)}
            />
            <Separator orientation="vertical" />
            <TimeColumn
              aria-label="Minutes"
              values={minuteValues}
              selected={draft.getMinutes() - (draft.getMinutes() % minuteStep)}
              onSelect={setMinute}
              formatValue={v => padTime(v)}
            />
            {showSeconds && (
              <>
                <Separator orientation="vertical" />
                <TimeColumn
                  aria-label="Seconds"
                  values={secondValues}
                  selected={draft.getSeconds()}
                  onSelect={setSecond}
                  formatValue={v => padTime(v)}
                />
              </>
            )}
            {hourFormat === '12' && (
              <>
                <Separator orientation="vertical" />
                <TimeColumn
                  aria-label="AM/PM"
                  values={['AM', 'PM'] as const}
                  selected={period}
                  onSelect={setPeriod}
                />
              </>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-end gap-1 p-2">
          <Button
            type="button"
            variant="ghost"
            className="text-primary-emphasis uppercase"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-primary-emphasis uppercase"
            onClick={handleOk}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
