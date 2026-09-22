import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { ConfirmDialog } from '@ui/molecules/confirm-dialog'

describe('confirm dialog', () => {
  test('calls onConfirm after confirmation', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()

    render(
      <ConfirmDialog
        trigger="Delete project"
        title="Delete project?"
        description="This cannot be undone."
        onConfirm={onConfirm}
        destructive
      />
    )

    await user.click(screen.getByRole('button', { name: 'Delete project' }))
    expect(screen.getByRole('alertdialog')).toHaveTextContent('This cannot be undone.')
    await user.click(screen.getByRole('button', { name: 'Confirm' }))

    expect(onConfirm).toHaveBeenCalledOnce()
  })
})
