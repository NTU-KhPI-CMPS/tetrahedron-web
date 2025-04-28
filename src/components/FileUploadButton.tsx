import { Button } from '@/components/ui/button'
import { ChangeEvent, ReactNode, useRef } from 'react'

interface FileUploadButtonProps {
  title?: string
  modal?: ReactNode
  disableModal?: boolean
  buttonText: string
  variant?: 'default' | 'ghost'
  onFileSelect?: (file: File) => void
}

const FileUploadButton = ({
  title,
  modal,
  disableModal,
  buttonText,
  onFileSelect,
  variant = 'default'
}: FileUploadButtonProps) => {
  const inputFile = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files?.length) {
      if (onFileSelect) {
        onFileSelect(files[0])
      }
    }
  }

  const onButtonClick = () => {
    if (inputFile.current) {
      inputFile.current.value = ''
      inputFile.current.click()
    }
  }

  return (
    <div className="space-y-1">
      <input
        className="hidden"
        data-testid={`file-input-${buttonText}`}
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />

      {title && (
        <div className="flex items-center justify-between">
          <p>{title}</p>
          {!disableModal && modal}
        </div>
      )}
      <Button variant={variant} onClick={onButtonClick} size="sm" className="w-full">
        {buttonText}
      </Button>
    </div>
  )
}

export default FileUploadButton
