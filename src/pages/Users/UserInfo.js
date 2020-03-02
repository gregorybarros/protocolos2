import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import useri from '../../img/user.svg'
import google from '../../img/google.svg'
import api from '../../services/api'
import moment from 'moment'

export default function UserInfo(props){

    const [user] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))
    
    const [id, setId] = useState('')//Id
    const [name, setName] = useState('')//Nome
    const [secondName, setSecondName] = useState('')//Sobrenome
    const [email, setEmail] = useState('')// Email
    const [phone, setPhone] = useState('')//Telefones
    const [office, setOffice] = useState('')
    const [dateBirth, setDateBirth] = useState('')
    const [dateAdm, setDateAdm] = useState('')
    const [zip, setZip] = useState('')// Cep
    const [city, setCity] = useState('')// Cidade
    const [state, setState] = useState('')// Estado
    const [adress, setAdress] = useState('')//Endereco
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordOld, setPasswordOld] = useState('')
    const [totalProt, setTotalProt] = useState('')
    const [phrase, setPhrase] = useState('')

    useEffect(() => {

      loadUser()

    },[props.user])

    async function loadUser(){

      if(!props.user)
      return 

      const load = await api.get(`/users/${props.user}`)
      setId(load.data._id)
      setName(load.data.name)
      setSecondName(load.data.secondName)
      setEmail(load.data.email)
      setPhone(load.data.phone)
      setOffice(load.data.office)
      setDateBirth(load.data.dateBirth)
      setDateAdm(load.data.dateAdm)
      setZip(load.data.zip)
      setCity(load.data.city)
      setState(load.data.state)
      setAdress(load.data.adress)
      setPassword(load.data.password)
      setTotalProt(load.data.totalProt)
      setPhrase(load.data.phrase)

  }

    

    async function handleSubmit(e) {

     // if(password!=password2)
      //return alert('Senhas diferentes!')

      try {
          const response = await api.put('/users/edit', {
              _id:id,
              name,
              secondName,
              email,
              phone,
              office,
              dateBirth,
              dateAdm,
              zip,
              city,
              state,
              adress,
              password,
              phrase

          })
          props.handleClose()
          console.log(response)
      } catch (err){
          console.log(err)
      }
      

      

  }

    function EditUser(){

      props.handleCloseUser()

      props.handleShowUserEdit()
    }

    function setEditPhrase(){

      props.handleCloseUser()

      props.handleShowUserPhrase()
    }
    
    return (
        <>
  
  <Modal show={props.showUser} onHide={props.handleCloseUser}> 
        <Modal.Header className="m-0 p-2 border border-white" closeButton>
              <Modal.Title className="m-0 p-0">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{cursor:'pointer'}}
        className="mt-0 p-0" 
        >
          <div className="d-flex"
          > 
  <Image
  className="mx-auto mb-3" 
  src={useri} alt="User" 
  height="120" roundedCircle/>
  </div>
  <Card.Body>
  <div className="d-flex">
    <Card.Title className="mr-auto"><h4>{name} {secondName}</h4></Card.Title>
    <small>Desde: {moment(dateAdm).format("L")}
    </small>
  </div>
    <Card.Text className="d-flex font-italic">

    “{phrase?phrase:'Nenhuma frase inserida.'}”

    { user._id===id || user.eAdmin?
    <Button 
    onClick={e => setEditPhrase()} 
    size="sm"
    className="btn-secondary ml-auto ml-2"
    style={{minWidth:"90px", maxHeight:'30px'}}
    >Editar frase</Button>
    :null}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cargo: {office}</ListGroupItem>
    <ListGroupItem>Aniversário: {moment(dateBirth).format('L')}</ListGroupItem>
    <ListGroupItem>E-mail: {email}</ListGroupItem>
    <ListGroupItem>Telefone: {phone}</ListGroupItem>
    <ListGroupItem>Endereço: {adress}, {zip}</ListGroupItem>
    <ListGroupItem>Cidade: {city}/ {state}</ListGroupItem>
    <ListGroupItem>Protocolos: {totalProt} total.</ListGroupItem>
  </ListGroup>
    </Modal.Body>
  <Card.Body className="d-flex">
    <a href={`https://www.google.com/maps/place/${adress}+${city}+${state}+${zip}`}
    target="_blank">
  <Card.Img variant="top" src={google} 
  style={{height:'30pt', width:'30pt', alignSelf:'center', cursor:'pointer'}}/>
  </a>
  <Card.Link 
    href={`https://www.google.com/maps/place/${adress}+${city}+${state}+${zip}`} 
    target="_blank" className="mt-3 ml-2">
      Localização no Google
      </Card.Link>
      { user._id===id || user.eAdmin?
      <Button onClick={e => EditUser()} size="sm"className="btn-warning ml-auto">Editar usuario</Button>:null}
  </Card.Body>
      </Modal>


      <Modal show={props.showUserPhrase} onHide={props.handleCloseUserPhrase}> 
        <Modal.Header className="m-0 p-2 border-white" closeButton>
              <Modal.Title className="m-0 p-0">
                Editar frase
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Card.Body>
        <Form.Group as={Col} controlId="formGridPhrase">
          <Form.Label>Frase</Form.Label>
          <Form.Control
            value={phrase}
            onChange={e => setPhrase(e.target.value)}
            as="textarea" rows="3" maxlength="108" placeholder="Insira uma frase" />
        </Form.Group>
        </Card.Body>
        <Modal.Footer className="d-flex">
          <Button variant="secondary " onClick={props.handleCloseUserPhrase}>
            Fechar
          </Button>
          <Button  type="submit" variant="success ml-auto">
            Salvar
          </Button>
        </Modal.Footer>
        </Form>
        </Modal>


      <Modal show={props.showUserEdit} onHide={props.handleCloseUserEdit} size="lg">
        <Form onSubmit={handleSubmit}>
        <Modal.Header className="border-white" closeButton>
          <Modal.Title>Editar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Nome</Form.Label>
      <Form.Control
      value={name} 
      onChange={e => setName(e.target.value)}
      type="text" placeholder="Insira o nome" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridName2">
      <Form.Label>Sobrenome</Form.Label>
      <Form.Control
      value={secondName}  
      onChange={e => setSecondName(e.target.value)}
      type="text" placeholder="Insira o sobrenome" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>E-mail</Form.Label>
      <Form.Control 
      value={email} 
      onChange={e => setEmail(e.target.value)}
      type="email" placeholder="Insira o email" />
    </Form.Group>

  </Form.Row>

  <Form.Row>

