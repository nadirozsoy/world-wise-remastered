import services from '@/services'

export async function setCities() {
  const { data: res } = await services.cities.getCities()
  return res
}

export async function createCity(city) {
  const { data: res } = await services.cities.createCity(city)
  return res
}
