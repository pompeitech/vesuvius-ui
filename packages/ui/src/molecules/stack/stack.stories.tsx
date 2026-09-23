import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { Stack } from './stack'

const meta = {
  title: 'Molecules/Stack',
  component: Stack,
  tags: ['autodocs']
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

function Box({ children }: { children: ReactNode }) {
  return (
    <div className="bg-accent flex size-16 items-center justify-center rounded-md text-sm">
      {children}
    </div>
  )
}

export const Column: Story = {
  render: () => (
    <Stack gap={3}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  )
}

export const Row: Story = {
  render: () => (
    <Stack direction="row" gap={3} align="center">
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  )
}

export const ResponsiveDirection: Story = {
  name: 'Responsive (column on mobile, row on md+)',
  render: () => (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 6 }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  )
}

export const SpaceBetween: Story = {
  render: () => (
    <Stack direction="row" justify="between" className="w-96">
      <Box>1</Box>
      <Box>2</Box>
    </Stack>
  )
}
