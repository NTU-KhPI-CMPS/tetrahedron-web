import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface SwitchWithTitleProps extends React.ComponentPropsWithoutRef<typeof Switch> {
  label: string
  labelStyles?: string
  disabled?: boolean
}

const SwitchWithTitle = ({ label, labelStyles, disabled, ...props }: SwitchWithTitleProps) => {
  return (
    <div className="flex w-full items-center">
      <label
        htmlFor={props.id}
        className={cn('w-full flex-1 cursor-pointer text-sm leading-[16px]', labelStyles, {
          'cursor-not-allowed': disabled
        })}
      >
        {label}
      </label>
      <Switch disabled={disabled} id={props.id} {...props} />
    </div>
  )
}

export default SwitchWithTitle
