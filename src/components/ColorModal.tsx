import ColorController from '@/components/ColorController'
import { Button } from '@/components/ui/button'
import ColorFillIcon from '@/components/ui/ColorFillIcon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { setBackgroundColor } from '@/redux/slices/colorSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ColorModal = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const backgroundColor = useAppSelector((store) => store.colorSlice.background)

  const [background, setBackground] = useState(backgroundColor)

  const onSaveClick = () => {
    dispatch(setBackgroundColor(background))
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
        className="z-10 flex w-[188px] flex-col items-center justify-center gap-[10px] rounded-xl bg-peach/50 px-4 py-5 shadow-md backdrop-blur-sm"
      >
        <div className="flex flex-col">
          <ColorController state={background} action={setBackground} />
        </div>

        <div className="flex items-center justify-center">
          <Button className="h-8 w-[92px] rounded-[66px] px-4 py-2" onClick={onSaveClick}>
            {t('colorselect.save')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ColorModal
