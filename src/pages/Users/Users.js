import React, { useState, useEffect } from 'react'
import team from '../../img/team.png'
import Navbar from '../../components/Navbar'
import ListUser from '../Users/ListUser'
import AddUser from './AddUser'
import api from '../../services/api'


export default function Users(){

    const [users, setUsers] = useState([])
    const [user] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))

    useEffect(() => {


        async function loadUsers(){

            const resp = await api.get('/users')
            setUsers(resp.data)

        }loadUsers()
    },[])


    return(
        <>
        <Navbar/>
        <div style={{background:'#70a486'}} className="container-fluid mt-5 pt-4 pb-4 mb-2 d-flex">
                <img className="ml-3" src={team} alt="Clientes" height="70"/>              
            <div className="ml-5">
                <h1 className="text-light mt-4">Equipe:</h1>
                </div>
                {!!user.eAdmin&&
                <div className="mt-3 ml-5">
      <AddUser/>
    </div>}
                <div className="form-inline ml-auto mr-5 pr-4">
                </div>
                </div>
                <ListUser users={users}/>
        </>
    )

}