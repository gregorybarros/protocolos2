import React, { useState } from 'react'
import api from '../../services/api'


// Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'


export default function AddUser() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   
    const [name, setName] = useState('')//Nome
    const [secondName, setSecondName] = useState('')//Sobrenome
    const [email, setEmail] = useState('')// Email
    const [phone, setPhone] = useState('')//Telefones
    const [office, setOffice] = useState('')
    const [dateBirth, setDateBirth] = useState('')//Observacoes
    const [dateAdm, setDateAdm] = useState('')//Softwares
    const [zip, setZip] = useState('')// Cep
    const [city, setCity] = useState('')// Cidade
    const [state, setState] = useState('')// Estado
    const [adress, setAdress] = useState('')//Endereco
    const [password, setPassword] = useState('')// Responsavel
    const [password2, setPassword2] = useState('')//Desde



    async function handleSubmit(e) {

        e.preventDefault()

        if(password!=password2)
        return alert('Senhas diferentes!')

        try {
            const response = await api.post('/auth/register', {
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
                password

            })
            handleClose()
            console.log(response)
        } catch (err){
            console.log(err)
        }
        

        

    }


    return (
        <>

        <div name="divnavbar" id="divnavbar">
            <div name="divbutton" id="divbutton"><Button 
    variant="warning pb-3 pt-3" style={{height:'100%', width:'100%', background:'#f5c13d'}} 
    type="button"
    onClick={handleShow}>
     <strong>Novo!</strong>
    </Button></div></div>

<Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
        <Modal.Header className="border-white" closeButton>
          <Modal.Title>Novo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Nome</Form.Label>
      <Form.Control 
      onChange={e => setName(e.target.value)}
      type="text" placeholder="Insira o nome" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridName2">
      <Form.Label>Sobrenome</Form.Label>
      <Form.Control 
      onChange={e => setSecondName(e.target.value)}
      type="text" placeholder="Insira o sobrenome" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>E-mail</Form.Label>
      <Form.Control 
      onChange={e => setEmail(e.target.value)}
      type="email" placeholder="Insira o email" />
    </Form.Group>

  </Form.Row>

  <Form.Row>

<Form.Group as={Col} controlId="formGridPhone">
  <Form.Label>Telefones</Form.Label>
  <Form.Control 
  onChange={e => setPhone(e.target.value)}
  type="text"  placeholder="Insira um ou mais telefones ex. 19 99999-9999 / outro..." />
</Form.Group>

</Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridControlSelect1">
      <Form.Label>Cargo</Form.Label>
      <Form.Control 
      onChange={e => setOffice(e.target.value)}
      as="select" defaultValue="0">
      <option value="0">Selecione o cargo</option>
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
      onChange={e => setDateBirth(e.target.value)}
      type="date" min="1900-01-02" max="2050-12-31" placeholder="Insira a data" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDate2">
      <Form.Label>Data de Admissão</Form.Label>
      <Form.Control 
      onChange={e => setDateAdm(e.target.value)}
      type="date" min="1900-01-02" max="2050-12-31" placeholder="Insira a data" />
    </Form.Group>

  </Form.Row>
  
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
          <option value="0">Insira o estado</option>
        <option value="SP">SP</option>
        <option value='SP'>MG</option>
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

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Endereço</Form.Label>
    <Form.Control 
    onChange={e => setAdress(e.target.value)}
    placeholder="Insira a rua, numero, bloco, apartamento" />
  </Form.Group>

  <Form.Row>

        <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
            type="password" 
            onChange={e => setPassword(e.target.value)}
            placeholder="Minimo 6 digitos" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword2">
            <Form.Label>Repita senha</Form.Label>
            <Form.Control
            type="password" 
            onChange={e => setPassword2(e.target.value)}
            placeholder="Minimo 6 digitos" />
         </Form.Group>

        </Form.Row>

        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button variant="secondary " onClick={handleClose}>
            Fechar
          </Button>
          <Button  type="submit" variant="success ml-auto">
            Cadastrar
          </Button>
        </Modal.Footer>

</Form>
      </Modal> 
        
        
      </>

    )
}