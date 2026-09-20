import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '@ui/atoms/textarea/textarea'
import { describe, expect, test } from 'vitest'

describe('Textarea', () => {
  test('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Textarea aria-label="Bio" />)
    await user.type(screen.getByRole('textbox', { name: 'Bio' }), 'Hello')
    expect(screen.getByRole('textbox', { name: 'Bio' })).toHaveValue('Hello')
  })
})
