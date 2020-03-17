import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import useri from '../../img/user.svg'
import prot from '../../img/protocol.png'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import ListProtocol from '../Protocols/ListProtocol'
import AddProtocol from '../Protocols/AddProtocol'
import Button from 'react-bootstrap/Button'
import Navbar from '../../components/Navbar'

import moment from 'moment'
import 'moment/locale/pt-br'




export default function Main({ match }) {

    const [user] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))
    const [userInfo, setUserInfo] = useState({})
    const [protocols, setProtocols] = useState([])
    const [page, setPage] = useState(0) // seleciona pagina
    const [perPage] = useState(20) // total por paginas
    const [equal] = useState(user.id) // total pages
    const [sort, setSort] = useState('DESC')
    const [layout, setLayout] = useState(false)
    const [error, setError] = useState(false)

    const [showUser, setShowUser] = useState(false)
    


    useEffect(() => {
      moment.locale('pt-br')
      setShowUser(false)
      
      loadPage()

      }, [showUser,sort])


        

    async function loadPage(){

      setError(false)

      const resp = await api.get(`/users/${match.params.id}`)
      setUserInfo(resp.data)
      
      const getUserProtocols = await api.get(`/protocols/?page=${page}&perPage=${perPage}&sort=${sort}&equal=${equal}`)
      
      if(page>getUserProtocols.count) {
        return setError(false)

      }else {
      
        setError(false) // true

        console.log(getUserProtocols)
        setProtocols([...protocols,...getUserProtocols.data.rows])
            
        setPage(page+1)

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

        <label name="margin" id="margin"/>
      
<card
className="mr-0 d-flex"> 
<Container> 
  <Card className="ml-0 pl-0"style={{boxShadow:'0px 5px 10px  #0005'}}>
    <div style={{background:'#70a486'}}className="d-flex pr-5 pb-3">
    <img className="mr-2 mt-2 ml-2 m-0" src={prot} height="60"alt="Protocolo"/>
    <h1 className="mr-auto mt-3 m-0 text-light">Seus protocolos:</h1>
    <div className="mt-2 ml-2">
      <AddProtocol/>
    </div>
    </div>
    <small className="ml-2 d-flex text-secondary"><strong>Ordenar:</strong>
            <Button  onClick={e => Ordenate('desc')} className="badge btn-light p-0 ml-2">Novos</Button>
            <Button  onClick={e => Ordenate('1')} className="badge btn-light p-0 ml-1">Antigos</Button>           
            <Button size="sm" onClick={e => setLayout(false)} className="badge btn-light p-0 ml-1">Quadro</Button>
            <Button size="sm" onClick={e => setLayout(true)} className="badge btn-light p-0 ml-1 mr-auto">Tabela</Button>   
        </small>
    <div className="p-3" style={{background:'#c9ddc7'}}>
   <ListProtocol 
   layout={layout} protocols={protocols} page={page} loadPage={loadPage} error={error} showUser={showUser} user={user.id}/>
   </div>
  </Card >
  </Container>
<div name='divusermain' id='divusermain'>
  <label name="margin" id="margin"/>
    <div className="d-flex" name='divuser' id='divuser' onClick={e => setShowUser(true)}><Image style={{boxShadow:'0px 0px 10px 2px #0008'}} className="mx-auto mb-2" src={useri} alt="User" height="120"roundedCircle/>
    </div>
    <div className="d-flex"><h1 className='mt-2 mb-3 text-dark mx-auto font-weight-bold'>Olá, {userInfo.name}!</h1></div>
  <div name='divscore' id='divscore'>
  <Jumbotron className="p-3 m-0 text-dark font-weight-bold" 
  style={{background:'#70a486', height:'280px', width:'300px', borderRadius:"10px", boxShadow:'0px 5px 5px  #0005'}}>
      <div className="mb-2 text-dark">
        <div className="d-flex" style={{height:"70px",alignItems:"center"}}>
          <h6 className="mx-auto"><p className="font-italic">“{userInfo.phrase&&userInfo.phrase}”</p></h6>
        </div>
        <div className="d-flex text-light mb-4" id="divnavbar">
        <h5 className="mx-auto">Total de Protocolos:</h5>
        </div>
        <div className="mt-1 d-flex">
        <h5 className="mx-auto"><strong>{userInfo.totalProt} neste mês.</strong></h5>
        </div>
        <div className="mb-4 mt-1 d-flex">
        <h5 className="mx-auto"><strong>{userInfo.totalProt} total.</strong></h5>
        </div>
        <div className="d-flex">
        <small className="mx-auto"><strong>Agradecemos por te-lo conosco desde</strong></small>
        </div>
        <div className="d-flex">
        <small className="mx-auto"><strong>{moment(userInfo.dateAdm).format('L')}</strong></small>
        </div>
      </div>
</Jumbotron>
</div>
</div>

</card>

        </>
    )
}
