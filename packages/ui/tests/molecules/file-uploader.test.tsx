import { fireEvent, render } from '@testing-library/react'
import { FileUploader } from '@ui/molecules/file-uploader/file-uploader'
import { describe, expect, test, vi } from 'vitest'

describe('FileUploader', () => {
  test('forwards selected files to onChange', () => {
    const onChange = vi.fn()
    const { container } = render(<FileUploader onChange={onChange} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['content'], 'notes.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(onChange).toHaveBeenCalledWith([file])
  })
})
