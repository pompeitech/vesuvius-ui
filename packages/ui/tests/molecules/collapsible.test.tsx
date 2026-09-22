import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/molecules/collapsible'

describe('collapsible', () => {
  test('toggles content', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>More</CollapsibleTrigger>
        <CollapsibleContent>Details</CollapsibleContent>
      </Collapsible>
    )
    const trigger = screen.getByRole('button', { name: 'More' })
    expect(trigger).toHaveAttribute('data-state', 'closed')
    fireEvent.click(trigger)
    expect(screen.getByText('Details')).toBeVisible()
  })
})
