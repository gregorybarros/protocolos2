import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Clients from './pages/Clients/Clients'
import SingleClient from './pages/Clients/SingleClient'
import Users from './pages/Users/Users'
import Help from './pages/Help/Help'
import Protocols from './pages/Protocols/Protocols'



export default function Routes(){

    return (
        <BrowserRouter>
        <Route path="/help" exact component={Help}/>
        <Route path="/users" exact component={Users}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/main/:id" component={Main}/>
        <Route path="/clients" exact component={Clients}/>
        <Route path="/clients/:id" exact component={SingleClient}/>
        <Route path="/protocols" exact component={Protocols}/>

        </BrowserRouter>
        
    )
}