import type { Meta, StoryObj } from '@storybook/react-vite'
import { DollarSignIcon } from 'lucide-react'
import { SimpleBarChart } from '../../organisms/charts/simple-charts'
import { ChartCard } from './chart-card'

const meta = {
  title: 'Molecules/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  args: { label: 'Total Revenue', value: '$276,000.00', children: null },
  parameters: { layout: 'padded' }
} satisfies Meta<typeof ChartCard>

export default meta
type Story = StoryObj<typeof meta>

const REVENUE_DATA = [
  { month: 'Jan', thisYear: 41000, prevYear: 35000 },
  { month: 'Feb', thisYear: 36000, prevYear: 45000 },
  { month: 'Mar', thisYear: 52000, prevYear: 41000 },
  { month: 'Apr', thisYear: 45000, prevYear: 48000 },
  { month: 'May', thisYear: 58000, prevYear: 44000 },
  { month: 'Jun', thisYear: 41000, prevYear: 53000 }
]

export const Default: Story = {
  render: () => (
    <div className="w-[36rem]">
      <ChartCard
        icon={DollarSignIcon}
        label="Total Revenue"
        value="$276,000.00"
        changePct={12}
        changeLabel="vs last month"
        caption="Total Revenue (Last 6 Months)"
      >
        <SimpleBarChart
          data={REVENUE_DATA}
          index="month"
          categories={['thisYear', 'prevYear']}
          colors={['var(--chart-1)', 'var(--muted-foreground)']}
          className="h-64"
        />
      </ChartCard>
    </div>
  )
}
