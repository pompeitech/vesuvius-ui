import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../atoms/button/button'
import { Input } from '../../atoms/input/input'
import { Label } from '../../atoms/label/label'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog'

const meta = {
  title: 'Molecules/Dialog',
  component: Dialog,
  tags: ['autodocs']
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
