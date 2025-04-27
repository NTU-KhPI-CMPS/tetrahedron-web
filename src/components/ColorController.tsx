import { ChangeEvent, FC } from 'react'

interface ColorControllerProps {
  state: string
  action: (value: string) => void
}

const ColorController: FC<ColorControllerProps> = ({ state, action }) => {
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    action(e.target.value)
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    action(e.target.value)
  }

  return (
    <div className="flex h-[17px] w-[156px] flex-row items-center justify-center gap-5">
      <label className="flex h-4 w-[55px] items-center text-left font-semibold">Фон:</label>
      <div className="flex h-[17px] w-[81px] flex-row items-center gap-1">
        <div className="relative">
          <input
            type="color"
            className="absolute inset-0 h-full w-full opacity-0"
            onChange={handleColorChange}
            value={state}
          />
          <div className="h-[15px] w-5 rounded-[2px] border-[0.5px] border-black" style={{ backgroundColor: state }} />
        </div>
        <input
          type="text"
          className="h-[17px] w-[57px] rounded-[2px] px-2 py-[2px] text-[10px] font-semibold"
          value={state}
          onChange={handleTextChange}
        />
      </div>
    </div>
  )
}

export default ColorController
