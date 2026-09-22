import { render, screen } from '@testing-library/react'
import { IconButton } from '@ui/atoms/icon-button/icon-button'
import { describe, expect, test } from 'vitest'

describe('IconButton', () => {
  test('defaults to a button element', () => {
    render(<IconButton aria-label="Open menu" />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('type', 'button')
  })

  test('defaults to size "default" and exposes every control size', () => {
    render(<IconButton aria-label="Default" />)
    const button = screen.getByRole('button', { name: 'Default' })
    expect(button).toHaveAttribute('data-size', 'default')
    expect(button).toHaveClass('size-9')

    render(<IconButton aria-label="Extra small" size="xs" />)
    expect(screen.getByRole('button', { name: 'Extra small' })).toHaveClass('size-7')
    render(<IconButton aria-label="Small" size="sm" />)
    expect(screen.getByRole('button', { name: 'Small' })).toHaveClass('size-8')
    render(<IconButton aria-label="Large" size="lg" />)
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('size-10')
  })
})
