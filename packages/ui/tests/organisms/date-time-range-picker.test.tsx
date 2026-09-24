import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateTimeRangePicker } from '@ui/organisms/date-time-range-picker/date-time-range-picker'
import { describe, expect, test } from 'vitest'

describe('DateTimeRangePicker', () => {
  test('shows a placeholder when empty', () => {
    render(<DateTimeRangePicker placeholder="Pick a range" />)
    expect(screen.getByRole('button', { name: /pick a range/i })).toBeVisible()
  })

  test('formats a default range in the trigger', () => {
    render(
      <DateTimeRangePicker
        defaultValue={{
          from: new Date(2026, 8, 12, 9, 30),
          to: new Date(2026, 8, 15, 17, 0)
        }}
      />
    )
    expect(screen.getByRole('button')).toHaveTextContent('09:30 AM')
    expect(screen.getByRole('button')).toHaveTextContent('05:00 PM')
  })

  test('disables the trigger', () => {
    render(<DateTimeRangePicker disabled />)
    expect(screen.getByRole('button', { name: /pick a date and time range/i })).toBeDisabled()
  })

  test('opens the calendar and keeps apply disabled until a complete range exists', async () => {
    const user = userEvent.setup()
    render(<DateTimeRangePicker confirmLabel="Confirm range" />)
    await user.click(screen.getByRole('button', { name: /pick a date and time range/i }))
    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Confirm range' })).toBeDisabled()
  })

  test('reveals start/end time columns once a full range is picked', async () => {
    const user = userEvent.setup()
    render(
      <DateTimeRangePicker
        defaultValue={{
          from: new Date(2026, 8, 12, 9, 30),
          to: new Date(2026, 8, 15, 17, 0)
        }}
      />
    )
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Start time')).toBeVisible()
    expect(screen.getByText('End time')).toBeVisible()
  })
})
