import React from 'react';
import MuiTableBody, {
  TableBodyProps as MuiTableBodyProps,
} from '@mui/material/TableBody'
import { useContext } from 'react'

import { TableContext } from './TableContainer'

const TableBody = (props: MuiTableBodyProps) => {
  const { tableVariant } = useContext(TableContext)
  return (
    <TableContext.Provider value={{ tableVariant, rowVariant: 'body' }}>
      <MuiTableBody {...props} />
    </TableContext.Provider>
  )
}

export { TableBody }
