import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { NotificationCenter } from '@ui/molecules/notification-center/notification-center'
import { describe, expect, test, vi } from 'vitest'
describe('NotificationCenter', () => {
  test('opens unread notifications and clears them', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(
      <NotificationCenter
        notifications={[{ id: '1', title: 'Build complete' }]}
        onClear={onClear}
      />
    )
    await user.click(screen.getByRole('button', { name: /notifications, 1 unread/i }))
    expect(screen.getByText('Build complete')).toBeVisible()
    await user.click(screen.getByRole('button', { name: /clear all/i }))
    expect(onClear).toHaveBeenCalledOnce()
  })
})
