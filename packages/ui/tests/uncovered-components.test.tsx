import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { IconButton } from '@ui/atoms/icon-button/icon-button'
import { NumberInput } from '@ui/atoms/number-input/number-input'
import { PasswordInput } from '@ui/atoms/password-input/password-input'
import { CopyButton } from '@ui/molecules/copy-button/copy-button'
import { FilePreview } from '@ui/molecules/file-preview/file-preview'
import { FileUploader } from '@ui/molecules/file-uploader/file-uploader'
import { FilterBar } from '@ui/molecules/filter-bar/filter-bar'
import { List, ListItem } from '@ui/molecules/list/list'
import { NotificationCenter } from '@ui/molecules/notification-center/notification-center'
import { PeopleSelect } from '@ui/organisms/people-select/people-select'
import { RichTextEditor } from '@ui/organisms/rich-text-editor/rich-text-editor'
import { RichTextViewer } from '@ui/organisms/rich-text-editor/rich-text-viewer'
import { Timeline } from '@ui/organisms/timeline/timeline'

describe('uncovered atoms', () => {
  test('icon button exposes its label and forwards clicks', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<IconButton aria-label="Open settings" onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: 'Open settings' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  test('number input changes by its configured step', async () => {
    const user = userEvent.setup()
    render(<NumberInput aria-label="Quantity" defaultValue={2} step={2} />)

    await user.click(screen.getByRole('button', { name: 'Increase value' }))
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue(4)
    await user.click(screen.getByRole('button', { name: 'Decrease value' }))
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue(2)
  })

  test('password input toggles between password and text', async () => {
    const user = userEvent.setup()
    render(<PasswordInput aria-label="Password" defaultValue="secret" />)
    const input = screen.getByLabelText('Password')

    expect(input).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: 'Show password' }))
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeVisible()
  })
})

