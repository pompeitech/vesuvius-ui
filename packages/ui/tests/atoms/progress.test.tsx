import { render, screen } from '@testing-library/react'
import { Progress } from '@ui/atoms/progress/progress'
import { describe, expect, test } from 'vitest'

describe('Progress', () => {
  test('exposes current value', () => {
    render(<Progress value={65} aria-label="Upload progress" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '65')
  })
})
