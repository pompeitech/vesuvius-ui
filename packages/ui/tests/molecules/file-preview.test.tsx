import { render, screen } from '@testing-library/react'
import { FilePreview } from '@ui/molecules/file-preview/file-preview'
import { beforeEach, describe, expect, test, vi } from 'vitest'

beforeEach(() => {
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:preview')
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
})
describe('FilePreview', () => {
  test('renders file metadata and removal action', () => {
    const onRemove = () => undefined
    render(
      <FilePreview
        file={new File(['x'], 'readme.txt', { type: 'text/plain' })}
        onRemove={onRemove}
      />
    )
    expect(screen.getByText('readme.txt')).toBeVisible()
    expect(screen.getByRole('button', { name: /remove readme/i })).toBeVisible()
  })

  test('renders image previews and PDF metadata', () => {
    const { rerender } = render(
      <FilePreview file={new File(['image'], 'cover.png', { type: 'image/png' })} />
    )
    expect(screen.getByRole('img', { name: 'cover.png' })).toHaveAttribute('src', 'blob:preview')
    rerender(<FilePreview file={new File(['pdf'], 'manual.pdf', { type: 'application/pdf' })} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('manual.pdf')).toBeVisible()
  })
})
