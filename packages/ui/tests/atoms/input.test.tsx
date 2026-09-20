import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@ui/atoms/input/input'
import { Label } from '@ui/atoms/label/label'
import { describe, expect, test } from 'vitest'

describe('Input', () => {
  test('works with a label and preserves size', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" size="lg" />
      </>
    )
    const input = screen.getByLabelText('Name')
    await user.type(input, 'Pompei')
    expect(input).toHaveValue('Pompei')
    expect(input).toHaveAttribute('data-size', 'lg')
  })
})
