import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7000/api/v1',
    withCredentials: true
})

export default api