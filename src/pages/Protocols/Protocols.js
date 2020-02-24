import React, { useState, useEffect } from 'react'
import './Protocols.css'
import ListProtocol from './ListProtocol'
import protFoto from '../../img/protocols.png'
import {listClient} from '../Api/Clients'
import { listProtocol } from '../Api/Protocols'
import AddProtocol from './AddProtocol'


import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Navbar from '../../components/Navbar'




export default function Protocols() {

    let [clients, setClients] = useState([])
    let [client, setClient] = useState('')
    let [protocols, setProtocols] = useState([])

    useEffect(() => {


        async function loadClients(){

            const getUserProtocols = await listProtocol()
            const filterProtocols = await getUserProtocols.data.docs.filter(e=>{
            return e.client._id==='5e4b2845e3f186259cd4ffda' || e // Filtrar por id       
        })


        setProtocols(getUserProtocols.data.docs)
                

            const response = await listClient()
            setClients(response.data)
        }loadClients()


    },[])


    return (
        
        <>
        <Navbar/>
        <article style={{background:'#70a486'}} className="mt-5 pt-4 pb-4 mb-2 d-flex pb-2">
                <img className="ml-5" src={protFoto} alt="Protocolos" height="70"/>              
            <div className="ml-5">
                <h1 className="text-light mt-4">Lista de protocolos:</h1>
                </div>
                <div className="mt-3 ml-5">
      <AddProtocol/>
    </div>
                <div className="form-inline ml-auto mr-5 pr-4">
                     <select value="0" 
                     id="search"
                     name="client" id="client"
                     onChange={e => setClient(e.target.value)}
                     className="form-control ml-5"
                    >
                    <option value="0">Filtrar por cliente</option>
                    {clients.map(c => (                        
                        <option key={c._id}value={c._id}>{c.name}</option>                           
                    ))}
                    </select>
                    <ButtonGroup>
  <Button variant="success border border-light">Filtrar</Button>
  <DropdownButton as={ButtonGroup} variant="outline-success border border-light text-light" title="Mais" id="bg-nested-dropdown">
    <Dropdown.Item eventKey="1">Periodo</Dropdown.Item>
    <Dropdown.Item eventKey="2">Titulo</Dropdown.Item>
    <Dropdown.Item eventKey="3">Conteudo</Dropdown.Item>
    <Dropdown.Item eventKey="4">Autor</Dropdown.Item>
  </DropdownButton>

</ButtonGroup>
                </div>
                </article>
                    <ListProtocol protocols={protocols}/>
        </>
    )
}