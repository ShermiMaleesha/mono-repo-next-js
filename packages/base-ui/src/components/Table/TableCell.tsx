import MuiTableCell, {
  TableCellProps as MuiTableCellProps,
} from '@mui/material/TableCell'
import React, { forwardRef, memo, useContext } from 'react'
import { twMerge } from '../../utils'
import { TableContext } from './TableContainer'

type TableCellProps = Omit<MuiTableCellProps, 'variant'> & {
  variant?: MuiTableCellProps['variant'] | 'collapsible'
  last?: boolean
}
const TableCell = memo(
  forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ className, variant, last, ...rest }, ref) => {
      const { tableVariant, rowVariant } = useContext(TableContext)
      const cellVariant = variant ?? rowVariant
      return (
        <MuiTableCell
          {...rest}
          ref={ref}
          className={twMerge([
            className,
            'border-0 border-b-1 border-solid text-default',
            last && 'border-b-0',
            cellVariant === 'head' && 'border-default',
            cellVariant === 'body' && 'border-muted',
            cellVariant === 'footer' && 'border-b-0 border-t-1 border-muted',
            tableVariant === 'primary' && 'body-s-auto',
            tableVariant === 'secondary' && 'body-xs-auto',
            ((tableVariant === 'secondary' && cellVariant === 'body') ||
              cellVariant === 'collapsible') &&
              'border-none',
          ])}
        />
      )
    }
  )
)

export { TableCell }
export type { TableCellProps }
