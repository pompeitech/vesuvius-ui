import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateTimePicker } from '@ui/organisms/date-time-picker/date-time-picker'
import { describe, expect, test, vi } from 'vitest'

describe('DateTimePicker', () => {
  test('renders a label and placeholder when empty', () => {
    render(<DateTimePicker label="Meeting time" placeholder="Pick a date and time" />)
    expect(screen.getByText('Meeting time')).toBeVisible()
    expect(screen.getByRole('button', { name: /pick a date and time/i })).toBeVisible()
  })

  test('formats a default value in 12-hour format', () => {
    render(<DateTimePicker defaultValue={new Date(2026, 8, 12, 17, 20)} />)
    expect(screen.getByRole('button')).toHaveTextContent('05:20 PM')
  })

  test('disables the trigger', () => {
    render(<DateTimePicker disabled defaultValue={new Date(2026, 8, 12, 17, 20)} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('opens the popover with a calendar and hour/minute columns', async () => {
    const user = userEvent.setup()
    render(<DateTimePicker defaultValue={new Date(2026, 8, 12, 17, 20)} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('grid')).toBeVisible()
    expect(screen.getByRole('listbox', { name: 'Hours' })).toBeVisible()
    expect(screen.getByRole('listbox', { name: 'Minutes' })).toBeVisible()
    expect(screen.getByRole('listbox', { name: 'AM/PM' })).toBeVisible()
    expect(screen.queryByRole('listbox', { name: 'Seconds' })).not.toBeInTheDocument()
  })

  test('shows a seconds column when enabled', async () => {
    const user = userEvent.setup()
    render(<DateTimePicker showSeconds defaultValue={new Date(2026, 8, 12, 17, 20, 45)} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox', { name: 'Seconds' })).toBeVisible()
  })

  test('commits the draft only after OK, not Cancel', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DateTimePicker defaultValue={new Date(2026, 8, 12, 17, 20)} onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button', { name: 'OK' }))
    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
  })
})
