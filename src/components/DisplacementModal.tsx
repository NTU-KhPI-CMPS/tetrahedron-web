import SwitchWithTitle from '@/components/SwitchWithTitle'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { setDisplacementScale, setDisplay } from '@/redux/slices/modelSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsThreeDots } from 'react-icons/bs'

const DisplacementModal = () => {
  const display = useAppSelector((store) => store.model.display)
  const displacementScale = useAppSelector((store) => store.model.displacementScale)
  const dispatch = useAppDispatch()
  const [scale, setScale] = useState(displacementScale)
  const { t } = useTranslation()
  const scaleLimit = 100000

  const onSwitchClick = () => {
    dispatch(setDisplay(display === 'displacement' ? 'none' : 'displacement'))
  }

  const onSaveClick = () => {
    dispatch(setDisplacementScale(scale))
  }

  return (
    <Popover>
      <div className="flex h-[14px] w-6 items-center justify-center rounded-lg border-[0.3px] border-app-blue bg-soft px-[7px] py-[6px] text-xs text-app-blue duration-150 hover:bg-app-blue hover:text-soft">
        <PopoverTrigger>
          <BsThreeDots />
        </PopoverTrigger>
      </div>
      <PopoverContent
        side="left"
        sideOffset={185}
        className="w-80 space-y-3 rounded-xl bg-peach/50 p-3 backdrop-blur-sm"
      >
        <p className="text-center font-medium">{t('displacementOptions.nodeDisplacement')}</p>
        <SwitchWithTitle
          checked={display === 'displacement'}
          label={t('displacementOptions.totalDisplacement')}
          onClick={onSwitchClick}
          id="general-displacement"
        />
        <div className="flex items-center justify-between">
          <label htmlFor="displacement-scale">{t('displacementOptions.displacementScale')}</label>
          <input
            value={scale}
            type="number"
            onChange={(e) => {
              const newScale = Number(e.target.value)
              if (newScale <= scaleLimit) setScale(newScale)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSaveClick()
            }}
            placeholder={`${displacementScale}`}
            name="displacement-scale"
            id="displacement-scale"
            className="w-24 rounded-md bg-soft py-1 text-center text-coal-black outline-none hover:bg-grey-disabled"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={onSaveClick} className="h-79 mx-auto w-24 rounded-full">
            {t('displacementOptions.save')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DisplacementModal
