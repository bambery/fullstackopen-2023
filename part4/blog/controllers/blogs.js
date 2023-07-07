const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        user: user._id
    })

    const savedBlog = await blog.save()
    await savedBlog.populate('user', { username: 1, name: 1 })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!user._id) {
        return response.status(401).json({ error: 'token invalid' })
    } else if (!blog) {
        // if the blog does not exist, we are fine
        return response.status(204).end()
    } else if (blog.user.toString() !== user._id.toString()) {
        console.log(blog.user.toString())
        console.log(user._id)
        return response.status(403).json({ error: 'user does not have authorization to delete this blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)

    // remove the association with the deleted blog on the user. Mongoose will ignore any non-existing ids when populating refs, but the ids will still exist on the user object.
    user.blogs = user.blogs.filter(b => {
        return b.toString() !== request.params.id
    })
    await user.save()

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
