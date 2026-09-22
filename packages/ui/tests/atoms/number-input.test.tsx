import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInput } from '@ui/atoms/number-input/number-input'
import type { ControlSize } from '@ui/lib/control-size'
import { describe, expect, test } from 'vitest'

describe('NumberInput', () => {
  test('supports custom steps in both directions', async () => {
    const user = userEvent.setup()
    render(<NumberInput aria-label="Quantity" defaultValue={10} step={5} />)
    await user.click(screen.getByRole('button', { name: 'Increase value' }))
    expect(screen.getByRole('spinbutton')).toHaveValue(15)
    await user.click(screen.getByRole('button', { name: 'Decrease value' }))
    expect(screen.getByRole('spinbutton')).toHaveValue(10)
  })

  test('defaults to size "default" and matches Input/Button heights at every size', () => {
    const { container } = render(<NumberInput aria-label="Quantity" />)
    const wrapper = container.querySelector('[data-slot="number-input"]')
    expect(wrapper).toHaveAttribute('data-size', 'default')
    expect(wrapper).toHaveClass('h-9')

    const sizes: Array<[ControlSize, string]> = [
      ['xs', 'h-7'],
      ['sm', 'h-8'],
      ['lg', 'h-10']
    ]
    for (const [size, heightClass] of sizes) {
      const { container: sized } = render(
        <NumberInput aria-label={`Quantity ${size}`} size={size} />
      )
      expect(sized.querySelector('[data-slot="number-input"]')).toHaveClass(heightClass)
    }
  })
})
