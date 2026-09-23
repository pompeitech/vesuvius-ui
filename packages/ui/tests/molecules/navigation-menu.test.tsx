import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@ui/molecules/navigation-menu'

describe('navigation menu', () => {
  test('renders navigation links', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Products</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '#')
  })
})
