import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInput } from '@ui/atoms/number-input/number-input'
import { describe, expect, test } from 'vitest'

describe('NumberInput', () => {
  test('supports custom steps in both directions', async () => {
    const user = userEvent.setup()
    render(<NumberInput aria-label="Quantity" defaultValue={10} step={5} />)
    await user.click(screen.getByRole('button', { name: 'Increase value' }))
    expect(screen.getByRole('spinbutton')).toHaveValue(15)
    await user.click(screen.getByRole('button', { name: 'Decrease value' }))
    expect(screen.getByRole('spinbutton')).toHaveValue(10)
  })
})
