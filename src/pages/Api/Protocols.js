import api from '../../services/api'

export async function singleProtocol(id) {


        const getProtocol = await api.get(`/protocols/${id}`)



    return getProtocol
}

export async function listProtocol() {


    const getProtocolList = await api.get(`/protocols`)



return getProtocolList
}


