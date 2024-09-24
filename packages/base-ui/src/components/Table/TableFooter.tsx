import React from 'react';
import MuiTableFooter, {
  TableFooterProps as MuiTableFooterProps,
} from '@mui/material/TableFooter'
import { useContext } from 'react'

import { TableContext } from './TableContainer'

const TableFooter = (props: MuiTableFooterProps) => {
  const { tableVariant } = useContext(TableContext)
  return (
    <TableContext.Provider value={{ tableVariant, rowVariant: 'footer' }}>
      <MuiTableFooter {...props} />
    </TableContext.Provider>
  )
}

export { TableFooter }
