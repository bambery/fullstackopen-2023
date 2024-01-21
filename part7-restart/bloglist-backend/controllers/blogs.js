const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

    response.json(blogs)
})

//blogsRouter.get('/:id', async (request, response) => {
//    const blog = await Blog.getById(request.params.id)
//    if(blog) {
//        response.json(blog)
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
        return response.status(403).json({ error: 'user does not have authorization to delete this blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
  // also delete the comments from this blog
  await Comment.deleteMany({ blogId: request.params.id })

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

blogsRouter.get('/:blogId/comments', middleware.blogExtractor, async (request, response) => {
  const blog = request.blog;

  const comments = await Comment
    .find({ blog: blog._id });
  response.json(comments);
})

blogsRouter.post('/:blogId/comments', middleware.blogExtractor, async (request, response) => {
  const blog = request.blog;
  const body = request.body;

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment);
})

module.exports = blogsRouter
