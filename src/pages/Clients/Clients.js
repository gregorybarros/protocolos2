import React, { useState, useEffect } from 'react'
import api from '../../services/api'

export default function Clients() {

    const [clients, setClients] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
        async function loadUser() {

            const response = await api.get('/clients')

            setClients(response.data)

        } loadUser()

    }, [msg])
    
    async function deleteProt(e) {
        try{

            api.delete(`/clients/delete/${e}`)
            setMsg('Cliente deletado com sucesso!')
        } catch (err){
            setMsg('Houve um erro ao deletar cliente!')

        }
    }

    return (

        <ul>
            <h2>Lista de clientes:</h2><br />
            {clients.map(client => (
                <li key={client._id}>
                    <div className="login-content">
                        <form>
                            <h4>{client.name}</h4><br />
                            <small>{client.slug}</small>
                        </form><br />
                        <small>{client.createdAt}</small>
                        <a href={`/clients/edit/${client._id}`}>
                        <button type="button">Editar</button></a>
                        <button 
                        type="button"
                        onClick={e => deleteProt(client._id)}
                        >Deletar</button>
                    </div>
                </li>
            ))}
        </ul>

    )
}