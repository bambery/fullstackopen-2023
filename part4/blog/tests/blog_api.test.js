const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const crypto = require('crypto')

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

test('a valid blog can be added', async () => {
    const newBlog = {
        title: crypto.randomBytes(5).toString('hex'),
        author: crypto.randomBytes(5).toString('hex'),
        url: `https://www.${crypto.randomBytes(5).toString('hex')}.com`,
        likes: Math.floor(Math.random() * 9999)
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.premadeBlogs.length + 1)
    expect(allBlogs.map(b => b.title)).toContain(newBlog.title)
    expect(allBlogs.map(b => b.author)).toContain(newBlog.author)
    expect(allBlogs.map(b => b.url)).toContain(newBlog.url)
    expect(allBlogs.map(b => b.likes)).toContain(newBlog.likes)
})

afterAll(async () => {
    await mongoose.connection.close()
})
