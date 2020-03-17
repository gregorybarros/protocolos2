import React, { useState } from 'react'
import logo from '../../img/logoweb.png';
import pencil from '../../img/pencil.svg'
import api from '../../services/api'
import Card from 'react-bootstrap/Card'

import './Login.css'



export default function Login({history}) {
    
    const [erroAuth, setErroAuth] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
     async function handleSubmit(e) {
        try {
        e.preventDefault()

            const response = await api.post('/auth', {
                email : 'gregory.barros@hotmail.com',
                password: '123'
            })
            
            const { user, token} = response.data
            await localStorage.clear()
            await localStorage.setItem('@CodeApi:token', token)
            await localStorage.setItem('@CodeApi:user', JSON.stringify(user))
            const { id } = user

            history.push(`/main/${id}`, {user})
    
        } catch (err) {
            setErroAuth(err.response.data)
            
        }
        }
    

    return (
        
        <div className="login-content" style={{margin:'0', background:"#70a486"}}>
 
            <Card className="p-4 pb-5" style={{width:"350px", background:"#c9ddc7", boxShadow:'0px 5px 5px  #0005'}}>
            <a href="/main" className="d-flex"><img className="mx-auto mt-3" src={logo} alt="Ess" /></a>
            <div className="d-flex"><h1 className="ml-auto font-italic mb-3" style={{color:"#565c62"}}>Protocolos</h1>
            <img height="40" src={pencil} alt="Pencil" className="mr-auto ml-2"/>
            </div>
            {!!erroAuth.error && <span>{erroAuth.error}</span>}
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
            </Card>
        </div>
    )
}