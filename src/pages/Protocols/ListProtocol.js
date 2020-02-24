import React, { useState, useEffect } from 'react'
import {singleProtocol, listProtocol, editProtocol, deleteProtocol} from '../Api/Protocols'
import {listClient} from '../Api/Clients'

// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card, { CardBody } from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'


export default function ListProtocols(props,{ history }) {

    const [showProt, setShowProt] = useState(false);
    const handleCloseProt = () => setShowProt(false);
    const handleShowProt = () => setShowProt(true)
    
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    let [page, setPage] = useState(false)
    

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

            const clientList = await listClient() 
            setClients(clientList.data)
            

        } loadProtocols()

    }, [msg]) 

    async function setDeleteProt() {

        handleClose()
        try {

            await deleteProtocol(editId)
            setMsg('Protocolo deletado com sucesso!')

            console.log(msg)
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

    async function setEditProtocol(){

            try {
                await editProtocol(editTitle, editContent, client, editId)

                handleCloseEdit()
            } catch (err) {
                console.log(err)
            
    
        }

    }

    return (
        <>
        <small className="ml-2 d-flex text-secondary"><strong>Ordenar:</strong>
        <a href="#" className="badge badge-light p-1 ml-2">Novos</a>
        <a href="#" className="badge badge-light p-1 ml-1">Antigos</a>
        <a href="#" onClick={e => setPage(false)} className="badge badge-light p-1 ml-1">Grade</a>
        <a href="#" onClick={e => setPage(true)} className="badge badge-light p-1 ml-1 mr-auto">Lista</a>
        
        </small>
                    <div id="gradao" name="gradao"className="form-inline">
                    {!page?props.protocols.map(protocol => (
                        <div bg="light" 
                        id="grade" name="grade"                        
                            className=""
                            border="right"
                            key={protocol._id}
                            text="dark">
                            <Card.Header className="m-0 p-1 bg-dark text-truncate">
                                <a href="#" className="badge badge-dark">
                                    {protocol.client ? protocol.client.name : 'Sem empresa'}
                                </a>
                            </Card.Header>
                            <Card.Body
                            onClick={e => showProtocol(protocol._id)}
                            className='border'
                            style={{height:'78%', cursor:"pointer", background:'#fff'}}
                            >
                                <Card.Title><p>{protocol.title}</p></Card.Title>
                                <Card.Text className="mb-0">
                                    <p>&nbsp;&nbsp;{protocol.content}</p>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="m-0 p-0 d-flex border" style={{background:'#d9d8d7'}}>
                            <small className="ml-2 mb-1 font-italic">Autor: 
                            <a href="#" style={{background:'#91d1ac'}} className="text-dark badge badge-success p-1 ml-1">Gregory</a>
                            </small>
                            <small className="mr-2 font-weight-bold ml-auto">{protocol.date}
                            </small>
                            </Card.Footer>
                        </div>)):

            
            
<Table className="mt-3" striped bordered hover size="lg" variant="" responsive>
                
  <thead>
    <tr>
      <th className='border border-dark'>N°</th>
      <th className='border border-dark'>Cliente</th>
      <th className='border border-dark'>Titulo</th>
      <th className='border border-dark'>Conteúdo</th>
      <th className='border border-dark'>Autor</th>
    </tr>
  </thead>
  <tbody >
    {props.protocols.map(protocol => (
    <tr onClick={e => showProtocol(protocol._id)} key={protocol._id}>
      <td className='border border-dark'>Num</td>
      <td className='border border-dark'>{protocol.client.name}</td>
    <td className='border border-dark'><p>{protocol.title}</p></td>
    <td className='border border-dark'><p>{protocol.content}</p></td>
    <td className='border border-dark'>Gregory</td>
    </tr>
      ))}
  </tbody>
</Table>}
</div>
                



            <Modal show={show} onHide={handleClose} size="sm" className="text-center">
                <Modal.Header className="bg-danger p-2"closeButton>
                    <Modal.Title><strong className="text-light">Atencao!</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-3 mb-3">
                    Você tem certeza que deseja <strong>DELETAR</strong> este protocolo?
                </Modal.Body>
                <Modal.Footer className="p-0 border-light d-flex">
                        <Button variant="danger"
                        onClick={e => setDeleteProt()}>
                        Deletar
                    </Button>
                    <Button className="ml-auto"
                    variant="secondary" onClick={handleClose}>
                        Cancelar
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
            <span>&nbsp;&nbsp;{editContent}</span>
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



      <Modal className="text-secondary" show={showEdit} onHide={handleCloseEdit}>   
        <Modal.Header className="border-light pb-0" closeButton>
        <p>Editar protocolo</p>
        </Modal.Header> 
        <form onSubmit={e => setEditProtocol(editId)} className="pl-3 pr-3">
        <label>Cliente</label>
              <select value={client?client:"Sem empresa"} 
                     name="client" id="client"
                     onChange={e => setClient(e.target.value)}
                     className="form-control m-0 p-0"
                    >
                    {!client && 
                    <option value="0">Defina um cliente</option> }
                    {clients.map(c => (                        
                        <option key={c._id}value={c._id}>{c.name}</option>                           
                    ))}
                </select>
       
        <Modal.Body className='p-0 m-0'>
            <label>Titulo</label>
            <input className="form-control mb-2" type="text" name="client" 
            value={editTitle} onChange={e => setEditTitle(e.target.value)}
            />
            <label>Conteudo</label>
            <textarea className="form-control" name="content" cols="30" rows="8" 
            value={editContent} onChange={e => setEditContent(e.target.value)}
            />     
        </Modal.Body>
        <Modal.Footer className="border-light">
          <Button type="submit" variant="success">
            Salvar
          </Button>
          <Button 
          type="button"
          variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          </Modal.Footer>
          </form>
      </Modal>
        </>
    )
}