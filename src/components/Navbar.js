import React from 'react';
import logo from '../img/logoweb.png'
import pencil from '../img/pencil.svg'
import user from '../img/user.svg'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'


export default function setNavbar(props) {

  const {name} = JSON.parse(localStorage.getItem('@CodeApi:user'))

  

  return (
      <> <div name='divnavbar' id='divnavbar' className="text-dark">
    <Navbar expand="lg" variant="light fixed-top pr-2 p-0" style={{background:'#c9ddc7'}}>
    <Navbar.Brand className="pl-2 pr-2" href="/main" ><Image src={logo} alt="Essystem" height="40"/>
    <img height="20" src={pencil} alt="Pencil" className="mr-auto mb-2"/></Navbar.Brand>
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
    Usuário: <a href="#login" className="alert-link" style={{color:'#01770a'}}>{name}</a> /
    <a href="/login" className="mr-2 ml-1" size="sm" style={{color:'#c03232'}}>Sair</a>
    </Navbar.Text>
    <Form inline className="ml-2">
      
    </Form>
    </Navbar.Collapse>
  </Navbar>
  </div>
    </>
  )
}

