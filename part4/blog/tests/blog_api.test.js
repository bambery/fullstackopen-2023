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

describe('creating blogs', () => {
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

    test('a blog with no likes property will default to 0 likes', async () => {
        const newBlog = {
            title: crypto.randomBytes(5).toString('hex'),
            author: crypto.randomBytes(5).toString('hex'),
            url: `https://www.${crypto.randomBytes(5).toString('hex')}.com`,
        }

        const createdBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .then(res => res.body)

        expect(createdBlog.likes).toEqual(0)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.premadeBlogs.length + 1)
    })

    test('a blog missing title will not be created', async () => {
        const newBlog = {
            author: crypto.randomBytes(5).toString('hex'),
            url: `https://www.${crypto.randomBytes(5).toString('hex')}.com`,
            likes: Math.floor(Math.random() * 9999)
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.premadeBlogs.length)
    })

    test('a blog missing url will not be created', async () => {
        const newBlog = {
            author: crypto.randomBytes(5).toString('hex'),
            title: crypto.randomBytes(5).toString('hex'),
            likes: Math.floor(Math.random() * 9999)
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.premadeBlogs.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
