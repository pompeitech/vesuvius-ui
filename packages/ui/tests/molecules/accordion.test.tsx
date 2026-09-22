import { fireEvent, render, screen } from '@testing-library/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@ui/molecules/accordion'
import { describe, expect, test } from 'vitest'

describe('accordion', () => {
  test('opens and closes an item', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: 'Is it accessible?' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Yes')).toBeVisible()
  })
})
