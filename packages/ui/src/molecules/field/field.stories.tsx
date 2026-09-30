import type { Meta, StoryObj } from '@storybook/react-vite'
import { type FormEvent, useState } from 'react'
import { Button } from '../../atoms/button/button'
import { Input } from '../../atoms/input/input'
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from './field'

const meta = {
  title: 'Molecules/Field',
  component: Field,
  tags: ['autodocs']
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-80">
      <FieldLabel>Email</FieldLabel>
      <FieldControl>
        <Input type="email" placeholder="you@example.com" />
      </FieldControl>
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  )
}

export const Invalid: Story = {
  render: () => (
    <Field required className="w-80">
      <FieldLabel>Username</FieldLabel>
      <FieldControl>
        <Input defaultValue="a" />
      </FieldControl>
      <FieldDescription>Your public display name.</FieldDescription>
      <FieldError>Username must be at least 2 characters.</FieldError>
    </Field>
  )
}

function ValidatedForm() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string>()

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(username.length < 2 ? 'Username must be at least 2 characters.' : undefined)
  }

  return (
    <form onSubmit={onSubmit} className="flex w-80 flex-col gap-4">
      <Field required>
        <FieldLabel>Username</FieldLabel>
        <FieldControl>
          <Input value={username} onChange={event => setUsername(event.target.value)} />
        </FieldControl>
        <FieldDescription>Your public display name.</FieldDescription>
        <FieldError>{error}</FieldError>
      </Field>
      <Button type="submit" className="self-start">
        Submit
      </Button>
    </form>
  )
}

export const WithValidation: Story = {
  render: () => <ValidatedForm />
}
