import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog

    beforeEach(() => {
        const fakeUser = {
                id: 2,
                name: 'foo',
                username: 'foouser'
        }

        blog = {
            title: 'Test Blog Title',
            author: 'Test Author',
            url: 'http://test.com',
            likes: 10,
            id: 1,
            user: fakeUser
        }

        localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(fakeUser)
        )

    })

    afterEach(() => {
        localStorage.removeItem('loggedBlogappUser')
    })

    test('by default Blog only shows title and author, and not URL or # of likes', async () => {
        render(<Blog blog={blog} />)
        await screen.getByText('Test Blog Title', { exact: false })
        await screen.getByText('Test Author', { exact: false })
        // https://github.com/testing-library/jest-dom#tobevisible
        expect(screen.getByText('likes: 10')).not.toBeVisible()
        expect(screen.getByText('http://test.com')).not.toBeVisible()
    })

    test('clicking the \'view\' button displays additional details including URL and # of likes', async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(screen.getByText('likes: 10')).toBeVisible()
        expect(screen.getByText('http://test.com')).toBeVisible()
    })

    test('clicking the \'like\' button calls the update event handler twice', async () => {
        const mockHandleUpdateBlog = jest.fn()
        const user = userEvent.setup()

        render(
            <Blog blog={blog} handleUpdateBlog={mockHandleUpdateBlog} />
        )

        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)

        expect(mockHandleUpdateBlog.mock.calls).toHaveLength(2)
    })
})
