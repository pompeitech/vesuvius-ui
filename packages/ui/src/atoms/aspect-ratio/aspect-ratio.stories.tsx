import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from './aspect-ratio'

const meta = {
  title: 'Atoms/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs']
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted text-muted-foreground flex items-center justify-center rounded-md text-sm"
      >
        16:9
      </AspectRatio>
    </div>
  )
}

export const Square: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio
        ratio={1}
        className="bg-muted text-muted-foreground flex items-center justify-center rounded-md text-sm"
      >
        1:1
      </AspectRatio>
    </div>
  )
}
