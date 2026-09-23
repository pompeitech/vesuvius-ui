import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid, GridItem } from './grid'

const meta = {
  title: 'Molecules/Grid',
  component: Grid,
  tags: ['autodocs']
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

function Cell({ children }: { children: number | string }) {
  return (
    <div className="bg-accent flex h-16 items-center justify-center rounded-md text-sm">
      {children}
    </div>
  )
}

export const Basic: Story = {
  render: () => (
    <Grid cols={4} gap={3} className="w-full max-w-2xl">
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  )
}

export const Responsive: Story = {
  name: 'Responsive columns (1 → 2 → 4)',
  render: () => (
    <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={{ base: 2, lg: 4 }} className="w-full max-w-2xl">
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  )
}

export const WithSpans: Story = {
  name: 'GridItem spans',
  render: () => (
    <Grid cols={4} gap={3} className="w-full max-w-2xl">
      <GridItem colSpan={4}>
        <Cell>full width</Cell>
      </GridItem>
      <GridItem colSpan={2}>
        <Cell>span 2</Cell>
      </GridItem>
      <GridItem colSpan={2}>
        <Cell>span 2</Cell>
      </GridItem>
      <Cell>1</Cell>
      <Cell>1</Cell>
      <Cell>1</Cell>
      <Cell>1</Cell>
    </Grid>
  )
}
