import FileUploadButton from '@/components/FileUploadButton.tsx'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const onFilesLoadMock = vi.fn()
const mockTextFile = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' })
describe('FileUploadButton', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FileUploadButton title={'Test'} buttonText={'Test text'} onFileSelect={onFilesLoadMock} />
      </MemoryRouter>
    )
  })

  afterEach(() => {
    onFilesLoadMock.mockReset()
  })

  it('should render button, title and input', () => {
    const button = screen.getByRole('button')
    const title = screen.getByText('Test')
    const input = screen.getByTestId('file-input-Test text')

    expect(button).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('triggers file input on browse button click', () => {
    const button = screen.getByRole('button')
    const fileInput = screen.getByTestId('file-input-Test text')

    const clickSpy = vi.spyOn(fileInput, 'click')

    fireEvent.click(button)
    expect(clickSpy).toHaveBeenCalled()
  })

  it('should accept a text file when selected', () => {
    const fileInput = screen.getByTestId('file-input-Test text')

    fireEvent.change(fileInput, {
      target: { files: [mockTextFile] }
    })

    expect(onFilesLoadMock).toHaveBeenCalledWith(mockTextFile)
  })

  it('should return if no files are selected', () => {
    const fileInput = screen.getByTestId('file-input-Test text')

    fireEvent.change(fileInput, {
      target: { files: [] }
    })

    expect(onFilesLoadMock).not.toHaveBeenCalled()
  })
})
