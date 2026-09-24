import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TreeView, type TreeNode } from '@ui/organisms/tree-view/tree-view'
import { describe, expect, test, vi } from 'vitest'

const DATA: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'button.tsx', label: 'button.tsx' },
      { id: 'input.tsx', label: 'input.tsx' }
    ]
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'readme', label: 'README.md', disabled: true }
]

describe('TreeView', () => {
  test('renders a tree with only the top level visible by default', () => {
    render(<TreeView data={DATA} />)
    expect(screen.getByRole('tree')).toBeVisible()
    expect(screen.getByRole('treeitem', { name: 'src' })).toBeVisible()
    expect(screen.queryByRole('treeitem', { name: 'button.tsx' })).not.toBeInTheDocument()
  })

  test('expands a node to reveal its children on click', async () => {
    const user = userEvent.setup()
    render(<TreeView data={DATA} />)
    await user.click(screen.getByRole('treeitem', { name: 'src' }))
    expect(screen.getByRole('treeitem', { name: 'button.tsx' })).toBeVisible()
  })

  test('starts with the nodes in defaultExpanded already open', () => {
    render(<TreeView data={DATA} defaultExpanded={['src']} />)
    expect(screen.getByRole('treeitem', { name: 'button.tsx' })).toBeVisible()
  })

  test('selects a single node by default, replacing any previous selection', async () => {
    const user = userEvent.setup()
    const onSelectedChange = vi.fn()
    render(<TreeView data={DATA} onSelectedChange={onSelectedChange} />)
    await user.click(screen.getByRole('treeitem', { name: 'package.json' }))
    expect(onSelectedChange).toHaveBeenCalledWith(['package.json'])
  })

  test('accumulates multiple selections when multiSelect is enabled', async () => {
    const user = userEvent.setup()
    const onSelectedChange = vi.fn()
    render(
      <TreeView
        data={DATA}
        multiSelect
        defaultSelected={['package.json']}
        onSelectedChange={onSelectedChange}
      />
    )
    // multiSelect renders a Checkbox with its own "Select src" aria-label
    // inside the row, so the row's computed accessible name becomes
    // "Select src src" — match the end of it instead of an exact string.
    await user.click(screen.getByRole('treeitem', { name: /src$/ }))
    expect(onSelectedChange).toHaveBeenCalledWith(['package.json', 'src'])
  })

  test('does not select a disabled node', async () => {
    const user = userEvent.setup()
    const onSelectedChange = vi.fn()
    render(<TreeView data={DATA} onSelectedChange={onSelectedChange} />)
    await user.click(screen.getByRole('treeitem', { name: 'README.md' }))
    expect(onSelectedChange).not.toHaveBeenCalled()
  })

  test('exposes multiSelect via aria-multiselectable', () => {
    render(<TreeView data={DATA} multiSelect />)
    expect(screen.getByRole('tree')).toHaveAttribute('aria-multiselectable', 'true')
  })
})
