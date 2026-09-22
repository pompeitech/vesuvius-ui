import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { Button } from '@ui/atoms/button'
import { Toaster, toast } from '@ui/molecules/toast'
import { ThemeProvider } from '@ui/theme/theme-provider'

describe('toast', () => {
  test('shows a notification', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Button onClick={() => toast.success('Saved')}>Save</Button>
        <Toaster />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(await screen.findByText('Saved')).toBeVisible()
  })
})
