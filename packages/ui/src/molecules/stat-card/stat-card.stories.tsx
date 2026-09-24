import type { Meta, StoryObj } from '@storybook/react-vite'
import { CreditCardIcon, DollarSignIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'
import { Sparkline } from '../../organisms/charts/sparkline'
import { StatCard } from './stat-card'

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Revenue', value: '$45,231' },
  parameters: { layout: 'padded' }
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,231.89',
    icon: DollarSignIcon,
    changePct: 12.4
  }
}

export const NegativeTrend: Story = {
  args: {
    label: 'Avg. Order Value',
    value: '$68.20',
    icon: CreditCardIcon,
    changePct: -1.8
  }
}

export const WithSparkline: Story = {
  args: {
    label: 'Average Sales',
    value: '837',
    changePct: 1.3,
    changeLabel: 'vs last month',
    trend: <Sparkline data={[18, 21, 14, 7, 11, 16, 17, 10]} filled />
  }
}

export const Grid: Story = {
  name: 'Dashboard grid (4 KPIs)',
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Revenue" value="$45,231.89" icon={DollarSignIcon} changePct={12.4} />
      <StatCard label="Orders" value="1,204" icon={ShoppingCartIcon} changePct={8.1} />
      <StatCard label="Customers" value="892" icon={UsersIcon} changePct={4.6} />
      <StatCard label="Avg. Order Value" value="$68.20" icon={CreditCardIcon} changePct={-1.8} />
    </div>
  )
}
