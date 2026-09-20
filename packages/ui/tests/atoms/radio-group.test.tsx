import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, RadioGroupItem } from '@ui/atoms/radio-group/radio-group'
import { describe, expect, test } from 'vitest'

describe('RadioGroup', () => {
  test('selects one option at a time', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup aria-label="Plan" defaultValue="pro">
        <RadioGroupItem value="free" aria-label="Free" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>
    )
    await user.click(screen.getByRole('radio', { name: 'Free' }))
    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Pro' })).not.toBeChecked()
  })
})
