// Based on https://usehooks-ts.com/react-hook/use-read-local-storage

import {useCallback, useEffect, useState} from 'react'
import {useEventListener} from 'usehooks-ts'

type Value<T> = T | null

export function useReadLocalStorage<T>(
  key: string,
  shouldRead = true,
): Value<T> {
  const readValue = useCallback((): Value<T> => {
    if (typeof window === 'undefined' || !shouldRead) {
      return null
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return null
    }
  }, [key, shouldRead])

  const [storedValue, setStoredValue] = useState<Value<T>>(
    shouldRead ? readValue : null,
  )

  useEffect(() => {
    if (shouldRead) {
      setStoredValue(readValue())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRead])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }
      if (shouldRead) {
        setStoredValue(readValue())
      }
    },
    [key, readValue, shouldRead],
  )

  useEventListener('storage', handleStorageChange)
  useEventListener('local-storage', handleStorageChange)

  return storedValue
}
