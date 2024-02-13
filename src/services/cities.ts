import instance from '@/config/instance'
import { ITypeCities } from '@/types'

export default {
  getCities() {
    return instance.get('/cities')
  },
  getCity(id: number) {
    return instance.get(`/cities/${id}`)
  },
  createCity(city: ITypeCities) {
    return instance.post('/cities', city)
  },
  deleteCity(id: number) {
    return instance.delete(`/cities/${id}`)
  }
}
