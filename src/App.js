import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logoweb.png';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'


import Routes from './routes'

function App() {
  return (
    <> 
    <Navbar expand="lg" variant="light" bg="transparent">
    <Navbar.Brand href="/main"><img src={logo} alt="Essystem" height="50"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/clients">Clientes</Nav.Link>
      <NavDropdown title="Protocolos" id="basic-nav-dropdown">
        <NavDropdown.Item href="/protocols/addprotocol">Novo
      </NavDropdown.Item>
      <NavDropdown.Item href="/protocols">Lista
      </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#pricing">Ajuda</Nav.Link>
    </Nav>  
    <Navbar.Text>
      Olá, <a href="#login" className="alert-link text-success">Gregory!</a><a className="ml-2 mr-2" href="#">&#128526;</a> 
    </Navbar.Text>
    <Form inline className="ml-2">
      <FormControl type="text" placeholder="Pesquisa de protocolos" className="mr-sm-2" />
      <Button variant="outline-success">Pesquisar</Button>
    </Form>
    </Navbar.Collapse>
  </Navbar>
    <Routes/>
    </>
  )
}

export default App;
