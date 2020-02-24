import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { listProtocol } from './Api/Protocols'
import Navbar from '../components/Navbar'
import Button from 'react-bootstrap/Button'
import ListProtocols from './Protocols/ListProtocol'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import clients from '../img/clients.png'
import google from '../img/google.svg'


export default function Test(){

const [protocols, setProtocols] = useState([])
    
    useEffect(() =>{

        async function loadClients(){

            const getClientProtocols = await listProtocol()
            setProtocols(getClientProtocols.data.docs)

        }loadClients()
    },[])



    return (
        <div className="d-flex mt-5">
        <Navbar/>

        <Card className="mt-2 ml-2"
        style={{ width: '40%', height:'100%', boxShadow:'0px 5px 5px #0005' }}>
        <Card.Title className="ml-2 mt-2">Cod. 1896</Card.Title>
  <Card.Img variant="top" src={clients} 
  style={{height:'80pt', width:'90pt', alignSelf:'center'}}/>
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
</Card>
<div className="p-2" style={{width:"100%"}}>
    <div className="p-3 mb-3 text-light"style={{background:'#70a486'}}>
        <h1>Protocolos do cliente Goodyear</h1>
    </div>
    <div>
        <ListProtocols protocols={protocols}/>
    </div>
</div>

    </div>


        
    )}