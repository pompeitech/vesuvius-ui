import { Header, HeaderEnd, HeaderStart, Separator, SidebarTrigger, ThemeModeToggle, ThemePalettePicker } from '@pompeitech/vesuvius-ui'
import { LogoMark } from '../../components/brand/logo'
import { DashboardBreadcrumbs } from './breadcrumbs'

/** Top bar: sidebar toggle, page breadcrumb, and the theme controls — same on every page. */
export function DashboardHeader() {
  return (
    <Header>
      <HeaderStart>
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        {/* The sidebar (and its logo) is hidden behind the trigger on mobile — show the
            mark here so the brand is still visible without opening it. */}
        <LogoMark className="size-7 md:hidden" />
        <DashboardBreadcrumbs />
      </HeaderStart>
      <HeaderEnd>
        <ThemeModeToggle />
        <ThemePalettePicker />
      </HeaderEnd>
    </Header>
  )
}
