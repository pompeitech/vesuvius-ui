import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Toggle } from '@ui/molecules/toggle'

describe('toggle', () => {
  test('renders an accessible toggle', () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'false')
  })

  test('defaults to size "default" and matches Button/Input heights at every size', () => {
    render(<Toggle aria-label="Default">B</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Default' })
    expect(toggle).toHaveAttribute('data-size', 'default')
    expect(toggle).toHaveClass('h-9')

    render(
      <Toggle aria-label="Extra small" size="xs">
        B
      </Toggle>
    )
    expect(screen.getByRole('button', { name: 'Extra small' })).toHaveClass('h-7')
    render(
      <Toggle aria-label="Small" size="sm">
        B
      </Toggle>
    )
    expect(screen.getByRole('button', { name: 'Small' })).toHaveClass('h-8')
    render(
      <Toggle aria-label="Large" size="lg">
        B
      </Toggle>
    )
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('h-10')
  })
})
