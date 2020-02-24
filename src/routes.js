import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Clients from './pages/Clients/Clients'
import Users from './pages/Users/Users'
import Help from './pages/Help/Help'
import Protocols from './pages/Protocols/Protocols'
import Test from './pages/Test'



export default function Routes(){

    return (
        <BrowserRouter>
        <Route path="/help" exact component={Help}/>
        <Route path="/test" exact component={Test}/>
        <Route path="/users" exact component={Users}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/main" component={Main}/>
        <Route path="/clients" exact component={Clients}/>
        <Route path="/protocols" exact component={Protocols}/>

        </BrowserRouter>
        
    )
}