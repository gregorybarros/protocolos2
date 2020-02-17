import React, { useState, useEffect } from 'react'
import api from '../../services/api'

export default function EditProtocols({match, history}) {

    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [client, setClient] = useState('')


    useEffect(() => {

        async function loadEdit() {
            try {

            const response = await api.get(`/clients/${match.params.id}`)

            setName(response.data.name)
            setSlug(response.data.slug)
            setClient(response.data)

        } catch (err) {
            history.push('/clients')
        }

        } loadEdit()


    }, [match, history])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await api.put('/clients/edit', {
                name,
                slug,
                _id: client._id
            })
            history.push('/clients')
        } catch (err) {
            console.log(err)
        }

    }



    return (

        <div className="login-content">
            <h2>Editar cliente:</h2><br/>

            <form onSubmit={handleSubmit}>
                <input name="name" type="text"
                className="text" placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <input name="slug" type="text"
                className="text" placeholder="Slug"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                />
                <button type="submit" >Editar</button>
            </form>
        </div>

    )
}