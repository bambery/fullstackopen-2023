import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setErrorMessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogService.create({
                title, author, url
            })
            const newBlogs = blogs.concat(newBlog)
            setBlogs(newBlogs)
            // success message goes here
        } catch (exception) {
            setErrorMessage(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }


    }

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={handleNewBlog}>
                <div>
                    title:
                    <input
                        type='text'
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author:
                    <input
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url:
                    <input
                        type='text'
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )

}

export default BlogForm
