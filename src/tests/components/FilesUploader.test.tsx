import FilesUploader from '@/components/FilesUploader'
import { fireEvent, render, screen } from '@testing-library/react'

const propsMock = {
  coorinatesMatrixValid: true,
  indicesMatrixValid: true,
  coorinatesMatrixFileName: 'coorinatesMatrix.txt',
  indicesMatrixFileName: 'indicesMatrix.txt',
  disableCreateModelButton: true,
  closeModal: vi.fn(),
  onIndicesMatrixLoad: vi.fn(() => '1 12 14 10 15'),
  onCoorinatesMatrixLoad: vi.fn(() => '1 2 3'),
  onCreateModelClick: vi.fn(),
  onIndicesMatrixError: vi.fn(),
  onCoorinatesMatrixError: vi.fn()
}

const coorinatesMatrixFile = new File(['1 0 1 0'], 'coorinatesMatrix.txt', { type: 'text/plain' })
const indicesMatrixFile = new File(['1 12 14 10 15'], 'indicesMatrix.txt', { type: 'text/plain' })

describe('FilesUploader', () => {
  it('should call closeModal callback when clicked outside', () => {
    render(
      <div>
        <FilesUploader {...propsMock} />
        <div>outside</div>
      </div>
    )

    const outsideContent = screen.getByText('outside')
    fireEvent.mouseDown(outsideContent)

    expect(propsMock.closeModal).toHaveBeenCalled()
  })

  it('should render default hints if the fileName is not provided for coorinatesMatrix or indicesMatrix', () => {
    const props = { ...propsMock, coorinatesMatrixFileName: '', indicesMatrixFileName: '' }
    render(<FilesUploader {...props} />)

    const hintCoordinates = screen.getAllByText('filesUploader.hintCoordinates')
    const hintIndices = screen.getAllByText('filesUploader.hintIndices')

    expect(hintCoordinates.length).toEqual(1)
    expect(hintIndices.length).toEqual(1)
  })

  it('should call onCoorinatesMatrixLoad when coorinatesMatrix file is loaded', async () => {
    Object.defineProperty(File.prototype, 'text', {
      value: propsMock.onCoorinatesMatrixLoad,
      writable: true
    })

    render(<FilesUploader {...propsMock} />)
    const coorinatesMatrixDropZone = screen.getByText('filesUploader.coorinatesMatrixFile')

    fireEvent.drop(coorinatesMatrixDropZone, {
      dataTransfer: {
        files: [coorinatesMatrixFile]
      }
    })

    expect(propsMock.onCoorinatesMatrixLoad).toHaveBeenCalled()
  })

  it('should call onIndicesMatrixLoad when indicesMatrix file is loaded', () => {
    Object.defineProperty(File.prototype, 'text', {
      value: propsMock.onIndicesMatrixLoad,
      writable: true
    })

    render(<FilesUploader {...propsMock} />)
    const indicesMatrixDropZone = screen.getByText('filesUploader.indicesMatrixFile')

    fireEvent.drop(indicesMatrixDropZone, {
      dataTransfer: {
        files: [indicesMatrixFile]
      }
    })

    expect(propsMock.onIndicesMatrixLoad).toHaveBeenCalled()
  })
})
