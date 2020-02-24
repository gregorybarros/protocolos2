import React, { useState, useEffect } from 'react'
import './Protocols.css'
import api from '../../services/api'
import {singleProtocol, editProtocol} from '../Api/Protocols'
import {listClient} from '../Api/Clients'

export default function EditProtocols({match, history}) {
    const [protocol, setProtocol] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [client, setClient] = useState('')
    const [clients, setClients] = useState([])


    useEffect(() => {

        async function loadEdit() {
            try {

                const LoadSingleProt = await singleProtocol(match.params.id)

            setProtocol(LoadSingleProt.data)
            setTitle(LoadSingleProt.data.title)
            setContent(LoadSingleProt.data.content)
            setClient(LoadSingleProt.data.client)

            const LoadClientList = await listClient()
            setClients(LoadClientList.data)

        } catch (err) {
            history.push('/protocols')
        }

        } loadEdit()


    }, [match, history])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
           await editProtocol(title, content, client, protocol._id)
                
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