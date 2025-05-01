import Legend from '@/components/Legend'
import legend from '@/redux/slices/legendSlice.ts'
import { initialState, default as model, ModelDisplayVariants } from '@/redux/slices/modelSlice.ts'
import { LegendType } from '@/types/ModelCommonTypes'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'

describe('Legend', () => {
  const mockLegend: LegendType[] = [
    {
      rangeStart: 1,
      rangeEnd: 10,
      color: [0.1599, 0.5476, 0.8],
      lastValue: true
    }
  ]

  it('should display items', () => {
    const store = configureStore({
      reducer: { legend, model },
      preloadedState: {
        legend: {
          legend: mockLegend,
          min: 1,
          max: 10,
          isLoaded: true
        },
        model: { ...initialState, display: 'otherCharacteristic' as ModelDisplayVariants }
      }
    })

    render(
      <Provider store={store}>
        <Legend />
      </Provider>
    )

    expect(screen.queryByTestId('legend')).toBeInTheDocument()
    expect(screen.queryByTestId('legendItem')).toBeInTheDocument()
  })
})
