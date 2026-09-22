import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileUploader } from './file-uploader'

const meta = {
  title: 'Molecules/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <FileUploader />
    </div>
  )
}

export const Multiple: Story = {
  render: () => (
    <div className="w-96">
      <FileUploader multiple accept="image/*" />
    </div>
  )
}
