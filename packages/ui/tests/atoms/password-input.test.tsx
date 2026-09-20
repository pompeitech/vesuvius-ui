import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordInput } from '@ui/atoms/password-input/password-input'
import { describe, expect, test } from 'vitest'

describe('PasswordInput', () => {
  test('toggles visibility', async () => {
    const user = userEvent.setup()
    render(<PasswordInput aria-label="Password" defaultValue="secret" />)
    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: 'Show password' }))
    expect(input).toHaveAttribute('type', 'text')
  })
})
