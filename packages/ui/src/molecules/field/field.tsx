import { Slot } from '@radix-ui/react-slot'
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState
} from 'react'
import { Label } from '../../atoms/label/label'
import { cn } from '../../lib/utils'

type FieldContextValue = {
  controlId: string
  descriptionId: string
  errorId: string
  invalid: boolean
  required: boolean
  hasDescription: boolean
  hasError: boolean
  setHasDescription: (value: boolean) => void
  setHasError: (value: boolean) => void
}

const FieldContext = createContext<FieldContextValue | undefined>(undefined)

function useFieldContext(component: string) {
  const context = useContext(FieldContext)
  if (!context) throw new Error(`<${component}> must be used within <Field>`)
  return context
}

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
  /** Defaults to whether a non-empty `FieldError` is rendered. */
  invalid?: boolean
  required?: boolean
}

export function Field({ invalid, required = false, className, ...props }: FieldProps) {
  const id = useId()
  const [hasDescription, setHasDescription] = useState(false)
  const [hasError, setHasError] = useState(false)
  const isInvalid = invalid ?? hasError

  const value = useMemo<FieldContextValue>(
    () => ({
      controlId: `${id}-control`,
      descriptionId: `${id}-description`,
      errorId: `${id}-error`,
      invalid: isInvalid,
      required,
      hasDescription,
      hasError,
      setHasDescription,
      setHasError
    }),
    [id, isInvalid, required, hasDescription, hasError]
  )

  return (
    <FieldContext.Provider value={value}>
      <div
        data-slot="field"
        data-invalid={isInvalid || undefined}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

export type FieldLabelProps = ComponentProps<typeof Label> & { required?: boolean }

export function FieldLabel({ className, required, children, ...props }: FieldLabelProps) {
  const field = useFieldContext('FieldLabel')
  const isRequired = required ?? field.required

  return (
    <Label
      data-slot="field-label"
      data-error={field.invalid}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={field.controlId}
      {...props}
    >
      {children}
      {isRequired && (
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      )}
    </Label>
  )
}

export function FieldControl(props: ComponentProps<typeof Slot>) {
  const field = useFieldContext('FieldControl')
  const describedBy = [field.hasDescription && field.descriptionId, field.hasError && field.errorId]
    .filter(Boolean)
    .join(' ')

  return (
    <Slot
      data-slot="field-control"
      id={field.controlId}
      aria-describedby={describedBy || undefined}
      aria-invalid={field.invalid || undefined}
      aria-required={field.required || undefined}
      {...props}
    />
  )
}

export function FieldDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId, setHasDescription } = useFieldContext('FieldDescription')

  useEffect(() => {
    setHasDescription(true)
    return () => setHasDescription(false)
  }, [setHasDescription])

  return (
    <p
      data-slot="field-description"
      id={descriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function hasContent(node: ReactNode) {
  return node !== null && node !== undefined && node !== false && node !== ''
}

export function FieldError({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const { errorId, setHasError } = useFieldContext('FieldError')
  const visible = hasContent(children)

  useEffect(() => {
    setHasError(visible)
    return () => setHasError(false)
  }, [visible, setHasError])

  if (!visible) return null

  return (
    <p
      data-slot="field-error"
      id={errorId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {children}
    </p>
  )
}
