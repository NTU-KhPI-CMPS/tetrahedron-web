import { Button } from '@/components/ui/button'
import { ChangeEvent, useRef } from 'react'

interface FileUploadButtonProps {
  title?: string
  buttonText: string
  variant?: 'default' | 'ghost'
  onFileSelect?: (file: File) => void
}

const FileUploadButton = ({ title, buttonText, onFileSelect, variant = 'default' }: FileUploadButtonProps) => {
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
    inputFile.current?.click()
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
      {title && <p className="font-semibold">{title}</p>}
      <Button variant={variant} onClick={onButtonClick} size="sm" className="w-full">
        {buttonText}
      </Button>
    </div>
  )
}

export default FileUploadButton
