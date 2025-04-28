import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface SwitchWithTitleProps extends React.ComponentPropsWithoutRef<typeof Switch> {
  label: string
  labelStyles?: string
  disabled?: boolean
}

const SwitchWithTitle = ({ label, labelStyles, disabled, ...props }: SwitchWithTitleProps) => {
  return (
    <div className="flex w-[202px] items-center">
      <label
        htmlFor={props.id}
        className={cn('tetrahedron-text-sm w-full flex-1 cursor-pointer font-semibold leading-[16px]', labelStyles, {
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
