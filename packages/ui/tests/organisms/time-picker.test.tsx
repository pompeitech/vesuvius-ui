import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TimePicker } from '@ui/organisms/time-picker/time-picker'
import { describe, expect, test, vi } from 'vitest'

describe('TimePicker', () => {
  test('supports twelve-hour mode, seconds and period changes', async () => {
    const user = userEvent.setup()
    render(
      <TimePicker
        date={new Date(2026, 0, 1, 9, 30, 20)}
        onChange={vi.fn()}
        hourFormat="12"
        showSeconds
      />
    )
    const period = screen.getByRole('textbox', { name: 'AM/PM' })
    expect(screen.getByRole('textbox', { name: 'Seconds' })).toBeVisible()
    await user.click(period)
    await user.keyboard('{ArrowUp}')
    expect(['AM', 'PM']).toContain(period.getAttribute('value'))
  })

  test('disables every segment', () => {
    const onChange = vi.fn()
    render(
      <TimePicker
        date={new Date(2026, 0, 1, 12, 30, 45)}
        onChange={onChange}
        disabled
        showSeconds
      />
    )
    expect(screen.getByRole('textbox', { name: 'Hours' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Minutes' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Seconds' })).toBeDisabled()
  })

  test('updates the time through numeric and arrow keyboard input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimePicker date={new Date(2026, 0, 1, 9, 30, 20)} onChange={onChange} showSeconds />)

    const hours = screen.getByRole('textbox', { name: 'Hours' })
    await user.click(hours)
    await user.keyboard('{ArrowUp}')
    await user.keyboard('4')
    await user.keyboard('5')
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls.some(([next]) => next instanceof Date)).toBe(true)
    expect(hours).toHaveValue('09')
  })

  test('supports 24-hour mode without a period segment', () => {
    render(<TimePicker date={new Date(2026, 0, 1, 23, 59)} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox', { name: 'Hours' })).toHaveValue('23')
    expect(screen.queryByRole('textbox', { name: 'AM/PM' })).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'Seconds' })).not.toBeInTheDocument()
  })
})
