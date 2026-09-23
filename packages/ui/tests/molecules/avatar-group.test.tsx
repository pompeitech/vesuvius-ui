import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AvatarGroup } from '@ui/molecules/avatar-group/avatar-group'
import { UserAvatar } from '@ui/molecules/user-avatar/user-avatar'
import { describe, expect, test } from 'vitest'

describe('AvatarGroup', () => {
  test('limits visible avatars and expands spacing on hover', async () => {
    const user = userEvent.setup()
    render(
      <AvatarGroup max={2} spacing={-8} expandedSpacing={6}>
        <UserAvatar name="Ada Lovelace" />
        <UserAvatar name="Grace Hopper" />
        <UserAvatar name="Alan Turing" />
      </AvatarGroup>
    )
    const group = document.querySelector('[data-slot="avatar-group"]') as HTMLElement
    expect(group).toHaveTextContent('+1')
    const wrappers = group.querySelectorAll(':scope > div')
    expect(wrappers).toHaveLength(3)
    expect(wrappers[1]).toHaveStyle({ marginLeft: '-8px' })
    await user.hover(group)
    expect(wrappers[1]).toHaveStyle({ marginLeft: '6px' })
  })
})
