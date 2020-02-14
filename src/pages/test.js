import React, { useState, Text, Component } from 'react'
import logo from '../img/logoweb.png';
import api from '../services/api'

import './Login.css'



export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    let state = { errorMessage: null }
     async function handleSubmit(e) {
        try {
        e.preventDefault()


            const response = await api.post('/auth/auth', {
                email : '111111@134',
                senha: '11111'
            })
            
            //console.log(state)
            const { user, token} = response.data

            await localStorage.setItem(
                ['@CodeApi:token', token],
                ['@CodeApi:user', JSON.stringify(user)],
            )
    
        } catch (error) {
           this.setState({errorMessage: error.response.data})
        }
        }
    
        

    return (
        
        <div className="login-content">
            <img src={logo} alt="Ess" />
            {!!state.errorMessage && <Text>{state.errorMessage}</Text>}
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