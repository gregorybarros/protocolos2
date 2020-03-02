import React from 'react'
import help from '../../img/help.png'
import Navbar from '../../components/Navbar'


export default function Help(){


    return(
        <>
        <Navbar/>
        <div style={{background:'#70a486'}} className="container-fluid mt-5 pt-3 pb-4 mb-2 d-flex">
                <img className="ml-5 mr-3" src={help} alt="Clientes" height="88"/>              
            <div className="ml-5">
                <h1 className="text-light mt-4">Ajuda:</h1>
                </div>
                <div className="form-inline ml-auto mr-5 pr-4">
                </div>
                </div>
        </>
    )

}