import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@ui/molecules/dialog'

describe('dialog', () => {
  test('opens on trigger click and closes on close click', async () => {
    render(
      <Dialog>
        <DialogTrigger>Edit profile</DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
          <DialogClose>Cancel</DialogClose>
        </DialogContent>
      </Dialog>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }))
    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByText('Make changes to your profile here.')).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
