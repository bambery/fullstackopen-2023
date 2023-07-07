const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObjects = helper.premadeBlogs.map(n => new Blog(n))
    const promiseArray = blogObjects.map(b => b.save())
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
    test.only('a valid blog can be added', async () => {
        const newBlog = helper.randomBlogData()
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
        const newBlog = helper.randomBlogData()
        delete newBlog.likes

        const createdBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .then(res => res.body)

        expect(createdBlog.likes).toEqual(0)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.premadeBlogs.length + 1)
    })

    test('a blog missing title will not be created', async () => {
        const newBlog = helper.randomBlogData()
        delete newBlog.title

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.premadeBlogs.length)
    })

    test('a blog missing url will not be created', async () => {
        const newBlog = helper.randomBlogData()
        delete newBlog.url

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.premadeBlogs.length)
    })
})

describe('deleting a blog post', () => {
    test('deletes note with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const blogWasDeleted = blogsAtEnd.find(blog => blog.id === blogToDelete.id)
        expect(blogWasDeleted).toBeUndefined()
    })
})

describe('updating a blog entry', () => {
    test('updating the number of likes on an existing blog post succeeds', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const likesAtStart = listHelper.totalLikes(blogsAtStart)
        const blogToUpdate = blogsAtStart[0]

        const blogWithMoreLikes = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogWithMoreLikes)
            .then(res => res.body)

        const blogsAtEnd = await helper.blogsInDb()
        const likesAtEnd = listHelper.totalLikes(blogsAtEnd)
        expect(updatedBlog.likes).toEqual(blogToUpdate.likes + 1)
        expect(likesAtEnd).toEqual(likesAtStart + 1)
    })

    test('updating the number of likes on a non-existent (and incorrectly formatted) id fails with 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const likesAtStart = listHelper.totalLikes(blogsAtStart)
        const blogToUpdate = blogsAtStart[0]

        const blogWithMoreLikes = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        await api
            .put('/api/blogs/222222')
            .send(blogWithMoreLikes)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        const likesAtEnd = listHelper.totalLikes(blogsAtEnd)
        expect(likesAtEnd).toEqual(likesAtStart)
    })

    test('updating the number of likes on a non-existent (but properly formatted) id fails with 404', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const likesAtStart = listHelper.totalLikes(blogsAtStart)
        const blogToUpdate = blogsAtStart[0]
        const fakeId = await helper.nonExistentId()

        const blogWithMoreLikes = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        await api
            .put(`/api/blogs/${fakeId}`)
            .send(blogWithMoreLikes)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        const likesAtEnd = listHelper.totalLikes(blogsAtEnd)
        expect(likesAtEnd).toEqual(likesAtStart)
    })

    test('cannot update title', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const blogWithNewTitle = {
            ...blogToUpdate,
            title: 'My cool new title'
        }

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogWithNewTitle)
            .then(res => res.body)

        expect(updatedBlog.title).not.toEqual(blogWithNewTitle.title)
        expect(updatedBlog.title).toEqual(blogToUpdate.title)
    })

    test('cannot update author', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const blogWithNewAuthor = {
            ...blogToUpdate,
            author: 'A different author'
        }

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogWithNewAuthor)
            .then(res => res.body)

        expect(updatedBlog.author).not.toEqual(blogWithNewAuthor.author)
        expect(updatedBlog.author).toEqual(blogToUpdate.author)
    })

    test('cannot update url', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const blogWithNewUrl = {
            ...blogToUpdate,
            url: 'https://www.cats.com'
        }

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogWithNewUrl)
            .then(res => res.body)

        expect(updatedBlog.url).not.toEqual(blogWithNewUrl.url)
        expect(updatedBlog.url).toEqual(blogToUpdate.url)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
