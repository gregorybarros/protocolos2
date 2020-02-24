import React from 'react';
import logo from '../img/logoweb.png';
import user from '../img/greg.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'


export default function setNavbar() {
  return (
      <> <div name='divnavbar' id='divnavbar' className="text-dark">
    <Navbar expand="lg" variant="light fixed-top pr-2 p-0" style={{background:'#f5c13d'}}>
    <Navbar.Brand className="pl-2 pr-2" href="/main" ><Image src={logo} alt="Essystem" height="40"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="/main" className="font-weight-bold text-dark">Perfil</Nav.Link>
    <Nav.Link href="/protocols" className="font-weight-bold text-dark">Protocolos</Nav.Link>     
      <Nav.Link className="font-weight-bold text-dark" href="/clients">Clientes</Nav.Link>
      <Nav.Link className="font-weight-bold text-dark" href="/users">Equipe</Nav.Link>
      <Nav.Link className="font-weight-bold text-dark" href="/help">Ajuda</Nav.Link>
    </Nav>  
    <Navbar.Text className="font-weight-bold">
    <img name='navuser' id='navuser' className="mr-3" src={user} alt="User" height="26"/>
      Usuário: <a href="#login" className="alert-link" style={{color:'#01770a'}}>Gregory</a>/
    <a href="/login" className="mr-2 ml-1" size="sm" style={{color:'#c03232'}}>Logout</a>
    </Navbar.Text>
    <Form inline className="ml-2">
      
    </Form>
    </Navbar.Collapse>
  </Navbar>
  </div>
    </>
  )
}

