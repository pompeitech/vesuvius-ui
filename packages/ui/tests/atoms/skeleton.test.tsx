import { render, screen } from '@testing-library/react'
import { Skeleton } from '@ui/atoms/skeleton/skeleton'
import { describe, expect, test } from 'vitest'

describe('Skeleton', () => {
  test('exposes its loading slot', () => {
    render(<Skeleton data-testid="loading" />)
    expect(screen.getByTestId('loading')).toHaveAttribute('data-slot', 'skeleton')
  })
})
