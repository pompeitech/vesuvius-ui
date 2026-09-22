import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes, useState } from 'react'
import { IconButton } from '../icon-button/icon-button'
import { Input, type InputProps } from '../input/input'

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> &
  Pick<InputProps, 'size'>

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ size, ...props }, ref) => {
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
          className="absolute right-1 top-1/2 -translate-y-1/2 border-0 shadow-none"
        >
          {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </IconButton>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'
