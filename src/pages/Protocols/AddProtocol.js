import React, { useState, useEffect } from 'react'
import './Protocols.css'
import api from '../../services/api'


export default function AddProtocol() {
    const [clients, setClients] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState([])
    const [client, setClient] = useState(0)

    useEffect(() => {

        async function loadClients() {

            const response = await api.get('/clients')
            setClients(response.data)
        } loadClients()

    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.post('/protocols/addprotocol', {
                client,
                title,
                content
            })
            setError([{ message: response.data.message }])

        }
        catch (err) {
            if (err.response.data.errors)
                return setError(err.response.data.errors)

            setError([{ message: err.response.data.message }])

        }


    }



    return (

        <div className="login-content">
            <h2>Novo protocolo:</h2><br />
            {error.map(err => (<span key={err.message}>{err.message}</span>))}
            <form onSubmit={handleSubmit}>
                <select name="client" id="client"
                    value={client}
                    onChange={e => setClient(e.target.value)}>
                    <option value={0}
                        onChange={e => setClient(e.target.value)}>
                        Escolha um cliente
                    </option>
                    {clients.map(client => (
                        <option key={client._id}
                            value={client._id}
                        >{client.name}</option>
                    ))}
                </select>
                <input name="title" type="text"
                    className="text" placeholder="Titulo"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea name="content" cols="30"
                    rows="10" className="textarea"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button type="submit">Criar!</button>
            </form>
        </div>


    )
}