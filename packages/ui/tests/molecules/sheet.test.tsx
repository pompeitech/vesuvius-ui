import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@ui/molecules/sheet'

describe('sheet', () => {
  test('opens content', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>Edit profile</SheetDescription>
        </SheetContent>
      </Sheet>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByText('Profile')).toBeVisible()
  })
})
