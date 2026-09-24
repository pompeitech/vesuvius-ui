import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { HeatmapGrid } from '@ui/organisms/charts/heatmap-grid'

describe('HeatmapGrid', () => {
  test('renders row and column labels', () => {
    render(
      <HeatmapGrid
        rows={['Mon', 'Tue']}
        columns={['9am', '10am']}
        cells={[
          [0.2, 0.5],
          [0.8, 0.1]
        ]}
      />
    )
    expect(screen.getByText('Mon')).toBeVisible()
    expect(screen.getByText('Tue')).toBeVisible()
    expect(screen.getByText('9am')).toBeVisible()
    expect(screen.getByText('10am')).toBeVisible()
  })

  test('renders a legend when provided', () => {
    render(
      <HeatmapGrid
        rows={['Mon']}
        columns={['9am']}
        cells={[[0.5]]}
        legend={[{ label: 'Low', value: 0.1 }]}
      />
    )
    expect(screen.getByText('Low')).toBeVisible()
  })
})
