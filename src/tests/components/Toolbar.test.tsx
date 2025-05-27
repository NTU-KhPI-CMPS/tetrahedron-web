import Toolbar from '@/components/Toolbar'
import modelViewSettingReducer from '@/redux/slices/modelViewSettingSlice'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, it } from 'vitest'

vi.mock('@/hooks/use-redux', () => {
  return {
    useAppSelector: () => {
      return { displacementComponents: ['x', 'y', 'z'] }
    },
    useAppDispatch: vi.fn()
  }
})

describe('Toolbar', () => {
  it('should render component correctly', () => {
    const store = configureStore({
      reducer: { modelViewSetting: modelViewSettingReducer }
    })

    const mockLoadStress = vi.fn()
    const mockLoadCharacteristic = vi.fn()

    render(
      <Provider store={store}>
        <Toolbar
          displacementLoaded={false}
          displacementFileName={''}
          stressLoaded={false}
          stressFileName={''}
          otherCharacteristicLoaded={false}
          otherCharacteristicFileName={''}
          loadStress={mockLoadStress}
          loadCharacteristic={mockLoadCharacteristic}
          loadDisplacement={vi.fn()}
        />
      </Provider>
    )
  })
})
