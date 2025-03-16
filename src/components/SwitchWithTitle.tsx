import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface SwitchWithTitleProps extends React.ComponentPropsWithoutRef<typeof Switch> {
  label: string
  labelStyles?: string
}

const SwitchWithTitle = ({ label, labelStyles, ...props }: SwitchWithTitleProps) => {
  return (
    <div className="flex items-center">
      <label htmlFor={props.id} className={cn('flex-1 cursor-pointer', labelStyles)}>
        {label}
      </label>
      <Switch id={props.id} {...props} />
    </div>
  )
}

export default SwitchWithTitle
