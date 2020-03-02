import React, { useState, useEffect } from 'react'
import {singleClient, listClient, editClient, deleteClient} from '../Api/Clients'
import google from '../../img/google.svg'
import clientsphoto from '../../img/clients.png'
import moment from 'moment'

// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card, { CardBody } from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'


export default function ListCLients(props) {


    const [showClient, setShowClient] = useState(false);
    const handleCloseClient = () => setShowClient(false);
    const handleShowClient = () => setShowClient(true)
  
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    let [page, setPage] = useState(false)
    

    let [clients, setClients] = useState([])
    let [client, setClient] = useState('')
    let [msg, setMsg] = useState('')
    
    let [editId, setEditId] = useState('')
    const [editCode, setEditCode] = useState('')//Codigo
    const [editName, setEditName] = useState('')//Nome
    const [editEmail, setEditEmail] = useState('')// Email
    const [editCategory, setEditCategory] = useState('')//Categoria
    const [editResp, setEditResp] = useState('')// Responsavel
    const [editSince, setEditSince] = useState('')//Desde
    const [editAdress, setEditAdress] = useState('')//Endereco
    const [editCity, setEditCity] = useState('')// Cidade
    const [editZip, setEditZip] = useState('')// Cep
    const [editState, setEditState] = useState('')// Estado
    const [editObs, setEditObs] = useState('')//Observacoes
    const [editPhone, setEditPhone] = useState([])//Telefones
    const [editCell, setEditCell] = useState([])//Celulares
    const [editSoft, setEditSoft] = useState([])//Softwaresedit


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
    console.log(client)

        setClient(client.data._id)

        setEditCode(client.data.code)
        setEditName(client.data.name)
        setEditEmail(client.data.email)
        setEditCategory(client.data.category)
        setEditResp(client.data.resp)
        setEditSince(client.data.since)
        setEditAdress(client.data.adress)
        setEditCity(client.data.city)
        setEditZip(client.data.zip)
        setEditState(client.data.state)
        setEditObs(client.data.obs)
        setEditPhone(client.data.phone)
        setEditCell(client.data.cell)
        setEditSoft(client.data.soft)
        setEditId(client.data._id)

    
        handleShowClient()
    
    }


function linkClient(id){
  props.history.push(`/clients/${id}`)
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
                      <div bg="light" 
                      id="grade" name="grade"                        
                          key={client._id}
                          className="m-2"
                          border="right"                     
                          style={{ width: '14rem', height:'100%', cursor:"pointer"}}
                            onClick={e => showCli(client._id)}>
                            <Card.Header className="m-0 p-1 bg-dark text-truncate d-flex">
                                <a className="text-light badge badge-dark mr-auto">
                                    {client.name}
                                </a>
                                <a className="text-light badge badge-dark">
                                    {client.code}
                                </a>
                            </Card.Header>
                            <Card.Body style={{background:'#fff'}}                           
                            className="p-2"
                            >
                                <div className="d-flex">
                                <strong>
                                <p name="client" id="client">{client.category}</p>
                                </strong>
                                <p name="client" id="client" className="ml-auto">{client.city}/{client.state}</p>
                                </div>
                                <p name="client" id="client">{client.adress}</p>
                                <p name="client" id="client"><strong>Resp:</strong> {client.resp}</p>
                                <p name="client" id="client"><strong>Tel:</strong> {client.phone}</p>
                            </Card.Body>
                            <Card.Footer style={{background:'#d9d8d7'}}
                            className="m-0 p-0 d-flex border-border">
                            <small className="ml-2 font-italic">Desde: 
                            </small>
                            <small className="mr-2 font-weight-bold ml-auto">{moment(client.since).format('L')}
                            </small>
                            </Card.Footer>
                        </div>)):

            
            
<Table striped bordered hover size="lg">
                
  <thead>
    <tr>
      <th >Cod.</th>
      <th >Nome</th>
      <th >Categoria</th>
      <th >Responsavel</th>
      <th >Telefone</th>
      <th >Endereço</th>
      <th >Desde</th>
    </tr>
  </thead>
  <tbody>
    {props.clients.map(client => (
    <tr key={client._id}>
      <td onClick={e => showCli(client._id)}>{client.code}</td>
      <td onClick={e => showCli(client._id)}><strong>{client.name}</strong></td>
      <td onClick={e => showCli(client._id)}>{client.category}</td>
    <td onClick={e => showCli(client._id)}>{client.resp}</td>
    <td onClick={e => showCli(client._id)}>{client.phone}</td>
    <td>
      <a target="_blank" href={
      `https://www.google.com/maps/place/${client.adress}+${client.city}+${client.state}+${client.zip}`
      }>
        <img src={google} alt="Google Maps" height="15%" className="mr-2"/> 
        {client.adress}, {client.city}/{client.state}
      </a>
      </td>
    <td onClick={e => showCli(client._id)}>{moment(client.since).format('L')}</td>

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
        <Modal.Header className="m-0 p-2 border-white" closeButton>
              <Modal.Title className="m-0 p-0">
                Cod. {editCode}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{cursor:'pointer'}}
        className="mt-0 p-0" 
        onClick={e=> linkClient(editId)}>
          <div className="d-flex"
          > 
  <Card.Img variant="top mx-auto" src={clientsphoto} 
  style={{height:'80pt', width:'90pt'}}/>
  </div>
  <Card.Body>
  <div className="d-flex">
    <Card.Title className="mr-auto"><h4>{editName}</h4></Card.Title>
    <small>Desde: {moment(editSince).format('L')}
    </small>
  </div>
    <Card.Text>
      Observacoes: {editObs}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cidade: {editCity} / {editState}</ListGroupItem>
    <ListGroupItem>Endereco: {editAdress}</ListGroupItem>
    <ListGroupItem>Categoria: {editCategory}</ListGroupItem>
    <ListGroupItem>Softwares: {editSoft.map(soft => ` ${soft} / `)}</ListGroupItem>
    <ListGroupItem>Responsaveis: {editResp}</ListGroupItem>
    <ListGroupItem>Telefones: {editPhone}</ListGroupItem>
  </ListGroup>
    </Modal.Body>
  <Card.Body className="d-flex">
    <a href={`https://www.google.com/maps/place/${editAdress}+${editCity}+${editState}+${editZip}`}
    target="_blank">
  <Card.Img variant="top" src={google} 
  style={{height:'30pt', width:'30pt', alignSelf:'center', cursor:'pointer'}}/>
  </a>
  <Card.Link 
    href={`https://www.google.com/maps/place/${editAdress}+${editCity}+${editState}+${editZip}`} 
    target="_blank" className="mt-3 ml-2">
      Localização no Google
      </Card.Link>
  </Card.Body>
      </Modal>



      
        </>
    )
}