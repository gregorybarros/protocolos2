import React, { useState, useEffect } from 'react'
import './Protocols.css'
import api from '../../services/api'
import {singleProtocol, listProtocol} from '../Api/Protocols'
import {listClient} from '../Api/Clients'

// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


export default function Protocols({ history }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true)

    const [showProt, setShowProt] = useState(false);
    const handleCloseProt = () => setShowProt(false);
    const handleShowProt = () => setShowProt(true)
 

    const [protocols, setProtocols] = useState([])
    let [clients, setClients] = useState([])
    let [client, setClient] = useState('')
    let [clientName, setClientName ] = useState('')
    let [msg, setMsg] = useState('')
    let [editId, setEditId] = useState('')

    let [editTitle, setEditTitle] = useState('')
    let [editContent, setEditContent] = useState('')


    useEffect(() => {

        setMsg('')
        async function loadProtocols() {

            const response = await listProtocol()          
            setProtocols(response.data)
            const clientList = await listClient() 
            setClients(clientList.data)
            

        } loadProtocols()

    }, [msg])

    async function deleteProt() {

        handleClose()
        try {

            api.delete(`/protocols/delete/${editId}`)
            setMsg('Protocolo deletado com sucesso!')


        } catch (err) {
            setMsg('Houve um erro ao deletar protocolo!')

        }
    }

    async function showProtocol(id){
    
    const protocol = await singleProtocol(id)
    
        if (!protocol.data.client) {
            setClient('')
            setClientName('')  
        }    
        
        if (protocol.data.client || !protocol.data.client == null) {
        setClient(protocol.data.client._id)
        setClientName(protocol.data.client.name)
        }

        setEditId(protocol.data._id)
        setEditTitle(protocol.data.title)
        setEditContent(protocol.data.content)
    
        handleShowProt()
    
    }

    async function editProtocol(id){
        
            try {
                await api.put('/protocols/edit', {
                    title: editTitle,
                    content: editContent,
                    client,
                    id: editId
                })
                handleCloseEdit()
            } catch (err) {
                console.log(err)
            
    
        }


    }

    return (
        <>
            <div className="container p-2 col-10 mt-3 text-secondary">
                <h2 className="text-secondary">Lista de protocolos:</h2><hr />
                <h5 className="mt-5">Filtrar por clinte:</h5>
                <div className="form-inline">
                     <select value="0" 
                     name="client" id="client"
                     onChange={e => setClient(e.target.value)}
                     className="form-control col-3"
                    >
                    {!client && 
                    <option value="0">Defina um cliente</option> }
                    {clients.map(c => (                        
                        <option key={c._id}value={c._id}>{c.name}</option>                           
                    ))}
                    </select>
                    <button className="btn btn-success ml-2">Pesquisar</button>
                </div>
                <hr />
                <div className="row mt-5 mb-5 ml-5">
                    {protocols.map(protocol => (
                        <Card bg="light"                        
                            className="m-2"
                            border="border"
                            key={protocol._id}
                            text="dark" style={{ width: '14rem' }}>
                            <Card.Header className="m-0 p-1 bg-secondary text-truncate">
                                <a href="#" className="badge badge-dark">
                                    {protocol.client ? protocol.client.name : 'Sem empresa'}
                                </a>
                            </Card.Header>
                            <Card.Body style={{cursor:"pointer"}}
                            onClick={e => showProtocol(protocol._id)}>
                                <Card.Title><p>{protocol.title}</p></Card.Title>
                                <Card.Text className="mb-0">
                                    <p className="text-center">{protocol.content}</p>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="m-0 p-0 d-flex border-border">
                            <small className="ml-2 mb-1 font-italic">Autor: 
                            <a href="#" className="badge badge-success p-1 ml-1">Gregory</a>
                            </small>
                            <small className="mr-2 font-weight-bold ml-auto">{protocol.createdAt}
                            </small>
                            </Card.Footer>
                        </Card>))}
                </div>
            </div>



            <Modal show={show} onHide={handleClose} size="sm" className="text-center">
                <Modal.Header className="bg-danger p-2"closeButton>
                    <Modal.Title><strong className="text-light">Atencao!</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-3 mb-3">Voce tem certeza que deseja <strong>DELETAR</strong> esse protocolo?</Modal.Body>
                <Modal.Footer className="p-0 border-light">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                        <Button variant="danger"
                        onClick={e => deleteProt()}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
            
           

      <Modal show={showProt} onHide={handleCloseProt}> 
        <Modal.Header closeButton>
              <Modal.Title>
                <p>{clientName?clientName:"Sem empresa"}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{cursor:'pointer'}} 
        onClick={e=> (handleCloseProt(), handleShowEdit())}>
            <p>{editTitle}</p>   
            <span>{editContent}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e=> (handleCloseProt(), handleShowEdit())}>
            Editar
          </Button>
          <Button variant="danger" onClick={e => (handleShow(),handleCloseProt())}>
            Deletar
          </Button>
          </Modal.Footer> 
      </Modal>



      <Modal show={showEdit} onHide={handleCloseEdit}>
        <form onSubmit={editProtocol}>
        <Modal.Header closeButton>
              <select value={client?client:"Sem empresa"} 
                     name="client" id="client"
                     onChange={e => setClient(e.target.value)}
                     className="form-control"
                    >
                    {!client && 
                    <option value="0">Defina um cliente</option> }
                    {clients.map(c => (                        
                        <option key={c._id}value={c._id}>{c.name}</option>                           
                    ))}
                </select>
            <Modal.Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input className="form-control" type="text" name="client" 
            value={editTitle} onChange={e => setEditTitle(e.target.value)}
            />
            <textarea className="form-control mt-2" name="content" cols="30" rows="8" 
            value={editContent} onChange={e => setEditContent(e.target.value)}
            />     
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success" onClick={handleCloseEdit}>
            Salvar
          </Button>
          <Button 
          type="submit"
          variant="secondary" onClick={e => editProtocol(editId)}>
            Cancelar
          </Button>
          </Modal.Footer>
          </form> 
      </Modal>
        </>
    )
}