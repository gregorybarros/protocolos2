import React, { useState, useEffect } from 'react'
import {listClient} from '../Api/Clients'
import {newProtocol} from '../Api/Protocols'

// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function AddProtocol() {

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

            const response = await listClient()
            setClients(response.data)
            
        } loadClients()

    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await newProtocol(
                client,
                title,
                content
            )
            handleCloseNew()
            setError([{ message: response.data.message }])

        }
        catch (err) {
            if (err.response.data.errors)
                return setError(err.response.data.errors)

            setError([{ message: err.response.data.message }])

        }


    }



    return (
        <><div name="divnavbar" id="divnavbar">
            <div name="divbutton" id="divbutton"><Button 
    variant="warning pb-3 pt-3" style={{height:'100%', width:'100%'}} 
    type="button"
    onClick={handleShowNew}>
     <strong>Novo!</strong>
    </Button></div></div>
  <Modal className="text-secondary" show={showNew} onHide={handleCloseNew}>
        <Modal.Header className="border-light pb-0" closeButton>
        <p>Novo protocolo</p>
        </Modal.Header> 
        <form onSubmit={handleSubmit} className="pl-3 pr-3">
        <label>Cliente</label>
              <select value={0} 
                     name="client" id="client"
                     onChange={e => setClient(e.target.value)}
                     className="form-control m-0 p-0"
                    >
                    <option value="0">Defina um cliente</option>
                    {clients.map(c => (                        
                        <option key={c._id}value={c._id}>{c.name}</option>                           
                    ))}
                </select>
       
        <Modal.Body className='p-0 m-0'>
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