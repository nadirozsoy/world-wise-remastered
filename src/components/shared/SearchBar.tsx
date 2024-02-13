import { FC, useState } from 'react'
import { useSearchContext } from '@/context/SearchBarContext'

interface SearchBarProps {
  placeholder?: string
  className?: string
  onSearch: (value: string | null) => void
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = 'Arama yap', className = '', onSearch }) => {
  const { addSearchHistory, clearSearchHistory } = useSearchContext()
  const [search, setSearch] = useState('')
  const [result, setResult] = useState('')

  const handleSearch = () => {
    onSearch(search)
    addSearchHistory(search)
    setResult(search)
  }

  const handleClear = () => {
    onSearch(null)
    setSearch('')
    setResult('')
    clearSearchHistory()
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className='w-full text-sm'>
        <div className='relative'>
          <input
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={placeholder}
            className='w-full rounded-lg bg-dark--2 px-6 py-4 text-primary shadow'
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className='absolute bottom-0 right-0 top-0 cursor-pointer rounded-r-lg bg-primary px-4 py-2 text-white'
          >
            Search
          </button>
        </div>
      </div>
      {result && (
        <div className='line-clamp-1 flex max-w-lg cursor-pointer whitespace-nowrap text-sm hover:bg-primary/30'>
          <span className='rounded-md bg-primary px-2 py-1 text-white' onClick={handleClear}>
            {result}
          </span>
        </div>
      )}
    </div>
  )
}

export default SearchBar
