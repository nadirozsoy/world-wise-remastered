import { useEffect, useId, useMemo, useState } from 'react'
import Button from '../../components/shared/Button'
import BackButton from '../../components/shared/BackButton'
import axios from 'axios'
import { useUrlPosition } from '@/hooks/useUrlPosition'
import { useCities } from '@/context/CitiesContext'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'
import DatePicker from 'react-datepicker'
import { ITypeCities } from '@/types'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

const Form = () => {
  const Id = useId()
  const [lat, lng] = useUrlPosition()
  const { createCity } = useCities()
  const navigate = useNavigate()

  const [cityName, setCityName] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false)
  const [geocodingError, setGeocodingError] = useState<string>('')
  const [emoji, setEmoji] = useState<string>('')

  const position = useMemo(
    () => ({
      lat: lat ? parseFloat(lat) : 0,
      lng: lng ? parseFloat(lng) : 0
    }),
    [lat, lng]
  )

  useEffect(() => {
    if (!lat && !lng) return

    async function getGeocoding() {
      setIsLoadingGeocoding(true)
      setGeocodingError('')

      await axios
        .get(BASE_URL, {
          params: {
            latitude: lat,
            longitude: lng
          }
        })
        .then(res => {
          const data = res.data
          if (!data.countryCode) {
            throw new Error("That doesn't seem to be a city. Click somewhere else 😉")
          }

          setCityName(data.city || data.locality || '')
          setCountry(data.countryName)
          setEmoji(data.countryCode)
        })
        .catch(err => {
          setGeocodingError(err.message)
        })
        .finally(() => {
          setIsLoadingGeocoding(false)
        })
    }

    getGeocoding()
  }, [position])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newCity: ITypeCities = {
      cityName,
      country,
      emoji,
      date: date.toISOString(),
      notes,
      position,
      id: 0
    }

    try {
      await createCity(newCity)
    } catch (error) {
      console.error('An error occurred:', error)
    }
    navigate('/app/cities')
    // setVisibleSidebar(false)
  }

  if (isLoadingGeocoding)
    return (
      <div>
        <Loader />
      </div>
    )

  if (!lat && !lng) return <div>Geolocation not found</div>

  if (geocodingError) {
    return <Message message={geocodingError} />
  }

  return (
    <form className={'flex flex-col gap-6 rounded-xl bg-dark--2 p-8'} onSubmit={handleSubmit}>
      <div className={'relative flex flex-col gap-2 text-sm'}>
        <label htmlFor={Id + '-cityName'}>City name</label>
        <input
          id={Id + '-cityName'}
          className='rounded-lg p-2 text-dark--0'
          value={cityName}
          onChange={e => setCityName(e.target.value)}
        />
        {emoji && (
          <span className='absolute right-0 inline-block rounded-lg bg-light--1 px-4'>Country code:{emoji}</span>
        )}
      </div>

      <div className={'flex flex-col gap-2 text-sm'}>
        <label htmlFor={Id + '-date'}>When did you go to {}?</label>

        <DatePicker
          id={Id + 'date'}
          onChange={date => setDate(date || new Date())}
          selected={date}
          dateFormat='dd/MM/yyyy'
          className={'rounded-lg p-2 !text-sm text-dark--0'}
        />
      </div>

      <div className={'flex flex-col gap-2 text-sm'}>
        <label htmlFor={Id + '-notes'}>Notes about your trip to {'cityName'}</label>
        <textarea
          id={Id + '-notes'}
          className='resize-none rounded-lg p-2 text-dark--0'
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className='mt-9 flex justify-between'>
        <Button type='submit'>Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
