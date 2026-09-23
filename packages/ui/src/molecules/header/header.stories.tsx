import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../atoms/button/button'
import { Separator } from '../../atoms/separator/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../breadcrumb/breadcrumb'
import { Header, HeaderEnd, HeaderStart } from './header'

const meta = {
  title: 'Molecules/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-40 w-full max-w-3xl overflow-auto">
      <Header>
        <HeaderStart>
          <Button variant="ghost" size="icon" className="size-7">
            ☰
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Ecommerce</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard 1</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </HeaderStart>
        <HeaderEnd>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </HeaderEnd>
      </Header>
      <div className="text-muted-foreground p-4 text-sm">
        Scroll this box — the header stays put (`sticky top-0`) instead of scrolling away with the
        content.
        <div className="mt-4 h-96 rounded-md border border-dashed" />
      </div>
    </div>
  )
}
