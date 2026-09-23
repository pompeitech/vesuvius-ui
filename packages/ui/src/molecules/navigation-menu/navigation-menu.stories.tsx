import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuGrid,
  NavigationMenuGridItem,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './navigation-menu'
import { navigationMenuTriggerStyle } from './navigation-menu.variants'

const meta = {
  title: 'Molecules/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs']
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGrid>
              <NavigationMenuGridItem href="#" title="Ecommerce dashboard">
                Orders, products, and customers in one place.
              </NavigationMenuGridItem>
              <NavigationMenuGridItem href="#" title="Project management">
                Boards, timelines, and team workload.
              </NavigationMenuGridItem>
            </NavigationMenuGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
