import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ComponentDisplayVariants } from '@/redux/slices/modelSlice'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const COMPONENTS = [
  { value: 'qx', label: 'x' },
  { value: 'qy', label: 'y' },
  { value: 'qz', label: 'z' },
  { value: 'txy', label: 'xy' },
  { value: 'tyz', label: 'yz' },
  { value: 'tzx', label: 'xz' }
] as const

const componentItems = COMPONENTS.map(({ value, label }) => (
  <SelectItem key={value} value={value}>
    {label}
  </SelectItem>
))

export interface ComponentSelectorProps {
  value: ComponentDisplayVariants
  onChange: (value: ComponentDisplayVariants) => void
  disabled: boolean
}

export const StressComponentSelector: FC<ComponentSelectorProps> = ({ value, onChange, disabled }) => {
  const { t } = useTranslation()

  return (
    <Select onValueChange={onChange} value={value === 'none' ? undefined : value}>
      <SelectTrigger
        className="hover:bg-grey-disabled disabled:bg-light-grey h-9 w-64 border-none bg-white font-normal"
        disabled={disabled}
      >
        <SelectValue placeholder={t('stressOptions.selectComponent')} />
      </SelectTrigger>
      <SelectContent className="bg-white">{componentItems}</SelectContent>
    </Select>
  )
}
