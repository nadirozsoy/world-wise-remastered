import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000', data: {} })

export default instance
