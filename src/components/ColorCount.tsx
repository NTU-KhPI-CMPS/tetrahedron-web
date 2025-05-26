import { ChangeEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ColorCountProps {
  array_size: number
  action: (value: number) => void
}

const ColorCount: FC<ColorCountProps> = ({ array_size, action }) => {
  const { t } = useTranslation()

  return (
    <div className="flex-center h-8 w-[197px] flex-row gap-11">
      <label className="flex h-8 w-[95px] items-center text-left text-sm">{t('colorSelect.colorCount')} </label>
      <input
        className="h-[18px] w-[58px] rounded-[2px] px-2 py-[2px] text-center text-xs"
        type="number"
        name="colorArraySize"
        id="colorArraySize"
        placeholder="colorArraySize"
        value={array_size}
        onChange={(e: ChangeEvent<HTMLInputElement>) => action(+e.target.value)}
      />
    </div>
  )
}

export default ColorCount
