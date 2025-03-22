import useLocalStorage from '@/hooks/useLocalStorage'
import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.spyOn(global.Storage.prototype, 'getItem')
    vi.spyOn(global.Storage.prototype, 'setItem')
    vi.spyOn(global.console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('should initialize with default value if no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'))

    expect(result.current[0]).toBe('defaultValue')
    expect(localStorage.getItem).toHaveBeenCalledWith('testKey')
  })

  it('should initialize with stored value if it exists', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'))
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'))

    expect(result.current[0]).toBe('storedValue')
  })

  it('should update localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'))

    act(() => {
      result.current[1]('newValue')
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'))
    expect(result.current[0]).toBe('newValue')
  })

  it('should handle JSON parsing errors and return default value', () => {
    localStorage.setItem('testKey', '{invalidJson}')
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'))

    expect(result.current[0]).toBe('defaultValue')
    expect(console.log).toHaveBeenCalledWith(
      'useLocalStorage: error reading from localStorage',
      expect.any(SyntaxError)
    )
  })

  it('should handle localStorage setItem errors gracefully', () => {
    vi.spyOn(global.Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded')
    })

    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'))

    act(() => {
      result.current[1]('newValue')
    })

    expect(console.log).toHaveBeenCalledWith('useLocalStorage: error writing to localStorage', expect.any(Error))
  })
})
