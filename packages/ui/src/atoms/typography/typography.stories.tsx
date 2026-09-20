import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from './typography'

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: { children: 'The quick brown fox jumps over the lazy dog' }
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="lead">
        A lead paragraph — larger and muted, for the sentence right under a heading.
      </Typography>
      <Typography variant="p">
        A regular paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="large">Large text</Typography>
      <Typography variant="small">Small text</Typography>
      <Typography variant="muted">Muted text — timestamps, hints, captions.</Typography>
      <Typography variant="blockquote">
        "The best way to predict the future is to invent it."
      </Typography>
      <Typography variant="code">npm install @pompeitech/vesuvius-ui</Typography>
      <Typography variant="list">
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </Typography>
    </div>
  )
}

export const HeadingStyledAsDiv: Story = {
  name: 'variant="h3" as="div" (styling without the heading semantics)',
  args: { variant: 'h3', as: 'div', children: 'Card title' }
}

export const PageExample: Story = {
  name: 'Composed (a small article)',
  render: () => (
    <article className="max-w-xl">
      <Typography variant="h1">Getting started</Typography>
      <Typography variant="lead">
        Everything you need to build your first dashboard page.
      </Typography>
      <Typography variant="h2" className="mt-8 border-b pb-2">
        Installation
      </Typography>
      <Typography variant="p">
        Install the package with your favorite package manager, then import the components you need.
      </Typography>
      <Typography variant="code">pnpm add @pompeitech/vesuvius-ui</Typography>
      <Typography variant="h3" className="mt-6">
        Notes
      </Typography>
      <Typography variant="blockquote">
        Components are consumed straight from source in this monorepo — no build step yet.
      </Typography>
    </article>
  )
}
