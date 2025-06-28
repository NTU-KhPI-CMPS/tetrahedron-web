import { StressComponentSelector } from '@/components/stress-modal/StressComponentSelector'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { setDisplay, setStressComponentToDisplay, StressDisplayVariants } from '@/redux/slices/modelSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsThreeDots } from 'react-icons/bs'

const StressModal = () => {
  const { t } = useTranslation()
  const display = useAppSelector((store) => store.model.componentDisplay)
  const dispatch = useAppDispatch()
  const stress = useAppSelector((store) => store.model.stress)
  const [isMises, setIsMises] = useState(display === 'mises')
  const [selectedComponent, setSelectedComponent] = useState<StressDisplayVariants>('none')

  const onSwitchClick = () => {
    setIsMises(!isMises)
  }

  const onSaveClick = () => {
    dispatch(setDisplay('stress'))

    if (isMises && stress !== null) {
      dispatch(setStressComponentToDisplay('mises'))
      return
    }

    if (selectedComponent !== 'none' && stress !== null) {
      dispatch(setStressComponentToDisplay(selectedComponent))
    }
  }

  return (
    <Popover>
      <div className="flex items-center justify-center rounded-full border border-app-blue bg-soft px-1.5 text-app-blue duration-150 hover:bg-app-blue hover:text-soft">
        <PopoverTrigger>
          <BsThreeDots />
        </PopoverTrigger>
      </div>
      <PopoverContent
        side="left"
        sideOffset={190}
        className="w-80 space-y-3 rounded-xl bg-peach/50 p-3 text-sm backdrop-blur-sm"
      >
        <p className="text-center font-medium">{t('stressOptions.elementStress')}</p>
        <SwitchWithTitle
          checked={isMises}
          label={t('stressOptions.elementMises')}
          id="general-stress"
          onClick={onSwitchClick}
        />
        <div className="flex items-center justify-between">
          <label>{t('stressOptions.stressComponent')}</label>
          <StressComponentSelector value={selectedComponent} onChange={setSelectedComponent} disabled={isMises} />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={onSaveClick} className="h-8 w-24 rounded-full font-normal">
            {t('stressOptions.save')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default StressModal
