import React, { useState, useEffect } from 'react'
//import ListClient from './ListClient'
import clientPhoto from '../../img/clients.png'
import {listClient} from '../Api/Clients'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Navbar from '../../components/Navbar'
import ListCLient from './ListClient'
import AddClient from './AddClient'

export default function Clients({history}) {

    const [clients, setClients] = useState([])
    const [client, setClient] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        async function loadUser() {
            
            const response = await listClient('/clients')

            setClients(response.data)
            

        } loadUser()

    }, [msg])
    
    async function deleteProt(e) {
        try{

            //api.delete(`/clients/delete/${e}`)
            setMsg('Cliente deletado com sucesso!')
        } catch (err){
            setMsg('Houve um erro ao deletar cliente!')

        }
    }

    return (
        
        <>
        <Navbar/>
        <div style={{background:'#70a486'}}className="container-fluid mt-5 pt-4 pb-4 mb-2 d-flex">
                <img className="ml-5" src={clientPhoto} alt="Clientes" height="70"/>              
            <div className="ml-5">
                <h1 className="text-light mt-4">Lista de clientes:</h1>
                </div>
                <div className="mt-3 ml-5">
                 <AddClient/>
                </div>
                <div className="form-inline ml-auto mr-5 pr-4">
                <select 
                     name="client" id="client"
                     onChange={e => setClient(e.target.value)}
                     className="form-control m-0 p-0"
                    >
                    <option value="0">Escolha um cliente</option>
                    {clients.map(c => (                        
                        <option key={c._id}value={c._id}>{c.name}</option>                           
                    ))}
                </select>
                    <ButtonGroup>
  <Button variant="success border border-light" type="button" href={`/clients/${client}`}>Filtrar</Button>

</ButtonGroup>
                </div>
                </div>
                <ListCLient clients={clients} history={history}/>
        </>
    )
}