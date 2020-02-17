import api from '../../services/api'

export async function singleClient(id) {


        const getClient = await api.get(`/clients/${id}`)



    return getClient
}

export async function listClient() {


    const getClientList = await api.get(`/clients`)


return getClientList
}