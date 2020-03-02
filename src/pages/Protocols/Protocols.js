import React, { useState, useEffect } from 'react'
import './Protocols.css'
import ListProtocol from './ListProtocol'
import protFoto from '../../img/protocols.png'
import AddProtocol from './AddProtocol'
import api from '../../services/api'


import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Navbar from '../../components/Navbar'




export default function Protocols({history}) {

    let [protocols, setProtocols] = useState([])
    const [searchProt, setSearchProt] = useState(0)

    const [layout, setLayout] = useState(false)
    const [sort, setSort] = useState('desc')
    const [page, setPage] = useState(1) // seleciona pagina
    const [totalPerPage] = useState(30) // total por paginas
    const [error, setError] = useState(false) // infinite scroll
    const [errorSearch, setErrorSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {

       loadPage()

    },[sort])

    async function loadPage(){
        
        setError(false)
        const getProtocols = await api.get(`/protocols/?sort=${sort}&page=${page}&perPage=${totalPerPage}`)

      if(page>getProtocols.data.pages) {
        return setError(false)

      }else {
      
        setError(true)      
        
        setProtocols([...protocols,...getProtocols.data.docs])
        
        setPage(page+1)
        setLoading(false)
        

        } 
            

    }

    async function search(e){

        setLoading(true)
        setError(false)
        setErrorSearch('')
        
        if(!searchProt || searchProt <= 0){
            return 
        }
        else {
            e.preventDefault()
            try {
                const resp = await api.get(`/protocols/?filter=num&equal=${searchProt}`)
            setProtocols(resp.data.docs)

            if(resp.data.docs.length==0)
            return setErrorSearch(searchProt),setLoading(false)

            setLoading(false)
            }
            catch (err){
                alert('Erro ao encontrar protocolo!')
                console.log(err)
            }
            
        }       

    }

    async function Ordenate(ord){
        
        if(ord==sort){
        return
        } else {
        setProtocols([])
        setPage(1)
        setSort(ord)
        }
    } 

    return (
        
        <>
        <Navbar/>
        <article style={{background:'#70a486'}} className="mt-5 pt-4 pb-4 mb-2 d-flex pb-2">
                <img className="ml-5" src={protFoto} alt="Protocolos" height="70"/>              
            <div className="ml-5">
                <h1 className="text-light mt-4">Lista de protocolos:</h1>
                </div>
                <div className="mt-3 ml-5">
      <AddProtocol history={history}/>
    </div>
                <div className="form-inline ml-auto mr-5 pr-4">
                    <form onSubmit={search}>
                    <input type="number" className="form-control" placeholder="N. protocolo"
                    onChange={e => setSearchProt(e.target.value)}/>
                    <ButtonGroup>
  <Button variant="success border border-light" type="submit">Buscar</Button>
  <DropdownButton as={ButtonGroup} variant="outline-success border border-light text-light" title="Mais" id="bg-nested-dropdown">
    <Dropdown.Item eventKey="1">Periodo</Dropdown.Item>
    <Dropdown.Item eventKey="2">Titulo</Dropdown.Item>
    <Dropdown.Item eventKey="3">Conteudo</Dropdown.Item>
    <Dropdown.Item eventKey="4">Autor</Dropdown.Item>
  </DropdownButton>

</ButtonGroup>
  </form>
                </div>
                </article>

        <small className="ml-2 d-flex text-secondary"><strong>Ordenar:</strong>
            <Button  onClick={e => Ordenate('desc')} className="badge btn-light p-0 ml-2">Novos</Button>
            <Button  onClick={e => Ordenate('1')} className="badge btn-light p-0 ml-1">Antigos</Button>           
            <Button size="sm" onClick={e => setLayout(false)} className="badge btn-light p-0 ml-1">Quadro</Button>
            <Button size="sm" onClick={e => setLayout(true)} className="badge btn-light p-0 ml-1 mr-auto">Tabela</Button>   
        </small>

                    {loading&&<div className="loader" style={{display:"flex"}}>
                    <Spinner animation="grow" variant="warning mx-auto">
                    <span className="sr-only">Loading...</span>
                  </Spinner></div>}
                    <ListProtocol 
                    layout={layout} protocols={protocols} page={page} loadPage={loadPage} error={error}/>
                    {errorSearch&&<h1 className="mt-3">Protocolo {errorSearch} não encontrado!</h1>}

        </>
    )
}