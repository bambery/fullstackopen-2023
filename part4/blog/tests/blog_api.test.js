const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObjects = helper.premadeBlogs.map(n => new Blog(n))
    const promiseArray = blogObjects.map( b => b.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
    const response = await api
        .get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.premadeBlogs.length)

})

test('blogs are identified with an \'id\' field', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs[0].id).toBeDefined()
})

afterAll(async () => {
    await mongoose.connection.close()
})
