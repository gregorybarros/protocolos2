import axios from 'axios'

const token = localStorage.getItem('@CodeApi:token')

const api = axios.create({
    baseURL: 'http://192.168.15.10:3333',
    headers: {'Authorization': `Bearer ${token}`}
})


export default api