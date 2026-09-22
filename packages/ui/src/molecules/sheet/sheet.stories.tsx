import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../atoms/button/button'
import { Input } from '../../atoms/input/input'
import { Label } from '../../atoms/label/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './sheet'

const meta = {
  title: 'Molecules/Sheet',
  component: Sheet,
  tags: ['autodocs']
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="grid gap-1.5">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Pedro Duarte" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Slides in from the left edge.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
