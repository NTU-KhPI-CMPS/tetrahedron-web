import MultipleSelect, { SelectItem } from '@/components/MultipleSelect'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { AxisComponent, setDisplacementComponents, setDisplacementScale } from '@/redux/slices/modelSlice'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsThreeDots } from 'react-icons/bs'
import { shallowEqual } from 'react-redux'

const DisplacementModal = () => {
  const [open, setOpen] = useState(false)
  const { displacementComponents, displacementScale } = useAppSelector((store) => store.model, shallowEqual)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const allComponents = ['x', 'y', 'z']
  const isTotalDisplacement = allComponents.every((component) =>
    displacementComponents.includes(component as AxisComponent)
  )

  const [scale, setScale] = useState(displacementScale)
  const [totalDisplacement, setTotalDisplacement] = useState(isTotalDisplacement)
  const [currentDisplacementComponents, setCurrentDisplacementComponents] = useState(displacementComponents)

  const scaleLimit = 100000
  const components = [
    { value: 'x', selected: currentDisplacementComponents.includes('x') },
    { value: 'y', selected: currentDisplacementComponents.includes('y') },
    { value: 'z', selected: currentDisplacementComponents.includes('z') }
  ]
  const usedComponents = displacementComponents.reduce((acc, current) => `${acc}, ${current}`, '').replace(',', '')
  const componentsSelectorTitle = isTotalDisplacement ? t('displacementOptions.selectComponent') : usedComponents

  const onSaveClick = () => {
    dispatch(setDisplacementScale(scale))
    dispatch(setDisplacementComponents(currentDisplacementComponents))
    setOpen(false)
  }

  const changeDisplacementComponents = (components: AxisComponent[]) => {
    setCurrentDisplacementComponents(components)
  }

  const onSwitchClick = () => {
    setTotalDisplacement(!totalDisplacement)
    changeDisplacementComponents(allComponents as AxisComponent[])
  }

  const onComponentSelected = (items: SelectItem[]) => {
    const componentsToUse = items.filter((item) => item.selected).map((i) => i.value as AxisComponent)
    changeDisplacementComponents(componentsToUse)
  }

  const onScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newScale = Number(e.target.value)
    if (newScale <= scaleLimit) setScale(newScale)
  }

  const onScaleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSaveClick()
  }

  return (
    <Popover open={open}>
      <div className="flex h-[14px] w-6 items-center justify-center rounded-lg border-[0.3px] border-app-blue bg-soft px-[7px] py-[6px] text-xs text-app-blue duration-150 hover:bg-app-blue hover:text-soft">
        <PopoverTrigger onClick={() => setOpen(true)}>
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
          checked={totalDisplacement}
          label={t('displacementOptions.totalDisplacement')}
          onClick={onSwitchClick}
          id="general-displacement"
        />
        <div className="flex items-center justify-between text-sm">
          <p>{t('displacementOptions.displacementComponents')}</p>
          <MultipleSelect
            disabled={totalDisplacement}
            defaultItems={components}
            onItemSelected={onComponentSelected}
            title={componentsSelectorTitle}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="displacement-scale">{t('displacementOptions.displacementScale')}</label>
          <input
            value={scale}
            type="number"
            onChange={onScaleChange}
            onKeyDown={onScaleInputKeyDown}
            placeholder={displacementScale.toString()}
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
