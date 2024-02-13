import { useNavigate } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useCities } from '@/context/CitiesContext'
import { ITypeCities } from '@/types'
import { ChangeCenter, DetectClick } from '@/helpers/helper'
import { useEffect } from 'react'
import { useGeolocation } from '@/hooks/useGeolocation'
import Button from './shared/Button'
import { useUrlPosition } from '@/hooks/useUrlPosition'
import { useAuth } from '@/context/AuthContext'

const Map = () => {
  const { cities, setVisibleSidebar, setCurrentCity, setMapPosition, mapPosition } = useCities()
  const { logout, user } = useAuth()
  const { error, getPosition, isLoading: isLoadingPosition, position: geolocationPosition } = useGeolocation()
  const [lat, lng] = useUrlPosition()
  const navigate = useNavigate()

  const handleMarkerClick = (city: ITypeCities) => {
    navigate(`cities/${city.id}?lat=${city?.position?.lat}&lng=${city?.position?.lng}`)
    setMapPosition([city?.position?.lat, city?.position?.lng])
    setVisibleSidebar(true)
    setCurrentCity(city)
  }

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([Number(lat), Number(lng)])
      setVisibleSidebar(true)
    } else if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition, lat, lng])

  return (
    <div className='relative h-full'>
      {!geolocationPosition && (
        <Button onClick={getPosition} className='absolute bottom-10 right-10 z-[1000]'>
          {isLoadingPosition ? 'Loading...' : error ? 'Error' : 'My Location'}
        </Button>
      )}
      <Button onClick={logout} className='absolute right-10 top-10 z-[1000]'>
        {user?.email} - Logout
      </Button>
      <MapContainer center={mapPosition} zoom={8} scrollWheelZoom={true} className='h-dvh'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities.map((city: ITypeCities) => (
          <Marker
            key={city?.id}
            position={[city?.position?.lat, city?.position?.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(city)
            }}
          >
            <Popup>
              <div className='flex flex-col gap-2'>
                <h6 className='text-base uppercase'>City name</h6>
                <h3 className='text-[2rem] font-semibold'>
                  <span>{city?.emoji}</span> {city?.cityName}
                </h3>
              </div>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

export default Map
