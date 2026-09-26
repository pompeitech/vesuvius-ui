import { PaperclipIcon, UploadIcon, XIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, cn } from '@pompeitech/vesuvius-ui'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form/form'

export type UploadValue = File | string

function isImage(value: UploadValue): boolean {
  return value instanceof File ? value.type.startsWith('image/') : true
}

function fileName(value: UploadValue): string {
  return value instanceof File ? value.name : value.split('/').pop() || value
}

function PreviewImage({ value, className }: { value: UploadValue; className?: string }) {
  const objectUrl = useMemo(
    () => (value instanceof File ? URL.createObjectURL(value) : null),
    [value]
  )

  useEffect(() => () => (objectUrl ? URL.revokeObjectURL(objectUrl) : undefined), [objectUrl])

  const src = value instanceof File ? objectUrl : value
  if (!src) return null

  return <img src={src} alt="" className={cn('size-full object-cover', className)} />
}

export type FieldUploadProps = {
  name: string
  label?: ReactNode
  description?: ReactNode
  multiple?: boolean
  accept?: string
  variant?: 'avatar' | 'box'
  disabled?: boolean
  className?: string
  required?: boolean
}

export function FieldUpload({
  name,
  label,
  description,
  multiple = false,
  accept,
  variant = 'box',
  disabled,
  className,
  required
}: FieldUploadProps) {
  const { control } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const values: UploadValue[] = multiple
          ? (field.value ?? [])
          : field.value
            ? [field.value]
            : []

        const addFiles = (files: FileList | File[]) => {
          const incoming = Array.from(files)
          if (incoming.length === 0) return
          field.onChange(multiple ? [...values, ...incoming] : incoming[0])
        }

        const removeAt = (index: number) => {
          if (multiple) field.onChange(values.filter((_, i) => i !== index))
          else field.onChange(null)
        }

        const handleDrop = (event: DragEvent<HTMLElement>) => {
          event.preventDefault()
          setDragOver(false)
          if (disabled) return
          addFiles(event.dataTransfer.files)
        }

        return (
          <FormItem>
            {label && <FormLabel required={required}>{label}</FormLabel>}
            <FormControl>
              <div className={cn('flex flex-col gap-3', className)}>
                {variant === 'avatar' ? (
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => inputRef.current?.click()}
                      onDragOver={event => {
                        event.preventDefault()
                        setDragOver(true)
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={cn(
                        'bg-muted/40 text-muted-foreground hover:bg-muted/60 relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed',
                        dragOver && 'border-primary bg-muted/60'
                      )}
                    >
                      {values[0] ? (
                        <PreviewImage value={values[0]} />
                      ) : (
                        <UploadIcon className="size-5" aria-hidden="true" />
                      )}
                    </button>
                    <div className="flex flex-col items-start gap-1">
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="h-auto p-0"
                        onClick={() => inputRef.current?.click()}
                        disabled={disabled}
                      >
                        Upload image
                      </Button>
                      {values[0] && (
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          className="text-muted-foreground h-auto p-0"
                          onClick={() => removeAt(0)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={event => {
                      event.preventDefault()
                      setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={cn(
                      'flex flex-col items-center justify-center gap-3 rounded-md border border-dashed py-10 text-center',
                      dragOver && 'border-primary bg-muted/40'
                    )}
                  >
                    <UploadIcon className="text-muted-foreground size-6" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium">
                        Drop your {multiple ? 'files' : 'file'} here
                      </p>
                      {description && (
                        <p className="text-muted-foreground text-xs">{description}</p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => inputRef.current?.click()}
                      disabled={disabled}
                    >
                      <UploadIcon />
                      Select {multiple ? 'files' : 'file'}
                    </Button>
                  </div>
                )}

                {variant === 'box' && values.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {values.map((value, index) => (
                      <li
                        key={value instanceof File ? `${value.name}-${index}` : value}
                        className="flex items-center gap-3 rounded-md border p-2"
                      >
                        <div className="bg-muted flex size-9 shrink-0 items-center justify-center overflow-hidden rounded">
                          {isImage(value) ? (
                            <PreviewImage value={value} />
                          ) : (
                            <PaperclipIcon
                              className="text-muted-foreground size-4"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <span className="min-w-0 flex-1 truncate text-sm">{fileName(value)}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-7 shrink-0"
                          onClick={() => removeAt(index)}
                        >
                          <XIcon className="size-3.5" />
                          <span className="sr-only">Remove {fileName(value)}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

                <input
                  ref={inputRef}
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  disabled={disabled}
                  className="hidden"
                  onChange={event => {
                    if (event.target.files) addFiles(event.target.files)
                    event.target.value = ''
                  }}
                />
              </div>
            </FormControl>
            {variant === 'avatar' && description && (
              <FormDescription>{description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
