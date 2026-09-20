import { render, screen } from '@testing-library/react'
import { Separator } from '@ui/atoms/separator/separator'
import { describe, expect, test } from 'vitest'

describe('Separator', () => {
  test('supports vertical orientation', () => {
    render(<Separator orientation="vertical" decorative={false} />)
    expect(screen.getByRole('separator')).toHaveAttribute('data-orientation', 'vertical')
  })
})
