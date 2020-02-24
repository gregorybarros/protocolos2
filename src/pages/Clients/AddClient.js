import React, { useState } from 'react'
import {newClient} from '../Api/Clients'
import api from '../../services/api'


// Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'


export default function AddProtocol() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [code, setCode] = useState('')//Codigo
    const [name, setName] = useState('')//Nome
    const [email, setEmail] = useState('')// Email
    const [category, setCategory] = useState('')//Categoria
    const [resp, setResp] = useState('')// Responsavel
    const [since, setSince] = useState('')//Desde
    const [adress, setAdress] = useState('')//Endereco
    const [city, setCity] = useState('')// Cidade
    const [zip, setZip] = useState('')// Cep
    const [state, setState] = useState('')// Estado
    const [obs, setObs] = useState('')//Observacoes
    const [phone, setPhone] = useState([])//Telefones
    const [cell, setCell] = useState([])//Celulares
    const [soft, setSoft] = useState([])//Softwares



    async function handleSubmit(e) {
console.log(cell)
      setPhone([phone,cell])

        e.preventDefault()
        try {
            const response = await newClient(
                code,
                name,
                category,
                resp,
                email,
                adress,
                city,
                zip,
                state,
                since,
                obs,
                soft,
                phone

            )
            console.log(response)
        } catch (err){
            console.log(err)
        }
        

        

    }

    function selectSoft(e){

        const res = soft.indexOf(e)       

        if(res > -1){
            let test = soft.splice(res,1)
            setSoft(soft,test)

        }else{
            setSoft([...soft,e]) 
 
        }

    }



    return (
        <>

        <div name="divnavbar" id="divnavbar">
            <div name="divbutton" id="divbutton"><Button 
    variant="warning pb-3 pt-3" style={{height:'100%', width:'100%'}} 
    type="button"
    onClick={handleShow}>
     <strong>Novo!</strong>
    </Button></div></div>

<Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Novo cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridNumber">
      <Form.Label>Codigo</Form.Label>
      <Form.Control 
      onChange={e => setCode(e.target.value)}
      type="number" placeholder="Insira o codigo" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Nome</Form.Label>
      <Form.Control 
      onChange={e => setName(e.target.value)}
      type="text" placeholder="Insira o nome" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>E-mail</Form.Label>
      <Form.Control 
      onChange={e => setEmail(e.target.value)}
      type="email" placeholder="Insira o email" />
    </Form.Group>

  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridControlSelect1">
      <Form.Label>Categoria</Form.Label>
      <Form.Control 
      onChange={e => setCategory(e.target.value)}
      as="select" defaultValue="0">
      <option value="0">Selecione a categoria</option>
      <option value="mercado">Mercado</option>
      <option value="padaria">Padaria</option>
      <option value="loja">Loja</option>
      <option value="fabrica">Fabrica</option>
    </Form.Control>
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Responsavel</Form.Label>
      <Form.Control 
      onChange={e => setResp(e.target.value)}
      type="text" placeholder="Insira o nome do responsavel" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDate">
      <Form.Label>Desde</Form.Label>
      <Form.Control 
      onChange={e => setSince(e.target.value)}
      type="date" min="1900-01-02" max="2050-12-31" placeholder="Insira a data" />
    </Form.Group>

  </Form.Row>
  
    <Form.Row>

    <Form.Group as={Col} controlId="formGridPhone">
      <Form.Label>Telefones</Form.Label>
      <Form.Control 
      onChange={e => setPhone(e.target.value)}
      type="text"  placeholder="Insira os telefones" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPhone2">
      <Form.Label>Celulares</Form.Label>
      <Form.Control 
      onChange={e => setCell(e.target.value)}
      type="text" placeholder="Insira os celulares" />
    </Form.Group>

    </Form.Row>

  <Form.Row>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Observações</Form.Label>
      <Form.Control 
      onChange={e => setObs(e.target.value)}
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
        onChange={e => selectSoft(e.target.value)}
              value="cash"
              name="cash"
              label="Cash"
              id="cash"
            />
              <Form.Check  
              onChange={e => selectSoft(e.target.value)} 
              value="vcash"
              name="vcash"
              label="Vcash"
              id="vcash"
            />
              <Form.Check
              onChange={e => selectSoft(e.target.value)}
              value="cashfood"
              name="cashfood"
              label="Cash Food"
              id="cashfood"
            />
      </Col>

    </Form.Group>
  </fieldset>

  </Form.Row>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Endereço</Form.Label>
    <Form.Control 
    onChange={e => setAdress(e.target.value)}
    placeholder="Insira a rua, numero, bloco, apartamento" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Cidade</Form.Label>
      <Form.Control
      placeholder="Insira a cidade" 
      onChange={e => setCity(e.target.value)}
      />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Estado</Form.Label>
      <Form.Control 
      onChange={e => setState(e.target.value)}
      as="select" defaultValue="0">
          <option value="sp">Insira o estado</option>
        <option value="sp">SP</option>
        <option value='mg'>MG</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>CEP</Form.Label>
      <Form.Control
      type='text' 
      placeholder="Insira o CEP"
      onChange={e => setZip(e.target.value)}
      />
    </Form.Group>
  </Form.Row>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button variant="secondary " onClick={handleClose}>
            Fechar
          </Button>
          <Button  variant="success ml-auto" onClick={handleClose}>
            Cadastrar
          </Button>
        </Modal.Footer>
</Form>
      </Modal>


<Container>
        
</Container>     
        
        
      </>

    )
}