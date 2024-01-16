import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async ({ username, password }) => {
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            setUser(user)
            blogService.setToken(user.token)
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

    }

    const handleLogout = () => {
        setNotificationMessage(`${user.name} has logged out`)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    const handleNewBlog = async ({ title, author, url }) => {
        blogFormRef.current.toggleVisibility()
        try {
            const newBlog = await blogService.create({
                title, author, url
            })
            const newBlogs = blogs.concat(newBlog)
            setBlogs(newBlogs)
            setNotificationMessage(`New blog: "${newBlog.title}" by ${newBlog.author} added`)
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        } catch (exception) {
            exception.response?.data?.error
                ? setErrorMessage(exception.response.data.error)
                : setErrorMessage(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleUpdateBlog = async (blogObj) => {
        try {
            const updatedBlog = await blogService.update(blogObj)
            const updatedBlogList = blogs.map(b => blogObj.id ? updatedBlog : b)
        } catch (exception) {
            exception.response?.data?.error
                ? setErrorMessage(exception.response.data.error)
                : setErrorMessage(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleDeleteBlog = async ({ blogId }) => {
        try {
            await blogService.remove(blogId)
            setBlogs(blogs.filter(blog => blog.id !== blogId))
        } catch (exception) {
            console.log(exception)
            setErrorMessage(exception.response.data.error)
            seTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div className='centering-div'>
            <div className='main-container'>
                {!user && <h1>Log in to application</h1>}
                {user && <h1>Blogs</h1>}
                <Notification message={errorMessage} type='error'/>
                <Notification message={notificationMessage} type='info'/>
                {!user &&
                    <Toggleable buttonLabel='login'>
                        <LoginForm
                            handleLogin={handleLogin}
                        />
                    </Toggleable>
                }
                {user && <div>
                    <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
                    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm
                            handleNewBlog={handleNewBlog}
                        />
                    </Toggleable>
                    <div className='blog-list'>
                        {blogs
                            .sort((a, b) => b.likes - a.likes)
                            .map(blog =>
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    handleUpdateBlog={handleUpdateBlog}
                                    handleDeleteBlog={handleDeleteBlog}
                                    userIsAuthor={blog.user.username === user.username}
                                />)}
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default App
