import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { describe, expect, test, vi } from 'vitest'
import { Button } from '@ui/atoms/button'
import { Input } from '@ui/atoms/input'
import {
  FieldNumberInput,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm
} from '@ui/molecules/form'

const schema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters.'),
  amount: z.string().min(1, 'Enter an amount.')
})

function TestForm({ onSubmit }: { onSubmit: (values: z.output<typeof schema>) => void }) {
  const form = useZodForm(schema, { defaultValues: { username: '', amount: '' } })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FieldNumberInput name="amount" label="Amount" description="Enter an amount in euros." />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

describe('form', () => {
  test('links labels and descriptions to their controls', () => {
    render(<TestForm onSubmit={vi.fn()} />)

    const username = screen.getByRole('textbox', { name: 'Username' })
    const amount = screen.getByRole('spinbutton', { name: 'Amount' })

    expect(username).toHaveAccessibleDescription('Your public display name.')
    expect(amount).toHaveAccessibleDescription('Enter an amount in euros.')
  })

  test('shows schema errors and submits valid values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<TestForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(await screen.findByText('Username must be at least 2 characters.')).toBeVisible()
    expect(screen.getByText('Enter an amount.')).toBeVisible()
    expect(onSubmit).not.toHaveBeenCalled()

    await user.type(screen.getByRole('textbox', { name: 'Username' }), 'Ada')
    await user.type(screen.getByRole('spinbutton', { name: 'Amount' }), '42')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalledWith({ username: 'Ada', amount: '42' }, expect.anything())
  })
})
