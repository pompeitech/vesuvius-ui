import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@ui/atoms/button'
import { Input } from '@ui/atoms/input'
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from '@ui/molecules/field'
import { type FormEvent, useState } from 'react'
import { describe, expect, test } from 'vitest'

function PlainForm() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string>()

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(username.length < 2 ? 'Username must be at least 2 characters.' : undefined)
  }

  return (
    <form onSubmit={onSubmit}>
      <Field required>
        <FieldLabel>Username</FieldLabel>
        <FieldControl>
          <Input value={username} onChange={event => setUsername(event.target.value)} />
        </FieldControl>
        <FieldDescription>Your public display name.</FieldDescription>
        <FieldError>{error}</FieldError>
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  )
}

describe('Field', () => {
  test('links label and description to the control', () => {
    render(<PlainForm />)

    const input = screen.getByRole('textbox', { name: /Username/ })
    expect(input).toHaveAccessibleDescription('Your public display name.')
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  test('marks the control invalid and announces the error only while one is rendered', async () => {
    const user = userEvent.setup()
    render(<PlainForm />)
    const input = screen.getByRole('textbox', { name: /Username/ })

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription(
      'Your public display name. Username must be at least 2 characters.'
    )

    await user.type(input, 'Ada')
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).toHaveAccessibleDescription('Your public display name.')
  })

  test('omits aria-describedby when there is nothing to describe', () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
      </Field>
    )
    expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute('aria-describedby')
  })

  test('explicit invalid prop wins over rendered error state', () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
      </Field>
    )
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true')
  })
})
