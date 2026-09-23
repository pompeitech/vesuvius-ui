import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { CopyButton } from '@ui/molecules/copy-button/copy-button'
import { describe, expect, test, vi } from 'vitest'
describe('CopyButton', () => {
  test('copies its value', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({ writeText } as unknown as Clipboard)
    render(<CopyButton value="hello" />)
    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(writeText).toHaveBeenCalledWith('hello')
  })
})
