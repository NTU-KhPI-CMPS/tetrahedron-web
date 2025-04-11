import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppSelector } from '@/hooks/use-redux'
import { ComponentDisplayVariants } from '@/redux/slices/modelSlice'
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
}

export function ComponentSelector({ value, onChange }: ComponentSelectorProps) {
  const display = useAppSelector((store) => store.model.componentDisplay)

  const { t } = useTranslation()

  return (
    <Select onValueChange={onChange} value={value === 'none' ? undefined : value}>
      <SelectTrigger
        className="h-9 w-64 overflow-auto bg-white hover:border-input disabled:bg-light-grey"
        disabled={display === 'Mises'}
      >
        <SelectValue placeholder={t('stressOptions.selectComponent')} className="font-semibold" />
      </SelectTrigger>
      <SelectContent className="bg-white font-semibold">{componentItems}</SelectContent>
    </Select>
  )
}
