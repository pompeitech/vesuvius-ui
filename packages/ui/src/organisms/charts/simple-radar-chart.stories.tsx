import type { Meta, StoryObj } from '@storybook/react-vite'
import { SimpleRadarChart } from './simple-radar-chart'

const meta = {
  title: 'Organisms/Charts/SimpleRadarChart',
  component: SimpleRadarChart,
  tags: ['autodocs'],
  args: { data: [], categories: ['sales'], index: 'category' },
  parameters: { layout: 'padded' }
} satisfies Meta<typeof SimpleRadarChart>

export default meta
type Story = StoryObj<typeof meta>

const DATA = [
  { category: 'Electronics', sales: 86 },
  { category: 'Clothing', sales: 62 },
  { category: 'Home & Garden', sales: 48 },
  { category: 'Sports', sales: 34 },
  { category: 'Beauty', sales: 55 }
]

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <SimpleRadarChart data={DATA} index="category" categories={['sales']} showLegend={false} />
    </div>
  )
}
