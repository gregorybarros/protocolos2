import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import Card from 'react-bootstrap/Card'
import { listProtocol } from '../Api/Protocols'
import { singleClient, editClient } from '../Api/Clients'
import AddProtocol from '../Protocols/AddProtocol'
import Navbar from '../../components/Navbar'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ListProtocols from '../Protocols/ListProtocol'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import clients from '../../img/clients.png'
import google from '../../img/google.svg'
import moment from 'moment'


export default function SingleClient({match, history}){


  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true)

  const [refresh, setRefresh] = useState(false)

  const [protocols, setProtocols] = useState([])
  const [client, setClient] = useState('')
  const [soft, setSoft] = useState([])

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
  const [editSoft, setEditSoft] = useState('')//Softwaresedit

  const [page] = useState(1)
  const [perPage] = useState(10)
  const [filter,] = useState('client')
  const [equal] = useState(match.params.id)
    
    useEffect(() =>{
      
        async function loadClient(){
          
          setRefresh(false)

          try {
            
            const getSingleClient = await singleClient(match.params.id)
            
            setClient(getSingleClient.data)
            setSoft(getSingleClient.data.soft)

            const getClientProtocols = await listProtocol(page, perPage, filter, equal)
            setProtocols(getClientProtocols.data.docs)
          } catch (err) {
            history.push('/clients')
          }
            

        }loadClient()
    },[refresh])

    function openEdit(){
      setEditCode(client.code)
      setEditName(client.name)
      setEditEmail(client.email)
      setEditCategory(client.category)
      setEditResp(client.resp)
      setEditSince(client.since)
      setEditAdress(client.adress)
      setEditCity(client.city)
      setEditZip(client.zip)
      setEditState(client.state)
      setEditObs(client.obs)
      setEditPhone(client.phone)
      setEditSoft(client.soft)

      handleShowEdit()
    }

    async function setEditClient(id){

      try {
          await api.put(`/clients/${id}`, {
            code:editCode,
            name:editName,
            category:editCategory,
            resp:editResp,
            email:editEmail,
            adress:editAdress,
            city:editCity,
            zip:editZip,
            state:editState,
            since:editSince,
            obs:editObs,
            soft:editSoft,
            phone:editPhone
          })

          handleCloseEdit()
          setRefresh(true)
          
      } catch (err) {
          console.log(err)
      

  }

}

function selectEditSoft(e){

  const res = editSoft.indexOf(e)       

  if(res > -1){
      let test = () => editSoft.splice(res,1)
      setEditSoft(editSoft,test)

  }else{
      setEditSoft(...editSoft,e) 

  }

}

