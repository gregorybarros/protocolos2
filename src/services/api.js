import axios from 'axios'

const token = localStorage.getItem('@CodeApi:token')

const api = axios.create({
    baseURL: 'http://192.168.15.14:3000/',
    headers: {'Authorization': `Bearer ${token}`}
})


export default api