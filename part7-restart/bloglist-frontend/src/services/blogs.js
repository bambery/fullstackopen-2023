import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (updatedObj) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${updatedObj.id}`, updatedObj, config)
    return response.data
}

const remove = async (blogId) => {
    const config = {
        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, create, update, remove, setToken }
