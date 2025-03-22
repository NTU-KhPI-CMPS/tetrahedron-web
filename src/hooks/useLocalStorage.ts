import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const storedState = localStorage.getItem(key)
      return storedState ? JSON.parse(storedState) : defaultValue
    } catch (error) {
      console.log('useLocalStorage: error reading from localStorage', error)
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.log('useLocalStorage: error writing to localStorage', error)
    }
  }, [key, state])

  return [state, setState] as const
}

export default useLocalStorage
