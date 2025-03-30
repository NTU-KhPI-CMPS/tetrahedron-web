import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FiPlus } from 'react-icons/fi'
import { IoCloudUploadOutline } from 'react-icons/io5'

interface DragAndDropProps {
  onFilesLoad: (files: File[]) => void
  hint: string
  fileName?: string
  title?: string
  className?: string
  buttonClassName?: string
  accept?: string
}

const DragAndDrop = ({
  onFilesLoad,
  accept,
  hint,
  fileName,
  title = '',
  className = '',
  buttonClassName = ''
}: DragAndDropProps) => {
  const [drag, setDrag] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const filterByType = (type: string, files: File[]) => files.filter((file) => file.type === type)

  const sendFiles = (files: File[]) => {
    const filtered = accept ? filterByType(accept, files) : files
    onFilesLoad(filtered)
  }

  const onBrowseButtonClick = (e: MouseEvent) => {
    e.preventDefault()
    fileInput.current?.click()
  }

  const onDragOverHandler = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const onDragLeaveHandler = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDrag(false)

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return
    sendFiles([...e.dataTransfer.files])
  }

  const onFilesLoadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    sendFiles([...e.target.files])
  }

  return (
    <form
      data-testid="drop-zone"
      onDragOver={onDragOverHandler}
      onDragStart={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
      className={cn('flex flex-col items-center justify-between rounded-3xl bg-app-blue-light pt-3', className, {
        'border-2 border-dashed border-app-blue': drag
      })}
    >
      <input
        data-testid="file-input"
        accept={accept}
        ref={fileInput}
        type="file"
        hidden
        onChange={onFilesLoadHandler}
        multiple
      />
      <p className="text-center text-base font-semibold">{title}</p>
      <div className="flex flex-col items-center justify-center gap-2 font-semibold">
        <IoCloudUploadOutline className="text-2xl" />
        <div className="flex flex-wrap justify-center gap-x-1">
          <p className="text-center">{hint}</p>
          <p className="text-center">{fileName}</p>
        </div>
      </div>
      <Button onClick={onBrowseButtonClick} size={'icon'} className={buttonClassName}>
        <FiPlus className="text-2xl" />
      </Button>
    </form>
  )
}

export default DragAndDrop
