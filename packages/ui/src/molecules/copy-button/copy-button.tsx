import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'
import { IconButton } from '../../atoms/icon-button/icon-button'

export function CopyButton({
  value,
  ...props
}: { value: string } & React.ComponentProps<typeof IconButton>) {
  const [copied, setCopied] = useState(false)
  return (
    <IconButton
      {...props}
      aria-label={copied ? 'Copied' : 'Copy'}
      onClick={async event => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
        props.onClick?.(event)
      }}
    >
      {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
    </IconButton>
  )
}
