import api from '../../services/api'

export async function singleClient(id) {


        const getClient = await api.get(`/clients/${id}`)



    return getClient
}

export async function listClient() {


    const getClientList = await api.get(`/clients`)


return getClientList
}

export async function newClient(code, name, category, resp, email, 
    adress, city, zip, state, since, obs, soft, phone) {

    const response = await api.post('/clients/addclient', {
        code,
        name,
        category,
        resp,
        email,
        adress,
        city,
        zip,
        state,
        since,
        obs,
        soft,
        phone
    })

    return response
}

export async function editClient(code, name, category, resp, email, 
    adress, city, zip, state, since, obs, soft, phone, _id) {

    const response = await api.put('/clients/edit', {
        code,
        name,
        category,
        resp,
        email,
        adress,
        city,
        zip,
        state,
        since,
        obs,
        soft,
        phone,
        _id
    })

    return response
}

export async function deleteClient(id) {

    const response = await api.delete(`/clients/delete/${id}`)

    return response
}

