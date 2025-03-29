import Legend from '@/components/Legend'
import legendReducer from '@/redux/slices/legendSlice'
import { LegendType } from '@/types/ModelCommonTypes'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, it } from 'vitest'

vi.mock('@/hooks/use-redux')

describe('Legend', () => {
  const mockLegend: LegendType[] = [
    {
      rangeStart: 1,
      rangeEnd: 10,
      color: [0.1599, 0.5476, 0.8]
    }
  ]

  it('should display items', () => {
    const store = configureStore({
      reducer: { legend: legendReducer },
      preloadedState: {
        legend: {
          legend: mockLegend,
          min: 1,
          max: 10,
          isLoaded: true
        }
      }
    })

    render(
      <Provider store={store}>
        <Legend />
      </Provider>
    )
  })
})
