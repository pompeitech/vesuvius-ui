import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../atoms/button/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

const meta = {
  title: 'Molecules/Collapsible',
  component: Collapsible,
  tags: ['autodocs']
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72 space-y-2">
        <div className="flex items-center justify-between gap-4 px-1">
          <span className="text-sm font-semibold">@pompeitech/vesuvius-ui starred repos</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown className="size-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 text-sm shadow-xs">@radix-ui/primitives</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 text-sm shadow-xs">@tanstack/react-table</div>
          <div className="rounded-md border px-4 py-2 text-sm shadow-xs">@dnd-kit/core</div>
        </CollapsibleContent>
      </Collapsible>
    )
  }
}
