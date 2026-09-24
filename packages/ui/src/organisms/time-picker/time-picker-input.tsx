import { forwardRef, useImperativeHandle, useRef, useState, type KeyboardEvent } from 'react'
import { Input, type InputProps } from '../../atoms/input/input'
import { cn } from '../../lib/utils'
import {
  getArrowByType,
  getValid12Hour,
  getValidHour,
  getValidMinuteOrSecond,
  padTime,
  type TimePeriod,
  type TimeSegment
} from './time-picker.utils'

export type TimePickerInputProps = Omit<InputProps, 'value' | 'onChange' | 'type'> & {
  segment: TimeSegment
  value: number | TimePeriod
  onValueChange: (value: number | TimePeriod) => void
  hourFormat?: '12' | '24'
  onLeftFocus?: () => void
  onRightFocus?: () => void
}

export const TimePickerInput = forwardRef<HTMLInputElement, TimePickerInputProps>(
  (
    {
      segment,
      value,
      onValueChange,
      hourFormat = '24',
      onLeftFocus,
      onRightFocus,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const [flashDigit, setFlashDigit] = useState('')
    const innerRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement)

    const displayValue = segment === 'period' ? String(value) : padTime(Number(value))

    const calculateNewValue = (key: string) => {
      const next = flashDigit ? flashDigit + key : key
      setFlashDigit(next)
      return next
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Tab') return
      event.preventDefault()

      if (event.key === 'ArrowRight') {
        onRightFocus?.()
        return
      }
      if (event.key === 'ArrowLeft') {
        onLeftFocus?.()
        return
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const step = event.key === 'ArrowUp' ? 1 : -1
        if (segment === 'period') {
          onValueChange(value === 'AM' ? 'PM' : 'AM')
          return
        }
        const numeric = getArrowByType(String(value), step, segment)
        onValueChange(Number(numeric))
        return
      }
      if (event.key >= '0' && event.key <= '9') {
        if (segment === 'period') return

        const digits = calculateNewValue(event.key)
        const numeric =
          segment === 'hours' && hourFormat === '12'
            ? getValid12Hour(digits)
            : segment === 'hours'
              ? getValidHour(digits)
              : getValidMinuteOrSecond(digits)

        onValueChange(numeric)

        if (digits.length >= 2 || Number(digits) * 10 > 59) {
          setFlashDigit('')
          onRightFocus?.()
        }
        return
      }
      if (event.key === 'p' || event.key === 'P') {
        if (segment === 'period') onValueChange('PM')
        return
      }
      if (event.key === 'a' || event.key === 'A') {
        if (segment === 'period') onValueChange('AM')
        return
      }
    }

    return (
      <Input
        ref={innerRef}
        inputMode={segment === 'period' ? 'text' : 'numeric'}
        value={displayValue}
        onKeyDown={handleKeyDown}
        onChange={() => {
          // Controlled purely via onKeyDown; no-op to satisfy React's
          // controlled-input requirement (typing is handled as key events
          // so we can auto-advance segments after 2 digits).
        }}
        onFocus={event => event.currentTarget.select()}
        className={cn(
          'w-[3ch] text-center tabular-nums caret-transparent select-none',
          segment === 'period' && 'w-[4ch]',
          className
        )}
        {...props}
      />
    )
  }
)
TimePickerInput.displayName = 'TimePickerInput'
