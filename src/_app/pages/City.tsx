import { useCities } from '@/context/CitiesContext'
import { formatDate } from '@/helpers/helper'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../../components/shared/BackButton'
import Loader from '../../components/shared/Loader'

const City = () => {
  const { cityId } = useParams()
  const { currentCity, setCity, isLoading } = useCities()
  const { cityName, emoji, date, notes } = currentCity || {}

  useEffect(() => {
    setCity(Number(cityId))
  }, [])

  if (isLoading)
    return (
      <div className='grid place-items-center'>
        <Loader />
      </div>
    )

  return (
    <div className='space-y-12 rounded-xl bg-dark--2 p-8'>
      <div>
        <h6 className='text-base uppercase'>City name</h6>
        <h3 className='text-[2rem] font-semibold'>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      <div>
        <h6 className='text-base uppercase'>You went to lisbon on</h6>
        <h3 className='text-[2rem]'>{formatDate(String(date))}</h3>
      </div>
      <div>
        <h6 className='text-base uppercase'>Your notes</h6>
        <h3 className='text-[2rem]'>{notes === '' ? 'No data' : notes}</h3>
      </div>
      <div>
        <h6 className='text-base uppercase'>Learn more</h6>
        <Link
          to={`https://en.wikipedia.org/wiki/${cityName}`}
          className='text-[2rem] text-yellow-500 underline underline-offset-2'
          target='_blank'
        >
          Check out {cityName} on <span>Wikipedia &rarr;</span>
        </Link>
      </div>
      <BackButton />
    </div>
  )
}

export default City
