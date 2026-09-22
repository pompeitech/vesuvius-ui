import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilePreview } from './file-preview'

const meta = {
  title: 'Molecules/FilePreview',
  component: FilePreview,
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
} satisfies Meta<typeof FilePreview>

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  render: () => (
    <div className="w-80">
      <FilePreview
        file={new File(['cover'], 'cover.png', { type: 'image/png' })}
        onRemove={() => undefined}
      />
    </div>
  )
}

export const Pdf: Story = {
  render: () => (
    <div className="w-80">
      <FilePreview
        file={new File(['manual'], 'manual.pdf', { type: 'application/pdf' })}
        onRemove={() => undefined}
      />
    </div>
  )
}

export const GenericFile: Story = {
  render: () => (
    <div className="w-80">
      <FilePreview file={new File(['readme'], 'readme.txt', { type: 'text/plain' })} />
    </div>
  )
}
