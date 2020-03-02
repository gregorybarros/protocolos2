import React, { useState, useEffect } from 'react'
import {singleProtocol, editProtocol, deleteProtocol} from '../Api/Protocols'
import {listClient} from '../Api/Clients'
import UserInfo from '../Users/UserInfo'
import InfiniteScroll from 'react-infinite-scroller'

// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'


export default function ListProtocols(props) {

    const [user] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))

    const [showProt, setShowProt] = useState(false);
    const handleCloseProt = () => setShowProt(false);
    const handleShowProt = () => setShowProt(true)
    
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [showUser, setShowUser] = useState(false);
    const handleCloseUser = () => setShowUser(false);
    const handleShowUser = () => setShowUser(true);
  
    const [showUserEdit, setShowUserEdit] = useState(false);
    const handleCloseUserEdit = () => setShowUserEdit(false);
    const handleShowUserEdit = () => setShowUserEdit(true);
  
    const [showUserPhrase, setShowUserPhrase] = useState(false);
    const handleCloseUserPhrase = () => setShowUserPhrase(false);
    const handleShowUserPhrase = () => setShowUserPhrase(true);
  
    
    function getUser(id) {
      
      setUserProt(id)
      handleShowUser()
      
    }
    
    
    const [userProt, setUserProt] = useState('')
    let [clients, setClients] = useState([])
    let [client, setClient] = useState('')
    let [clientName, setClientName ] = useState('')
    let [msg, setMsg] = useState('')
    let [editId, setEditId] = useState('')
    const [userEdit, setUserEdit] = useState('')

    let [editTitle, setEditTitle] = useState('')
    let [editContent, setEditContent] = useState('')
    const [editNum, setEditNum] = useState('')



    useEffect(() => {
      if(props.showUser){
        setShowUser(props.showUser)
        setUserProt(props.user)
      }

        setMsg('')
        async function loadProtocols() {

            const clientList = await listClient() 
            setClients(clientList.data)
            

        } loadProtocols()

    }, [props.showUser,msg]) 

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
        setUserEdit(protocol.data.user)
        setEditNum(protocol.data.num)
        
    
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
    //console.log('teste')

    return (
        <>
        <UserInfo showUser={showUser} handleCloseUser={handleCloseUser} 
        showUserEdit={showUserEdit} handleCloseUserEdit={handleCloseUserEdit} handleShowUserEdit={handleShowUserEdit}
        showUserPhrase={showUserPhrase} handleCloseUserPhrase={handleCloseUserPhrase} handleShowUserPhrase={handleShowUserPhrase}
    user={userProt}/>
        <InfiniteScroll
    pageStart={props.page}
    loadMore={props.loadPage}
    hasMore={props.error}
    loader={<div className="loader" style={{display:"flex"}} key={Math.random()}>
      <Spinner animation="grow" variant="warning mx-auto">
    <span className="sr-only">Loading...</span>
  </Spinner></div>}
>
                    <div id="gradao" name="gradao"className="form-inline">
                    {!props.layout?props.protocols.map(protocol => (
                        <div bg="light" 
                        id="grade" name="grade"                        
                            border="right"
                            key={protocol._id}
                            text="dark">
                            <Card.Header className="m-0 p-1 bg-dark text-truncate d-flex">
                                <a href={`/clients/${protocol.client._id}`} className="badge btn-dark mr-auto">
                                    {protocol.client ? protocol.client.name : 'Sem empresa'}
                                </a>
                                <Button onClick={e => showProtocol(protocol._id)}
                                className="badge btn-dark"
                                style={{cursor:'pointer'}}>
                                    {protocol.num}
                                </Button>
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
                    <Button style={{background:'#91d1ac'}} 
                    onClick={e => getUser(protocol.user._id)}
                    className="text-dark badge btn-success p-1 ml-1 border">{protocol.user.name}</Button>
                            </small>
                            <small className="mr-2 font-weight-bold ml-auto">{protocol.date}
                            </small>
                            </Card.Footer>
                        </div>)):

            
            
<Table className="mt-3" striped bordered hover size="sm" variant="" responsive>
                
  <thead>
    <tr>
      <th>N°</th>
      <th>Cliente</th>
      <th>Titulo</th>
      <th>Conteúdo</th>
      <th>Autor</th>
    </tr>
  </thead>
  <tbody >
    {props.protocols.map(protocol => (
    <tr key={protocol._id}>
      <td onClick={e => showProtocol(protocol._id)}>{protocol.num}</td>
      <td><a className="text-dark" href={`/clients/${protocol.client._id}`}><strong>{protocol.client.name}</strong></a></td>
    <td onClick={e => showProtocol(protocol._id)}><p>{protocol.title}</p></td>
    <td onClick={e => showProtocol(protocol._id)}><p>{protocol.content}</p></td>
    <td><Button 
    style={{background:'#91d1ac'}} 
    className="text-dark badge btn-success p-1 ml-1 border"
    onClick={e => getUser(protocol.user._id)}
    ><strong>{protocol.user.name}</strong></Button></td>
    </tr>
      ))}
  </tbody>
</Table>}
</div>
                
</InfiniteScroll>


            <Modal show={show} onHide={handleClose} size="sm" className="text-center">
                <Modal.Header className="bg-danger p-2"closeButton>
                    <Modal.Title><strong className="text-light">Atencao!</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-3 mb-3">
                    Você tem certeza que deseja <strong>DELETAR</strong> este protocolo?
                </Modal.Body>
                <Modal.Footer className="p-0 border-light d-flex">
                    <form onSubmit={setDeleteProt}>
                        <Button variant="danger"
                        type="submit">
                        Deletar
                    </Button>
                    </form>
                    <Button className="ml-auto"
                    variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                </Modal.Footer>
            </Modal>
            
           

      <Modal show={showProt} onHide={handleCloseProt}> 
        <Modal.Header closeButton>
              <Modal.Title className="pb-0">
                <p>{clientName?clientName:"Sem empresa"}</p>
          </Modal.Title>
        </Modal.Header>
                <small className="mt-1 ml-3">Prot. {editNum}</small>
        <Modal.Body style={{cursor:'pointer'}}
        
        onClick={e=> user._id===userEdit._id || user.eAdmin?(handleCloseProt(), handleShowEdit()):null}
        >
            <p><strong>{editTitle}</strong></p>   
            <span>&nbsp;&nbsp;{editContent}</span>
        </Modal.Body>
        <Modal.Footer>
            <small className="ml-2 mb-1 font-italic mr-auto">Autor: 
                    <a href="#" style={{background:'#91d1ac'}} className="text-dark badge badge-success p-1 ml-1">{userEdit.name}</a>
            </small>
        {user._id===userEdit._id || user.eAdmin?
        <div>
          <Button variant="secondary" onClick={e=> (handleCloseProt(), handleShowEdit())}>
            Editar
          </Button>
          <Button variant="danger ml-1" onClick={e => (handleShow(),handleCloseProt())}>
            Deletar
          </Button>
          </div>:null} 
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