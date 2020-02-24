import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import user from '../../img/greg.png'
import prot from '../../img/protocol.png'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListProtocol from '../Protocols/ListProtocol'
import AddProtocol from '../Protocols/AddProtocol'

import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-bootstrap/Spinner'
import Navbar from '../../components/Navbar'








export default function Main({ match }) {

    const [usuario] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))
    const [protocols, setProtocols] = useState([])
    const [page, setPage] = useState(1) // seleciona pagina
    const [totalPerPage, setTotalPerPage] = useState(10) // total por paginas
    const [total, setTotal] = useState(1) // total pages
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)



    useEffect(() => {
      const navigationOptions = { title: 'Welcome', header: null };
      loadPage()

      }, [])


        

    async function loadPage(){
      
      //setInterval(() => {
       // console.log('Interval triggered');
      //}, 1000);

      const getUserProtocols = await api.get(`/protocols/?page=${page}&perPage=${totalPerPage}`)
      //const filterProtocols = await getUserProtocols.data.docs.filter(e=>{
      //return e.client._id==='5e4b2845e3f186259cd4ffda' || e // Filtrar por id
      //})
      
      //const selectProtocols = await filterProtocols.splice(0,4) // Selecionar apenas 4 primeiros

      
      setProtocols([...protocols,...getUserProtocols.data.docs])
      setTotal(getUserProtocols.data.pages/10)
      setLoading(false)

        setPage(page+1)

      
      if(page==(total*10)){
        return setError(false)}

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
    <div className="p-3" style={{background:'#c9ddc7'}}>
    <InfiniteScroll
    pageStart={page}
    loadMore={loadPage}
    hasMore={error}
    loader={<div className="loader" style={{display:"flex"}} key={Math.random()}>
      <Spinner animation="grow" variant="warning mx-auto">
    <span className="sr-only">Loading...</span>
  </Spinner></div>}
>
   <ListProtocol protocols={protocols}/>
   </InfiniteScroll>
   </div>
  </Card >
  </Container>
<div name='divusermain' id='divusermain'>
    <div className="d-flex" name='divuser' id='divuser'><Image style={{boxShadow:'0px 0px 10px 2px #0008'}} className="mx-auto mb-2" src={user} alt="User" height="120"roundedCircle/>
    </div>
    <div className="d-flex"><h1 className='mt-2 mb-3 text-dark mx-auto font-weight-bold'>Olá, Gregory!</h1></div>
  <div name='divscore' id='divscore'>
  <Jumbotron className="p-3 m-0 text-dark font-weight-bold" 
  style={{background:'#70a486', height:'280px', width:'300px', borderRadius:"10px", boxShadow:'0px 5px 5px  #0005'}}>
      Nome <br/> E-mail <br/> Total protocolos/mes <br/> Tempo de registro <br/> Avatar <br/> Descricao <br/> Editar perfil
</Jumbotron>
</div>
</div>



</card>


        </>
    )
}
