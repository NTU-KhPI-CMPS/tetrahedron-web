import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'
import { useTranslation } from 'react-i18next'

const ErrorModal = () => {
  const { t } = useTranslation()
  const { isOpen, modalConfig, closeModal } = useModal()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-96 space-y-5 rounded-3xl border-2 border-red-400 bg-red-100 p-7">
        {modalConfig.title && <p className="text-center font-medium">{modalConfig.title}</p>}
        {modalConfig.message && <p className="text-center font-light">{modalConfig.message}</p>}
        {modalConfig.confirmation && <p className="text-center font-light">{modalConfig.confirmation}</p>}
        <div className="flex justify-center gap-5">
          {modalConfig.buttons === 'yes-no' && (
            <>
              <Button
                onClick={() => {
                  modalConfig.onYesClick?.()
                  closeModal()
                }}
                variant="black"
                size="wide"
              >
                {t('errorModal.yesBtn')}
              </Button>
              <Button
                onClick={() => {
                  modalConfig.onNoClick?.()
                  closeModal()
                }}
                variant="black"
                size="wide"
              >
                {t('errorModal.noBtn')}
              </Button>
            </>
          )}
          {modalConfig.buttons === 'ok' && (
            <Button
              onClick={() => {
                modalConfig.onOkClick?.()
                closeModal()
              }}
              variant="black"
              size="wide"
            >
              {t('errorModal.okBtn')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
