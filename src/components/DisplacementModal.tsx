import MultipleSelect from '@/components/MultipleSelect'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { AxisComponent, setDisplacementComponents, setDisplacementScale, setDisplay } from '@/redux/slices/modelSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsThreeDots } from 'react-icons/bs'
import { shallowEqual } from 'react-redux'

const DisplacementModal = () => {
  const [open, setOpen] = useState(false)
  const { display, displacementComponents, displacementScale } = useAppSelector((store) => store.model, shallowEqual)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [scale, setScale] = useState(displacementScale)

  const scaleLimit = 100000
  const components = [
    { value: 'x', selected: displacementComponents.includes('x') },
    { value: 'y', selected: displacementComponents.includes('y') },
    { value: 'z', selected: displacementComponents.includes('z') }
  ]

  const onSwitchClick = () => {
    dispatch(setDisplay(display === 'displacement' ? 'none' : 'displacement'))
  }

  const onSaveClick = () => {
    dispatch(setDisplacementScale(scale))
    setOpen(false)
  }

  const changeComponent = (components: AxisComponent[]) => {
    dispatch(setDisplacementComponents(components))
  }

  return (
    <Popover open={open}>
      <div className="flex items-center justify-center rounded-full border border-app-blue bg-soft px-1.5 text-app-blue duration-150 hover:bg-app-blue hover:text-soft">
        <PopoverTrigger onClick={() => setOpen(true)}>
          <BsThreeDots />
        </PopoverTrigger>
      </div>
      <PopoverContent
        side="left"
        sideOffset={185}
        className="w-80 space-y-3 rounded-xl bg-peach/50 p-3 font-semibold backdrop-blur-sm"
      >
        <p className="text-center">{t('displacementOptions.nodeDisplacement')}</p>
        <SwitchWithTitle
          checked={display === 'displacement'}
          label={t('displacementOptions.totalDisplacement')}
          onClick={onSwitchClick}
          id="general-displacement"
        />
        <div className="flex items-center justify-between">
          <p>{t('displacementOptions.displacementComponents')}</p>
          <MultipleSelect
            defaultItems={components}
            onItemSelected={(items) => {
              const componentsToUse = items.filter((item) => item.selected).map((i) => i.value as AxisComponent)
              changeComponent(componentsToUse)
            }}
            title={t('displacementOptions.selectComponent')}
          />
        </div>
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
            className="w-24 rounded-md bg-soft py-1 text-center text-coal-black outline-none hover:bg-gray-disabled"
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
