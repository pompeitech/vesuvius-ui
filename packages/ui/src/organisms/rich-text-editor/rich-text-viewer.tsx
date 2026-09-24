import { cn } from '../../lib/utils'
import { RICH_TEXT_CONTENT_CLASSES } from './rich-text-editor'

export function RichTextViewer({ html, className }: { html: string; className?: string }) {
  // This is our own editor's saved HTML, not third-party/user-supplied
  // markup rendered unsanitized from the open web.
  return (
    <div
      className={cn(RICH_TEXT_CONTENT_CLASSES, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
