import React from 'react';
import MuiTableHead, {
  TableHeadProps as MuiTableHeadProps,
} from '@mui/material/TableHead'
import { useContext } from 'react'

import { TableContext } from './TableContainer'

const TableHead = (props: MuiTableHeadProps) => {
  const { tableVariant } = useContext(TableContext)
  return (
    <TableContext.Provider value={{ tableVariant, rowVariant: 'head' }}>
      <MuiTableHead {...props} />
    </TableContext.Provider>
  )
}

export { TableHead }
