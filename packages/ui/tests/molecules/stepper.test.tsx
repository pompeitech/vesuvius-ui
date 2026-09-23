import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Stepper } from '@ui/molecules/stepper/stepper'
import { describe, expect, test, vi } from 'vitest'

describe('Stepper', () => {
  test('supports clickable horizontal and vertical layouts', async () => {
    const onStepClick = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <Stepper
        steps={[{ title: 'Account' }, { title: 'Profile' }, { title: 'Payment', status: 'error' }]}
        activeStep={1}
        onStepClick={onStepClick}
      />
    )
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal')
    await user.click(screen.getByRole('tab', { name: /account/i }))
    expect(onStepClick).toHaveBeenCalledWith(0)
    rerender(
      <Stepper
        steps={[{ title: 'Account' }, { title: 'Profile' }]}
        activeStep={0}
        orientation="vertical"
      />
    )
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical')
  })
})