function isChecked(e){

const res = soft.indexOf(e)       

if(res > -1){
return true
} else {
  return false
}

}

    return (
        <div className="d-flex mt-5">
        <Navbar/>
        <Card className="mt-2 ml-2"
        style={{ width: '40%', height:'100%', boxShadow:'0px 5px 5px #0005' }}>
        <Card.Title className="ml-2 mt-2">Cod. {client.code}</Card.Title>
  <Card.Img variant="top" src={clients} 
  style={{height:'80pt', width:'90pt', alignSelf:'center'}}/>
  <Card.Body>
  <div className="d-flex">
    <Card.Title className="mr-auto"><h4>{client.name}</h4></Card.Title>
    <small>Desde: {moment(client.since).format('L')}</small>
  </div>
    <Card.Text>
      Observacoes: {client.obs}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cidade: {client.city} / {client.state}</ListGroupItem>
    <ListGroupItem>Endereco: {client.adress}</ListGroupItem>
    <ListGroupItem>Categoria: {client.category}</ListGroupItem>
    <ListGroupItem>Softwares: {soft}</ListGroupItem>
    <ListGroupItem>Responsaveis: {client.resp}</ListGroupItem>
    <ListGroupItem>Telefones: {client.phone}</ListGroupItem>
  </ListGroup>
  <Card.Body className="d-flex">
  <Card.Img variant="top" src={google} 
  style={{height:'30pt', width:'30pt', alignSelf:'center', cursor:'pointer'}}/>
    <Card.Link href={`https://www.google.com/maps/place/${client.adress}+${client.city}+${client.state}+${client.zip}`} target="_blank" className="mt-3 ml-2">Localização no Google</Card.Link>
    <Button className="btn-dark ml-auto" type="button"
    onClick={e => openEdit()}
    >Editar</Button>
  </Card.Body>
</Card>
<div className="p-2" style={{width:"100%"}}>
    <div className="p-3 mb-3 text-light d-flex"style={{background:'#70a486'}}>
    <h1>Protocolos do cliente {client.name}</h1>
    <div className="ml-auto mr-2">
      <AddProtocol client={match.params.id}/>
    </div>
    </div>
    <div>
        <ListProtocols protocols={protocols}/>
    </div>
</div>




<Modal className="text-secondary" size="lg"
      show={showEdit} onHide={handleCloseEdit}>   
      <Form >
        <Modal.Header className="border-white" closeButton>
          <Modal.Title>Editar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridNumber">
      <Form.Label>Codigo</Form.Label>
      <Form.Control
      value={editCode} 
      onChange={e => setEditCode(e.target.value)}
      type="number" placeholder="Insira o codigo" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Nome</Form.Label>
      <Form.Control
      value={editName} 
      onChange={e => setEditName(e.target.value)}
      type="text" placeholder="Insira o nome" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>E-mail</Form.Label>
      <Form.Control
      value={editEmail} 
      onChange={e => setEditEmail(e.target.value)}
      type="email" placeholder="Insira o email" />
    </Form.Group>

  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridControlSelect1">
      <Form.Label>Categoria</Form.Label>
      <Form.Control 
      onChange={e => setEditCategory(e.target.value)}
      as="select" defaultValue={editCategory}>
      <option value="0">Selecione a categoria</option>
      <option value="Mercado">Mercado</option>
      <option value="Padaria">Padaria</option>
      <option value="Loja">Loja</option>
      <option value="Fabrica">Fabrica</option>
    </Form.Control>
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Responsavel</Form.Label>
      <Form.Control
      value={editResp} 
      onChange={e => setEditResp(e.target.value)}
      type="text" placeholder="Insira o nome do responsavel" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDate">
      <Form.Label>Desde</Form.Label>
      <Form.Control
      value={editSince} 
      onChange={e => setEditSince(e.target.value)}
      type="date" min="1900-01-02" max="2050-12-31"/>
    </Form.Group>

  </Form.Row>
  
    <Form.Row>

    <Form.Group as={Col} controlId="formGridPhone">
      <Form.Label>Telefones</Form.Label>
      <Form.Control
      value={editPhone} 
      onChange={e => setEditPhone(e.target.value)}
      type="text"  placeholder="Insira os telefones" />
    </Form.Group>

    </Form.Row>

  <Form.Row>

    <Form.Group as={Col} controlId="formGridObs">
      <Form.Label>Observações</Form.Label>
      <Form.Control
      value={editObs} 
      onChange={e => setEditObs(e.target.value)}
      placeholder="Insira uma ou mais obsevarções sobre este cliente"
      as="textarea" rows="3" />
    </Form.Group>

    <fieldset>
    <Form.Group as={Col} className='ml-5'>

      <Form.Label as="legend" column sm={3}>
        Softwares
      </Form.Label>
      <Col sm={10}>
      <Form.Check
        onChange={e => selectEditSoft(e.target.value)}
              value="Cash"
              name="cash"
              label="Cash"
              id="cash"
              defaultChecked={isChecked('Cash')?true:false}
            />
              <Form.Check  
              onChange={e => selectEditSoft(e.target.value)} 
              value="Vcash"
              name="vcash"
              label="Vcash"
              id="vcash"
              defaultChecked={isChecked('Vcash')?true:false}
            />
              <Form.Check
              onChange={e => selectEditSoft(e.target.value)}
              value="Cashfood"
              name="cashfood"
              label="Cash Food"
              id="cashfood"
              defaultChecked={isChecked('Cashfood')?true:false}
            />
      </Col>

    </Form.Group>
  </fieldset>

  </Form.Row>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Endereço</Form.Label>
    <Form.Control
    value={editAdress} 
    onChange={e => setEditAdress(e.target.value)}
    placeholder="Insira a rua, numero, bloco, apartamento" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Cidade</Form.Label>
      <Form.Control
      value={editCity}
      placeholder="Insira a cidade" 
      onChange={e => setEditCity(e.target.value)}
      />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Estado</Form.Label>
      <Form.Control 
      onChange={e => setEditState(e.target.value)}
      as="select" defaultValue={editState}>
          <option value="0">Insira o estado</option>
        <option value="SP">SP</option>
        <option value='MG'>MG</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>CEP</Form.Label>
      <Form.Control
      value={editZip}
      type='text' 
      placeholder="Insira o CEP"
      onChange={e => setEditZip(e.target.value)}
      />
    </Form.Group>
  </Form.Row>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button variant="secondary " onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button  variant="success ml-auto" onClick={e => setEditClient(client.id)}>
            Salvar
          </Button>
        </Modal.Footer>
</Form>
      </Modal>
      </div>
        
    )}