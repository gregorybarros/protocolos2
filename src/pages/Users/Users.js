import React, { useState, useEffect } from 'react'
import team from '../../img/team.png'
import Navbar from '../../components/Navbar'
import ListUser from '../Users/ListUser'


export default function Users(){




    return(
        <>
        <Navbar/>
        <div style={{background:'#70a486'}} className="container-fluid mt-5 pt-4 pb-4 mb-2 d-flex">
                <img className="ml-3" src={team} alt="Clientes" height="70"/>              
            <div className="ml-5">
                <h1 className="text-light mt-4">Equipe:</h1>
                </div>
                <div className="form-inline ml-auto mr-5 pr-4">
                </div>
                </div>
                <ListUser/>
        </>
    )

}