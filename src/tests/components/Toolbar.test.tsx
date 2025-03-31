import Toolbar from '@/components/Toolbar'
import modelReducer from '@/redux/slices/modelSlice'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, it } from 'vitest'

describe('Toolbar', () => {
  it('should render component correctly', () => {
    const store = configureStore({
      reducer: { model: modelReducer }
    })

    const mockLoadStress = vi.fn()
    const mockLoadCharacteristic = vi.fn()

    render(
      <Provider store={store}>
        <Toolbar
          displayNodeIndices={false}
          displacementLoaded={false}
          displacementFileName={''}
          stressLoaded={false}
          stressFileName={''}
          otherCharacteristicLoaded={false}
          otherCharacteristicFileName={''}
          loadStress={mockLoadStress}
          loadCharacteristic={mockLoadCharacteristic}
          onNodeIndicesSwitchClick={() => {
            return
          }}
          loadDisplacement={() => {
            return
          }}
        />
      </Provider>
    )
  })
})
