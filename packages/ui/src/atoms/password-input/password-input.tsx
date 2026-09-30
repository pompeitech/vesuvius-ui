import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes, useState } from 'react'
import type { ControlSize } from '../../lib/control-size'
import { cn } from '../../lib/utils'
import { IconButton } from '../icon-button/icon-button'
import { Input, type InputProps } from '../input/input'

// One step below the input height so the toggle sits inside the input's border.
const toggleSizeClassNames = {
  xs: 'size-5',
  sm: 'size-6',
  default: 'size-7',
  lg: 'size-8'
} satisfies Record<ControlSize, string>

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> &
  Pick<InputProps, 'size'>

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ size = 'default', ...props }, ref) => {
    const [visible, setVisible] = useState(false)
    return (
      <div className="relative">
        <Input
          ref={ref}
          {...props}
          size={size}
          type={visible ? 'text' : 'password'}
          className="pr-10"
        />
        <IconButton
          type="button"
          size={size}
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible(!visible)}
          className={cn(
            'absolute right-1 top-1/2 -translate-y-1/2 rounded-sm border-0 bg-transparent text-muted-foreground shadow-none',
            toggleSizeClassNames[size]
          )}
        >
          {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </IconButton>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'
