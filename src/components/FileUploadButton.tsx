import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChangeEvent, ReactNode, useRef } from 'react'

interface FileUploadButtonProps {
  title?: string
  subtitle?: string
  modal?: ReactNode
  disableModal?: boolean
  buttonText: string
  variant?: 'default' | 'ghost'
  onFileSelect?: (file: File) => void
}

const FileUploadButton = ({
  title,
  subtitle,
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
    <div className="flex flex-col gap-[6px]">
      <input
        className="hidden"
        data-testid={`file-input-${buttonText}`}
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />

      {title && (
        <div className="flex items-center justify-between">
          <div className={cn('flex max-w-full flex-col', (subtitle || modal) && 'gap-1 pb-[1px] pt-[2px]')}>
            <p className="text-sm leading-[16px]">{title}</p>
            {subtitle && <p className="text-xs leading-[11px] text-[#727272]">{subtitle}</p>}
          </div>

          {!disableModal && modal}
        </div>
      )}
      <Button variant={variant} onClick={onButtonClick} size="custom">
        {buttonText}
      </Button>
    </div>
  )
}

export default FileUploadButton
