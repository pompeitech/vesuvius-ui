import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@ui/molecules/dropdown-menu'

describe('dropdown menu', () => {
  test('opens from its trigger and exposes item variants and submenus', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Reload</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>Show panel</DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value="one">
            <DropdownMenuRadioItem value="one">One</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Nested action</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByRole('button', { name: 'Open actions' }))
    expect(await screen.findByText('Actions')).toBeVisible()
    expect(screen.getByRole('menuitemcheckbox', { name: 'Show panel' })).toHaveAttribute(
      'data-state',
      'checked'
    )
    expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveAttribute(
      'data-state',
      'checked'
    )

    await user.hover(screen.getByRole('menuitem', { name: 'More' }))
    expect(await screen.findByRole('menuitem', { name: 'Nested action' })).toBeVisible()
  })
})
