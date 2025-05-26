interface ColorPickerProps {
  title?: string
  defaultColor?: string
}

const ColorPicker = ({ title, defaultColor = '000000' }: ColorPickerProps) => {
  return (
    <div className="flex items-center justify-between gap-1">
      {title && <p>{title}</p>}
      <div className="flex items-center gap-2">
        <div className="size-5 rounded-md bg-black"></div>
        <p>{defaultColor}</p>
      </div>
    </div>
  )
}

export default ColorPicker
