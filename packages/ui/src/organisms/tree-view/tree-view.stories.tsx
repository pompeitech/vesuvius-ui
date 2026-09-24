import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileIcon, FolderIcon } from 'lucide-react'
import { TreeView, type TreeNode } from './tree-view'

const meta = {
  title: 'Organisms/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  args: { data: [] }
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

const FILE_TREE: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: FolderIcon,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: FolderIcon,
        children: [
          { id: 'button.tsx', label: 'button.tsx', icon: FileIcon },
          { id: 'input.tsx', label: 'input.tsx', icon: FileIcon }
        ]
      },
      {
        id: 'lib',
        label: 'lib',
        icon: FolderIcon,
        children: [{ id: 'utils.ts', label: 'utils.ts', icon: FileIcon }]
      },
      { id: 'index.ts', label: 'index.ts', icon: FileIcon }
    ]
  },
  {
    id: 'package.json',
    label: 'package.json',
    icon: FileIcon
  },
  {
    id: 'readme',
    label: 'README.md',
    icon: FileIcon,
    disabled: true
  }
]

export const Default: Story = {
  args: {
    data: FILE_TREE,
    defaultExpanded: ['src', 'components'],
    className: 'w-72'
  }
}

export const MultiSelect: Story = {
  args: {
    data: FILE_TREE,
    defaultExpanded: ['src'],
    multiSelect: true,
    className: 'w-72'
  }
}
