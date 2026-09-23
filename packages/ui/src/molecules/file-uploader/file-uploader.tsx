import { UploadCloudIcon, XIcon } from 'lucide-react'
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react'
import { Button } from '../../atoms/button/button'
import { cn } from '../../lib/utils'

export type FileUploaderProps = {
  value?: File[]
  defaultValue?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  className?: string
}

export function FileUploader({
  value,
  defaultValue = [],
  onChange,
  accept,
  multiple = false,
  disabled,
  className
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue)
  const [dragging, setDragging] = useState(false)
  const files = value ?? internalFiles
  const update = (next: File[]) => {
    if (value === undefined) setInternalFiles(next)
    onChange?.(next)
  }
  const addFiles = (list: FileList | null) => {
    if (!list) return
    const next = multiple ? [...files, ...Array.from(list)] : [list[0]!]
    update(next.filter(Boolean))
  }
  const onInput = (event: ChangeEvent<HTMLInputElement>) => addFiles(event.target.files)
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    if (!disabled) addFiles(event.dataTransfer.files)
  }
  return (
    <div className={cn('grid gap-3', className)}>
      <div
        onDragOver={event => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/20 p-6 text-center transition-colors',
          dragging && 'border-primary bg-primary/5',
          disabled && 'pointer-events-none opacity-50'
        )}
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloudIcon className="size-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Drop files here or browse</p>
          <p className="text-xs text-muted-foreground">
            {multiple ? 'Select one or more files' : 'Select one file'}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onInput}
          className="sr-only"
        />
      </div>
      {files.length > 0 && (
        <ul className="grid gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
            >
              <span className="min-w-0 truncate">{file.name}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Remove ${file.name}`}
                onClick={() => update(files.filter((_, i) => i !== index))}
              >
                <XIcon className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
