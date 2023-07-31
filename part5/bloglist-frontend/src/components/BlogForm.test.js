import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

    test('creating a new blog submits the title, author, and url', async () => {
        const mockHandleNewBlog = jest.fn()
        const user = userEvent.setup()

        const newBlogContent = {
            title: 'A New Blog Title',
            author: 'Cool Blog Author',
            url: 'http://www.coolblog.com'
        }

        render(<BlogForm handleNewBlog={mockHandleNewBlog} />)

        const titleInput = screen.getByRole('textbox', { name: 'title' })
        await user.type(titleInput, newBlogContent.title)

        const authorInput = screen.getByRole('textbox', { name: 'author' })
        await user.type(authorInput, newBlogContent.author)

        const urlInput = screen.getByRole('textbox', { name: 'url' })
        await user.type(urlInput, newBlogContent.url)

        const submitButton = screen.getByRole('button', { name: 'create' })
        await user.click(submitButton)

        expect(mockHandleNewBlog.mock.lastCall[0]).toEqual(newBlogContent)
    })
})
