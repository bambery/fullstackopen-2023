import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const destroy = personToDestroy => {
    const request = axios.delete(`${baseUrl}/${personToDestroy.id}`)
    return request
        .then(() => `delete ${personToDestroy.id} successful`)
        .catch(error => {
            if(error.response.status === 404){
                throw new Error(`${personToDestroy.name} has already been deleted from the server`)
            }
        })
}

const update = (id, changedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, changedPerson)
    return request
        .then(response => response.data)
        .catch(error => {
            if(error.response.status === 404){
                throw new Error(`${changedPerson.name} has already been deleted from the server`)
            }
        })
}

export default {
    getAll, create, destroy, update
}
