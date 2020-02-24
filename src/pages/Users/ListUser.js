import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import user from '../../img/greg.png'



export default function ListUser(){

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    function showUsers(){
       
        
    }

    return (
        <>

      <Modal show={show} onHide={handleClose} size="sm">
      <div name='divnavbar' id='divnavbar'>
  <Jumbotron className="p-3 pb-2 pt-4 text-dark font-weight-bold mb-0"
  style={{background:'#70a486'}}>
    <div className="d-flex"><Image className="mx-auto mb-3 border border-secondary" src={user} alt="User" height="120" roundedCircle/>
    </div>
    <div className="d-flex"><h1 className='text-light mx-auto'>Gregory</h1></div>
    
      Nome <br/> E-mail <br/> Total protocolos/mes <br/> Tempo de registro <br/> Avatar <br/> Descricao <br/> Editar perfil
      <Container className="d-flex mt-5">
      <Button type="button" size="sm" variant="secondary ml-1 p-1"style={{width:'100%'}}
      onClick={handleClose}>Fechar
      </Button>
      </Container>
</Jumbotron>
</div>

      </Modal>
      <div name='divnavbar' id='divnavbar' className="form-inline m-2">
               
  <Jumbotron 
  className="p-3 pb-5 pt-4 text-dark mt-3 font-weight-bold" 
  style={{background:'#d0f0cc', height:'250px', 
  width:'200px'}}>
    <div name='divuser' id='divuser'className="d-flex"
    onClick={handleShow}
    style={{cursor:'pointer'}}>
        <Image style={{boxShadow:'0px 10px 10px #0005'}} className="mx-auto mb-3 border border-secondary" src={user} alt="User" height="120" roundedCircle/>
    </div>
    <div className="d-flex"><h1 className='text-dark mx-auto'>Gregory</h1></div>
    <div className="d-flex"><p className="mx-auto">Tecnico III</p></div>
</Jumbotron>

<div name='divuser' id='divuser' className="form-inline m-2">
<Jumbotron 
  onClick={handleShow}
  className="p-3 pb-5 pt-4 text-dark mt-3 font-weight-bold border border-secondary" 
  style={{background:'#70a486', height:'250px', 
  width:'200px', borderRadius:"10px", 
  boxShadow:'0px 10px 10px #0005', cursor:'pointer'}}>
    <div className="d-flex"><Image className="mx-auto mb-3 border border-secondary" src={user} alt="User" height="120" roundedCircle/>
    </div>
    <div className="d-flex"><h1 className='text-light mx-auto'>Gregory</h1></div>
    <div className="d-flex"><p className="mx-auto">Tecnico III</p></div>
</Jumbotron>
</div>
</div>

          </>
    )
}