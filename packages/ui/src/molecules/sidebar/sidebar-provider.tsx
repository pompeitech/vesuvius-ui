import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useIsMobile } from '../../hooks/use-mobile'
import { cn } from '../../lib/utils'
import {
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_STORAGE_KEY,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON
} from './sidebar.constants'

type SidebarContextValue = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return context
}

type SidebarProviderProps = ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)

  const [internalOpen, setInternalOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultOpen
    try {
      const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY)
      if (stored !== null) return stored === 'true'
    } catch {
      // ignore
    }
    return defaultOpen
  })

  const open = openProp ?? internalOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (setOpenProp) {
        setOpenProp(value)
      } else {
        setInternalOpen(value)
      }
      try {
        window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value))
      } catch {
        // ignore
      }
    },
    [setOpenProp]
  )

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile(v => !v) : setOpen(!open)
  }, [isMobile, open, setOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const state = open ? 'expanded' : 'collapsed'

  const value = useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style
          } as CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
