import { render, screen } from '@testing-library/react'
import { Slider } from '@ui/atoms/slider/slider'
import { describe, expect, test } from 'vitest'

describe('Slider', () => {
  test('labels every thumb', () => {
    render(<Slider aria-label="Price" defaultValue={[20, 80]} />)
    expect(screen.getByRole('slider', { name: 'Price 1' })).toBeVisible()
    expect(screen.getByRole('slider', { name: 'Price 2' })).toBeVisible()
  })
})
