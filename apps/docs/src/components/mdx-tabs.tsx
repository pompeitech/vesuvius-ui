'use client'

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'

/** `<TabItem>` is a data-only marker — `MdxTabs` reads its props to build
 * the real `TabsTrigger`/`TabsContent` pair; it never renders on its own
 * (it's always consumed by its parent `MdxTabs`, so this return is dead
 * code in practice, just here so the type checker accepts it as a
 * component). Same authoring shape docs authors already know from the
 * Docusaurus site (`<Tabs><TabItem value="pnpm" label="pnpm">…`). */
export function TabItem({ children }: { value: string; label: string; children: ReactNode }) {
  return <>{children}</>
}

type TabItemElement = ReactElement<{ value: string; label: string; children: ReactNode }>

export function MdxTabs({
  children,
  ...props
}: { children: ReactNode } & React.ComponentProps<typeof Tabs>) {
  const items = Children.toArray(children).filter((child): child is TabItemElement =>
    isValidElement(child)
  )
  const first = items[0]?.props.value
  // `Tabs` is also the public component name used by the component docs.
  // When the children are regular Radix Tabs children rather than TabItem
  // markers, preserve that API instead of treating the tree as an MDX tab set.
  if (!first) return <Tabs {...props}>{children}</Tabs>

  return (
    <Tabs defaultValue={first} className="my-6">
      <TabsList>
        {items.map(item => (
          <TabsTrigger key={item.props.value} value={item.props.value}>
            {item.props.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map(item => (
        <TabsContent key={item.props.value} value={item.props.value}>
          {item.props.children}
        </TabsContent>
      ))}
    </Tabs>
  )
}
