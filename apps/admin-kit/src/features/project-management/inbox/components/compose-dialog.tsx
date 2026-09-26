import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  RichTextEditor
} from '@pompeitech/vesuvius-ui'
import { useState } from 'react'

export type ComposeDraft = { toName: string; toEmail: string; subject: string; body: string }

type ComposeDialogProps = {
  open: boolean
  initial?: Partial<ComposeDraft>
  onOpenChange: (open: boolean) => void
  onSend: (draft: ComposeDraft) => void
  onSaveDraft: (draft: ComposeDraft) => void
}

/** Compose or reply — "Send" just appends to the `sent` folder (no real delivery, consistent with the rest of this kit's no-backend writes). */
export function ComposeDialog({
  open,
  initial,
  onOpenChange,
  onSend,
  onSaveDraft
}: ComposeDialogProps) {
  const [toName, setToName] = useState(initial?.toName ?? '')
  const [toEmail, setToEmail] = useState(initial?.toEmail ?? '')
  const [subject, setSubject] = useState(initial?.subject ?? '')
  const [body, setBody] = useState(initial?.body ?? '')

  const draft = (): ComposeDraft => ({
    toName: toName.trim(),
    toEmail: toEmail.trim(),
    subject: subject.trim(),
    body
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>To</Label>
              <Input
                value={toName}
                onChange={e => setToName(e.target.value)}
                placeholder="Recipient name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input
                value={toEmail}
                onChange={e => setToEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Message</Label>
            <RichTextEditor value={body} onChange={setBody} placeholder="Write your message…" />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => {
              onSaveDraft(draft())
              onOpenChange(false)
            }}
          >
            Save draft
          </Button>
          <Button
            disabled={!toName.trim() || !subject.trim()}
            onClick={() => {
              onSend(draft())
              onOpenChange(false)
            }}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
