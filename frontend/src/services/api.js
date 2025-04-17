import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// ใส่ token ทุก request ที่ส่งออก
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default api
