import { useCallback, useState } from 'react'

export type Updater<T> = T | ((prev: T) => T)

export function useControllableState<T>({
  value,
  defaultValue,
  onChange
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}): [T, (updater: Updater<T>) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internalValue

  const setValue = useCallback(
    (updater: Updater<T>) => {
      const next = typeof updater === 'function' ? (updater as (prev: T) => T)(current) : updater
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    },
    [current, isControlled, onChange]
  )

  return [current, setValue]
}
