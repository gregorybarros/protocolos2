import React, { useState, useEffect } from 'react'
import './Protocols.css'
import api from '../../services/api'
import {singleProtocol} from '../Api/Protocols'

export default function EditProtocols({match, history}) {
    const [protocol, setProtocol] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [client, setClient] = useState('')
    const [clients, setClients] = useState([])


    useEffect(() => {

        async function loadEdit() {
            try {

                const response = await singleProtocol(match.params.id)

            setProtocol(response.data)
            setTitle(response.data.title)
            setContent(response.data.content)
            setClient(response.data.client)

            const response2 = await api.get('/clients')
            setClients(response2.data)

        } catch (err) {
            history.push('/protocols')
        }

        } loadEdit()


    }, [match, history])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await api.put('/protocols/edit', {
                title,
                content,
                client,
                _id: protocol._id
            })
            history.push('/protocols')
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <>
            <div className="login-content">
                <h2>Editar protocolo:</h2><br />
                <form onSubmit={handleSubmit}>
                    <select value={!!client && client._id} name="client" id="client"
                    onChange={e => setClient(e.target.value)}
                    >
                        {!client && 
                        <option value="0">Defina um cliente</option> }
                        {clients.map(c => (                        
                            <option key={c._id}value={c._id}>{c.name}</option>

                            
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
                    <button type="submit">Editar!</button>
                </form>
            </div>
        </>
    )
}