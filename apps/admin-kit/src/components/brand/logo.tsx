import { useTheme } from '@pompeitech/vesuvius-ui'
import logoOnDark from '../../assets/images/vesuvio-ui-logo-on-dark.svg'
import logoOnLight from '../../assets/images/vesuvio-ui-logo-on-light.svg'
import mark from '../../assets/images/vesuvio-ui-mark.svg'
import markOnDark from '../../assets/images/vesuvio-ui-mark-on-dark.svg'
import adminLogo from '../../assets/images/vesuvius-admin-logo.png'

type LogoProps = {
  className?: string
  surface?: 'page' | 'sidebar'
}

// Neither SVG uses currentColor (two-tone brand art, not a single-color
// icon), so both swap asset by resolved theme instead.
export function LogoMark({ className, surface = 'page' }: LogoProps) {
  const { resolvedTheme, colorTheme } = useTheme()
  const darkSurface =
    resolvedTheme === 'dark' || (surface === 'sidebar' && colorTheme === 'aubergine')
  return <img src={darkSurface ? markOnDark : mark} alt="Vesuvio UI" className={className} />
}

export function Logo({ className, surface = 'page' }: LogoProps) {
  const { resolvedTheme, colorTheme } = useTheme()
  const darkSurface =
    resolvedTheme === 'dark' || (surface === 'sidebar' && colorTheme === 'aubergine')
  return <img src={darkSurface ? logoOnDark : logoOnLight} alt="Vesuvio UI" className={className} />
}

/**
 * Admin Kit lockup generated for the product shell. It is intentionally kept
 * separate from the Vesuvius UI library logo so the kit can evolve its product
 * identity without changing the component library brand.
 */
export function AdminLogo({ className }: Pick<LogoProps, 'className'>) {
  return <img src={adminLogo} alt="Vesuvius Admin" className={className} />
}
