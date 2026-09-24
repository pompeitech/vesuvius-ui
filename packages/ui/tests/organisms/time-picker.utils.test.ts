import {
  convert12To24Hour,
  convert24To12Hour,
  getArrowByType,
  getValid12Hour,
  getValidHour,
  getValidMinuteOrSecond,
  getValidNumber,
  padTime
} from '@ui/organisms/time-picker/time-picker.utils'
import { describe, expect, test } from 'vitest'

describe('time picker utilities', () => {
  test('clamps and loops numeric values', () => {
    expect(getValidNumber('bad', { min: 2, max: 4 })).toBe(2)
    expect(getValidNumber('9', { max: 4 })).toBe(4)
    expect(getValidNumber('-1', { min: 0, max: 4, loop: true })).toBe(4)
    expect(getValidHour('25')).toBe(23)
    expect(getValid12Hour('0')).toBe(1)
    expect(getValidMinuteOrSecond('70')).toBe(59)
  })

  test('handles arrow wrapping and hour conversions', () => {
    expect(getArrowByType('23', 1, 'hours')).toBe('0')
    expect(getArrowByType('0', -1, 'minutes')).toBe('59')
    expect(getArrowByType('AM', 1, 'period')).toBe('AM')
    expect(convert24To12Hour(0)).toBe(12)
    expect(convert24To12Hour(15)).toBe(3)
    expect(convert12To24Hour(12, 'AM')).toBe(0)
    expect(convert12To24Hour(3, 'PM')).toBe(15)
    expect(padTime(7)).toBe('07')
  })
})
