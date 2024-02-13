import { ITypeCities } from '@/types'
import { X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDate } from '@/helpers/helper'
import { useCities } from '@/context/CitiesContext'

const CityItem = ({ city }: { city: ITypeCities }) => {
  const { cityName, emoji, date, id, position } = city || {}
  const { currentCity, setMapPosition, deleteCity } = useCities()
  const navigate = useNavigate()

  function handleDeleteCity(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.preventDefault()
    deleteCity(id)
    navigate('/app/cities')
  }

  return (
    <li className={`rounded-xl border-l-4 border-primary bg-dark--2 ${id === currentCity?.id ? 'border-2' : ''}`}>
      <Link
        to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}
        className='flex justify-between px-6 py-4'
        onClick={() => {
          setMapPosition([position?.lat, position?.lng])
        }}
      >
        <div className='flex items-center gap-4'>
          <span className='rounded-xl bg-dark--1 px-4'>{emoji ?? ''}</span>
          <h3>{cityName ?? ''}</h3>
        </div>
        <div className='flex items-center gap-8'>
          <time>{formatDate(date ?? '')}</time>
          <button
            className='flex-center rounded-full bg-dark--0 p-2 transition-all hover:bg-secondary/60'
            onClick={handleDeleteCity}
          >
            <X className='size-8' />
          </button>
        </div>
      </Link>
    </li>
  )
}

export default CityItem
