import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { RadialProgressChart } from '@ui/organisms/charts/radial-progress-chart'

describe('RadialProgressChart', () => {
  const data = [
    { label: 'Done', value: 30 },
    { label: 'Remaining', value: 70 }
  ]

  test('renders an accessible ring with the resolved total and a legend row per datum', () => {
    render(<RadialProgressChart data={data} totalLabel="Tasks" />)
    expect(screen.getByRole('img', { name: 'Tasks: 100' })).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeVisible()
    expect(screen.getByText('Remaining')).toBeVisible()
  })

  test('uses an explicit total instead of summing the data', () => {
    render(<RadialProgressChart data={data} total={200} totalLabel="Tasks" />)
    expect(screen.getByRole('img', { name: 'Tasks: 200' })).toBeInTheDocument()
  })

  test('hides the legend when disabled', () => {
    render(<RadialProgressChart data={data} showLegend={false} />)
    expect(screen.queryByText('Done')).not.toBeInTheDocument()
  })
})
