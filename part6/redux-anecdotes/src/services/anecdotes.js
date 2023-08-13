import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object =  { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateAnecdote = async (id, fieldsToUpdate) => {
    const response =  await axios.patch(`${baseUrl}/${id}`, fieldsToUpdate)
    return response.data
}

// eslint-disable-next-line
export default { getAll, createNew, updateAnecdote }
