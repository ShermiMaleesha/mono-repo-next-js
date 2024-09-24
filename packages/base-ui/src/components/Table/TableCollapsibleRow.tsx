import React from 'react';
import Collapse from '@mui/material/Collapse'
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  useState,
} from 'react'

import { KeyboardArrowDownIcon } from '../../assets'
import { cx } from '../../utils'
import { TableCell, TableCellProps } from './TableCell'
import { TableRow, TableRowProps } from './TableRow'

type TableCollapsibleRowProps = TableRowProps & {
  collapseContent?: ReactNode
  last?: boolean
  classes?: { arrow?: string }
}
const TableCollapsibleRow = forwardRef<
  HTMLTableRowElement,
  TableCollapsibleRowProps
>(({ children, collapseContent, last, classes, ...rest }, ref) => {
  const [open, setOpen] = useState(false)
  const variant = collapseContent ? 'collapsible' : undefined

  const enhancedChildren = Children.map(children, child => {
    return cloneElement(child as ReactElement<TableCellProps>, {
      variant: variant,
    })
  })
  enhancedChildren?.push(
    <TableCell
      variant={variant}
      key='collapsible_arrow'
      className={cx([classes?.arrow, !collapseContent && 'invisible'])}
      data-testid='TableCollapsibleRow_TableCell_KeyboardArrowDownIcon'
    >
      <KeyboardArrowDownIcon
        className={cx([
          'body-l-auto text-dim transition',
          open && 'rotate-180',
        ])}
        aria-label='expand row'
      />
    </TableCell>
  )
  return (
    <>
      <TableRow
        {...rest}
        ref={ref}
        onClick={() => collapseContent && setOpen(!open)}
        classes={{
          ...classes,
          root: cx([classes?.root, !!collapseContent && 'cursor-pointer']),
        }}
        last={last}
      >
        {enhancedChildren}
      </TableRow>
      {collapseContent && (
        <TableRow last={last} data-testid='TableCollapsibleRow_CollapseContent'>
          <TableCell variant='body' className='p-0' colSpan={99}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <div className='mb-16'>{collapseContent}</div>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
})

export { TableCollapsibleRow }
export type { TableCollapsibleRowProps }
