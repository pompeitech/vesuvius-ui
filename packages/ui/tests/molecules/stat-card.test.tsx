import { render, screen } from '@testing-library/react'
import { DollarSignIcon } from 'lucide-react'
import { describe, expect, test } from 'vitest'
import { StatCard } from '@ui/molecules/stat-card'

describe('stat card', () => {
  test('renders value, label, icon and trend', () => {
    render(
      <StatCard label="Total Revenue" value="$45,231.89" icon={DollarSignIcon} changePct={12.4} />
    )
    expect(screen.getByText('Total Revenue')).toBeVisible()
    expect(screen.getByText('$45,231.89')).toBeVisible()
    expect(screen.getByText(/12\.4%/)).toBeVisible()
  })
})
