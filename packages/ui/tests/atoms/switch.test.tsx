import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '@ui/atoms/switch/switch'
import { describe, expect, test } from 'vitest'

describe('Switch', () => {
  test('toggles', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Notifications" />)
    const toggle = screen.getByRole('switch', { name: 'Notifications' })
    await user.click(toggle)
    expect(toggle).toBeChecked()
  })
})
