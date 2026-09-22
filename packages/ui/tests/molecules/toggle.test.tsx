import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Toggle } from '@ui/molecules/toggle'

describe('toggle', () => {
  test('renders an accessible toggle', () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'false')
  })
})
