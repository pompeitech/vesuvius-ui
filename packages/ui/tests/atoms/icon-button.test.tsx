import { render, screen } from '@testing-library/react'
import { IconButton } from '@ui/atoms/icon-button/icon-button'
import { describe, expect, test } from 'vitest'

describe('IconButton', () => {
  test('defaults to a button element', () => {
    render(<IconButton aria-label="Open menu" />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('type', 'button')
  })
})
