const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const blogs = helper.oneExtraDijkstraBlog
        expect(listHelper.totalLikes(blogs)).toBe(12)
    })

    test('of a bigger list is calculated correctly', () => {
        const blogs = helper.premadeBlogs
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when list has only one blog, return that blog', () => {
        const blogs = helper.oneExtraDijkstraBlog
        const correct = { author: blogs[0].author, title: blogs[0].title, likes: blogs[0].likes }
        expect(listHelper.favoriteBlog(blogs)).toEqual(correct)
    })

    test('when list has multiple blogs, correctly returns the one with the most likes', () => {
        const blogs = helper.premadeBlogs
        expect(listHelper.favoriteBlog(blogs)).toEqual({ author: 'Edsger W. Dijkstra', title: 'Canonical string reduction', likes: 12 })
    })

    test('when two blogs are tied for max likes, return one of those', () => {
        const blogs = helper.premadeBlogs.concat(helper.oneExtraDijkstraBlog)
        const blogsWith12Likes = [{ author: 'Edsger W. Dijkstra', title: 'Canonical string reduction', likes: 12 }, { author: 'Edsger W. Dijkstra', title: 'A fake blog entry', likes: 12 }]
        expect(blogsWith12Likes).toContainEqual(listHelper.favoriteBlog(blogs))
    })
})

describe('most blog posts', () => {
    test('when list has one blog, return that author', () => {
        const blogs = helper.oneExtraDijkstraBlog
        expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('when list has many different authors, return the one with the most blog posts', () => {
        const blogs = helper.premadeBlogs
        expect(listHelper.mostBlogs(blogs)).toEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
    })

    test('when list has two authors tied for most blog posts, return one of them', () => {
        const blogs = helper.premadeBlogs.concat(helper.oneExtraDijkstraBlog)
        // I can't really guarantee which person will be returned and am not interested in forcing it
        const authorsWith3Blogs = [{ author: 'Robert C. Martin', blogs: 3 }, { author: 'Edsger W. Dijkstra', blogs: 3 }]
        expect(authorsWith3Blogs).toContainEqual(listHelper.mostBlogs(blogs))
    })
})

describe('author with most likes across all blogs', () => {
    test('when list has one blog, return that author', () => {
        const blogs = helper.oneExtraDijkstraBlog
        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 12 })
    })

    test('when list has blogs from many different authors, return the one with most likes', () => {
        const blogs = helper.premadeBlogs
        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', 'likes': 17 })
    })

    test('when list has two authors with the same number of total likes, return one of them', () => {
        const blogs = helper.premadeBlogs.concat(helper.oneExtraMartinBlog)
        const authorsWith17Likes = [{ author: 'Robert C. Martin', likes: 17 }, { author: 'Edsger W. Dijkstra', likes: 17 }]
        expect(authorsWith17Likes).toContainEqual(listHelper.mostLikes(blogs))
    })
})
