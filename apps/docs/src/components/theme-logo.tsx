'use client'

import Image from 'next/image'
import { useTheme } from '@pompeitech/vesuvius-ui'

type ThemeLogoProps = {
  mark?: boolean
  className?: string
  width?: number
  height?: number
  /** The aubergine sidebar is dark even when the page is in light mode. */
  surface?: 'page' | 'sidebar'
}

export function ThemeLogo({
  mark = false,
  className,
  width = 800,
  height = 60,
  surface = 'page'
}: ThemeLogoProps) {
  const { resolvedTheme, colorTheme } = useTheme()
  const darkSurface =
    resolvedTheme === 'dark' || (surface === 'sidebar' && colorTheme === 'aubergine')
  const asset = mark
    ? darkSurface
      ? '/img/mark-dark.svg'
      : '/img/mark.svg'
    : darkSurface
      ? '/img/logo-dark.svg'
      : '/img/logo-light.svg'

  return <Image src={asset} alt="Vesuvius UI" width={width} height={height} className={className} />
}
