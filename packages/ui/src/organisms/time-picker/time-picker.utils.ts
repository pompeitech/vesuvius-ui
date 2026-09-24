export type TimePeriod = 'AM' | 'PM'
export type TimeSegment = 'hours' | 'minutes' | 'seconds' | 'period'

export function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: { max: number; min?: number; loop?: boolean }
): number {
  let numericValue = parseInt(value, 10)
  if (Number.isNaN(numericValue)) return min

  if (numericValue > max) {
    numericValue = loop ? min : max
  } else if (numericValue < min) {
    numericValue = loop ? max : min
  }
  return numericValue
}

export function getValidHour(value: string): number {
  return getValidNumber(value, { max: 23 })
}

export function getValid12Hour(value: string): number {
  return getValidNumber(value, { max: 12, min: 1 })
}

export function getValidMinuteOrSecond(value: string): number {
  return getValidNumber(value, { max: 59 })
}

function getValidArrowNumber(
  value: string,
  { min, max, step }: { min: number; max: number; step: number }
): number {
  let numericValue = parseInt(value, 10)
  if (Number.isNaN(numericValue)) return min
  numericValue += step
  if (numericValue > max) numericValue = min
  if (numericValue < min) numericValue = max
  return numericValue
}

export function getArrowByType(value: string, step: number, type: TimeSegment): string {
  switch (type) {
    case 'hours':
      return String(getValidArrowNumber(value, { min: 0, max: 23, step }))
    case 'minutes':
    case 'seconds':
      return String(getValidArrowNumber(value, { min: 0, max: 59, step }))
    default:
      return value
  }
}

export function convert24To12Hour(hour24: number): number {
  if (hour24 === 0 || hour24 === 24) return 12
  if (hour24 > 12) return hour24 - 12
  return hour24
}

export function convert12To24Hour(hour12: number, period: TimePeriod): number {
  let hour = hour12 % 12
  if (period === 'PM') hour += 12
  return hour
}

export function setDateHours(date: Date, hour: number): Date {
  const next = new Date(date)
  next.setHours(hour)
  return next
}

export function setDateMinutes(date: Date, minutes: number): Date {
  const next = new Date(date)
  next.setMinutes(minutes)
  return next
}

export function setDateSeconds(date: Date, seconds: number): Date {
  const next = new Date(date)
  next.setSeconds(seconds)
  return next
}

export function padTime(value: number): string {
  return String(value).padStart(2, '0')
}
