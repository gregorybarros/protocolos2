import React, { useState, useEffect } from 'react'
import api from '../../services/api'

export default function Clients() {

    const [clients, setClients] = useState([])

    useEffect(() => {
        async function loadUser() {

            const response = await api.get('/clients')

            setClients(response.data)

        } loadUser()

    }, [])


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
                    </div>
                </li>
            ))}
        </ul>

    )
}