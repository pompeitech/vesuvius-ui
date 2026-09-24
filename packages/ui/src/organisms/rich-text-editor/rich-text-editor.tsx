import { EditorContent, useEditor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import {
  BoldIcon,
  Heading2Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  Undo2Icon
} from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../../atoms/button/button'
import { Separator } from '../../atoms/separator/separator'
import { Toggle } from '../../molecules/toggle/toggle'

export type RichTextEditorProps = {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  editable?: boolean
  className?: string
}

export const RICH_TEXT_CONTENT_CLASSES =
  'text-sm leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 ' +
  '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 ' +
  '[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2:first-child]:mt-0 ' +
  '[&_h3]:mt-3 [&_h3]:mb-1 [&_h3]:text-base [&_h3]:font-semibold ' +
  '[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_blockquote]:italic ' +
  '[&_strong]:font-semibold [&_a]:text-primary-emphasis [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs'

type ToolbarButtonProps = {
  active: boolean
  onClick: () => void
  label: string
  children: ReactNode
}

function ToolbarToggle({ active, onClick, label, children }: ToolbarButtonProps) {
  return (
    <Toggle size="sm" pressed={active} onPressedChange={onClick} className="size-7 p-0">
      {children}
      <span className="sr-only">{label}</span>
    </Toggle>
  )
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  editable = true,
  className
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? 'Write something…' })
    ],
    content: value ?? '',
    editable,
    editorProps: {
      attributes: {
        class: cn(
          'min-h-32 rounded-b-md px-3 py-2 outline-none',
          '[&_.is-editor-empty]:before:pointer-events-none [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:h-0 [&_.is-editor-empty]:before:text-muted-foreground [&_.is-editor-empty]:before:content-[attr(data-placeholder)]',
          RICH_TEXT_CONTENT_CLASSES
        )
      }
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML())
  })

  // Keep the editor's content synced when `value` changes from outside —
  // switching which issue's description is open, for instance — without
  // fighting the user's own typing (only resets when they actually differ).
  useEffect(() => {
    if (!editor || value === undefined) return
    if (value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false })
  }, [value, editor])

  useEffect(() => {
    editor?.setEditable(editable)
  }, [editable, editor])

  if (!editor) return null

  return (
    <div className={cn('bg-background rounded-md border', className)}>
      {editable && (
        <div className="bg-muted/30 flex flex-wrap items-center gap-1 rounded-t-md border-b p-1">
          <ToolbarToggle
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            label="Bold"
          >
            <BoldIcon />
          </ToolbarToggle>
          <ToolbarToggle
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            label="Italic"
          >
            <ItalicIcon />
          </ToolbarToggle>
          <ToolbarToggle
            active={editor.isActive('strike')}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            label="Strikethrough"
          >
            <StrikethroughIcon />
          </ToolbarToggle>
          <Separator orientation="vertical" className="mx-1 h-5" />
          <ToolbarToggle
            active={editor.isActive('heading', { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            label="Heading"
          >
            <Heading2Icon />
          </ToolbarToggle>
          <ToolbarToggle
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            label="Bullet list"
          >
            <ListIcon />
          </ToolbarToggle>
          <ToolbarToggle
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            label="Numbered list"
          >
            <ListOrderedIcon />
          </ToolbarToggle>
          <ToolbarToggle
            active={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            label="Quote"
          >
            <QuoteIcon />
          </ToolbarToggle>
          <Separator orientation="vertical" className="mx-1 h-5" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo2Icon />
            <span className="sr-only">Undo</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo2Icon />
            <span className="sr-only">Redo</span>
          </Button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}
