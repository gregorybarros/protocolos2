import React, { useState } from 'react'
import logo from '../img/logoweb.png';
import api from '../services/api'

import './Login.css'



export default function Login({history}) {
    const [erroauth, setErroauth] = useState('')
    const [usuario, setUsuario] = useState(localStorage.getItem('@CodeApi:token'))
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
     async function handleSubmit(e) {
        try {
        e.preventDefault()


            const response = await api.post('/auth/auth', {
                email : '111111@134',
                senha: '111111'
            })
            
            const { user, token} = response.data
            await localStorage.clear()
            await localStorage.setItem('@CodeApi:token', token)
            await localStorage.setItem('@CodeApi:user', JSON.stringify(user))
            const { _id } = user
            
            history.push(`/main/${_id}`, {user})
    
        } catch (error) {
           //setErroauth(error.response.data)
        }
        }
    
        

    return (
        
        <div className="login-content">
            <img src={logo} alt="Ess" />
            {!!erroauth.error && <span>{erroauth.error}</span>}
            <form onSubmit={handleSubmit}>
                <input type="email" className="text" placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="text" placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                />
                <button type="submit">Entrar!</button>
            </form>
        </div>
    )
}