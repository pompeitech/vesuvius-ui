import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Wizard, type WizardStep } from '@ui/organisms/wizard/wizard'
import { describe, expect, test, vi } from 'vitest'

const STEPS: WizardStep[] = [
  { title: 'Account', content: <p>Account step</p> },
  { title: 'Payment', content: <p>Payment step</p> },
  { title: 'Review', content: <p>Review step</p> }
]

describe('Wizard', () => {
  test('renders the first step by default with Back disabled', () => {
    render(<Wizard steps={STEPS} />)
    expect(screen.getByText('Account step')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
  })

  test('advances to the next step and back again', async () => {
    const user = userEvent.setup()
    render(<Wizard steps={STEPS} />)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText('Payment step')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByText('Account step')).toBeVisible()
  })

  test('shows Finish on the last step and calls onFinish', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()
    render(<Wizard steps={STEPS} defaultActiveStep={2} onFinish={onFinish} />)
    const finish = screen.getByRole('button', { name: 'Finish' })
    expect(finish).toBeVisible()
    await user.click(finish)
    expect(onFinish).toHaveBeenCalledOnce()
  })

  test('blocks advancing past a step with a failing validate()', async () => {
    const user = userEvent.setup()
    const validate = vi.fn().mockReturnValue(false)
    render(<Wizard steps={[{ title: 'Gate', content: <p>Gate step</p>, validate }, ...STEPS]} />)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(validate).toHaveBeenCalledOnce()
    expect(screen.getByText('Gate step')).toBeVisible()
  })

  test('does not let a step click skip ahead past the furthest visited step', async () => {
    const user = userEvent.setup()
    render(<Wizard steps={STEPS} />)
    // The step's accessible name includes its numbered marker (e.g. "3
    // Review"), so match the end of it rather than the bare title.
    await user.click(screen.getByRole('tab', { name: /review$/i }))
    expect(screen.getByText('Account step')).toBeVisible()
  })

  test('lets a step click revisit an already-reached step', async () => {
    const user = userEvent.setup()
    render(<Wizard steps={STEPS} />)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.click(screen.getByRole('tab', { name: /account$/i }))
    expect(screen.getByText('Account step')).toBeVisible()
  })
})
