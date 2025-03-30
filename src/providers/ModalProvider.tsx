import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

interface ModalConfig {
  buttons: 'ok' | 'yes-no'
  title?: string
  message?: string
  confirmation?: string
  onOkClick?: () => void
  onYesClick?: () => void
  onNoClick?: () => void
}

interface ModalContextType {
  modalConfig: ModalConfig
  isOpen: boolean
  openModal: (modalConfig: ModalConfig) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProvierProps {
  children: ReactNode
}

export const ModalProvider = ({ children }: ModalProvierProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    buttons: 'ok'
  })

  const openModal = useCallback((modalConfig: ModalConfig) => {
    setModalConfig(modalConfig)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const modalContextValue = useMemo(() => {
    return { openModal, closeModal, modalConfig, isOpen }
  }, [openModal, closeModal, modalConfig, isOpen])

  return <ModalContext.Provider value={modalContextValue}>{children}</ModalContext.Provider>
}
