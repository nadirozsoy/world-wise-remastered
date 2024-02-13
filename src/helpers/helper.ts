import { LatLngExpression } from 'leaflet'
import { useMap, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

export const formatDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap()
  map.setView(position)
  return null
}

export function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
  return null
}
