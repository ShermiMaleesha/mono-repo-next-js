import React from 'react';
import MuiTableContainer, {
  TableContainerProps as MuiTableContainerProps,
} from '@mui/material/TableContainer'
import { createContext, HTMLAttributes } from 'react'

import { cx } from '../../utils'

type TableVariant = 'primary' | 'secondary'
type TableContainerProps = MuiTableContainerProps & {
  tableVariant?: TableVariant
}

const TableContext = createContext<{
  tableVariant: TableVariant
  rowVariant?: 'head' | 'body' | 'footer'
}>({
  tableVariant: 'primary',
})

const generateContainer =
  (tableVariant: TableVariant) => (props: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        {...props}
        className={cx([
          props.className,
          'border-1 border-muted rounded-6 elevation-s border-solid p-0',
          tableVariant === 'primary' && 'bg-emphasis',
          tableVariant === 'secondary' && 'bg-default',
        ])}
        data-testid='TableContainer_CardComponent'
      />
    )
  }

const TableContainer = ({
  tableVariant = 'primary',
  ...props
}: TableContainerProps) => {
  return (
    <TableContext.Provider value={{ tableVariant }}>
      <MuiTableContainer
        {...props}
        component={generateContainer(tableVariant)}
      />
    </TableContext.Provider>
  )
}

export { TableContainer, TableContext }
export type { TableContainerProps, TableVariant }
