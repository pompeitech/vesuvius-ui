import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import { SimpleRadarChart } from '@ui/organisms/charts/simple-radar-chart'
import { mockChartLegendHeight } from './chart-test-utils'

beforeEach(() => {
  mockChartLegendHeight()
})

describe('SimpleRadarChart', () => {
  const data = [
    { skill: 'Speed', teamA: 80, teamB: 60 },
    { skill: 'Power', teamA: 70, teamB: 90 }
  ]

  test('renders one radar shape per category with a legend', () => {
    const { container } = render(
      <SimpleRadarChart data={data} categories={['teamA', 'teamB']} index="skill" />
    )
    expect(container.querySelectorAll('.recharts-radar')).toHaveLength(2)
    expect(screen.getByText('teamA')).toBeVisible()
    expect(screen.getByText('teamB')).toBeVisible()
  })

  test('hides the legend when disabled', () => {
    render(
      <SimpleRadarChart
        data={data}
        categories={['teamA']}
        index="skill"
        showLegend={false}
      />
    )
    expect(screen.queryByText('teamA')).not.toBeInTheDocument()
  })
})
