import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { Button } from '@ui/atoms/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/molecules/tooltip'

describe('tooltip', () => {
  test('shows content on hover', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Help</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    await user.hover(screen.getByRole('button', { name: 'Help' }))
    expect(await screen.findByText('Helpful text')).toBeVisible()
  })
})
