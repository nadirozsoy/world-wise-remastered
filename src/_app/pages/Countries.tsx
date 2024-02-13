import { ITypeCities } from '@/types'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'
import CountryItem from '../../components/CountryItem'
import ItemLength from '../../components/shared/ItemLength'
import { useCities } from '@/context/CitiesContext'

const Countries = ({ className }: { className?: string }) => {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Loader />
  if (!cities.length) return <Message message='No cities found' />

  const uniqueCountries = cities.reduce((acc: { country: string; emoji: string; id: string }[], city: ITypeCities) => {
    if (!acc.find((c: { country: string; emoji: string }) => c.country === city.country)) {
      acc.push({ country: city.country, emoji: city.emoji, id: String(city.id) })
    }
    return acc
  }, [])

  return (
    <div className='flex flex-col'>
      <ul className={`grid max-h-[calc(100vh-40rem)] gap-4 overflow-y-auto text-sm ${className ?? ''}`}>
        {uniqueCountries.map((country: { country: string; emoji: string; id: string }) => (
          <CountryItem key={country.country} country={country} />
        ))}
      </ul>
      <ItemLength desc='countries listed.' length={uniqueCountries.length} />
    </div>
  )
}

export default Countries
