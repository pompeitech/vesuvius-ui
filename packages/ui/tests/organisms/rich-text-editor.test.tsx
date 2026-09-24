import { fireEvent, render, screen } from '@testing-library/react'
import { RichTextEditor } from '@ui/organisms/rich-text-editor/rich-text-editor'
import { RichTextViewer } from '@ui/organisms/rich-text-editor/rich-text-viewer'
import { describe, expect, test, vi } from 'vitest'

describe('RichTextEditor', () => {
  test('exposes formatting controls and emits content updates', () => {
    const onChange = vi.fn()
    const { container } = render(<RichTextEditor value="<p>Hello</p>" onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'Bold' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Italic' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Quote' })).toBeVisible()

    const editor = container.querySelector('[contenteditable="true"]') as HTMLElement
    fireEvent.input(editor, { target: { innerHTML: '<p>Updated</p>' } })
    expect(editor).toHaveTextContent('Updated')
  })

  test('renders placeholder content when empty', () => {
    const { container } = render(<RichTextEditor placeholder="Write documentation" />)
    expect(container.querySelector('[data-placeholder="Write documentation"]')).toBeInTheDocument()
  })

  test('hides the toolbar and disables editing when not editable', () => {
    const { container } = render(<RichTextEditor value="<p>Read only</p>" editable={false} />)
    expect(screen.queryByRole('button', { name: 'Bold' })).not.toBeInTheDocument()
    expect(container.querySelector('[contenteditable="false"]')).toBeInTheDocument()
  })
})

describe('RichTextViewer', () => {
  test('renders saved markup', () => {
    render(<RichTextViewer html="<h2>Release notes</h2><p>Everything is ready.</p>" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Release notes' })).toBeVisible()
    expect(screen.getByText('Everything is ready.')).toBeVisible()
  })
})
