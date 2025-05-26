import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'

type ButtonData = {
  tooltip: string
  icon: ReactNode
  action?: () => void
}

interface InstrumentsSidebarProps {
  buttonsData: ButtonData[]
}

const InstrumentsSidebar = ({ buttonsData }: InstrumentsSidebarProps) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0)

  const buttonClickHandler = (item: ButtonData, buttonIndex: number) => {
    setActiveButtonIndex(buttonIndex)
    item.action?.()
  }

  const buttons = buttonsData.map((item, index) => (
    <Tooltip key={item.tooltip}>
      <TooltipTrigger
        onClick={() => buttonClickHandler(item, index)}
        className={cn('group relative flex size-10 items-center justify-center text-xl duration-150 hover:text-white', {
          'text-white': index === activeButtonIndex
        })}
      >
        <div className="z-[1]">{item.icon}</div>
        <div
          className={cn('absolute size-0 rounded-full duration-150 group-hover:size-10 group-hover:bg-app-blue', {
            'size-10 bg-app-blue-dark': index === activeButtonIndex
          })}
        />
      </TooltipTrigger>
      <TooltipContent side="right" className="select-none capitalize">
        {item.tooltip}
      </TooltipContent>
    </Tooltip>
  ))

  return (
    <TooltipProvider>
      <div className="peer absolute left-3.5 z-10 flex max-h-[324px] w-[76px] flex-col items-center justify-center overflow-visible rounded-xl px-6 py-8 shadow-md backdrop-blur-sm">
        <div className="flex flex-col gap-[10px]">{buttons}</div>
      </div>
    </TooltipProvider>
  )
}

export default InstrumentsSidebar
