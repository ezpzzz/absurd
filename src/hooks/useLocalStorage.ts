import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }
      const item = window.localStorage.getItem(key)
      // For theme mode, store as plain string, not JSON
      if (key === 'color-mode' && item) {
        return item as T
      }
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        // For theme mode, store as plain string
        if (key === 'color-mode') {
          window.localStorage.setItem(key, valueToStore as string)
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue] as const
}

export const getLocalStorageItem = (key: string): string | null => {
  try {
    if (typeof window === 'undefined') {
      return null
    }
    return window.localStorage.getItem(key)
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return null
  }
}

export const setLocalStorageItem = (key: string, value: string): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false
    }
    window.localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
    return false
  }
}