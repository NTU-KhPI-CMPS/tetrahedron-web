import ColorController from '@/components/ColorController'
import ColorCount from '@/components/ColorCount'
import { Button } from '@/components/ui/button'
import ColorFillIcon from '@/components/ui/ColorFillIcon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { setBackgroundColor } from '@/redux/slices/colorSlice'
import { displayDataOnModel, setColorArraySizeData } from '@/redux/slices/modelSlice'
import { store } from '@/redux/store'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ColorModal = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const backgroundColor = useAppSelector((store) => store.colorSlice.background)

  const [background, setBackground] = useState(backgroundColor)
  const [colorArraySize, setColorArraySize] = useState(7)

  const onSaveClick = () => {
    dispatch(setBackgroundColor(background))
    dispatch(setColorArraySizeData(colorArraySize))

    const stress = store.getState().model.stress
    const selectedComponent = store.getState().model.componentDisplay
    if (stress !== null && selectedComponent !== 'none') {
      dispatch(displayDataOnModel({ quantity: stress[selectedComponent], colorArraySize }))
    }
  }

  const handleArrayChange = (value: number) => {
    if (value !== 0) {
      setColorArraySize(value)
      dispatch(setColorArraySizeData(value))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex-center size-10 rounded-full">
          <ColorFillIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        sideOffset={40}
        className="z-10 flex max-h-[375px] w-[229px] flex-col items-center justify-center gap-[10px] rounded-xl bg-peach/50 px-4 py-5 shadow-md backdrop-blur-sm"
      >
        <div className="flex-center max-h-[174px] w-[197px] flex-col gap-[14px]">
          <label className="text-center text-sm">{t('colorSelect.model')}</label>
          <div className="flex flex-col">
            <ColorController state={background} action={setBackground} />
          </div>
        </div>

        <div className="flex-center max-h-[103px] w-[197px] flex-col gap-[14px]">
          <label className="text-center text-sm">{t('colorSelect.legend')}</label>
          <div className="flex flex-col">
            <ColorCount array_size={colorArraySize} action={handleArrayChange} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button className="h-8 w-[92px] rounded-[66px] px-4 py-2" onClick={onSaveClick}>
            {t('colorSelect.save')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ColorModal
