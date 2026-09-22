import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangePicker } from '@ui/organisms/date-range-picker/date-range-picker'
import { describe, expect, test } from 'vitest'

describe('DateRangePicker', () => {
  test('formats a default range in the trigger', () => {
    render(
      <DateRangePicker defaultValue={{ from: new Date(2026, 0, 10), to: new Date(2026, 0, 20) }} />
    )
    expect(screen.getByRole('button')).toHaveTextContent(/–/)
  })

  test('supports a custom placeholder and disabled state', () => {
    render(<DateRangePicker placeholder="Choose dates" disabled />)
    expect(screen.getByRole('button', { name: /choose dates/i })).toBeDisabled()
  })

  test('forwards size to its trigger, matching Input/Button at the same size', () => {
    render(<DateRangePicker size="lg" />)
    expect(screen.getByRole('button')).toHaveClass('h-10')
  })

  test('opens the calendar and keeps apply disabled until a complete range exists', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker confirmLabel="Confirm range" />)

    await user.click(screen.getByRole('button', { name: /pick a date range/i }))
    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Confirm range' })).toBeDisabled()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('formats a partial range and accepts a controlled value', () => {
    render(
      <DateRangePicker
        value={{ from: new Date(2026, 4, 5) }}
        dateFormat="yyyy-MM-dd"
        onChange={() => undefined}
      />
    )
    expect(screen.getByRole('button')).toHaveTextContent('2026-05-05')
  })
})
