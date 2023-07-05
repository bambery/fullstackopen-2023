const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

//blogsRouter.get('/:id', async (request, response) => {
//    const blog = await Blog.getById(request.params.id)
//    if(blog) {
//        response.json(note)
//    } else {
//        response.status(404).end()
//    }
//}

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('request body: ', body)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url
    })

    const savedBlog = await blog.save()
    console.log('saved blog ', savedBlog)
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
