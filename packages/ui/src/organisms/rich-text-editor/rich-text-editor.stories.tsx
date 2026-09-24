import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { RichTextEditor } from './rich-text-editor'
import { RichTextViewer } from './rich-text-viewer'

const meta = {
  title: 'Organisms/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs']
} satisfies Meta<typeof RichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('<p>Start writing your <strong>release notes</strong>…</p>')
    return <RichTextEditor value={value} onChange={setValue} className="w-[32rem]" />
  }
}

export const Empty: Story = {
  render: () => <RichTextEditor placeholder="Write documentation…" className="w-[32rem]" />
}

export const ReadOnly: Story = {
  name: 'Read-only (Viewer)',
  render: () => (
    <RichTextViewer
      html="<h2>Release notes</h2><p>Everything is ready. See the <a href='#'>changelog</a> for details.</p><ul><li>Faster builds</li><li>Smaller bundle</li></ul>"
      className="w-[32rem]"
    />
  )
}
