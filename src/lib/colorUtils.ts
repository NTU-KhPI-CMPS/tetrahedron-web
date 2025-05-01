import { LegendType } from '@/types/ModelCommonTypes'

export const COLOR_ARRAY_SIZE = 7
export const COLORS: number[][] = buildColorsForLegend(COLOR_ARRAY_SIZE)

export function generateLegend(minValue: number, maxValue: number): LegendType[] {
  const legend: LegendType[] = []

  const diapason: number = maxValue - minValue
  const chunkSize: number = diapason / COLOR_ARRAY_SIZE

  for (let i = 0; i < COLOR_ARRAY_SIZE; i++) {
    const rangeStart = minValue + chunkSize * i
    const rangeEnd = minValue + chunkSize * (i + 1)
    legend[i] = {
      rangeStart,
      rangeEnd,
      color: COLORS[i],
      lastValue: i === COLOR_ARRAY_SIZE - 1
    }
  }
  return legend
}

export function generateColorArray(values: number[], minValue: number, maxValue: number): number[] {
  const legend: LegendType[] = generateLegend(minValue, maxValue)
  const colors: number[] = []

  for (const value of values) {
    const colorsForValue = getColorFromLegend(value, legend)

    for (let j = 0; j < 4 * 3; j++) {
      colors.push(colorsForValue[0], colorsForValue[1], colorsForValue[2])
    }
  }

  return colors
}

function getColorFromLegend(value: number, legend: LegendType[]): number[] {
  for (let i = legend.length - 1; i >= 0; i--) {
    const legendItem = legend[i]
    if (value >= legendItem.rangeStart) {
      return legendItem.color
    }
  }

  console.error("Can't find color for value in legend.")

  return []
}

export function buildColorsForLegend(size: number) {
  const jump = 0.66 / size
  const colors: number[][] = []

  for (let i = 0; i < size; i++) {
    colors[size - i - 1] = HSVtoRGB(jump * i, 0.8, 0.8) || []
  }

  return colors
}

function HSVtoRGB(h: number, s: number, v: number) {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      return [v, t, p]
    case 1:
      return [q, v, p]
    case 2:
      return [p, v, t]
    case 3:
      return [p, q, v]
    case 4:
      return [t, p, v]
    case 5:
      return [v, p, q]
  }
}
