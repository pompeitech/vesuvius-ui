import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@ui/molecules/alert-dialog'

describe('alert dialog', () => {
  test('confirms via the action button and cancels via the cancel button', () => {
    const onConfirm = vi.fn()

    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete project</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }))
    expect(screen.getByRole('alertdialog')).toHaveTextContent('This cannot be undone.')

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onConfirm).toHaveBeenCalledOnce()
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })
})
