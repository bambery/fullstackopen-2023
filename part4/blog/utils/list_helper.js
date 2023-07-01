const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (mostLikedBlog, blog) => {
        return mostLikedBlog.likes < blog.likes
            ? blog
            : mostLikedBlog
    }

    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    const mostBlogs = ( _.maxBy(
        _.toPairs(_.countBy(blogs, 'author')),
        o => o[1]
        )
    )

    return { 'author': mostBlogs[0], 'blogs': mostBlogs[1] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
