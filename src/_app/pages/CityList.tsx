import { ITypeCities } from '@/types'
import Loader from '@/components/shared/Loader'
import CityItem from '@/components/CityItem'
import Message from '@/components/shared/Message'
import ItemLength from '@/components/shared/ItemLength'
import { useCities } from '@/context/CitiesContext'
import SearchBar from '@/components/shared/SearchBar'
import axios from 'axios'

const pagination: Pagination = {
  page: 1,
  pageSize: 10,
  search: null
}
type Pagination = {
  page: number
  pageSize: number
  search: string | null
}

const clearPagination = () => {
  pagination.page = 1
  pagination.pageSize = 10
}

const CityList = ({ className }: { className?: string }) => {
  // This searchbar works with a real api search query
  const handleSearch = async (value: string | null) => {
    pagination.search = value
    clearPagination()

    const { page, pageSize, search } = pagination

    await axios.get('https://getUrl', {
      params: {
        page: page,
        pageSize: pageSize,
        search: search
      }
    })
  }

  const { cities, isLoading } = useCities()

  if (isLoading) return <Loader />
  if (!cities.length) return <Message message='No cities found' />

  return (
    <div className='grid'>
      <SearchBar
        onSearch={(value: string | null) => handleSearch(value || null)}
        placeholder='Search for a city'
        className='sticky top-0 mb-4 w-full p-2'
      />
      <ul className={`grid max-h-[calc(100vh-40rem)] gap-4 overflow-y-auto text-sm ${className ?? ''}`}>
        {cities.map((city: ITypeCities) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
      <ItemLength desc='countries listed.' length={cities.length} />
    </div>
  )
}

export default CityList
