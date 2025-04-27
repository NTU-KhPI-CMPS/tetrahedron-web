import LegendItem from '@/components/LegendItem'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'

describe('LegendItem', () => {
  const mockColor = [0.1599, 0.5476, 0.8]
  const mockStart = 0.00000579417
  const mockEnd = 0.00627761

  const mockReducer = (state = { max: mockEnd }) => state

  const store = configureStore({
    reducer: { legend: mockReducer },
    preloadedState: {
      legend: { max: mockEnd }
    }
  })

  it('should accept values and render component', () => {
    render(
      <Provider store={store}>
        <LegendItem color={mockColor} rangeStart={mockStart} rangeEnd={mockEnd} />
      </Provider>
    )

    expect(screen.queryByTestId('legendItem')).toBeInTheDocument()
  })
})
