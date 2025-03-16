import FileUploadButton from '@/components/FileUploadButton.tsx'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.ts'
import { setDisplayNodeIndices } from '@/redux/slices/modelSlice.ts'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ToolbarProps {
  loadStress: (file: File) => Promise<void>
  loadCharacteristic: (file: File) => Promise<void>
}

const Toolbar: FC<ToolbarProps> = ({ loadStress, loadCharacteristic }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { displayNodeIndices } = useAppSelector((store) => store.model)

  return (
    <div className="absolute right-14 z-10 flex max-h-full w-52 select-none flex-col gap-3 overflow-y-auto rounded-3xl p-3 py-10 shadow-md backdrop-blur-sm">
      <SwitchWithTitle
        label={t('toolbar.toolbarSections.switchSection.nodes')}
        id="face-numbers"
        onClick={() => dispatch(setDisplayNodeIndices(!displayNodeIndices))}
      />
      <FileUploadButton
        title={t('toolbar.toolbarSections.buttonsSection.nodeStress')}
        buttonText={t('toolbar.toolbarSections.buttonsSection.fileUpload')}
        onFileSelect={loadStress}
      />
      <FileUploadButton
        title={t('toolbar.toolbarSections.buttonsSection.otherCharacteristic')}
        buttonText={t('toolbar.toolbarSections.buttonsSection.fileUpload')}
        onFileSelect={loadCharacteristic}
      />
    </div>
  )
}

export default Toolbar
