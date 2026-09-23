import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/molecules/table'

describe('table', () => {
  test('renders semantic rows and cells', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByRole('columnheader', { name: 'Invoice' })).toBeVisible()
    expect(screen.getByRole('cell', { name: 'INV-001' })).toBeVisible()
  })
})
