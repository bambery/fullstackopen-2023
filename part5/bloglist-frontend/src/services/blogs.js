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

const remove = async blogId => {
    const config = {
        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${blogId}`, config)
}

//******************************************************
// used for dev db setup
const createDummy = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// used for dev db setup
const createAllDummies = async () => {
    let blogs = []
    for (let i = 0; i < dummyBlogs.length; i++){
        const newBlog = await createDummy(dummyBlogs[i], blogs)
        blogs = blogs.concat(newBlog)
    }
    return blogs
}

// used for dev db setup
const deleteAllUserBlogs = async () => {
    const config = {
        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/deleteblogs`, config)
}

// used for dev db setup
const dummyBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    }
]
//******************************************************

export default process.env.NODE_ENV === 'development' ? { getAll, create, update, remove, setToken, createAllDummies, deleteAllUserBlogs } : { getAll, create, update, remove, setToken }
