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
})
