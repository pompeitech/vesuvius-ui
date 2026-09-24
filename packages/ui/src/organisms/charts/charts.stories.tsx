import type { Meta, StoryObj } from '@storybook/react-vite'
import * as RechartsPrimitive from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../atoms/card/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  RadialProgressChart,
  SimpleAreaChart,
  SimpleBarChart,
  SimpleLineChart,
  SimplePieChart,
  type ChartConfig
} from './index'

const meta = {
  title: 'Organisms/Charts',
  tags: ['autodocs']
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const REVENUE_DATA = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2600 },
  { month: 'Mar', revenue: 5100, expenses: 3100 },
  { month: 'Apr', revenue: 4700, expenses: 2900 },
  { month: 'May', revenue: 6200, expenses: 3400 },
  { month: 'Jun', revenue: 7100, expenses: 3800 }
]

const CATEGORY_DATA = [
  { category: 'Electronics', value: 38 },
  { category: 'Clothing', value: 27 },
  { category: 'Home & Garden', value: 21 },
  { category: 'Sports', value: 14 }
]

export const Bar: Story = {
  render: () => (
    <div className="w-[36rem]">
      <SimpleBarChart data={REVENUE_DATA} index="month" categories={['revenue', 'expenses']} />
    </div>
  )
}

export const Line: Story = {
  render: () => (
    <div className="w-[36rem]">
      <SimpleLineChart data={REVENUE_DATA} index="month" categories={['revenue', 'expenses']} />
    </div>
  )
}

export const Area: Story = {
  render: () => (
    <div className="w-[36rem]">
      <SimpleAreaChart data={REVENUE_DATA} index="month" categories={['revenue']} />
    </div>
  )
}

export const StackedArea: Story = {
  name: 'Area (stacked)',
  render: () => (
    <div className="w-[36rem]">
      <SimpleAreaChart
        data={REVENUE_DATA}
        index="month"
        categories={['revenue', 'expenses']}
        stacked
      />
    </div>
  )
}

export const Pie: Story = {
  render: () => (
    <div className="w-96">
      <SimplePieChart data={CATEGORY_DATA} index="category" category="value" />
    </div>
  )
}

export const Donut: Story = {
  render: () => (
    <div className="w-96">
      <SimplePieChart data={CATEGORY_DATA} index="category" category="value" innerRadius="60%" />
    </div>
  )
}

export const RadialProgress: Story = {
  name: 'RadialProgressChart ("Project Health" widget)',
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Project Health</CardTitle>
      </CardHeader>
      <CardContent>
        <RadialProgressChart
          data={[
            { label: 'On Track', value: 2, color: 'var(--success)' },
            { label: 'At Risk', value: 1, color: 'var(--warning)' },
            { label: 'Blocked', value: 1, color: 'var(--destructive)' },
            { label: 'Dependency', value: 3, color: 'var(--muted-foreground)' }
          ]}
        />
      </CardContent>
    </Card>
  )
}

const advancedConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--chart-2)' }
} satisfies ChartConfig

export const AdvancedComposition: Story = {
  name: 'Low-level ChartContainer (custom composition)',
  render: () => (
    <div className="w-[36rem]">
      <ChartContainer config={advancedConfig} className="h-72">
        <RechartsPrimitive.ComposedChart data={REVENUE_DATA}>
          <RechartsPrimitive.CartesianGrid vertical={false} />
          <RechartsPrimitive.XAxis dataKey="month" tickLine={false} axisLine={false} />
          <RechartsPrimitive.YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <RechartsPrimitive.Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          <RechartsPrimitive.Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={false}
          />
        </RechartsPrimitive.ComposedChart>
      </ChartContainer>
    </div>
  )
}
