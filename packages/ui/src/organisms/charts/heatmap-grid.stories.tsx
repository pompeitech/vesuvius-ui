import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeatmapGrid } from './heatmap-grid'

const meta = {
  title: 'Organisms/Charts/HeatmapGrid',
  component: HeatmapGrid,
  tags: ['autodocs'],
  args: { rows: [], columns: [], cells: [] },
  parameters: { layout: 'padded' }
} satisfies Meta<typeof HeatmapGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <HeatmapGrid
        rows={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        columns={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
        cells={[
          [0.3, 0.6, 0.4, 0.8],
          [0.5, 0.7, 0.6, 0.9],
          [0.6, 0.5, 0.7, 0.6],
          [0.2, 0.4, 0.3, 0.5],
          [0.9, 1, 0.8, 0.95],
          [0.4, 0.3, 0.5, 0.4],
          [0.1, 0.2, 0.15, 0.25]
        ]}
        legend={[
          { label: 'Low', value: 0.2 },
          { label: 'Medium', value: 0.55 },
          { label: 'High', value: 0.95 }
        ]}
      />
    </div>
  )
}
