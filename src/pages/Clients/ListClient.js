import React, { useState, useEffect } from 'react'
import {singleClient, listClient, editClient, deleteClient} from '../Api/Clients'
import google from '../../img/google.svg'
import clientsphoto from '../../img/clients.png'

// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card, { CardBody } from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'




export default function ListCLients(props,{ history }) {

    const [showClient, setShowClient] = useState(false);
    const handleCloseClient = () => setShowClient(false);
    const handleShowClient = () => setShowClient(true)
    
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
    let [editName, setEditName] = useState('')
    let [editSlug, setEditSlug] = useState('')



    useEffect(() => {

        setMsg('')
        async function loadClients() {

            const clientList = await listClient() 
            setClients(clientList.data)
            

        } loadClients()

    }, [msg]) 

    async function setDeleteClient() {

        handleClose()
        try {

            await deleteClient(editId)
            setMsg('Cliente deletado com sucesso!')

            console.log(msg)
        } catch (err) {
            setMsg('Houve um erro ao deletar cliente!')

        }
    }

    async function showCli(id){
    
    const client = await singleClient(id)
    

        setClient(client.data._id)
        setEditName(client.data.name)
        setEditId(client.data._id)
        setEditSlug(client.data.slug)

    
        handleShowClient()
    
    }

    async function setEditClient(){

            try {
                await editClient(editName, editSlug, editId)

                handleCloseEdit()
            } catch (err) {
                console.log(err)
            
    
        }

    }

    return (
        <>
        <small className="ml-5 pl-3 d-flex text-secondary"><strong>Ordenar:</strong>
        <a href="#" className="badge badge-light p-1 ml-2">Novos</a>
        <a href="#" className="badge badge-light p-1 ml-1">Antigos</a>
        <a href="#" onClick={e => setPage(false)} className="badge badge-light p-1 ml-1">Grade</a>
        <a href="#" onClick={e => setPage(true)} className="badge badge-light p-1 ml-1 mr-auto">Lista</a>
        
        </small>
                <Card.Body className="ml-5 pl-2 p-2 text-dark">
                <div className="mb-5 row ml-0 mr-0">
                    {!page?props.clients.map(client => (
                        <Card bg="light"                        
                            className="m-2"
                            border="right"
                            key={client._id}
                            text="dark" style={{ width: '14rem' }}>
                            <Card.Header className="m-0 p-1 bg-dark text-truncate">
                                <a href="#" className="badge badge-dark">
                                    {client.name}
                                </a>
                            </Card.Header>
                            <Card.Body style={{cursor:"pointer", background:'#fff'}}
                            onClick={e => showCli(client._id)}
                            className="p-2"
                            >
                                <Card.Title><p>{client.slug}</p></Card.Title>
                            </Card.Body>
                            <Card.Footer style={{background:'#d9d8d7'}}
                            className="m-0 p-0 d-flex border-border">
                            <small className="ml-2 mb-1 font-italic">Desde: 
                            </small>
                            <small className="mr-2 font-weight-bold ml-auto">20/02/2020
                            </small>
                            </Card.Footer>
                        </Card>)):

            
            
<Table striped bordered hover size="sm">
                
  <thead>
    <tr>
      <th >N°</th>
      <th >Nome</th>
      <th >Descrição</th>
      <th >Desde</th>
    </tr>
  </thead>
  <tbody>
    {props.clients.map(client => (
    <tr onClick={e => showCli(client._id)} key={client._id}>
      <td >Num</td>
      <td >{client.name}</td>
    <td>{client.slug}</td>
    <td>20/02/2020</td>
    </tr>
      ))}
  </tbody>
</Table>}
                </div>
            </Card.Body>



            <Modal show={show} onHide={handleClose} size="sm" className="text-center">
                <Modal.Header className="bg-danger p-2"closeButton>
                    <Modal.Title><strong className="text-light">Atencao!</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-3 mb-3">
                    Você tem certeza que deseja <strong>DELETAR</strong> este cliente?
                </Modal.Body>
                <Modal.Footer className="p-0 border-light d-flex">
                        <Button variant="danger"
                        onClick={e => setDeleteClient()}>
                        Deletar
                    </Button>
                    <Button className="ml-auto"
                    variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                </Modal.Footer>
            </Modal>
            
           

      <Modal show={showClient} onHide={handleCloseClient}> 
        <Modal.Header className="m-0 p-2" closeButton>
              <Modal.Title className="m-0 p-0">
                Cod. 1896
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{cursor:'pointer'}}
        className="mt-0 p-0" 
        onClick={e=> (handleCloseClient(), handleShowEdit())}>
          <div className="d-flex"> 
  <Card.Img variant="top mx-auto" src={clientsphoto} 
  style={{height:'80pt', width:'90pt'}}/>
  </div>
  <Card.Body>
  <div className="d-flex">
  <Card.Title className="mr-auto"><h4>Goodyear</h4></Card.Title>
  <small>Desde: 02/02/2010</small>
  </div>
    <Card.Text>
      Observacoes: Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cidade: Americana / SP</ListGroupItem>
    <ListGroupItem>Endereco: Rua da Alamedas, 583, Jd Santo Amaro de Castro</ListGroupItem>
    <ListGroupItem>Categoria: Fabrica</ListGroupItem>
    <ListGroupItem>Softwares: Cash, Vcash</ListGroupItem>
    <ListGroupItem>Responsaveis: Roberto, Carla</ListGroupItem>
    <ListGroupItem>Telefones: 19 983276273 / 34058575</ListGroupItem>
  </ListGroup>
  <Card.Body className="d-flex">
  <Card.Img variant="top" src={google} 
  style={{height:'30pt', width:'30pt', alignSelf:'center', cursor:'pointer'}}/>
    <Card.Link href="#" className="mt-3 ml-2">Localização no Google</Card.Link>
    <Button className="btn-dark ml-auto">Editar</Button>
  </Card.Body>
        </Modal.Body>
      </Modal>



      <Modal className="text-secondary" show={showEdit} onHide={handleCloseEdit}>   
        <Modal.Header className="border-light pb-0" closeButton>
        <p>Editar cliente</p>
        </Modal.Header> 
        <form onSubmit={e => setEditClient(editId)} className="pl-3 pr-3">
        <label>Nome</label>
              <input type="text" value={editName} 
              className="form-control" name="name"
              onChange={e => setEditName(e.target.value)}
              />
       
        <Modal.Body className='p-0 m-0'>
            <label>Slug</label>
            <textarea className="form-control" name="slug" cols="30" rows="8" 
            value={editSlug} onChange={e => setEditSlug(e.target.value)}
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