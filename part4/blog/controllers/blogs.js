const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        user: user._id
    })

    const savedBlog = await blog.save()
    await savedBlog.populate('user', { username: 1, name: 1 })
    user.blogs= user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    //only allowing updating of likes right now
    const blog = {
        likes: body.likes,
    }

    await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => {
            if(updatedBlog){
                response.json(updatedBlog)
            } else {
                // attempting to update a nonexisting blog will error
                response.status(404).end()
            }
        })
})

module.exports = blogsRouter
