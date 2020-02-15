import React, { useEffect, useState } from 'react'
import api from '../../services/api'
export default function Main({ match }) {
    const [usuario] = useState(JSON.parse(localStorage.getItem('@CodeApi:user')))
    useEffect(() => {

        async function loadUser() {

            await api.get('/users', {
            })

        } loadUser()

    }, [match.params.id])

    console.log(usuario)

    return (
        <>
            <div className="login-content">
                <form>
                    <h1>Hello, {usuario.nome}</h1>
                    <button type="submit">Teste</button>
                </form>
            </div>
        </>
    )
}