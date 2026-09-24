import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import {
  SimpleAreaChart,
  SimpleBarChart,
  SimpleLineChart,
  SimplePieChart
} from '@ui/organisms/charts/simple-charts'
import { mockChartLegendHeight } from './chart-test-utils'

beforeEach(() => {
  mockChartLegendHeight()
})

const DATA = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 }
]

describe('SimpleBarChart', () => {
  test('renders a bar per category with a legend', () => {
    const { container } = render(
      <SimpleBarChart data={DATA} categories={['desktop', 'mobile']} index="month" />
    )
    expect(container.querySelectorAll('.recharts-bar')).toHaveLength(2)
    expect(screen.getByText('desktop')).toBeVisible()
    expect(screen.getByText('mobile')).toBeVisible()
  })

  test('hides the legend and axes when disabled', () => {
    const { container } = render(
      <SimpleBarChart
        data={DATA}
        categories={['desktop']}
        index="month"
        showLegend={false}
        showXAxis={false}
        showYAxis={false}
      />
    )
    expect(screen.queryByText('desktop')).not.toBeInTheDocument()
    expect(container.querySelector('.recharts-xAxis')).not.toBeInTheDocument()
    expect(container.querySelector('.recharts-yAxis')).not.toBeInTheDocument()
  })
})

describe('SimpleLineChart', () => {
  test('renders a line per category', () => {
    const { container } = render(
      <SimpleLineChart data={DATA} categories={['desktop', 'mobile']} index="month" />
    )
    expect(container.querySelectorAll('.recharts-line')).toHaveLength(2)
  })
})

describe('SimpleAreaChart', () => {
  test('renders an area per category', () => {
    const { container } = render(
      <SimpleAreaChart data={DATA} categories={['desktop', 'mobile']} index="month" />
    )
    expect(container.querySelectorAll('.recharts-area')).toHaveLength(2)
  })
})

describe('SimplePieChart', () => {
  test('renders one slice per datum with a legend entry each', async () => {
    const pieData = [
      { channel: 'Online', value: 400 },
      { channel: 'Retail', value: 300 }
    ]
    render(<SimplePieChart data={pieData} category="value" index="channel" />)
    // Pie's legend payload registers with Recharts' internal store a tick
    // after mount, unlike Bar/Line/Area which compute theirs synchronously.
    await waitFor(() => expect(screen.getByText('Online')).toBeVisible())
    expect(screen.getByText('Retail')).toBeVisible()
  })
})
