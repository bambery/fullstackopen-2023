const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const listWithOneBlog = [
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }
]

const secondListWithOneBlog = [
    {
        id: '7c422aa71b54a676234d17c7',
        title: 'I Worked with Anita Hill to Fight Clarence Thomas\' Confirmation. Our Worst Fears Came True.',
        author: 'Kimberle Crenshaw',
        url: 'https://www.politico.com/news/magazine/2023/06/30/anita-hill-clarence-thomas-supreme-court-affirmative-action-00104387',
        likes: 7,
    }
]

const listWithTwoBlogs = [
    {
        id: '64a08cab63ce6e60c0bd3413',
        title: 'Supreme Court Rules 6-3 to Limit LGBTQ+ Protections, Rules in Favor of Homophobe',
        author: 'Trudy Ring, Alex Cooper',
        url: 'https://www.advocate.com/law/303-creative-ruling-lgbtq-rights',
        likes: 1
    },
    {
        id: '64a092e895d2999a937c3533',
        title: 'I\m not a lawyer. But I see what the same-sex wedding website case will mean.',
        author: "Amanda Katz",
        url: 'https://www.washingtonpost.com/opinions/2023/07/01/supreme-court-303-creative-wedding-website/',
        likes: 7
    }
]

const premadeBlogs = [
    {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const oneExtraDijkstraBlog = [
    {
        id: '5a422bc61b54a676234d1666',
        title: 'A fake blog entry',
        author: 'Edsger W. Dijkstra',
        url: 'https://www.fakeblog.com',
        likes: 3
    }
]

describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated correctly', () => {
        const blogs = listWithOneBlog.concat(listWithTwoBlogs)
        expect(listHelper.totalLikes(blogs)).toBe(13)
    })
})

describe('favorite blog', () => {
    test('when list has only one blog, return that blog', () => {
        const favBlog = listHelper.favoriteBlog(listWithOneBlog)
        expect(favBlog).toEqual(listWithOneBlog[0])
    })

    test('when list has multiple blogs, correctly returns the one with the most likes', () => {
        const blogs = listWithOneBlog.concat(listWithTwoBlogs)
        const favBlog = listHelper.favoriteBlog(blogs)
        expect(favBlog).toEqual(listWithTwoBlogs[1])
    })

    test('when twp blogs are tied for max likes, return one of those', () => {
        const blogs = listWithOneBlog.concat(secondListWithOneBlog, listWithTwoBlogs)
        const favBlog = listHelper.favoriteBlog(blogs)
        expect(favBlog.likes).toEqual(7)
    })
})

describe('most blog posts', () => {
    test('when list has one blog, return that author', () => {
        expect(listHelper.mostBlogs(oneExtraDijkstraBlog)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('when list has many different authors, return the one with the most blog posts', () => {
        const blogs = premadeBlogs
        expect(listHelper.mostBlogs(blogs)).toEqual({'author': 'Robert C. Martin', 'blogs': 3 })
    })

    test('when list has two authors tied for most blog posts, return one of them', () => {
        const blogs = premadeBlogs.concat(oneExtraDijkstraBlog)
        // I can't really guarantee which person will be returned and am not interested in forcing it
        const authorsWith3Blogs = [{ author: 'Robert C. Martin', blogs: 3 }, { author: 'Edsger W. Dijkstra', blogs: 3 }]
        expect(authorsWith3Blogs).toContainEqual(listHelper.mostBlogs(blogs))
    })
})
