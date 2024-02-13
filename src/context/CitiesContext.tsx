import { ITypeCities } from '@/types'
import { LatLngExpression } from 'leaflet'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'sonner'
import services from '@/services'

const INITIAL_STATE = {
  cities: [],
  isLoading: false,
  currentCity: null,
  setCity: async () => {},
  createCity: async () => {},
  deleteCity: async () => {},
  visibleSidebar: false,
  mapPosition: [51.505, -0.09] as LatLngExpression,
  error: '',
  setCurrentCity: () => {},
  setVisibleSidebar: () => {},
  setMapPosition: () => {}
}

type ICitiesContextType = {
  cities: ITypeCities[]
  isLoading: boolean
  currentCity: ITypeCities | null
  setCity: (id: number) => Promise<void>
  createCity: (city: ITypeCities) => Promise<void>
  deleteCity: (id: number) => Promise<void>
  visibleSidebar: boolean
  mapPosition: LatLngExpression
  error: string
  setCurrentCity: (city: ITypeCities) => void
  setVisibleSidebar: (visible: boolean) => void
  setMapPosition: (position: LatLngExpression) => void
}

const CitiesContext = createContext<ICitiesContextType>(INITIAL_STATE)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: ICitiesContextType, action: any) {
  switch (action.type) {
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: null
      }
    case 'visibleSidebar':
      return {
        ...state,
        visibleSidebar: action.payload
      }
    case 'mapPosition':
      return {
        ...state,
        mapPosition: action.payload
      }
    case 'loading':
      return {
        ...state,
        isLoading: true
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ cities, isLoading, currentCity, error, visibleSidebar, mapPosition }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  )

  useEffect(() => {
    async function setCities() {
      dispatch({ type: 'loading' })
      await services.cities
        .getCities()
        .then(res => {
          dispatch({ type: 'cities/loaded', payload: res.data })
          toast.success('Event has been created', {
            description: `${new Date().toLocaleString()}`,
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo')
            }
          })
        })
        .catch(error => {
          dispatch({ type: 'rejected', payload: error.message })
          toast.error(error.message)
        })
    }
    setCities()
  }, [])

  async function setCity(id: number) {
    dispatch({ type: 'loading' })
    await services.cities
      .getCity(id)
      .then(res => {
        dispatch({ type: 'city/loaded', payload: res.data })
        toast.success('Event has been created', {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          }
        })
      })
      .catch(error => {
        dispatch({ type: 'rejected', payload: error.message })
        toast.error(error.message)
      })
  }

  async function createCity(city: ITypeCities) {
    dispatch({ type: 'loading' })
    await services.cities
      .createCity(city)
      .then(res => {
        dispatch({ type: 'city/created', payload: res.data })
        toast.success('Event has been created', {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          }
        })
      })
      .catch(error => {
        dispatch({ type: 'rejected', payload: error.message })
        toast.error(error.message)
      })
  }

  async function deleteCity(id: number) {
    dispatch({ type: 'loading' })
    await services.cities
      .deleteCity(id)
      .then(() => {
        dispatch({ type: 'city/deleted', payload: id })
        toast.success('Event has been created', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          }
        })
      })
      .catch(error => {
        dispatch({ type: 'rejected', payload: error.message })
        toast.error(error.message)
      })
  }

  const setCurrentCity = (city: ITypeCities) => {
    dispatch({ type: 'city/loaded', payload: city })
  }

  const setVisibleSidebar = (visible: boolean) => {
    dispatch({ type: 'visibleSidebar', payload: visible })
  }

  const setMapPosition = (position: LatLngExpression) => {
    dispatch({ type: 'mapPosition', payload: position })
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCity,
        error,
        visibleSidebar,
        setVisibleSidebar,
        setCurrentCity,
        setMapPosition,
        mapPosition,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

export function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) {
    throw new Error(`useCities must be used within a CitiesProvider`)
  }
  return context
}
