const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
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
            title: 'I\m not a lawyer. But I see what the same-sex wedding website case will mean.",
            author: "Amanda Katz",
            url: 'https://www.washingtonpost.com/opinions/2023/07/01/supreme-court-303-creative-wedding-website/',
            likes: 7
        }
    ]

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated correctly', () => {
        const blogs = listWithOneBlog.concat(listWithTwoBlogs[0])
        expect(listHelper.totalLikes(blogs)).toBe(13)
    })
})
