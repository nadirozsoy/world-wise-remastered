import { useState } from 'react'

type Position = {
  lat: number
  lng: number
}

type UseGeolocationResult = {
  isLoading: boolean
  position: Position | null
  error: string | null
  getPosition: () => void
}

export function useGeolocation(defaultPosition: Position | null = null): UseGeolocationResult {
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState<Position | null>(defaultPosition)
  const [error, setError] = useState<string | null>(null)

  function getPosition() {
    // event.stopPropagation()
    if (!navigator.geolocation) {
      setError('Your browser does not support geolocation')
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
        setIsLoading(false)
      },
      error => {
        setError(error.message)
        setIsLoading(false)
      }
    )
  }

  return { isLoading, position, error, getPosition }
}
