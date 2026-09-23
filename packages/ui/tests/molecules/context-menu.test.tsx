import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@ui/molecules/context-menu/context-menu'
import { describe, expect, test } from 'vitest'

describe('ContextMenu', () => {
  test('exposes item variants, stateful items and submenu actions', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu>
        <ContextMenuTrigger>Open actions</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Reload<ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuCheckboxItem checked>Show panel</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value="one">
            <ContextMenuRadioItem value="one">One</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Nested action</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText('Open actions'))
    expect(await screen.findByText('Actions')).toBeVisible()
    expect(screen.getByRole('menuitemcheckbox', { name: 'Show panel' })).toHaveAttribute(
      'data-state',
      'checked'
    )
    await user.hover(screen.getByRole('menuitem', { name: 'More' }))
    expect(await screen.findByRole('menuitem', { name: 'Nested action' })).toBeVisible()
  })
})
