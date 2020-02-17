import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function Main({ match }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    const [usuario] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))
    useEffect(() => {

        async function loadUser() {

            await api.get('/users', {
            })

        } loadUser()

    }, [match.params.id])


    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <Container>
  <Navbar expand="lg" variant="light" bg="light">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
  </Navbar>
</Container>
            <div className="login-content">
                <form>
                    <h1>Hello, {usuario.nome}</h1>
                    <button type="submit">Teste</button>
                </form>

            </div>
        </>
    )
}
