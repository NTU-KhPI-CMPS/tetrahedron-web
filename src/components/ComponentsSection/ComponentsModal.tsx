import { ComponentSelector } from '@/components/ComponentsSection/ComponentSelector'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { ComponentDisplayVariants, setComponentDisplay } from '@/redux/slices/modelSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsThreeDots } from 'react-icons/bs'

const ComponentsModal = () => {
  const display = useAppSelector((store) => store.model.componentDisplay)
  const dispatch = useAppDispatch()

  const onSwitchClick = () => {
    dispatch(setComponentDisplay(display === 'Mises' ? 'none' : 'Mises'))
  }

  const [selectedComponent, setSelectedComponent] = useState<ComponentDisplayVariants>('none')

  const onSaveClick = () => {
    if (selectedComponent !== 'none') dispatch(setComponentDisplay(selectedComponent))
  }

  const { t } = useTranslation()

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
        className="w-80 space-y-3 rounded-xl bg-peach/50 p-3 font-semibold backdrop-blur-sm"
      >
        <p className="text-center">{t('stressOptions.elementStress')}</p>
        <SwitchWithTitle
          checked={display === 'Mises'}
          label={t('stressOptions.elementMises')}
          id="general-stress"
          onClick={onSwitchClick}
        />
        <div className="flex items-center justify-between">
          <label>{t('stressOptions.stressComponent')}</label>
          <ComponentSelector value={selectedComponent} onChange={setSelectedComponent} />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={onSaveClick} className="h-79 mx-auto w-24 rounded-full">
            {t('stressOptions.save')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ComponentsModal
