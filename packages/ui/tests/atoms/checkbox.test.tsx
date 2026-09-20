import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '@ui/atoms/checkbox/checkbox'
import { describe, expect, test } from 'vitest'

describe('Checkbox', () => {
  test('toggles and exposes checked state', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accept terms" />)
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })
})
