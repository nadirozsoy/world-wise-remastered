import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import services from '@/services'
import { ITypeCities } from '@/types'
import { toast } from 'sonner'

interface CityState {
  cities: string[]
  status: 'idle' | 'loading' | 'error'
  error: string | null
  message: string | null
}

const initialState: CityState = {
  cities: [],
  status: 'idle',
  error: null,
  message: null
}
export const setCities = createAsyncThunk('city/setCities', async (_, { rejectWithValue }) => {
  try {
    const { data: res } = await services.cities.getCities()
    return res
  } catch (error) {
    return rejectWithValue('There was a problem getting your address. Make sure to fill this field!')
  }
})

export const createCity = createAsyncThunk('city/createCity', async (city: ITypeCities, { rejectWithValue }) => {
  try {
    const { data: res } = await services.cities.createCity(city)
    return res
  } catch (error) {
    return rejectWithValue('There was a problem getting your address. Make sure to fill this field!')
  }
})

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    // updateName(state, action) {
    //   state.username = action.payload
    // }
  },
  extraReducers: builder =>
    builder
      .addCase(setCities.pending, state => {
        state.status = 'loading'
      })
      .addCase(setCities.fulfilled, (state, action) => {
        state.cities = action.payload
        console.log(action)

        state.message = 'Cities loaded successfully'
        toast.success(state.message)
        state.status = 'idle'
      })
      .addCase(setCities.rejected, state => {
        state.status = 'error'
        state.error = 'There was a problem getting your address. Make sure to fill this field!'
      })
      .addCase(createCity.pending, state => {
        state.status = 'loading'
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.cities = [...state.cities, action.payload]
        toast.success(state.message)
        state.status = 'idle'
      })
      .addCase(createCity.rejected, state => {
        state.status = 'error'
        state.error = 'There was a problem getting your address. Make sure to fill this field!'
      })
})

// export const { updateName } = citySlice.actions

export default citySlice.reducer

export const getCities = (state: { city: CityState }) => state.city.cities
export const getCitiesStatus = (state: { city: CityState }) => state.city.status
export const getCitiesError = (state: { city: CityState }) => state.city.error
