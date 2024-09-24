import React, { ReactNode, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  TableContainer,
} from 'base-ui/src/components/Table';

type TableProps<T> = {
  columns: { 
    key: keyof T, 
    label: string; 
    sortable?: boolean; 
    sticky?: boolean, 
    width?: number, 
    render?: (item: T) => ReactNode 
  }[];
  data: T[]; 
  totalCount: number; 
  pageSize?: number;
};

const GenericTable = <T,>({
  columns,
  data,
  totalCount,
  pageSize = 10,
}: TableProps<T>) => {
  const [page, setPage] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  const showingItemsCount = Math.min((page + 1) * pageSize, totalCount);

  const displayedData = useMemo(() => {
    const newDisplayedData = data.slice(0, (page + 1) * pageSize);
    return newDisplayedData;
  }, [page, data, pageSize]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return displayedData;

    const sortedArray = [...displayedData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedArray;
  }, [sortConfig, displayedData]);


  const handleSort = (column: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  const loadMore = () => {
    if (showingItemsCount < totalCount) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

 const renderCellValue = (column: typeof columns[number], item: T): React.ReactNode => {
    if (column.render) {
      return column.render(item);
    }
    const value = item[column.key];
    return typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);
  };

  return (
    <div>
      <TableContainer
        sx={{
          '&.MuiTableContainer-root': {
            borderRadius: 0.5,
            overflowX: 'auto',
          },
        }}
      >
        <Table
          className="min-w-full bg-white shadow-md rounded-md"
          sx={{ tableLayout: 'fixed', minWidth: 700 }}
        >
          <TableHead className="bg-gray-100">
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={String(column.key)}
                  className={`px-4 py-2 text-left font-semibold text-gray-50 text-sm `}
                  sx={{
                    position: column.sticky ? 'sticky' : 'relative',
                    left: column.sticky
                      ? `${index * (column?.width || 100)}px`
                      : 'auto',
                    zIndex: column.sticky ? 1 : 'auto',
                    background: 'white',
                    width:column?.width,
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortConfig?.key === column.key}
                      direction={sortConfig?.direction || 'asc'}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
               {columns.map((column, index) => (
                <TableCell 
                    key={String(column.key)} 
                    className="px-4 py-2 border-b text-sm font-bold"  
                    sx={{
                    position: column.sticky ? 'sticky' : 'unset',
                    left: column.sticky ? `${index * (column?.width || 100)}px` : '0',
                    zIndex: column.sticky ? 1 : 'auto',
                    background: 'white',
                    }}
                >
                   {renderCellValue(column, item)}
                </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length} className="py-0 px-2 text-sm !border-b-0">
                <div className="flex justify-between items-center">
                  {showingItemsCount < totalCount && (
                    <button className=" text-blue-600 hover:underline sticky left-2" onClick={loadMore}>
                      load more
                    </button>
                  )}
                  <div className="text-gray-600">{`1 - ${showingItemsCount} of ${totalCount}`}</div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export { GenericTable };