<Form.Group as={Col} controlId="formGridPhone">
  <Form.Label>Telefones</Form.Label>
  <Form.Control
  value={phone}  
  onChange={e => setPhone(e.target.value)}
  type="text"  placeholder="Insira um ou mais telefones ex. 19 99999-9999 / outro..." />
</Form.Group>

</Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridControlSelect1">
      <Form.Label>Cargo</Form.Label>
      <Form.Control 
      onChange={e => setOffice(e.target.value)}
      as="select" defaultValue={office}>
      <option value="Tecnico I">Tecnico I</option>
      <option value="Tecnico II">Tecnico II</option>
      <option value="Tecnico III">Tecnico III</option>
      <option value="Gerente">Gerente</option>
      <option value="Sub-gerente">Sub-gerente</option>
      <option value="Vendedor">Vendedor</option>
      <option value="Ceo">Ceo</option>
    </Form.Control>
      
      </Form.Group>

    <Form.Group as={Col} controlId="formGridDate">
      <Form.Label>Data do nascimento</Form.Label>
      <Form.Control
      value={dateBirth}  
      onChange={e => setDateBirth(e.target.value)}
      type="date" min="1900-01-02" max="2050-12-31" placeholder="Insira a data" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDate2">
      <Form.Label>Data de Admissão</Form.Label>
      <Form.Control 
      value={dateAdm} 
      onChange={e => setDateAdm(e.target.value)}
      type="date" min="1900-01-02" max="2050-12-31" placeholder="Insira a data" />
    </Form.Group>

  </Form.Row>
  
  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Cidade</Form.Label>
      <Form.Control
      value={city} 
      placeholder="Insira a cidade" 
      onChange={e => setCity(e.target.value)}
      />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Estado</Form.Label>
      <Form.Control
      value={state}  
      onChange={e => setState(e.target.value)}
      as="select">
        <option value="SP">SP</option>
        <option value='SP'>MG</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>CEP</Form.Label>
      <Form.Control
      value={zip} 
      type='text' 
      placeholder="Insira o CEP"
      onChange={e => setZip(e.target.value)}
      />
    </Form.Group>

  </Form.Row>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Endereço</Form.Label>
    <Form.Control 
    value={adress} 
    onChange={e => setAdress(e.target.value)}
    placeholder="Insira a rua, numero, bloco, apartamento" />
  </Form.Group>

  <Form.Row>

        <Form.Group as={Col} controlId="formGridPasswordOld">
            <Form.Label>Senha atual</Form.Label>
            <Form.Control
            type="password" 
            onChange={e => setPasswordOld(e.target.value)}
            placeholder="Minimo 6 digitos" />
        </Form.Group>


        <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Senha nova</Form.Label>
            <Form.Control
            type="password" 
            onChange={e => setPassword(e.target.value)}
            placeholder="Minimo 6 digitos" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword2">
            <Form.Label>Senha nova</Form.Label>
            <Form.Control
            type="password" 
            onChange={e => setPassword2(e.target.value)}
            placeholder="Minimo 6 digitos" />
         </Form.Group>

        </Form.Row>

        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button variant="secondary " onClick={props.handleCloseUserEdit}>
            Fechar
          </Button>
          <Button  type="submit" variant="success ml-auto">
            Salvar
          </Button>
        </Modal.Footer>

</Form>
      </Modal> 
      </>
    )
}