import { render, screen } from '@testing-library/react'
import { Button } from '@ui/atoms/button/button'
import { describe, expect, test } from 'vitest'

describe('Button', () => {
  test('supports disabled state and asChild links', () => {
    render(
      <>
        <Button disabled>Save</Button>
        <Button asChild variant="outline">
          <a href="/settings">Settings</a>
        </Button>
      </>
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('data-slot', 'button')
  })

  test('defaults to type="button" but honours an explicit type', () => {
    render(
      <>
        <Button>Plain</Button>
        <Button type="submit">Send</Button>
        <Button asChild>
          <a href="/x">Link</a>
        </Button>
      </>
    )
    expect(screen.getByRole('button', { name: 'Plain' })).toHaveAttribute('type', 'button')
    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('link', { name: 'Link' })).not.toHaveAttribute('type')
  })
})
