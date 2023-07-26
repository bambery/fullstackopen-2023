const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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

// this is for me so I can easily drop and recreate the db during dev. Seeding db in this way is done through FE so that users/tokens are appropriately set each time
// ************************************************
blogsRouter.delete('/deleteblogs', middleware.userExtractor, async (request, response) => {
    const bloguser = request.user
    await Blog.deleteMany({ user: bloguser })
    bloguser.blogs = []
    await bloguser.save()
    response.status(204).end()
})
//*************************************************

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!user._id) {
        return response.status(401).json({ error: 'token invalid' })
    } else if (!blog) {
        // if the blog does not exist, we are fine
        return response.status(204).end()
    } else if (blog.user.toString() !== user._id.toString()) {
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

// allows any logged in user to update all fields for a blog posts
blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    // check that the user (any user) is logged in
    if (!user?._id) {
        return response.status(401).json({ error: 'token invalid' })
    } else if (!blog) {
        // if the blog does not exist, error
        return response.status(404).end()
    }

    //only allowing updating of likes right now
    blog.likes = body.likes

    // since we already fetched the Blog document to confirm it exists, I do not need to run a findByIdAndUpdate, I can just run save() on the document and it will run validations
    const updatedBlog = await blog.save()
    await updatedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
