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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
