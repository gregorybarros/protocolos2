import React, { useState, useEffect } from 'react'
import './Protocols.css'
import api from '../../services/api'

export default function Protocols() {

    const [protocols, setProtocols] = useState([])
    const [clients, setClients] = useState('')

    useEffect(() => {
        async function loadUser() {

            const response = await api.get('/protocols')

            setProtocols(response.data)


        } loadUser()

    }, [])


    return (

        <ul>
            <h2>Lista de protocolos:</h2><br />
            {protocols.map(protocol => (
                <li key={protocol._id}>
                    <div className="login-content">
                        <form>
                            <small>{protocol.client.name}</small><br />
                            <h4>{protocol.title}</h4>
                            <p>{protocol.content}</p>
                        </form><br />
                        <small>{protocol.createdAt}</small>
                    </div>
                </li>
            ))}
        </ul>

    )
}