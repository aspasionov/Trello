import { useState, useEffect } from 'react'

const useDebounce = (value: string, delay: number): string => {
  const [debValue, setDebValue] = useState('')

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebValue(value)
    }, delay)
    return () => {
      clearTimeout(interval)
    }
  }, [value])

  return debValue
}

export { useDebounce }
