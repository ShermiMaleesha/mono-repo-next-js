import React from 'react';
import { TableCellProps as MuiTableCellProps } from '@mui/material/TableCell'
import MuiTableRow, {
  TableRowProps as MuiTableRowProps,
} from '@mui/material/TableRow'
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react'

import { TableCellProps } from './TableCell'

type TableRowProps = MuiTableRowProps & {
  /**
   * Set alignment for entire row
   *
   * Includes 'auto' where alignment is split down the middle
   * i.e. columns on the left get left-aligned, and columns on the right get right-aligned.
   */
  align?: MuiTableCellProps['align'] | 'auto'
  /**
   * Remove border for last row
   */
  last?: boolean
}

/**
 * This adds custom align prop based on position of cell column
 */
const enhanceChildren = (
  children: ReactNode,
  { align, last }: TableRowProps
) => {
  const midIdx = Array.isArray(children) ? Math.floor(children?.length / 2) : 0
  return Children.map(children as ReactNode, (child, idx) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<TableCellProps>, {
        align:
          child?.props.align ??
          (align === 'auto' ? (idx < midIdx ? 'left' : 'right') : align),
        last,
      })
    }
    return child
  })
}
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiTableRow ref={ref} {...props}>
        {enhanceChildren(children, props)}
      </MuiTableRow>
    )
  }
)

export { TableRow }
export type { TableRowProps }
