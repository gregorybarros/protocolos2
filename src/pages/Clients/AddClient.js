import React, {useState} from 'react'
import api from '../../services/api'

export default function AddClients({history}){

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    
    async function handleSubmit(e){

        try {

            e.preventDefault()

            const response = await api.post('/clients/addclient', {
                name,
                slug
            })

            setError(response.data)
            history.push('/clients')
        }
        catch (err) {

            setError(err.response.data)

        }
        

    }   
     
    
    return (

        <div className="login-content">
            <h2>Novo cliente:</h2><br/>
            {!!error.message && <span>{error.message}</span>}
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
                <button type="submit">Criar</button>
            </form>
        </div>

    
        )
}