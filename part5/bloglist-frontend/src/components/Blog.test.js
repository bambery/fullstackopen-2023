import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog = {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 10,
        id: 1,
        user: {
            id: 2,
            name: 'testuser',
            username: 'testusername'
        }
    }

    test('by default Blog only shows title and author, and not URL or # of likes', async () => {
        render(<Blog blog={blog} />)
        await screen.getByText('Test Blog Title', { exact: false })
        await screen.getByText('Test Author', { exact: false })
        // https://github.com/testing-library/jest-dom#tobevisible
        expect(screen.getByText('likes: 10')).not.toBeVisible()
        expect(screen.getByText('http://test.com')).not.toBeVisible()
    })

    test('clicking the \'view\' button displays additional details including URL and # of likes', async () => {
        const user = userEvent.setup()

        render(<Blog blog={blog} />)
        const button = screen.getByRole('button', { name: 'view' })
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

        const viewButton = screen.getByRole('button', { name: 'view' })
        await user.click(viewButton)

        const likeButton = screen.getByRole('button', { name: 'like' })
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandleUpdateBlog.mock.calls).toHaveLength(2)
    })
})
