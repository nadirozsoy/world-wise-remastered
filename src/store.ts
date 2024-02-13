import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './features/city/citySlice'

const store = configureStore({
  reducer: {
    city: cityReducer
  }
})

export default store
