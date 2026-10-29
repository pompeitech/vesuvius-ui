import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calendar } from '@ui/organisms/calendar/calendar'
import { DateLocaleProvider } from '@ui/organisms/calendar/date-locale-provider'
import { DatePicker } from '@ui/organisms/date-picker/date-picker'
import { DateRangePicker } from '@ui/organisms/date-range-picker/date-range-picker'
import { DateTimePicker } from '@ui/organisms/date-time-picker/date-time-picker'
import { DateTimeRangePicker } from '@ui/organisms/date-time-range-picker/date-time-range-picker'
import { it as itLocale } from 'date-fns/locale'
import { describe, expect, test } from 'vitest'

// The weekday row is aria-hidden, so query it by react-day-picker's class.
const firstWeekday = () => document.querySelector('th.rdp-weekday')?.textContent

describe('date locale', () => {
  test('Calendar defaults to English with Sunday first', () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} />)
    expect(firstWeekday()).toBe('Su')
  })

  test('Calendar reads locale and first weekday from the provider', () => {
    render(
      <DateLocaleProvider locale={itLocale} weekStartsOn={1}>
        <Calendar mode="single" defaultMonth={new Date(2026, 0, 1)} captionLayout="dropdown" />
      </DateLocaleProvider>
    )
    expect(firstWeekday()).toBe('lun')
    expect(screen.getByRole('option', { name: 'gen' })).toBeInTheDocument()
  })

  test('locale alone uses its own first weekday', () => {
    render(<Calendar mode="single" locale={itLocale} defaultMonth={new Date(2026, 0, 1)} />)
    expect(firstWeekday()).toBe('lun')
  })

  test('props override the provider', () => {
    render(
      <DateLocaleProvider locale={itLocale} weekStartsOn={1}>
        <Calendar mode="single" weekStartsOn={0} defaultMonth={new Date(2026, 0, 1)} />
      </DateLocaleProvider>
    )
    expect(firstWeekday()).toBe('dom')
  })

  test('DatePicker formats its value with the locale', () => {
    render(<DatePicker locale={itLocale} defaultValue={new Date(2026, 0, 15)} />)
    expect(screen.getByRole('button')).toHaveTextContent('15 gennaio 2026')
  })

  test('DatePicker passes the provider locale to its calendar', async () => {
    const user = userEvent.setup()
    render(
      <DateLocaleProvider locale={itLocale} weekStartsOn={1}>
        <DatePicker defaultValue={new Date(2026, 0, 15)} />
      </DateLocaleProvider>
    )
    await user.click(screen.getByRole('button'))
    expect(firstWeekday()).toBe('lun')
  })

  test('DateRangePicker formats both ends with the locale', () => {
    render(
      <DateLocaleProvider locale={itLocale}>
        <DateRangePicker
          defaultValue={{ from: new Date(2026, 0, 10), to: new Date(2026, 1, 12) }}
        />
      </DateLocaleProvider>
    )
    expect(screen.getByRole('button')).toHaveTextContent('gen 10, 2026 – feb 12, 2026')
  })

  test('DateTimePicker keeps the US default format without a locale', () => {
    render(<DateTimePicker defaultValue={new Date(2026, 8, 12, 17, 20)} />)
    expect(screen.getByRole('button')).toHaveTextContent('09/12/2026 05:20 PM')
  })

  test('DateTimePicker uses the locale date order and custom action labels', async () => {
    const user = userEvent.setup()
    render(
      <DateTimePicker
        locale={itLocale}
        hourFormat="24"
        confirmLabel="Conferma"
        cancelLabel="Annulla"
        defaultValue={new Date(2026, 8, 12, 17, 20)}
      />
    )
    expect(screen.getByRole('button')).toHaveTextContent('12/09/2026 17:20')
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button', { name: 'Conferma' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Annulla' })).toBeVisible()
  })

  test('DateTimeRangePicker localises its format and time labels', async () => {
    const user = userEvent.setup()
    render(
      <DateTimeRangePicker
        locale={itLocale}
        hourFormat="24"
        startTimeLabel="Ora di inizio"
        endTimeLabel="Ora di fine"
        defaultValue={{ from: new Date(2026, 8, 12, 9, 30), to: new Date(2026, 8, 15, 17, 0) }}
      />
    )
    expect(screen.getByRole('button')).toHaveTextContent('12/09/2026 09:30 – 15/09/2026 17:00')
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Ora di inizio')).toBeVisible()
    expect(screen.getByText('Ora di fine')).toBeVisible()
  })
})
