import { FileIcon, FileTextIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../../atoms/button/button'
import { cn } from '../../lib/utils'

export type FilePreviewProps = {
  file: File
  onRemove?: () => void
  className?: string
}
export function FilePreview({ file, onRemove, className }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/')
  const [url, setUrl] = useState<string>()
  useEffect(() => {
    if (!isImage) return
    const nextUrl = URL.createObjectURL(file)
    setUrl(nextUrl)
    return () => URL.revokeObjectURL(nextUrl)
  }, [file, isImage])
  return (
    <div className={cn('flex items-center gap-3 rounded-md border border-border p-2', className)}>
      {isImage && url ? (
        <img src={url} alt={file.name} className="size-12 rounded object-cover" />
      ) : file.type === 'application/pdf' ? (
        <FileTextIcon className="size-8 text-destructive" />
      ) : (
        <FileIcon className="size-8 text-muted-foreground" />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {Math.max(1, Math.round(file.size / 1024))} KB
        </p>
      </div>
      {onRemove && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={`Remove ${file.name}`}
          onClick={onRemove}
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  )
}
