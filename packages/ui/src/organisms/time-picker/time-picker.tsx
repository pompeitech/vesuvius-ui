import { useRef } from 'react'
import { cn } from '../../lib/utils'
import { TimePickerInput } from './time-picker-input'
import {
  convert12To24Hour,
  convert24To12Hour,
  setDateHours,
  setDateMinutes,
  setDateSeconds,
  type TimePeriod
} from './time-picker.utils'

export type TimePickerProps = {
  date: Date | undefined
  onChange: (date: Date) => void
  hourFormat?: '12' | '24'
  showSeconds?: boolean
  disabled?: boolean
  className?: string
}

export function TimePicker({
  date,
  onChange,
  hourFormat = '24',
  showSeconds = false,
  disabled,
  className
}: TimePickerProps) {
  const value = date ?? new Date(new Date().setHours(0, 0, 0, 0))

  const hourRef = useRef<HTMLInputElement>(null)
  const minuteRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)
  const periodRef = useRef<HTMLInputElement>(null)

  const period: TimePeriod = value.getHours() >= 12 ? 'PM' : 'AM'
  const hourValue = hourFormat === '12' ? convert24To12Hour(value.getHours()) : value.getHours()

  return (
    <div className={cn('flex items-center gap-1', className)} data-slot="time-picker">
      <TimePickerInput
        ref={hourRef}
        segment="hours"
        hourFormat={hourFormat}
        value={hourValue}
        disabled={disabled}
        aria-label="Hours"
        onValueChange={next => {
          const hour24 =
            hourFormat === '12' ? convert12To24Hour(Number(next), period) : Number(next)
          onChange(setDateHours(value, hour24))
        }}
        onRightFocus={() => minuteRef.current?.focus()}
      />
      <span className="text-muted-foreground">:</span>
      <TimePickerInput
        ref={minuteRef}
        segment="minutes"
        value={value.getMinutes()}
        disabled={disabled}
        aria-label="Minutes"
        onValueChange={next => onChange(setDateMinutes(value, Number(next)))}
        onLeftFocus={() => hourRef.current?.focus()}
        onRightFocus={() => (showSeconds ? secondRef.current?.focus() : periodRef.current?.focus())}
      />
      {showSeconds && (
        <>
          <span className="text-muted-foreground">:</span>
          <TimePickerInput
            ref={secondRef}
            segment="seconds"
            value={value.getSeconds()}
            disabled={disabled}
            aria-label="Seconds"
            onValueChange={next => onChange(setDateSeconds(value, Number(next)))}
            onLeftFocus={() => minuteRef.current?.focus()}
            onRightFocus={() => periodRef.current?.focus()}
          />
        </>
      )}
      {hourFormat === '12' && (
        <TimePickerInput
          ref={periodRef}
          segment="period"
          value={period}
          disabled={disabled}
          aria-label="AM/PM"
          onValueChange={next => {
            const nextPeriod = next as TimePeriod
            const hour24 = convert12To24Hour(hourValue, nextPeriod)
            onChange(setDateHours(value, hour24))
          }}
          onLeftFocus={() => (showSeconds ? secondRef : minuteRef).current?.focus()}
        />
      )}
    </div>
  )
}
