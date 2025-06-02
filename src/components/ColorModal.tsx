import ColorController from '@/components/ColorController'
import { Button } from '@/components/ui/button'
import ColorFillIcon from '@/components/ui/ColorFillIcon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { useUpdateData } from '@/hooks/useUpdateData'
import { setBackgroundColor } from '@/redux/slices/colorSlice'
import { setCharacteristic } from '@/redux/slices/modelSlice'
import { store } from '@/redux/store'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ColorModal = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const backgroundColor = useAppSelector((store) => store.colorSlice.background)

  const [background, setBackground] = useState(backgroundColor)

  const { colorArraySize, displayData, updateArraySize } = useUpdateData()

  const onSaveClick = () => {
    dispatch(setBackgroundColor(background))

    const { stress, componentDisplay, otherCharacteristic, otherCharacteristicFileName } = store.getState().model

    if (otherCharacteristic !== null && otherCharacteristicFileName) {
      dispatch(setCharacteristic({ otherCharacteristic, fileName: otherCharacteristicFileName, colorArraySize }))
      displayData(otherCharacteristic)
    }

    if (stress !== null && componentDisplay !== 'none') {
      displayData(stress[componentDisplay])
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
            <div className="flex-center h-8 w-[197px] flex-row gap-11">
              <label className="flex h-8 w-[95px] items-center text-left text-sm">{t('colorSelect.colorCount')} </label>
              <input
                className="h-[18px] w-[58px] rounded-[2px] px-2 py-[2px] text-center text-xs"
                type="number"
                name="colorArraySize"
                id="colorArraySize"
                placeholder={`${colorArraySize}`}
                value={colorArraySize}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateArraySize(+e.target.value)}
              />
            </div>
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
