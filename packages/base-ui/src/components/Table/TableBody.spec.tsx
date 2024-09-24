import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { ReactNode, useContext } from 'react'

import { TableBody } from './TableBody'
import { TableContext } from './TableContainer'

const renderTable = (children: ReactNode) => {
  return render(<table>{children}</table>)
}

describe('TableBody', () => {
  it('should pass rowVariant="body" in TableContext to children', () => {
    const MockedChild = () => {
      const { rowVariant } = useContext(TableContext)
      return <div data-testid='MockedChild_tableCellVariant'>{rowVariant}</div>
    }
    const { getAllByTestId } = renderTable(
      <TableBody>
        <div>
          <div>
            <MockedChild />
          </div>
          <MockedChild />
        </div>
        <MockedChild />
      </TableBody>
    )
    const mockedChildren = getAllByTestId('MockedChild_tableCellVariant')
    mockedChildren.forEach(child => expect(child).toHaveTextContent('body'))
  })
})
