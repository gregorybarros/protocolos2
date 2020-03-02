import api from '../../services/api'

export async function singleProtocol(id) {


        const getProtocol = await api.get(`/protocols/${id}`)



    return getProtocol
}

export async function listProtocol(page, perPage, filter, equal) {


    const getProtocolList = await api.get(`/protocols?page=${page}&perPage=${perPage}&filter=${filter}&equal=${equal}`)



return getProtocolList
}

export async function newProtocol(client, title, content) {

    const response = await api.post('/protocols/addprotocol', {
        client,
        title,
        content
    })

    return response
}

export async function editProtocol(title, content, client, _id) {

    const response = await api.put('/protocols/edit', {
        title,
        content,
        client,
        _id
    })

    return response
}

export async function deleteProtocol(id) {

    const response = await api.delete(`/protocols/delete/${id}`)

    return response
}