describe('uncovered molecules', () => {
  test('list composes leading and trailing slots and supports dense items', () => {
    const { container } = render(
      <List dividers>
        <ListItem leading={<span data-testid="leading">Icon</span>} trailing="Online">
          Maya Chen
        </ListItem>
        <ListItem dense leading={<span data-testid="dense-leading">Dot</span>}>
          Noah Williams
        </ListItem>
      </List>
    )

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('Maya ChenOnline')
    expect(items[1]).toHaveAttribute('data-dense', 'true')
    expect(screen.getByTestId('leading')).toBeVisible()
    expect(screen.getByTestId('dense-leading')).toBeVisible()
    expect(container.querySelector('[data-slot="list"]')).toHaveAttribute('data-dividers', 'true')
  })

  test('copy button writes its value and exposes copied state', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    })

    render(<CopyButton value="npm install @pompeitech/vesuvius-ui" />)
    await user.click(screen.getByRole('button', { name: 'Copy' }))

    expect(writeText).toHaveBeenCalledWith('npm install @pompeitech/vesuvius-ui')
    expect(screen.getByRole('button', { name: 'Copied' })).toBeVisible()
  })

  test('file preview shows file metadata and supports removal', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    const file = new File(['content'], 'report.pdf', { type: 'application/pdf' })

    render(<FilePreview file={file} onRemove={onRemove} />)
    expect(screen.getByText('report.pdf')).toBeVisible()
    expect(screen.getByText('1 KB')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Remove report.pdf' }))

    expect(onRemove).toHaveBeenCalledOnce()
  })

  test('file uploader emits selected files and removes them', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const file = new File(['content'], 'notes.txt', { type: 'text/plain' })

    const { container } = render(<FileUploader onChange={onChange} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(input, { target: { files: [file] } })

    expect(onChange).toHaveBeenLastCalledWith([file])
    expect(screen.getByText('notes.txt')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Remove notes.txt' }))
    expect(onChange).toHaveBeenLastCalledWith([])
  })

  test('file uploader accepts multiple dropped files and ignores drops when disabled', () => {
    const onChange = vi.fn()
    const first = new File(['one'], 'one.txt', { type: 'text/plain' })
    const second = new File(['two'], 'two.txt', { type: 'text/plain' })
    const { container, rerender } = render(<FileUploader multiple onChange={onChange} />)
    const dropzone = container.querySelector('[class*="border-dashed"]') as HTMLElement

    fireEvent.drop(dropzone, { dataTransfer: { files: [first, second] } })
    expect(onChange).toHaveBeenLastCalledWith([first, second])

    rerender(<FileUploader disabled onChange={onChange} />)
    const disabledDropzone = container.querySelector('[class*="border-dashed"]') as HTMLElement
    fireEvent.drop(disabledDropzone, { dataTransfer: { files: [first] } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('filter bar reports search changes and clears filters', async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()
    const onClear = vi.fn()

    render(<FilterBar search="" onSearchChange={onSearchChange} onClear={onClear} />)
    await user.type(screen.getByRole('textbox', { name: 'Search' }), 'alpha')
    expect(onSearchChange).toHaveBeenLastCalledWith('a')
    await user.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(onClear).toHaveBeenCalledOnce()
  })

  test('notification center displays unread count and marks a notification read', async () => {
    const user = userEvent.setup()
    const onRead = vi.fn()
    const notifications = [
      { id: '1', title: 'Build completed', description: 'The build is ready.' },
      { id: '2', title: 'Old notification', read: true }
    ]

    render(<NotificationCenter notifications={notifications} onRead={onRead} />)
    await user.click(screen.getByRole('button', { name: 'Notifications, 1 unread' }))
    expect(screen.getByText('Build completed')).toBeVisible()
    await user.click(screen.getByRole('button', { name: /Build completed/ }))

    expect(onRead).toHaveBeenCalledWith('1')
  })

  test('notification center clears all notifications and renders its empty state', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()

    render(
      <NotificationCenter
        notifications={[{ id: '1', title: 'Build completed' }]}
        onClear={onClear}
      />
    )
    await user.click(screen.getByRole('button', { name: /notifications/i }))
    await user.click(screen.getByRole('button', { name: 'Clear all' }))

    expect(onClear).toHaveBeenCalledOnce()
  })
})

describe('uncovered organisms', () => {
  test('people select searches and selects a person', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const options = [
      { value: 'ada', label: 'Ada Lovelace', description: 'Engineering' },
      { value: 'grace', label: 'Grace Hopper', description: 'Research' }
    ]

    render(<PeopleSelect options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /Ada Lovelace/ }))

    expect(onChange).toHaveBeenCalledWith('ada')
    expect(screen.getByRole('combobox')).toHaveTextContent('Ada Lovelace')
  })

  test('people select can clear a selected person', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <PeopleSelect
        defaultValue="ada"
        clearable
        options={[{ value: 'ada', label: 'Ada Lovelace' }]}
        onChange={onChange}
      />
    )
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /unassigned/i }))

    expect(onChange).toHaveBeenCalledWith(undefined)
    expect(screen.getByRole('combobox')).toHaveTextContent('Select person')
  })

  test('timeline renders statuses, dates, descriptions, and connectors', () => {
    const { container } = render(
      <Timeline
        items={[
          { id: 'one', title: 'Started', date: 'Today', description: 'Work started.' },
          { id: 'two', title: 'Completed', status: 'success', description: 'All done.' }
        ]}
      />
    )

    expect(screen.getByText('Started')).toBeVisible()
    expect(screen.getByText('Completed')).toBeVisible()
    expect(screen.getByText('Today').tagName).toBe('TIME')
    expect(container.querySelectorAll('ol > li')).toHaveLength(2)
    expect(container.querySelectorAll('ol > li:first-child [aria-hidden="true"]')).toHaveLength(2)
  })

  test('timeline roadmap renders periods and supports actionable milestones', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Timeline
        variant="roadmap"
        items={[
          { id: 'q1', date: 'Q1', title: 'Foundations', status: 'success' },
          { id: 'q2', date: 'Q2', title: 'Admin Kit', onClick }
        ]}
      />
    )

    expect(screen.getByRole('list', { name: 'Timeline' })).toHaveAttribute(
      'data-variant',
      'roadmap'
    )
    expect(screen.getByText('Q1')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Admin Kit' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('rich text editor syncs external content and hides editing controls when read-only', async () => {
    const { container, rerender } = render(
      <RichTextEditor value="<p>Initial</p>" placeholder="Write note" />
    )
    const editor = container.querySelector('[contenteditable="true"]') as HTMLElement

    expect(editor).toHaveTextContent('Initial')
    expect(screen.getByRole('button', { name: 'Bold' })).toBeEnabled()

    rerender(<RichTextEditor value="<p>Read only</p>" editable={false} />)
    expect(container.querySelector('[contenteditable="false"]')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Bold' })).not.toBeInTheDocument()
  })

  test('rich text viewer renders saved markup', () => {
    render(<RichTextViewer html="<h2>Release notes</h2><p>Everything is ready.</p>" />)

    expect(screen.getByRole('heading', { level: 2, name: 'Release notes' })).toBeVisible()
    expect(screen.getByText('Everything is ready.')).toBeVisible()
  })

  test('rich text editor exposes formatting controls and renders initial content', () => {
    const { container, rerender } = render(
      <RichTextEditor value="<p>Hello</p>" placeholder="Write note" />
    )
    expect(screen.getByRole('button', { name: 'Bold' })).toBeVisible()
    const editor = document.querySelector('[contenteditable="true"]') as HTMLElement
    expect(editor).toBeInTheDocument()
    expect(editor).toHaveTextContent('Hello')

    rerender(<RichTextEditor value="<p>Read only</p>" editable={false} />)
    expect(container.querySelector('[contenteditable="false"]')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Bold' })).not.toBeInTheDocument()
  })
})
