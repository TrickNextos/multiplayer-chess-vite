import axios from 'axios'

let axiosCustom = axios.create({
    baseURL: 'http://localhost:5678',
    withCredentials: true,
  })


export default axiosCustom
