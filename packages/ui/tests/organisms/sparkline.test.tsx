import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Sparkline } from '@ui/organisms/charts/sparkline'

describe('Sparkline', () => {
  test('renders a polyline scaled to the given size', () => {
    const { container } = render(<Sparkline data={[1, 5, 3, 8]} width={120} height={40} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 120 40')
    expect(container.querySelector('polyline')).toBeInTheDocument()
    expect(container.querySelector('polygon')).not.toBeInTheDocument()
  })

  test('renders a filled area when filled is set', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} filled />)
    expect(container.querySelector('polygon')).toBeInTheDocument()
  })

  test('renders nothing with fewer than two points', () => {
    const { container } = render(<Sparkline data={[1]} />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})
