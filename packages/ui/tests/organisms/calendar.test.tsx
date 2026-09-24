import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calendar } from '@ui/organisms/calendar/calendar'
import { describe, expect, test, vi } from 'vitest'

describe('Calendar', () => {
  test('renders a grid of selectable days', () => {
    // defaultMonth pins the visible month — without it, react-day-picker
    // shows the current month regardless of `selected`, so a `selected`
    // date outside it would never render (and never look selected).
    render(
      <Calendar
        mode="single"
        selected={new Date(2026, 0, 15)}
        defaultMonth={new Date(2026, 0, 1)}
      />
    )
    expect(screen.getByRole('grid')).toBeVisible()
    expect(document.querySelector('button[data-day][data-selected="true"]')).not.toBeNull()
  })

  test('calls onSelect with the clicked day', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Calendar mode="single" selected={undefined} onSelect={onSelect} />)
    const day = document.querySelector<HTMLButtonElement>(
      'button[data-day]:not([disabled])'
    )
    expect(day).not.toBeNull()
    await user.click(day as HTMLButtonElement)
    expect(onSelect).toHaveBeenCalledWith(
      expect.any(Date),
      expect.any(Date),
      expect.anything(),
      expect.anything()
    )
  })

  test('marks range start/end days in range mode', () => {
    render(
      <Calendar
        mode="range"
        selected={{ from: new Date(2026, 0, 10), to: new Date(2026, 0, 12) }}
        defaultMonth={new Date(2026, 0, 1)}
      />
    )
    expect(document.querySelector('button[data-range-start="true"]')).not.toBeNull()
    expect(document.querySelector('button[data-range-end="true"]')).not.toBeNull()
  })
})
