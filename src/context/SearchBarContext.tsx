import { createContext, useContext, FC, ReactNode, useState } from 'react'

interface SearchHistoryContextType {
  history: string[]
  addSearchHistory: (search: string) => void
  clearSearchHistory: () => void
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined)

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchHistoryArray, setSearchHistoryArray] = useState<string[]>([])

  const addSearchHistory = (search: string) => {
    if (searchHistoryArray.includes(search) || search === '') return
    setSearchHistoryArray([search, ...searchHistoryArray.slice(0, 5)])
  }

  const clearSearchHistory = () => {
    setSearchHistoryArray([])
  }

  const contextValue: SearchHistoryContextType = {
    history: searchHistoryArray,
    addSearchHistory,
    clearSearchHistory
  }

  return <SearchHistoryContext.Provider value={contextValue}>{children}</SearchHistoryContext.Provider>
}

export const useSearchContext = (): SearchHistoryContextType => {
  const context = useContext(SearchHistoryContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
