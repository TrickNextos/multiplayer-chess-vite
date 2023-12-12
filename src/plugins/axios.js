import axios from 'axios'

let axiosCustom = axios.create({
    baseURL: 'http://localhost:5678',
    withCredentials: true,
  })

axiosCustom.defaults.headers.common['Authorization'] =
  localStorage.getItem('accessToken')

export default axiosCustom
