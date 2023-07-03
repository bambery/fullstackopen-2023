const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const premadeBlogs = [
    {
        id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    }
]

const oneExtraDijkstraBlog = [
    {
        id: '5a422bc61b54a676234d1666',
        title: 'A fake blog entry',
        author: 'Edsger W. Dijkstra',
        url: 'https://www.fakeblog.com',
        likes: 12
    }
]

const oneExtraMartinBlog = [
    {
        id: '33422bc61b54a676234d1444',
        title: 'some more likes',
        author: 'Robert C. Martin',
        url: 'https://www.anotherfakeblog.com',
        likes: 5
    }
]
describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const blogs = oneExtraDijkstraBlog
        expect(listHelper.totalLikes(blogs)).toBe(12)
    })

    test('of a bigger list is calculated correctly', () => {
        const blogs = premadeBlogs
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when list has only one blog, return that blog', () => {
        const blogs = oneExtraDijkstraBlog
        const correct = { author: blogs[0].author, title: blogs[0].title, likes: blogs[0].likes }
        expect(listHelper.favoriteBlog(blogs)).toEqual(correct)
    })

    test('when list has multiple blogs, correctly returns the one with the most likes', () => {
        const blogs = premadeBlogs
        expect(listHelper.favoriteBlog(blogs)).toEqual({ author: 'Edsger W. Dijkstra', title: 'Canonical string reduction', likes: 12 })
    })

    test('when two blogs are tied for max likes, return one of those', () => {
        const blogs = premadeBlogs.concat(oneExtraDijkstraBlog)
        const blogsWith12Likes = [{ author: 'Edsger W. Dijkstra', title: 'Canonical string reduction', likes: 12 }, { author: 'Edsger W. Dijkstra', title: 'A fake blog entry', likes: 12 }]
        expect(blogsWith12Likes).toContainEqual(listHelper.favoriteBlog(blogs))
    })
})

describe('most blog posts', () => {
    test('when list has one blog, return that author', () => {
        const blogs = oneExtraDijkstraBlog
        expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('when list has many different authors, return the one with the most blog posts', () => {
        const blogs = premadeBlogs
        expect(listHelper.mostBlogs(blogs)).toEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
    })

    test('when list has two authors tied for most blog posts, return one of them', () => {
        const blogs = premadeBlogs.concat(oneExtraDijkstraBlog)
        // I can't really guarantee which person will be returned and am not interested in forcing it
        const authorsWith3Blogs = [{ author: 'Robert C. Martin', blogs: 3 }, { author: 'Edsger W. Dijkstra', blogs: 3 }]
        expect(authorsWith3Blogs).toContainEqual(listHelper.mostBlogs(blogs))
    })
})

describe('author with most likes across all blogs', () => {
    test('when list has one blog, return that author', () => {
        const blogs = oneExtraDijkstraBlog
        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 12 })
    })

    test('when list has blogs from many different authors, return the one with most likes', () => {
        const blogs = premadeBlogs
        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', 'likes': 17 })
    })

    test('when list has two authors with the same number of total likes, return one of them', () => {
        const blogs = premadeBlogs.concat(oneExtraMartinBlog)
        const authorsWith17Likes = [{ author: 'Robert C. Martin', likes: 17 }, { author: 'Edsger W. Dijkstra', likes: 17 }]
        expect(authorsWith17Likes).toContainEqual(listHelper.mostLikes(blogs))
    })
})
