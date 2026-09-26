import type { Member } from '@pompeitech/mock-data'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  PeopleSelect
} from '@pompeitech/vesuvius-ui'
import { useState } from 'react'

type NewChatDialogProps = {
  open: boolean
  candidates: Member[]
  onOpenChange: (open: boolean) => void
  onStart: (memberId: string) => void
}

/** Picks a member with no conversation yet and starts one — the `PeopleSelect` combobox is already built for exactly this ("pick a person" with avatar + subtitle), no new picker needed. */
export function NewChatDialog({ open, candidates, onOpenChange, onStart }: NewChatDialogProps) {
  const [memberId, setMemberId] = useState<string | undefined>()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New chat</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-1.5">
          <Label>To</Label>
          <PeopleSelect
            options={candidates.map(m => ({
              value: m.id,
              label: m.name,
              description: m.role,
              avatarSrc: m.avatarUrl
            }))}
            value={memberId}
            onChange={setMemberId}
            placeholder="Search people..."
          />
        </div>

        <DialogFooter>
          <Button
            disabled={!memberId}
            onClick={() => {
              if (!memberId) return
              onStart(memberId)
              setMemberId(undefined)
            }}
          >
            Start chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
