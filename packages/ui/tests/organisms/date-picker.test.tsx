import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from '@ui/organisms/date-picker/date-picker'
import { describe, expect, test, vi } from 'vitest'

describe('DatePicker', () => {
  test('renders placeholder and disabled state', () => {
    render(<DatePicker placeholder="Choose a day" disabled />)
    expect(screen.getByRole('button', { name: /choose a day/i })).toBeDisabled()
  })

  test('formats a default date', () => {
    render(<DatePicker defaultValue={new Date(2026, 0, 15)} dateFormat="yyyy-MM-dd" />)
    expect(screen.getByRole('button')).toHaveTextContent('2026-01-15')
  })

  test('forwards size to its trigger, matching Input/Button at the same size', () => {
    render(<DatePicker size="sm" />)
    expect(screen.getByRole('button')).toHaveClass('h-8')
  })

  test('selects a day and closes the calendar', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: /pick a date/i }))
    const day = document.querySelector<HTMLButtonElement>('button[data-day]')
    expect(day).not.toBeNull()
    await user.click(day as HTMLButtonElement)
    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
  })
})
