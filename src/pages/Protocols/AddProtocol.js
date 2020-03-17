import React, { useState, useEffect } from 'react'
import {listClient} from '../Api/Clients'

// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import api from '../../services/api'


export default function AddProtocol(props) {

    const [user] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))

    const [showNew, setShowNew] = useState(false);
    const handleCloseNew = () => setShowNew(false);
    const handleShowNew = () => setShowNew(true)

    const [clients, setClients] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState([])
    const [client, setClient] = useState('')

    useEffect(() => {

        async function loadClients() {
            setClient(props.client)

            const response = await listClient()
            setClients(response.data)
            
        } loadClients()

    }, [])

    async function handleSubmit(e) {

        try {
            const response = await api.post('/protocols', {
                client,
                title,
                content,
                user:user.id
            })
            handleCloseNew()
            setError([{ message: response.data.message }])

        }
        catch (err) {
            e.preventDefault()
            if (err.response.data.errors)
                return setError(err.response.data.errors)

            setError([{ message: err.response.data.message }])

        }


    }



    return (
        <><div name="divnavbar" id="divnavbar">
            <div name="divbutton" id="divbutton"><Button 
    variant="warning pb-3 pt-3" style={{height:'100%', width:'100%', background:'#f5c13d'}} 
    type="button"
    onClick={handleShowNew}>
     <strong>Novo!</strong>
    </Button></div></div>
  <Modal className="text-secondary" show={showNew} onHide={handleCloseNew}>
        <Modal.Header className="border-white pb-0" closeButton>
        <p>Novo protocolo</p>
        </Modal.Header> 
        <form onSubmit={handleSubmit} className="pl-3 pr-3">
        <label>Cliente</label>
              <select 
                     name="client" id="client"
                     onChange={e => setClient(e.target.value)}
                     className="form-control m-0 p-0"
                     defaultValue={props.client}
                    >
                    <option value="0">Defina um cliente</option>}
                    {clients.map(c => (                        
                        <option key={c.id}value={c.id}>{c.name}</option>                           
                    ))}
                </select>
       
        <Modal.Body className='p-0 m-0 mt-2'>
            <label>Titulo</label>
            <input className="form-control mb-2" type="text" name="title" 
            placeholder="Digite um titulo" onChange={e => setTitle(e.target.value)}
            />
            <label>Conteudo</label>
            <textarea className="form-control" name="content" cols="30" rows="8" 
            placeholder="Digite um conteúdo" onChange={e => setContent(e.target.value)}
            />     
        </Modal.Body>
        <Modal.Footer className="border-light">
          <Button type="submit" variant="success">
            Salvar
          </Button>
          <Button 
          type="button"
          variant="secondary" onClick={handleCloseNew}>
            Cancelar
          </Button>
          </Modal.Footer>
          </form>
          </Modal>
      </>

    )
}