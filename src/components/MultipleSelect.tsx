import OutsideClickHandler from '@/components/OutsideClickHandler'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

export type SelectItem = {
  value: string
  selected: boolean
}

interface MultipleSelectProps {
  title: string
  defaultItems: SelectItem[]
  disabled?: boolean
  onItemSelected: (items: SelectItem[]) => void
}

const MultipleSelect = ({ title, defaultItems, disabled = false, onItemSelected }: MultipleSelectProps) => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<SelectItem[]>(defaultItems)

  const onItemClick = (item: SelectItem) => {
    const newItems = items.map((i) => (i.value === item.value ? { ...item, selected: !item.selected } : i))
    setItems(newItems)
    onItemSelected(newItems)
  }

  useEffect(() => {
    setItems(defaultItems)
  }, [defaultItems])

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger disabled={disabled} asChild onClick={() => setOpen(!open)}>
        <Button
          className="space-x-3 bg-soft p-2 text-coal-black hover:bg-gray-disabled disabled:bg-light-gray"
          variant="outline"
        >
          <p>{title}</p>
          <IoIosArrowUp
            className={cn('transition-transform duration-150', {
              'rotate-180': open
            })}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <OutsideClickHandler callback={() => setOpen(!open)}>
          {items.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.value}
              checked={item.selected}
              onCheckedChange={() => onItemClick(item)}
            >
              {item.value}
            </DropdownMenuCheckboxItem>
          ))}
        </OutsideClickHandler>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MultipleSelect
