const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const reducer = (mostLikedBlog, blog) => {
        return mostLikedBlog.likes < blog.likes
            ? blog
            : mostLikedBlog
    }

    return blogs.reduce(reducer)
}

const mostBlogs = blogs => {
    let maxBlogAuthor
    const reducer  = (blogCount, blog) => {
        maxBlogAuthor ||= blog.author
        blogCount[blog.author] = blogCount[blog.author] + 1 || 1
        if (blogCount[maxBlogAuthor] < blogCount[blog.author]) {
            maxBlogAuthor = blog.author
        }
        return blogCount
    }

    const calc = blogs.reduce(reducer, {})
    return { 'author': maxBlogAuthor, 'blogs': calc[maxBlogAuthor] }
}

const mostLikes = blogs => {
    let maxAuthor
    const reducer = (likeCount, blog) => {
        maxAuthor ||= blog.author
        likeCount[blog.author] = likeCount[blog.author] + blog.likes || blog.likes
        if (likeCount[maxAuthor] < likeCount[blog.author]) {
            maxAuthor = blog.author
        }
        return likeCount
    }
    const calc = blogs.reduce(reducer, {})
    return({ author: maxAuthor, likes: calc[maxAuthor] })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
