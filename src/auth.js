import api from '../services/api'

export const isAuthenticated = () => {
    
    const response = await api.post('/auth/auth', {
        email,
        senha
    })

}